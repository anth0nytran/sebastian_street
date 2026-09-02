# The QuickLaunchWeb Build Blueprint

**"Editorial Authority" — a reusable system for local-service marketing sites
that rank in Google *and* get cited by AI answer engines.**

This document exists so the next site doesn't start from a blank page. It
describes the design system, the SEO/GEO/AEO architecture, and — most
importantly — *why* each decision is the way it is, so you can tell when a new
project should deviate.

Reference implementations:

| Site | Vertical | Market |
| --- | --- | --- |
| `Cuervo_Homes` | Real estate | Orange County, CA |
| `sebastion_rea_estate` | Real estate | Chino Hills / Inland Empire, CA |

---

## 1. The one-paragraph summary

A React + Vite SPA that is **prerendered to static HTML at build time**, styled
with a deliberately narrow Tailwind token set (black, white, one accent, zero
border radius), and wired so that every fact on the site — NAP, credentials,
service areas, FAQs — resolves back to a **single data file** that also
generates the sitemap, robots.txt and llms.txt. The result reads as a print
document, loads as a static site, and answers questions in a form an LLM can
lift verbatim.

---

## 2. Stack

```
React 19 + TypeScript
Vite 7
Tailwind 3 (real build — never the CDN script)
react-router-dom 7
react-helmet-async      → per-page <head>
framer-motion           → entrances only
lucide-react            → icons
```

Build pipeline:

```
npm run build
  └─ prebuild:  node scripts/generate-seo-files.mjs   → sitemap, robots, llms.txt
  └─ tsc -b
  └─ vite build                                       → client bundle
  └─ vite build --ssr src/entry-server.tsx            → SSR bundle
  └─ node scripts/prerender.mjs                       → one static .html per route
```

### Why prerender, not SSR-on-request

AI answer engines — GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot — **do not
execute JavaScript**. A client-rendered SPA is a blank page to them regardless
of how good its schema is. Prerendering costs nothing at runtime (it's static
files on a CDN) and is the single highest-leverage decision in this stack.

---

## 3. Design system

### 3.1 The three rules

1. **Nothing is rounded.** `--radius: 0rem`, permanently. The whole system reads
   as print / legal / architectural. One stray `rounded-lg` breaks the spell.
2. **Exactly one chromatic accent.** Everything else is black, white, or a
   neutral. Restraint is what makes the accent land.
3. **Structure is drawn with 1px rules, never shadows or cards.** Sections are
   divided by `border-black/[0.08]` hairlines on a full-bleed grid.

### 3.2 Tokens (`tailwind.config.js`)

**Type — a fluid scale, not breakpoint chains.**

| Token | Use | Definition |
| --- | --- | --- |
| `text-d1` | Page `<h1>` | `clamp(2.5rem, 7vw, 5.75rem)` / 900 |
| `text-d2` | Section `<h2>` | `clamp(2rem, 5.2vw, 4rem)` / 900 |
| `text-d3` | Sub-section | `clamp(1.6rem, 3.4vw, 2.5rem)` / 900 |
| `text-d4` | Card heading | `clamp(1.15rem, 2vw, 1.5rem)` / 900 |
| `text-stat` | The one big numeral | `clamp(3.25rem, 8vw, 7.5rem)` / 900 |
| `text-eyebrow` | Micro-caps label | `9px` / `0.3em` tracking / 700 |
| `text-body` | Running copy | `15px` / 1.85 |
| `text-body-sm` | Secondary copy | `13px` / 1.8 |

Fluid `clamp()` replaces `text-3xl md:text-5xl lg:text-6xl`. One class,
continuous across every viewport, no jumps at breakpoints.

**Colour — three accent stops, not one.**

```js
accent:      "#C9A227"  // fills, rules, icons, and text ON DARK
accent-deep: "#7A5E0C"  // the ON-WHITE text stop — 5.6:1, passes AA
accent-soft: "#E8CF7A"  // hairlines and 5–10% wash fills only
```

