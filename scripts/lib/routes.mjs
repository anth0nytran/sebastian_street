import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Route discovery, shared by the sitemap generator and the prerenderer.
 *
 * Both need the same list, and the failure mode when they disagree is silent
 * and bad: a URL announced in sitemap.xml with no static document behind it,
 * or a page that ships but is never announced. One implementation, one answer.
 *
 * Routes are parsed out of the TypeScript source rather than imported, because
 * importing a .ts module from plain Node would need a loader. The parse is
 * deliberately tolerant of formatting — including CRLF, which is how these
 * files land on a Windows checkout — and the caller asserts on the result.
 */

const STATIC_ROUTES = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/sell", changefreq: "monthly", priority: "0.9" },
    { path: "/buy", changefreq: "monthly", priority: "0.9" },
    { path: "/invest", changefreq: "monthly", priority: "0.9" },
    { path: "/areas", changefreq: "monthly", priority: "0.8" },
    { path: "/about", changefreq: "monthly", priority: "0.8" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/reviews", changefreq: "monthly", priority: "0.7" },
];

/** Reads src/data/site.ts with line endings normalised. */
async function readSite(root) {
    const source = await readFile(path.join(root, "src", "data", "site.ts"), "utf8");
    return source.replace(/\r\n/g, "\n");
}

export function siteUrl(source) {
    const match = source.match(/export const SITE_URL = "([^"]+)"/);
    if (!match) throw new Error("routes: SITE_URL not found in src/data/site.ts");
    return match[1].replace(/\/+$/, "");
}

/**
 * Every area slug whose object also sets `featured: true`.
 *
 * Rather than trying to match balanced braces, this slices the source between
 * consecutive `slug:` keys — each slice is exactly one object's remainder —
 * and asks whether that slice opts into `featured`. Service definitions also
 * carry a `slug:` but never `featured`, so they fall out naturally.
 */
export function featuredAreaSlugs(source) {
    const hits = [...source.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)];
    const slugs = [];

    for (let i = 0; i < hits.length; i += 1) {
        const start = hits[i].index ?? 0;
        const end = i + 1 < hits.length ? (hits[i + 1].index ?? source.length) : source.length;
        if (/\bfeatured:\s*true/.test(source.slice(start, end))) {
            slugs.push(hits[i][1]);
        }
    }

    return [...new Set(slugs)];
}

/**
 * The full indexable route list. Throws rather than returning a partial set —
 * a build that silently drops every city page is worse than a failed build.
 */
export async function collectRoutes(root) {
    const source = await readSite(root);
    const areas = featuredAreaSlugs(source);

    if (areas.length === 0) {
        throw new Error(
            "routes: parsed 0 featured areas from src/data/site.ts. The AREAS shape likely " +
                "changed — fix featuredAreaSlugs() rather than shipping a build with no city pages."
        );
    }

    return {
        siteUrl: siteUrl(source),
        areas,
        routes: [
            ...STATIC_ROUTES,
            ...areas.map((slug) => ({
                path: `/areas/${slug}`,
                changefreq: "monthly",
                priority: "0.7",
            })),
        ],
    };
}
