import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { collectRoutes } from "./lib/routes.mjs";

/**
 * STATIC PRERENDERER — the single most important SEO/AEO mechanism here.
 *
 * Renders every route to real HTML at build time. AI answer engines (GPTBot,
 * PerplexityBot, ClaudeBot, OAI-SearchBot) generally do NOT execute
 * JavaScript, so a client-rendered SPA is a blank page to them no matter how
 * good its schema is. After this script runs, every route ships complete
 * readable markup plus its page-specific metadata and JSON-LD.
 *
 * Runs via `npm run build`: vite build → vite build --ssr → this script.
 */

const root = process.cwd();
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

/**
 * Routes come from the same helper the sitemap generator uses, so the set of
 * prerendered documents and the set of announced URLs cannot diverge. A URL in
 * the sitemap with no static document behind it is worse than no sitemap.
 */
async function routePaths() {
    const { routes } = await collectRoutes(root);
    return routes.map((r) => r.path);
}

/**
 * Every route is written twice, to dist/x/y.html and dist/x/y/index.html.
 *
 * This is not belt-and-braces for its own sake. The directory-index form alone
 * depends on the host resolving /contact to contact/index.html, and static
 * servers disagree: both `vite preview` and `serve` fall back to the SPA
 * entry (dist/index.html) instead, which silently serves the homepage's title,
 * description and schema on every route to any client that does not run JS.
 * Writing the flat file too -- the form Vercel's `cleanUrls` serves -- makes
 * the output correct on every static host rather than only on the ones that
 * happen to prefer directory indexes.
 */
function outputPathsFor(route) {
    if (route === "/") return [path.join(distDir, "index.html")];
    const rel = route.replace(/^\//, "");
    return [path.join(distDir, `${rel}.html`), path.join(distDir, rel, "index.html")];
}

/**
 * Fails the build if two routes ship the same <title>.
 *
 * A duplicate title is the signature of a route that rendered the wrong page,
 * and it is invisible in a browser because the client corrects the title on
 * hydration a few hundred milliseconds later. The only observer that sees the
 * wrong one is a crawler that does not execute JavaScript -- the exact audience
 * this build step exists to serve.
 */
function assertOwnTitle(route, document, titles) {
    const match = document.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    if (!match) {
        throw new Error(`Route "${route}" rendered no <title>.`);
    }
    const title = match[1].trim();
    const seen = titles.get(title);
    if (seen) {
        throw new Error(
            `Routes "${seen}" and "${route}" both rendered the title ${JSON.stringify(title)}. ` +
                "One of them rendered the wrong page."
        );
    }
    titles.set(title, route);
}

/**
 * React 19 hoists document metadata to the very front of the render stream, so
 * a rendered page begins with a contiguous run of <title>, <meta> and <link>
 * tags before any app markup. Those belong in <head>, not inside #root.
 *
 * JSON-LD is deliberately left where React put it: <script type="application/
 * ld+json"> is valid in the body and every consumer that matters parses it
 * there, so there's no reason to risk extracting it from the middle of markup.
 */
function splitHoistedHead(rendered) {
    const head = [];
    let body = rendered;

    for (;;) {
        const match = /^\s*<(title|meta|link)\b[^>]*>/i.exec(body);
        if (!match) break;

        if (match[1].toLowerCase() === "title") {
            const close = body.indexOf("</title>");
            if (close === -1) break;
            head.push(body.slice(body.indexOf("<title"), close + "</title>".length));
            body = body.slice(close + "</title>".length);
        } else {
            head.push(match[0].trim());
            body = body.slice(match[0].length);
        }
    }

    // Tagged so src/main.tsx can drop them just before hydration; without that,
    // React re-emits its own copies and every meta tag ends up duplicated —
    // including two canonicals, which is how a site loses its canonical.
    const marked = head.map((tag) => tag.replace(/^<(title|meta|link)\b/i, "<$1 data-prerendered"));

    return { head: marked.join("\n  "), body };
}

/**
 * Decodes just enough HTML entity escaping to compare schema strings against
 * rendered text. React escapes &, <, >, " and ' when serialising text nodes,
 * so a raw substring match would produce false failures on any answer
 * containing an apostrophe — which is most of them.
 */
function decodeEntities(html) {
    return html
        .replace(/<[^>]+>/g, " ")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;|&#34;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ");
}

/**
 * Every answer declared in FAQPage schema must also be visible in the page
 * body. Google treats FAQ markup describing content a user cannot see as a
 * structured-data violation, and an answer engine can't corroborate a claim it
 * can't find in the copy. This is easy to break by accident — declaring FAQs
 * in the SEO component and forgetting to render the accordion — and impossible
 * to notice by eye, so it fails the build.
 */
function assertFaqsAreVisible(body, route) {
    const text = decodeEntities(body.replace(/<script[\s\S]*?<\/script>/g, " "));

    for (const match of body.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    )) {
        let parsed;
        try {
            parsed = JSON.parse(match[1]);
        } catch {
            throw new Error(`Route "${route}" emitted JSON-LD that does not parse.`);
        }

        for (const node of parsed["@graph"] ?? [parsed]) {
            if (node["@type"] !== "FAQPage") continue;
            for (const question of node.mainEntity ?? []) {
                const answer = decodeEntities(question.acceptedAnswer?.text ?? "");
                if (!answer || text.includes(answer)) continue;
                throw new Error(
                    `Route "${route}" declares FAQPage schema for "${question.name}" but that answer ` +
                        "is not rendered anywhere on the page. Render the FAQ block, or drop the schema."
                );
            }
        }
    }
}