> **This is where Cuervo got it wrong and this build fixes it.** A single mid-
> tone accent (`#FACC15`) fails contrast for small text on white — every
> micro-caps eyebrow on that site is inaccessible. Always ship a darkened stop
> for on-white text. The `Eyebrow` component picks the right one via `tone`.

**Spacing — named rhythm, decided once.**

```js
section:     clamp(4rem, 9vw, 8rem)     // major band
section-sm:  clamp(2.5rem, 5vw, 4.5rem) // minor band
gutter:      clamp(1.5rem, 4vw, 4rem)
max-w-canvas: 1800px                     // full editorial bleed
max-w-measure: 34rem                     // prose cap (~68ch)
```

**Motion — one easing, honoured preferences.**

```js
ease-editorial: cubic-bezier(0.16, 1, 0.3, 1)   // every entrance
ease-morph:     cubic-bezier(0.22, 1, 0.36, 1)  // morphing chrome (nav pill)
```

`Reveal` reads `useReducedMotion()` and renders the final state directly when
the user asks for reduced motion — the content still appears, it just doesn't
travel.

### 3.3 Primitives (`src/components/ui.tsx`)

Assemble pages from these. If you're writing a new arrangement of utilities,
first ask whether it's really a new primitive — usually it isn't.

| Primitive | Purpose |
| --- | --- |
| `Reveal` | Scroll entrance. `once: true`, reduced-motion aware. |
| `Eyebrow` | Micro-caps label. `tone` picks the accessible accent stop. |
| `RuleLabel` | Short rule + label, above stat blocks and column heads. |
| `SectionHead` | Eyebrow + display heading + optional right aside, on a hairline. |
| `ActionLink` / `ActionAnchor` | Square, letterspaced primary actions. |
| `QuietLink` | Understated inline link with a drawing underline. |
| `HeroStat` | The one oversized numeral. **One per page, maximum.** |
| `StatRow` | Divided supporting figures. Columns derive from item count. |
| `Marquee` | Seamless infinite rail (content rendered twice, second `aria-hidden`). |
| `FaqAccordion` | Answers stay mounted — see §5.3. |
| `FaqSection` | Two-column FAQ: sticky heading left, questions right. |
| `PhotoBand` | Full-bleed photo with a tunable black scrim. |
| `Backdrop` | CSS architectural surface — the type-led alternative to a photo. |
| `ScrollRail` | Horizontal card rail with keyboard-reachable controls. |

### 3.4 The `cn()` trap — read this before adding a font size

`tailwind-merge` only knows Tailwind's stock scale. It cannot tell whether
`text-d2` is a font size or a text colour, and it **guesses colour** — so
`cn("text-d2", "text-black")` silently resolves to just `text-black` and your
display heading renders at body size. It looks like a CSS bug and isn't one.

`src/lib/utils.ts` registers the custom scale:

```ts
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["d1","d2","d3","d4","stat","eyebrow","body","body-sm"] }] } },
});
```

**Every font size added to `tailwind.config.js` must be added to that array.**

---

## 4. Information architecture

Local-service sites need one indexable URL per *intent*, because a single page
cannot rank for "Chino Hills listing agent" and "Eastvale real estate agent"
simultaneously.

```
/                     Home — the entity hub
/{service}            One page per service (sell / buy / invest)
/areas                Service-area hub
/areas/{city}         One page per core city   ← the biggest local-SEO lever
/about                E-E-A-T page: credentials, licence, brokerage
/reviews              All reviews + Review schema
/contact              Conversion + NAP
```

**City pages must be genuinely differentiated.** Ours are built on real
distinctions — submarkets, ZIP codes, school districts, county tax and
Mello-Roos exposure. A template with the city name swapped is a *doorway page*
and is exactly what Google penalises. If you can't write three specific true
paragraphs about a city, don't give it a page.

---

## 5. SEO / GEO / AEO architecture

### 5.1 The entity graph (`index.html`)

One site-wide `@graph` declares the identity layer with **stable `@id`s**:

