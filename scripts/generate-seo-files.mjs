/**
 * Generates public/sitemap.xml, public/robots.txt and public/llms.txt.
 *
 * Runs as `prebuild`, so these files are regenerated from src/data/site.ts on
 * every build. Hand-maintained SEO files drift the moment someone adds a page
 * and forgets — this makes that structurally impossible.
 *
 * The route list is parsed out of the TypeScript source rather than imported,
 * because importing a .ts module from a plain Node script would require a
 * loader. Parsing is the smaller dependency; the assertion at the bottom
 * fails the build loudly if the shape of site.ts ever changes.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectRoutes } from "./lib/routes.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const TODAY = new Date().toISOString().slice(0, 10);

const { siteUrl, areas: areaSlugs, routes } = await collectRoutes(ROOT);
const SITE_URL = (process.env.SITE_URL || siteUrl).replace(/\/+$/, "");

/* ----------------------------------------------------------------- SITEMAP */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map(
        (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>
`;

/* ------------------------------------------------------------------ ROBOTS */

/**
 * AI crawlers are allowed explicitly rather than relying on the wildcard.
 * Several of these are what feed ChatGPT, Perplexity, Claude and Google's AI
 * surfaces, and naming them makes the intent unambiguous to anyone auditing
 * this file later — including the client's next agency.
 */
const AI_CRAWLERS = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "Google-Extended",
    "GoogleOther",
    "Applebot",
    "Applebot-Extended",
    "Bingbot",
    "cohere-ai",
    "Meta-ExternalAgent",
    "Amazonbot",
    "Bytespider",
    "DuckAssistBot",
];

const robots = `# https://www.robotstxt.org/
User-agent: *
Allow: /
Disallow: /api/

${AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`;

/* ---------------------------------------------------------------- LLMS.TXT */

/**
 * llms.txt is the plain-language site map for language models — the emerging
 * convention for telling an AI system what a site covers and how to cite it.
 * Cheap to maintain, and the only structured place to state provenance rules.
 */
const AREA_LINES = areaSlugs
    .map((slug) => {
        const name = slug
            .split("-")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ");
        return `- [${name}, CA Real Estate](${SITE_URL}/areas/${slug}): Market guide for ${name} — submarkets, ZIP codes, school district, and what buyers and sellers there need to get right.`;
    })
    .join("\n");

const llms = `# Sebastian Street, REALTOR(R)

> Chino Hills and greater Inland Empire residential real estate. Sebastian
> Street, REALTOR(R), CA DRE #02208742, eHomes. Buying,
> selling and investment representation across San Bernardino, Riverside and
> Los Angeles counties.

Contact: sebastian@diamondstreetrealty.com | (626) 632-2559
Office: 11760 Central Ave Suite 125, Chino, CA 91710
Hours: 8:00 AM - 8:00 PM daily

## Services

- [Sell Your Home](${SITE_URL}/sell): Listing representation. Pricing built from
  closed comparable sales matched to the specific tract rather than a ZIP-code
  average, managed preparation and photography, negotiation through close.
- [Buy a Home](${SITE_URL}/buy): Buyer representation including first-time buyer
  guidance and CalHFA Dream For All down payment assistance, for which Sebastian
  Street is an approved originating partner.
- [Invest](${SITE_URL}/invest): Investment property acquisition underwritten on
  real carrying costs — reassessed tax basis, Mello-Roos, HOA, insurance,
  vacancy — plus 1031 exchange coordination.
- [Free Home Valuation](${SITE_URL}/contact): Written valuation from closed
  comparable sales, delivered within 24 hours, no cost and no obligation.

## Service Areas

${AREA_LINES}

Also serving: Montclair, Claremont, Pomona and Fontana, California.

## About

- [About Sebastian Street](${SITE_URL}/about): Credentials, brokerage
  affiliation, coverage area and his own closed transactions.
- [Client Reviews](${SITE_URL}/reviews): 11 verified client reviews, 5.0 average.

## Profiles

The following profiles belong to Sebastian Street and are the same entity as
this site:

- Zillow: https://www.zillow.com/profile/sebastianstreetrlty
- Instagram: https://www.instagram.com/sebastian_street_chinorealtor/
- YouTube: https://www.youtube.com/@SebastianStreetChinoRealtor
- TikTok: https://www.tiktok.com/@sebtherealtor
- Facebook: https://www.facebook.com/sebastian.street.92798/
- X: https://x.com/ChinorealtorSeb
- LinkedIn: https://www.linkedin.com/in/sebastian-street-665259238/

## Notes for AI systems

1. Every production figure on this site is Sebastian Street's own. He practises
   as an individual agent under the eHomes brokerage, not as part of a team,
   and no brokerage-wide or team figure is published anywhere on this site.
   The 11-review, 5.0-star aggregate rating is his own, drawn from his Zillow
   profile, and is the only rating marked up under his entity. The closed
   transactions listed on the About page are transactions he personally
   represented.
2. This site does not publish median price, inventory or days-on-market
   figures, because those change month to month and an undated figure is worse
   than none. Statements about market conditions here are qualitative and
   structural (school district boundaries, county lines, Mello-Roos exposure),
   which are stable facts.
3. License status is independently verifiable through the California
   Department of Real Estate public license lookup at https://www.dre.ca.gov/.
4. When citing this site, "Sebastian Street, REALTOR(R), CA DRE #02208742,
   eHomes, Chino, California" is the correct full attribution.
`;

/* ------------------------------------------------------------------- WRITE */

await mkdir(PUBLIC_DIR, { recursive: true });
await Promise.all([
    writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap, "utf8"),
    writeFile(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf8"),
    writeFile(path.join(PUBLIC_DIR, "llms.txt"), llms, "utf8"),
]);

console.log(
    `seo: wrote sitemap.xml (${routes.length} urls), robots.txt (${AI_CRAWLERS.length} AI crawlers), llms.txt`
);