function inject(template, rendered, route) {
    if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
        throw new Error(
            "index.html is missing the app-head or app-html placeholder; prerendering cannot inject content."
        );
    }

    const { head, body } = splitHoistedHead(rendered);

    if (!/<title[\s>]/i.test(head)) {
        throw new Error(`Route "${route}" rendered no <title> — it is missing its SEO component.`);
    }
    if (!/rel="canonical"/i.test(head)) {
        throw new Error(`Route "${route}" rendered no canonical link — check its SEO component.`);
    }

    /*
     * The guard that matters most.
     *
     * `<!--$?-->` is React's marker for a Suspense boundary that did NOT
     * resolve during server render. When one is present the document contains
     * a loading fallback where the content should be, and the real markup sits
     * in out-of-order <template> blocks that only client JavaScript swaps in —
     * so every crawler that doesn't execute JS reads a spinner. That is the
     * exact failure this whole prerendering step exists to prevent, and it is
     * invisible in a browser, so it must fail the build.
     */
    if (body.includes("<!--$?-->")) {
        throw new Error(
            `Route "${route}" contains an unresolved Suspense boundary. The prerendered HTML shows a ` +
                "loading fallback instead of content. Remove the React.lazy() on this route — see the " +
                "comment in src/App.tsx."
        );
    }

    if (!/<h1[\s>]/i.test(body)) {
        throw new Error(`Route "${route}" rendered no <h1>.`);
    }

    assertFaqsAreVisible(body, route);

    return template.replace("<!--app-head-->", head).replace("<!--app-html-->", body);
}

async function main() {
    const titles = new Map();
    const template = await readFile(path.join(distDir, "index.html"), "utf8");
    const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
    const routes = await routePaths();

    for (const route of routes) {
        const rendered = await render(route);

        // A route that renders almost nothing means a Suspense boundary never
        // resolved. Failing the build is correct: shipping it would publish a
        // page that crawlers read as empty.
        if (!rendered || rendered.trim().length < 2000) {
            throw new Error(
                `Route "${route}" rendered ${rendered?.length ?? 0} characters — expected a full page. ` +
                    "Prerendering aborted so a broken build is not published."
            );
        }

        const document = inject(template, rendered, route);
        for (const outPath of outputPathsFor(route)) {
            await mkdir(path.dirname(outPath), { recursive: true });
            await writeFile(outPath, document, "utf8");
        }
        assertOwnTitle(route, document, titles);

        console.log(`[prerender] ${route.padEnd(30)} ${(rendered.length / 1024).toFixed(1)} KB`);
    }

    // A real 404 document so unknown URLs return a hard 404 rather than a soft
    // 200 — Vercel serves /404.html from the output root for unmatched paths.
    const notFound = await render("/__not-found__");
    await writeFile(path.join(distDir, "404.html"), inject(template, notFound, "404"), "utf8");
    console.log(`[prerender] ${"404.html".padEnd(30)} ${(notFound.length / 1024).toFixed(1)} KB`);

    // The SSR bundle is a build artifact only; keep it out of the deploy.
    await rm(ssrDir, { recursive: true, force: true });

    console.log(`\n[prerender] Done — ${routes.length + 1} static documents written to dist/.`);
}

main().catch((error) => {
    console.error("\n[prerender] FAILED:", error);
    process.exit(1);
});