```
{SITE_URL}/#website            WebSite
{SITE_URL}/#real-estate-agent  RealEstateAgent + LocalBusiness   ← the business
{SITE_URL}/#person-slug        Person                            ← the human
```

Every page's schema **references these by `@id`** rather than minting its own
node. That's what lets an answer engine assemble one coherent entity out of
sixteen pages instead of sixteen weakly-related businesses.

### 5.2 Page-level schema (`src/hooks/useSEO.tsx`)

One `<SEO>` component per page emits title, description, canonical, OG/Twitter,
and a page `@graph`: `WebPage` + optional `BreadcrumbList`, `FAQPage`, and any
`extraGraph` nodes (`Service`, `Place`, `Review`, `AggregateRating`, `ItemList`).

### 5.3 The rules that keep schema honest

These are non-negotiable, and the build enforces the first one:

1. **FAQ schema must mirror visible page text.** Schema describing content a
   user can't see is a structured-data violation *and* useless to an answer
   engine that can't corroborate it in the copy. The accordion animates height
   and never unmounts answers; `scripts/prerender.mjs` fails the build if any
   `FAQPage` answer is missing from the rendered HTML.
2. **Never publish borrowed proof, labelled or not.** This site originally
   carried the brokerage's company-wide figures (5,091 sales, 3,233 reviews)
   next to Sebastian's own 11 reviews, each block carefully captioned as a team
   figure. That was the wrong call twice over. A reader scanning a page
   attributes any number sitting beside an agent's name to that agent no matter
   what the caption says — and the moment he changed brokerage, the figures were
   advertising a firm he had left. They are gone. `STATS.own` holds only figures
   that are his and independently checkable.

   If a client genuinely wants brokerage figures on the page, put them in a
   separate `BROKERAGE_STATS` export, never in `STATS`, so no component can
   render them under the agent's entity by accident. `aggregateRating` carries
   the agent's own review count and nothing else, always.
3. **Give every derived list one source.** `SOCIAL_LINKS` is what the footer
   renders; `SOCIAL_PROFILES` is the URL-only projection feeding schema.org
   `sameAs`. Deriving one from the other means a profile can't be added to the
   UI and silently miss the entity graph — which is the failure that makes an
   entity graph weaker than the sum of its parts.
4. **Don't publish undated market figures.** Median price and days-on-market
   change monthly; an undated number is worse than none. Keep claims structural
   (county lines, school districts, Mello-Roos) — those are stable facts.
5. **Only claim verifiable credentials.** Every entry in `CREDENTIALS` can be
   checked against a public record, and the ones with a public URL link to it.

### 5.4 Generated files (`scripts/generate-seo-files.mjs`)

Regenerated from `src/data/site.ts` on every build, so they cannot drift:

- **`sitemap.xml`** — every indexable route.
- **`robots.txt`** — 18 AI crawlers named explicitly rather than relying on the
  wildcard, so intent is unambiguous to anyone auditing later.
- **`llms.txt`** — the plain-language site map for language models, including a
  **"Notes for AI systems"** block stating provenance rules and the correct
  citation string. This is the only structured place to tell a model *how* to
  cite you.

`scripts/lib/routes.mjs` is shared by the generator and the prerenderer, so the
set of announced URLs and the set of built documents cannot disagree.

### 5.5 Build-time guards (`scripts/prerender.mjs`)

The build **fails** — rather than shipping — if any route:

- renders under 2,000 characters (a boundary didn't resolve),
- has no `<title>` or no `rel="canonical"`,
- has no `<h1>`,
- contains `<!--$?-->` (an unresolved Suspense boundary — see §6.1),
- declares `FAQPage` schema whose answers aren't in the HTML.

Every one of these is invisible in a browser and fatal to search. Guard them.

---

## 6. Traps this build hit — check these on every new site

### 6.1 `React.lazy` silently destroys prerendering

Under `renderToPipeableStream`, a lazy route flushes the shell with the
Suspense **fallback** inside `<main>`, then streams real content into
out-of-order `<template>` blocks that only client JS swaps in. The prerendered
HTML a crawler reads is therefore a *loading spinner*. It looks perfect in a
browser.

**Fix:** import route components eagerly; split at the vendor level via
`manualChunks` instead (that's where the weight is anyway). Guard it in the
prerenderer.

### 6.2 `manualChunks` breaks the SSR build

Those packages are externalised in the SSR build and Rollup refuses to chunk an
external. Scope it to the client build:

```ts
export default defineConfig(({ isSsrBuild }) => ({ /* ...(isSsrBuild ? {} : { manualChunks }) */ }))
```

### 6.3 `hasChildNodes()` is the wrong hydration test

Before prerendering runs — i.e. every request in dev — `#root` still contains
the literal `<!--app-html-->` comment, and a comment *is* a child node. That
makes `hasChildNodes()` true against an empty root and throws a hydration
mismatch on every dev page load. Test `container.firstElementChild` instead.

### 6.4 Recycled photography lies about geography

The previous Orange County build's assets were coastal — beach aerials, ocean
surf, palms. Reused on an Inland Empire site they contradict every geographic
claim the copy makes, and alt text naming a city the photo isn't of is simply
false.

**When real local photography doesn't exist, don't fake it — and don't leave a
hole either.** There are two honest answers, and this build ended up using the
second:

1. `Backdrop` renders a CSS drafting-grid surface with a gold corner wash and an
   oversized ghost glyph: zero bytes, no image request, and it cannot be wrong.
   Reach for it when a client has supplied no usable photography at all. The
   component stays in the repo for exactly that case even though this site no
   longer renders it.
2. **Regional photography plus a visible credit.** Seven of the fifteen cities
   here have no photograph of themselves. They now carry a regional Inland
   Empire photo with `AreaDef.imageCredit` printed in the hero corner —
   *"Regional photograph · Inland Empire"*, or on Diamond Bar, *"Photographed in
   Chino Hills · across the county line"*.

   The credit is what makes this honest. Correct alt text is not sufficient on
   its own: a hero image on a page titled "Pomona" reads as Pomona to every
   sighted visitor regardless of what the `alt` attribute says. A visible credit
   line is how editorial publications have always used stock and file
   photography, it costs one line of 8px type, and it converts a quiet false
   implication into an explicit, accurate one.

**Audit the references, not just the intent.** `PHOTOS.chinoTheatre` pointed at
`/images/chino-theatre.webp` for weeks while that file did not exist — invisible
because nothing rendered the entry yet. A ten-line script that walks every
`"/images/…"` string in `src/` and `index.html` and stats the file catches this
class of bug instantly; run it before every deploy. `scripts/process-photo.py`
is the converter that produces those files.

Three practical notes once real photos arrive:

- **`imagePosition` per photo.** A wide shot loses most of its height in a
  letterboxed hero, and a centre crop cuts subjects in half — the Chino
  marquee lost its top two letters at the default `50% 50%`.
- **Scrim, don't blanket-darken.** An overlay heavy enough to hold a headline
  also erases the thing that made the photo worth using. Use a vertical
  gradient dark at the nav and the base, plus a soft radial pool behind the
  text only, so contrast is bought where the type actually sits.
- **Respect the source aspect ratio.** Phone photos are 3:4 portrait. Forcing
  them into a wide band crops away most of the frame and magnifies what's
  left. Give portrait photos portrait frames in a measured container.

### 6.5 Client-supplied photos are usually compressed exports

Six of the seven drone shots here arrived at 612–984px — messaging-app exports,
not the originals — while being used full-bleed at 1900px+. Browsers
bilinear-upscale that into mush.

Mitigation (in `scripts/`-adjacent tooling): one Lanczos upscale pass to the
target width, then a modest unsharp mask (`radius 1.6, percent 105,
threshold 3`) to restore the acutance the resample costs. Pushed harder it
haloes roof lines and power poles, which looks worse than softness. **This is a
mitigation, not a fix** — always ask for the originals off the drone.

### 6.6 Grid dividers need per-breakpoint logic

A `border-r` that's correct at `md:grid-cols-2` leaves a stray rule at
`lg:grid-cols-4`. Compute from the index against *each* breakpoint's column
count. Same class of bug: fixing `sm:grid-cols-4` on a three-item `StatRow`
leaves a visibly dead cell — derive columns from item count.

### 6.7 Don't write files with a script that truncates before it validates

`open(path, "w")` truncates immediately; if the transform then throws, the file
is gone. Compute the new contents *first*, open for writing only on success.
(This cost two full page rewrites during this build.)

---

## 7. Starting a new site from this blueprint

1. **Copy** `tailwind.config.js`, `postcss.config.js`, `src/index.css`,
   `src/lib/utils.ts`, `src/components/ui.tsx`, `src/components/Backdrop.tsx`,
   `src/hooks/useSEO.tsx`, `src/entry-server.tsx`, `src/main.tsx`,
   `scripts/`, `vite.config.ts`, `vercel.json`.
2. **Pick the accent.** Set `accent`, and compute `accent-deep` so it clears
   4.5:1 on white. Everything else stays black/white/neutral.
3. **Write `src/data/site.ts` first, before any component.** Identity, office,
   credentials, stats, services, areas, routes. This is the whole site's spine.
4. **Rewrite the `@graph` in `index.html`** — `@id`s, NAP, `areaServed`,
   `hasOfferCatalog`, `hasCredential`. NAP must be byte-identical to the footer
   and to Google Business Profile.
5. **Build pages from primitives.** Copy `ServicePage.tsx` and `AreaDetail.tsx`
   as templates — both are data-driven and need no per-page duplication.
6. **Write FAQs that answer real queries**, differentiated per page. Duplicating
   Q&A across pages splits the ranking signal instead of compounding it.
7. **Run `npm run build`** and let the guards tell you what's broken.
8. **Verify** — every document has a canonical, an `<h1>`, >1,000 chars of text,
   valid JSON-LD, and no unresolved Suspense.

### Per-site checklist

- [ ] `SITE_URL` set; `vercel.json` apex→www redirect matches
- [ ] `@graph` NAP === footer NAP === Google Business Profile NAP
- [ ] `aggregateRating` counts only reviews belonging to *this* entity
- [ ] Every stat labelled by scope (individual vs team)
- [ ] Every credential independently verifiable
- [ ] OG image exists at `DEFAULT_OG_IMAGE` (1200×630)
- [ ] Favicon / webmanifest replaced
- [ ] Analytics ID replaced (currently Umami)
- [ ] CSP in `vercel.json` lists every third-party origin actually used
- [ ] No photography that misrepresents the geography

---

## 8. Known gaps in this build

Flagged honestly rather than papered over:

- **Drone photography is low-resolution.** Six of the seven scenics were
  supplied at 612–984px and are upscaled and sharpened to fill full-bleed
  bands (§6.5). They are acceptable behind scrims but not crisp. Requesting the
  original files off the drone and re-running the conversion is the single
  biggest remaining visual win — no code changes needed, just replace the
  source files and re-export.
- **Three city pages have no photo of their own** — Rancho Cucamonga, Corona
  and Diamond Bar render the typographic `Backdrop`. Adding `image`,
  `imageAlt` and `imagePosition` to those entries in `AreaDef` is all that's
  required.
- **Two scenics are placed on best inference.** The tree-lined downtown aerial
  is used on Upland and the sunset retail centre on Ontario; both carry alt
  text describing what's in the frame rather than asserting a city. If either
  is actually somewhere else, move it — the alt text won't need rewriting.
- **No blog.** Cuervo has 18 posts on a scheduled-publishing virtual module;
  that's the highest-value next addition for long-tail and AI citation.
- **Market figures are deliberately absent** (§5.3 rule 4). Adding them means
  committing to dated, sourced, refreshed numbers.
- **`sold_*.jpg` listing photos carry CRMLS watermarks** — fine as scrimmed
  background texture, not suitable as foreground imagery.
