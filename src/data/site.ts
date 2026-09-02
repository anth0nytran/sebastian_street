/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Every fact that appears on the site, in schema.org markup, in llms.txt, or
 * in the sitemap resolves back to this file. Nothing here is duplicated in a
 * component. When a fact changes, it changes once.
 *
 * scripts/generate-seo-files.mjs imports from here too, so the sitemap and
 * llms.txt can never drift out of sync with the pages that actually exist.
 */

/* ---------------------------------------------------------------- IDENTITY */

export const SITE_URL = "https://www.diamondstreetrealty.com";

export const AGENT = {
    name: "Sebastian Street",
    firstName: "Sebastian",
    title: "REALTOR®",
    dre: "02208742",
    brokerage: "eHomes",
    tagline: "Buy. Sell. Invest.",
    phone: "(626) 632-2559",
    phoneHref: "tel:+16266322559",
    phoneE164: "+1-626-632-2559",
    email: "sebastian@diamondstreetrealty.com",
    headshot: "/images/sebastian-street.webp",
    hours: { opens: "08:00", closes: "20:00", label: "8:00 AM – 8:00 PM daily" },
} as const;

export const OFFICE = {
    street: "11760 Central Ave Suite 125",
    locality: "Chino",
    region: "CA",
    postalCode: "91710",
    country: "US",
    lat: 34.0122,
    lng: -117.6889,
} as const;

/** The market centroid the site optimizes for — Chino Hills, not the office. */
export const PRIMARY_MARKET = {
    city: "Chino Hills",
    region: "Greater Inland Empire",
    lat: 33.9898,
    lng: -117.7326,
} as const;

export const LINKS = {
    zillow: "https://www.zillow.com/profile/sebastianstreetrlty",
    instagram: "https://www.instagram.com/sebastian_street_chinorealtor/",
    youtube: "https://www.youtube.com/@SebastianStreetChinoRealtor",
    tiktok: "https://www.tiktok.com/@sebtherealtor",
    facebook: "https://www.facebook.com/sebastian.street.92798/",
    x: "https://x.com/ChinorealtorSeb",
    linkedin: "https://www.linkedin.com/in/sebastian-street-665259238/",
    bookCall: "https://calendly.com/sebastian-diamondstreetrealty/new-meeting",
    calhfa: "https://ehomesteam.hifello.com/p/sebastian-street/69725caeffc24c58215993e6",
    calhfaOfficial: "https://www.calhfa.ca.gov/dream/",
} as const;

/**
 * Every public profile that belongs to Sebastian, ordered by how much weight it
 * carries as an identity signal. SOCIAL_LINKS is what the UI renders and
 * SOCIAL_PROFILES is the URL-only projection that feeds schema.org `sameAs` on
 * both the Person and the LocalBusiness node.
 *
 * They are derived from one list on purpose: an entity graph is only as strong
 * as the corroborating profiles it points at, and the failure mode is a profile
 * that gets added to the footer and silently never reaches the graph.
 */
export const SOCIAL_LINKS = [
    { label: "Zillow", href: LINKS.zillow },
    { label: "Instagram", href: LINKS.instagram },
    { label: "YouTube", href: LINKS.youtube },
    { label: "TikTok", href: LINKS.tiktok },
    { label: "Facebook", href: LINKS.facebook },
    { label: "X", href: LINKS.x },
    { label: "LinkedIn", href: LINKS.linkedin },
] as const;

export const SOCIAL_PROFILES: readonly string[] = SOCIAL_LINKS.map((s) => s.href);

/* ------------------------------------------------------------- IMAGERY */

/**
 * Named scenics, so a photo is chosen by what it depicts rather than by a
 * filename guessed at the call site. Every `alt` describes what is actually in
 * the frame — these are the client's own Inland Empire photographs, and the
 * whole point of replacing the previous stock library was to stop captioning
 * one place as another.
 */
export const PHOTOS = {
    chinoHillsAerial: {
        src: "/images/chino-hills-aerial.webp",
        alt: "Aerial view over hillside homes in Chino Hills, California, with the snow-capped San Gabriel Mountains beyond",
    },
    ranchland: {
        src: "/images/chino-hills-ranchland.webp",
        alt: "Cattle grazing beneath oak trees on a green hillside at golden hour in the Chino Hills",
    },
    golf: {
        src: "/images/chino-hills-golf.webp",
        alt: "Aerial view over the Los Serranos golf course and the rolling hills of Chino Hills",
    },
    newHomes: {
        src: "/images/new-homes-street.webp",
        alt: "A street of newer two-storey homes with solar panels, mountains in the distance",
    },
    retailSunset: {
        src: "/images/retail-sunset.webp",
        alt: "Aerial view of an Inland Empire retail centre at sunset",
    },
    chinoTheatre: {
        src: "/images/chino-theatre.webp",
        alt: "The historic CHINO theatre marquee in downtown Chino, California",
    },
    chinoHills: {
        src: "/images/city-chino-hills.webp",
        alt: "Aerial view over hillside homes in Chino Hills, California, with snow-capped mountains beyond",
    },
    riverside: {
        src: "/images/city-riverside.webp",
        alt: "Aerial view over downtown Riverside, California, with Box Springs Mountain beyond",
    },
    ranchoCucamonga: {
        src: "/images/city-rancho-cucamonga.webp",
        alt: "Victoria Gardens in Rancho Cucamonga, California, with the San Gabriel Mountains behind",
    },
    fontana: {
        src: "/images/city-fontana.webp",
        alt: "Aerial view of a retail centre in Fontana, California, at dusk with the foothills behind",
    },
    sanBernardino: {
        src: "/images/city-san-bernardino.webp",
        alt: "Wide aerial view over San Bernardino, California, with the San Bernardino Mountains beyond",
    },
    corona: {
        src: "/images/city-corona.webp",
        alt: "Hillside homes in Corona, California, below the Santa Ana Mountains",
    },
    /** Full-frame studio portrait, for the About hero. */
    portrait: {
        src: "/images/sebastian-street-portrait.webp",
        alt: "Studio portrait of Sebastian Street, REALTOR®",
    },
    riversideDowntown: {
        src: "/images/city-riverside.webp",
        alt: "Aerial view over downtown Riverside, California, with Box Springs Mountain beyond",
    },
} as const;

/**
 * Photographs of Sebastian with clients at their homes.
 *
 * Deliberately kept separate from the review text: these are real people, and
 * pairing a face with the wrong quote would be a misattribution. They are shown
 * as documentary proof of the work, captioned generically, not as portraits of
 * the named reviewers.
 */
export const CLIENT_PHOTOS = [
    {
        src: "/images/testimonial-street-family.webp",
        alt: "Sebastian Street with clients outside their home after closing",
        caption: "Keys handed over — a family at their new home",
    },
    {
        src: "/images/testimonial-doorway-family.webp",
        alt: "Sebastian Street with a family and their children at the front door of their new home",
        caption: "Welcome home — a family at their front door on closing day",
    },
] as const;

/* ------------------------------------------------------------ VALUE STACK */

/**
 * Credentials shown in the trust bar and rendered into Person schema.
 * Every entry is independently verifiable. If a credential can't be pointed at
 * a public record, it does not belong here — unverifiable claims are the
 * fastest way to lose an AI-search citation.
 */
export interface Credential {
    label: string;
    value: string;
    detail: string;
    /** Present only where the claim can be checked against a public record. */
    href?: string;
}

export const CREDENTIALS: Credential[] = [
    {
        label: "Licensed REALTOR®",
        value: `CA DRE #${AGENT.dre}`,
        detail: "California Department of Real Estate",
        href: "https://www2.dre.ca.gov/PublicASP/pplinfo.asp",
    },
    {
        label: "Brokerage",
        value: "eHomes",
        detail: "Full-service Southern California brokerage",
    },
    {
        label: "Zillow Reviews",
        value: "5.0 stars across 11 reviews",
        detail: "Every review from a client he represented",
        href: LINKS.zillow,
    },
    {
        label: "CalHFA Dream For All",
        value: "Approved originating partner",
        detail: "Shared-appreciation down payment assistance",
        href: LINKS.calhfa,
    },
    {
        label: "Representation",
        value: "Buyers & Sellers",
        detail: "Purchase-side and listing-side transactions",
    },
    {
        label: "Tri-County Coverage",
        value: "San Bernardino · Riverside · LA",
        detail: "The full Inland Empire border",
    },
];

/**
 * Production numbers. `scope` is doing real work: conflating personal and team
 * production is the most common credibility failure on agent sites, and an AI
 * answer engine that catches it will not cite the site again. Label it.
 */
/**
 * Every number here is Sebastian's own and independently checkable -- his Zillow
 * profile for the reviews, SALES below for the closings and the price range.
 *
 * There is deliberately no brokerage-wide figure in this object. Borrowed
 * production numbers are the quietest way an individual agent's site becomes
 * false: the moment he changes brokerage, a five-figure sales count that was
 * never his is advertising someone else's business under his name. If eHomes
 * publishes verified company-wide figures later they belong in a separate
 * BROKERAGE_STATS export, so that nothing can render them under his entity by
 * accident.
 */
export const STATS = {
    own: [
        { value: "11", label: "Five-Star Reviews" },
        { value: "5.0", label: "Average Rating" },
        { value: "7", label: "Closings Represented" },
        { value: "$245K–$865K", label: "Closed Price Range" },
    ],
    /** Sebastian's own verified reviews -- this is what aggregateRating uses. */
    reviewCount: 11,
    rating: "5.0",
} as const;

/* ---------------------------------------------------------------- SERVICES */

export interface ServiceDef {
    slug: "buy" | "sell" | "invest";
    name: string;
    /** The h1, in two lines. Line two renders in the accent treatment. */
    headline: [string, string];
    /** One-sentence promise. Doubles as the schema.org Service description. */
    promise: string;
    eyebrow: string;
    metaTitle: string;
    metaDescription: string;
    /** Three concrete deliverables — things Sebastian does, not adjectives. */
    pillars: { title: string; body: string }[];
    steps: { title: string; body: string }[];
    cta: { label: string; intent: string };
    /** Rendered visibly AND as FAQPage schema. The two must never diverge. */
    faqs: { q: string; a: string }[];
}

export const SERVICES: ServiceDef[] = [
    {
        slug: "sell",
        name: "Sell",
        headline: ["Sell for what your", "home is actually worth."],
        promise:
            "Full-service listing representation across Chino Hills and the Inland Empire — pricing built from closed sales on your street, professional preparation, and negotiation that protects your equity through close.",
        eyebrow: "Listing Representation",
        metaTitle: "Sell Your Chino Hills Home — Listing Agent",
        metaDescription:
            "Chino Hills & Inland Empire listing agent Sebastian Street prices from closed comps on your street, manages prep and photography, and negotiates to protect your equity. Free written home valuation in 24 hours.",
        pillars: [
            {
                title: "Priced from your street, not a ZIP code",
                body: "An automated estimate averages an entire ZIP. Chino Hills alone spans Los Serranos to Vellano inside 91709 — a spread of hundreds of thousands of dollars in the same five digits. Your analysis is built from closed sales that share your tract, your view, your lot orientation, and your HOA.",
            },
            {
                title: "Prep managed, not just suggested",
                body: "Most listing agents hand you a punch list and disappear. Sebastian coordinates the photographer, the stager, and the small-repair vendors, and sequences them so the listing goes live once — at full strength — instead of relaunching three weeks later at a lower price.",
            },
            {
                title: "Negotiated through close, not just to offer",
                body: "The offer price is the headline. Repair credits, appraisal gaps, and contingency releases are where the money actually moves. Every post-acceptance request is negotiated against your net proceeds, not against the urge to keep the deal quiet.",
            },
        ],
        steps: [
            { title: "Valuation & Strategy", body: "A walkthrough, a closed-comp analysis, and a straight answer on what your home will realistically sell for — plus which improvements would and wouldn't return their cost." },
            { title: "Prepare & Stage", body: "Photography, staging guidance, and vendor coordination scheduled backwards from your launch date so nothing slips." },
            { title: "Launch & Show", body: "Syndication across the MLS, Zillow, Realtor.com and Redfin, paid social to Inland Empire buyer audiences, and every showing personally handled." },
            { title: "Negotiate & Close", body: "Offer review against your net sheet, repair-request negotiation, appraisal management, and escrow coordination through to the recorded deed." },
        ],
        cta: { label: "Get Your Free Home Valuation", intent: "sell" },
        faqs: [
            {
                q: "What is my Chino Hills home worth right now?",
                a: "The honest answer requires closed comparable sales from your specific tract, not a ZIP-code average. Chino Hills spans everything from Los Serranos condominiums to custom Vellano estates inside the same 91709 ZIP, so automated valuation tools routinely miss by six figures in both directions. Sebastian Street prepares a free written valuation from closed sales matched to your tract, lot, view and HOA, delivered within 24 hours.",
            },
            {
                q: "How long does it take to sell a house in Chino Hills?",
                a: "Time on market depends far more on pricing accuracy at launch than on the season. Homes priced to closed comparable sales typically go into escrow substantially faster than homes priced to an owner's expectation and later reduced, because the first two weeks of listing exposure are the highest-traffic window a property will ever receive. A price correction made after that window has closed almost always nets less than pricing correctly on day one.",
            },
            {
                q: "What does it cost to sell a home in California?",
                a: "Seller costs in California generally include the listing brokerage fee, any buyer-broker compensation you agree to offer, county transfer tax, escrow and title fees, a natural hazard disclosure report, and any repair credits negotiated after inspection. Sebastian provides a written net-proceeds sheet before you list, so you see your estimated take-home at several price points rather than discovering the number at closing.",
            },
            {
                q: "Should I make repairs before listing my home?",
                a: "Some repairs return more than they cost and some do not, and the split is specific to your home and price band. Paint, landscaping, flooring, and anything a buyer's inspector will flag as deferred maintenance generally return well. Full kitchen and bathroom remodels undertaken immediately before a sale usually do not return their cost. Sebastian walks the property and identifies which items to do and which to leave alone.",
            },
            {
                q: "Do you sell homes outside Chino Hills?",
                a: "Yes. Listing coverage spans the Inland Empire and the neighboring county lines — Chino, Ontario, Rancho Cucamonga, Upland, Montclair and Fontana in San Bernardino County; Eastvale and Corona in Riverside County; and Diamond Bar, Pomona, Claremont and the eastern San Gabriel Valley in Los Angeles County.",
            },
        ],
    },
    {
        slug: "buy",
        name: "Buy",
        headline: ["Buy in the Inland Empire", "without overpaying."],
        promise:
            "Buyer representation across Chino Hills, Chino, Rancho Cucamonga, Corona, Riverside and San Bernardino — including first-time buyer guidance and CalHFA Dream For All down payment assistance.",
        eyebrow: "Buyer Representation",
        metaTitle: "Buy a Home in Chino Hills & the Inland Empire",
        metaDescription:
            "Buyer's agent for Chino Hills, Chino, Rancho Cucamonga, Corona, Riverside & San Bernardino. First-time buyer guidance, CalHFA Dream For All down payment assistance, and offers structured to win without overpaying.",
        pillars: [
            {
                title: "Down payment assistance, actually applied",
                body: "Sebastian is an approved originating partner for CalHFA Dream For All, California's shared-appreciation down payment assistance program. Most buyers who qualify never hear about it, because most agents don't originate it. If you qualify, it changes what you can afford — before you start touring.",
            },
            {
                title: "Tri-county fluency the county line demands",
                body: "Chino Hills, Eastvale and Diamond Bar sit within minutes of each other across three different counties. Property tax rates, Mello-Roos exposure, school district boundaries and permit history all change at those lines. Shopping across them without knowing that is expensive.",
            },
            {
                title: "Offers written to win, not just to submit",
                body: "In a multiple-offer situation, price is one of six or seven levers. Contingency timelines, appraisal-gap language, deposit size and close date frequently move a seller more than another five thousand dollars. Every offer is structured against what that specific seller has signaled they want.",
            },
        ],
        steps: [
            { title: "Consultation & Financing", body: "Define budget, must-haves and target cities — then secure a real pre-approval and confirm CalHFA Dream For All eligibility before touring anything." },
            { title: "Tour & Shortlist", body: "Curated showings across the Inland Empire with honest assessments of resale risk, HOA and Mello-Roos exposure, and true cost to hold." },
            { title: "Offer & Negotiate", body: "Comparable-backed offer pricing and a structure built for the specific seller, followed by counter-negotiation on price, credits and terms." },
            { title: "Inspect & Close", body: "Inspection coordination, repair-request negotiation, appraisal management, and escrow oversight through to keys in hand." },
        ],
        cta: { label: "Start Your Home Search", intent: "buy" },
        faqs: [
            {
                q: "How much do I need for a down payment in the Inland Empire?",
                a: "Less than most buyers assume. Conventional loans start at 3% down for qualified first-time buyers, FHA at 3.5%, and VA loans require no down payment for eligible service members and veterans. California's CalHFA Dream For All program can additionally cover a substantial share of the down payment as a shared-appreciation loan. Sebastian Street is an approved originating partner for Dream For All and will confirm your eligibility before you begin touring homes.",
            },
            {
                q: "What is CalHFA Dream For All and do I qualify?",
                a: "CalHFA Dream For All is a California Housing Finance Agency program providing down payment assistance to first-time buyers as a shared-appreciation loan — you repay the original assistance plus a share of your home's appreciation when you sell or refinance, rather than making monthly payments on it. Eligibility depends on county income limits, first-time buyer status, and program funding availability, which is allocated periodically. Sebastian can check your eligibility directly.",
            },
            {
                q: "Is Chino Hills or Eastvale better for a first home?",
                a: "They solve different problems. Chino Hills is in San Bernardino County, served by Chino Valley Unified, has a largely established housing stock, and generally carries lower Mello-Roos exposure because much of it was built before the heaviest Community Facilities District era. Eastvale is in Riverside County, served by Corona-Norco Unified, is dominated by newer large-floorplan construction, and frequently carries meaningful Mello-Roos assessments that raise the effective monthly cost above what the listing price suggests. The right answer depends on whether square footage or carrying cost matters more to you.",
            },
            {
                q: "Do buyers pay their agent's commission in California?",
                a: "Since the 2024 NAR settlement changes, buyer-broker compensation is negotiated and disclosed rather than assumed. In California you sign a written buyer representation agreement specifying your agent's compensation before touring homes. That compensation may still be offered by the seller, paid by you, or split between both — it is a negotiated term of the transaction. Sebastian walks through exactly how it will work in your deal before you sign anything.",
            },
            {
                q: "What are Mello-Roos fees and which Inland Empire cities have them?",
                a: "Mello-Roos is a special tax levied by a Community Facilities District to fund infrastructure such as roads, schools and parks in newer developments, charged on top of your regular property tax. It is most common in newer master-planned areas, which in this region means large parts of Eastvale, newer Corona tracts, and the Etiwanda area of Rancho Cucamonga. Older Chino Hills, Upland and Claremont neighborhoods generally carry little or none. It can add hundreds of dollars per month, so it belongs in your affordability math rather than surfacing at disclosure.",
            },
        ],
    },
    {
        slug: "invest",
        name: "Invest",
        headline: ["Buy Inland Empire property", "that actually pencils."],
        promise:
            "Investment property representation across the Inland Empire — rental and multi-unit acquisition underwritten on real carrying costs, plus 1031 exchange and portfolio disposition support.",
        eyebrow: "Investment Advisory",
        metaTitle: "Inland Empire Investment Property Agent",
        metaDescription:
            "Investment real estate representation across the Inland Empire. Rental and multi-unit acquisition underwritten on real carrying costs — reassessed tax basis, Mello-Roos, HOA, vacancy — plus 1031 exchange support.",
        pillars: [
            {
                title: "Underwritten on carrying cost, not list price",
                body: "A property that looks like it cashflows on purchase price alone frequently doesn't once the full stack loads: property tax at the reassessed basis, Mello-Roos where it applies, HOA, insurance at current California rates, vacancy, and a real maintenance reserve. Every candidate gets modeled that way before you write.",
            },
            {
                title: "Positioned for where demand is going",
                body: "Inland Empire rental demand is driven by logistics employment, the Ontario airport corridor, and households priced out of Orange and Los Angeles counties moving east. Those forces don't lift every city evenly. Acquisition targets are chosen against that map, not against whatever happens to be listed.",
            },
            {
                title: "1031 exchange and disposition timing",
                body: "Selling an appreciated rental without a plan surfaces a capital gains bill and depreciation recapture on top of it. Sebastian coordinates with your qualified intermediary and CPA on 1031 timelines, sequencing the sale and replacement identification so the exchange window doesn't force a bad purchase.",
            },
        ],
        steps: [
            { title: "Define the Thesis", body: "Cashflow, appreciation, or hold-and-refinance — plus real risk tolerance, timeline, and whether you intend to self-manage." },
            { title: "Underwrite Targets", body: "Full carrying-cost modeling on every candidate: reassessed tax basis, Mello-Roos, HOA, insurance, vacancy assumption and maintenance reserve." },
            { title: "Acquire", body: "Offer structuring, due diligence on rent rolls and leases where units are occupied, and inspection scoped to a landlord's risk rather than an owner-occupant's." },
            { title: "Hold or Exchange", body: "Ongoing market positioning, and when it's time to exit, 1031 exchange coordination with your qualified intermediary and CPA." },
        ],
        cta: { label: "Discuss an Investment Strategy", intent: "invest" },
        faqs: [
            {
                q: "Is the Inland Empire a good place to buy a rental property?",
                a: "Inland Empire rental demand rests on three structural drivers: a very large logistics and warehousing employment base concentrated around Ontario and Fontana, the Ontario International Airport corridor, and sustained migration of households priced out of Orange and Los Angeles counties. Entry prices remain materially below coastal Southern California while rents are supported by that demand. Whether a specific property is a good investment still depends entirely on its individual carrying costs, which is why each one should be underwritten separately rather than assumed from a market average.",
            },
            {
                q: "What should I include when calculating cash flow on an Inland Empire rental?",
                a: "At minimum: the mortgage payment, property tax calculated at your reassessed purchase basis rather than the seller's existing basis, any Mello-Roos special assessment, HOA dues, California landlord insurance at current rates, a vacancy allowance, a maintenance reserve, and property management if you will not self-manage. The two line items most often omitted are the reassessed tax basis, which can be substantially higher than what the seller currently pays, and Mello-Roos, which is common in newer Eastvale, Corona and Etiwanda tracts.",
            },
            {
                q: "Can I do a 1031 exchange on an Inland Empire investment property?",
                a: "Yes, provided the property is held for investment or productive use in a trade or business and you follow IRS timelines: 45 calendar days from the sale closing to formally identify replacement property, and 180 calendar days to close on it. Funds must pass through a qualified intermediary and never touch your account. Sebastian coordinates the acquisition side against those deadlines and works alongside your CPA and intermediary so the identification window doesn't force a poor replacement purchase.",
            },
            {
                q: "Should I buy a single-family rental or a small multi-unit property?",
                a: "Single-family rentals in the Inland Empire generally attract longer-tenancy family renters, are simpler to finance, and can eventually be sold to an owner-occupant, but produce thinner cash flow relative to price. Small multi-unit properties typically produce stronger gross yield and spread vacancy risk across units, but face a narrower buyer pool at exit and require commercial or portfolio financing above four units. The right choice depends on whether your thesis is appreciation and simplicity, or current yield.",
            },
        ],
    },
];

/* ------------------------------------------------------------------- AREAS */

export interface AreaDef {
    slug: string;
    name: string;
    county: "San Bernardino" | "Riverside" | "Los Angeles";
    zips: string[];
    schools: string;
    blurb: string;
    buyerNote: string;
    sellerNote: string;
    submarkets: string[];
    /**
     * Local photography, where genuine local photography exists.
     *
     * Optional on purpose. The previous Orange County build shipped coastal
     * stock, and captioning an ocean as "Eastvale" is both false and corrosive
     * to the geographic claim every one of these pages makes. A city without a
     * real photo of itself renders the typographic <Backdrop> instead — which
     * says nothing untrue — rather than borrowing a neighbouring city's.
     *
     * `imageAlt` must describe what is actually in the frame. If you can't
     * write an honest caption, the photo belongs to a different page.
     */
    image?: string;
    imageAlt?: string;
    /**
     * CSS object-position for the hero crop. A wide photo loses a lot of height
     * in a letterboxed hero, and the default centre crop can cut the subject in
     * half — the Chino marquee loses its top two letters at "50% 50%".
     */
    imagePosition?: string;
    /** Featured cities get a dedicated, prerendered landing page. */
    featured: boolean;
}

export const AREAS: AreaDef[] = [
    {
        slug: "chino-hills",
        name: "Chino Hills",
        county: "San Bernardino",
        zips: ["91709"],
        schools: "Chino Valley Unified School District",
        blurb:
            "Chino Hills is the anchor of this practice — a hillside San Bernardino County city that behaves far more like north Orange County than like the valley floor below it. Inside a single ZIP code it holds everything from Los Serranos condominiums to custom Vellano estates, which is precisely why automated valuation tools handle it so badly.",
        buyerNote:
            "Buyers come to Chino Hills for Chino Valley Unified, the hillside topography, and a commute that reaches Orange County via the 71 and 91 without paying Orange County prices. The tradeoff is limited new inventory — the city is largely built out, so competition concentrates on a small number of resale listings.",
        sellerNote:
            "The single largest pricing error in Chino Hills is comping across the whole 91709 ZIP. Vellano, Payne Ranch, Butterfield Ranch, Rolling Ridge and Los Serranos are separate markets with separate buyers. A valuation that doesn't respect those boundaries is guessing.",
        submarkets: ["Vellano", "Payne Ranch", "Butterfield Ranch", "Rolling Ridge", "Los Serranos", "Carbon Canyon"],
        image: "/images/city-chino-hills.webp",
        imageAlt:
            "Aerial view over hillside homes in Chino Hills, California, with snow-capped mountains and green hills beyond",
        featured: true,
    },
    {
        slug: "chino",
        name: "Chino",
        county: "San Bernardino",
        zips: ["91708", "91710"],
        schools: "Chino Valley Unified School District",
        blurb:
            "Chino is where this practice is based — the office sits on Central Avenue. The city splits cleanly between established older Chino and The Preserve in 91708, a large master-planned development whose newer construction carries a very different cost and tax profile.",
        buyerNote:
            "Chino offers meaningfully more square footage per dollar than Chino Hills next door while staying inside the same school district. Buyers looking at The Preserve should model Mello-Roos into the monthly payment before comparing it against an older Chino home that carries none.",
        sellerNote:
            "Older Chino and The Preserve draw different buyers with different financing. Marketing a 1970s single-story to a Preserve audience — or the reverse — wastes the first two weeks of exposure, which is the only window that really matters.",
        submarkets: ["The Preserve", "College Park", "Old Chino", "Monte Vista"],
        image: "/images/city-chino.webp",
        imageAlt:
            "Aerial view over downtown Chino, California, with jacarandas in bloom along a tree-lined street",
        imagePosition: "50% 56%",
        featured: true,
    },
    {
        slug: "rancho-cucamonga",
        name: "Rancho Cucamonga",
        county: "San Bernardino",
        zips: ["91701", "91730", "91737", "91739"],
        schools: "Alta Loma · Central · Etiwanda SD · Chaffey Joint Union HSD",
        blurb:
            "Rancho Cucamonga carries the strongest school reputation on the San Bernardino County side of the Inland Empire, and its market is genuinely three markets: Alta Loma in the north foothills, central Rancho around Victoria Gardens, and Etiwanda to the east.",
        buyerNote:
            "Buyers here are usually paying a premium specifically for Etiwanda or Alta Loma school attendance, and those boundaries do not follow the ZIP codes. Verify the actual attendance area before writing an offer — the price difference across a boundary line can be substantial.",
        sellerNote:
            "If your home sits inside a sought-after attendance area, that fact belongs in the first line of the listing rather than buried in the remarks. It is the strongest single demand driver in this city.",
        submarkets: ["Alta Loma", "Etiwanda", "Victoria Gardens", "Terra Vista", "Haven View Estates"],
        image: "/images/city-rancho-cucamonga.webp",
        imageAlt:
            "Victoria Gardens in Rancho Cucamonga, California, with palm trees and the San Gabriel Mountains behind",
        featured: true,
    },
    {
        slug: "corona",
        name: "Corona",
        county: "Riverside",
        zips: ["92879", "92880", "92881", "92882", "92883"],
        schools: "Corona-Norco Unified School District",
        blurb:
            "Corona spans the 91 corridor from the Orange County line east into Riverside County, which makes it the region's primary commuter market. Its five ZIP codes cover markets as different as older downtown Corona and the newer South Corona hillside tracts.",
        buyerNote:
            "Corona's value proposition is 91 and Metrolink access toward Orange County at Riverside County prices. Weigh that commute honestly — and check Mello-Roos exposure in the newer South Corona and Eagle Glen tracts.",
        sellerNote:
            "Corona is large enough that comping requires discipline. A closed sale three miles away in a different ZIP is not a comparable sale, and pricing off one is the most common reason a Corona listing sits.",
        submarkets: ["South Corona", "Eagle Glen", "Sierra Del Oro", "Downtown Corona", "Dos Lagos"],
        image: "/images/city-corona.webp",
        imageAlt:
            "Hillside homes in Corona, California, below the Santa Ana Mountains and Cleveland National Forest",
        featured: true,
    },
    {
        slug: "riverside",
        name: "Riverside",
        county: "Riverside",
        zips: ["92501", "92503", "92504", "92505", "92506", "92507", "92508", "92509"],
        schools: "Riverside Unified · Alvord Unified School District",
        blurb:
            "Riverside is the county seat and the largest city in this footprint — home to UC Riverside, the Mission Inn, and a housing stock that runs from 1920s Wood Streets bungalows to 2000s Orangecrest tract homes. It is less one market than a dozen, separated by decades of construction rather than by distance.",
        buyerNote:
            "Decide first whether you're buying character or square footage, because Riverside offers both and they barely overlap. The Wood Streets and Victoria Avenue carry historic housing with the inspection realities that implies; Orangecrest, Woodcrest and Mission Grove are newer, larger and easier to finance. Note also that west Riverside falls under Alvord Unified rather than Riverside Unified.",
        sellerNote:
            "Riverside is the easiest city in this footprint to mis-comp, simply because it is so large and so varied. A 1925 bungalow near downtown and a 2004 two-storey in Orangecrest are not comparable sales no matter how close the price per square foot looks. Pricing has to stay inside the neighbourhood.",
        submarkets: ["Wood Streets", "Canyon Crest", "Orangecrest", "Woodcrest", "Victoria Avenue", "La Sierra", "Mission Grove"],
        image: "/images/city-riverside.webp",
        imageAlt:
            "Aerial view over downtown Riverside, California, with Box Springs Mountain in the distance",
        featured: true,
    },
    {
        slug: "san-bernardino",
        name: "San Bernardino",
        county: "San Bernardino",
        zips: ["92401", "92404", "92405", "92407", "92408", "92410", "92411"],
        schools: "San Bernardino City Unified School District",
        blurb:
            "San Bernardino is the county seat and sits at the junction of the 215, 210 and 10 — the crossroads of the entire Inland Empire. It also contains one of the sharpest internal divides in the region: north San Bernardino, in the foothills around Verdemont and Cal State, prices very differently from the central and southern parts of the city.",
        buyerNote:
            "Entry pricing here is among the most accessible anywhere in this footprint, which makes it a common first stop for buyers using FHA financing or CalHFA assistance. The north end around Verdemont and 92407 is newer, higher and distinctly its own market — worth understanding before you compare listings across the city on price alone.",
        sellerNote:
            "North versus central is the pricing distinction that matters most in San Bernardino, and it is worth more than almost any improvement you could make. Comping across that line in either direction produces a number the market will not support.",
        submarkets: ["Verdemont", "North San Bernardino", "Del Rosa", "Arrowhead Suburban Farms", "Downtown"],
        image: "/images/city-san-bernardino.webp",
        imageAlt:
            "Wide aerial view over San Bernardino, California, with the freeway corridor and the San Bernardino Mountains beyond",
        featured: true,
    },
    {
        slug: "moreno-valley",
        name: "Moreno Valley",
        county: "Riverside",
        zips: ["92551", "92553", "92555", "92557"],
        schools: "Moreno Valley Unified · Val Verde Unified School District",
        blurb:
            "Moreno Valley is one of the region's largest logistics-employment centres, anchored by March Air Reserve Base and the distribution corridor along the 60. Its housing is predominantly newer than the older Inland Empire cities to the west, and its eastern edge around Rancho Belago is newer still.",
        buyerNote:
            "Moreno Valley delivers large floorplans at prices well below the western Inland Empire, and the local employment base means you are not necessarily buying a long commute. Check Mello-Roos in the newer eastern tracts, and confirm whether an address falls under Moreno Valley Unified or Val Verde Unified — the boundary is not obvious.",
        sellerNote:
            "East and west Moreno Valley behave as separate markets. Rancho Belago's newer construction and Sunnymead's older stock attract different buyers with different financing, and a listing priced against the wrong half of the city will sit.",
        submarkets: ["Rancho Belago", "Moreno Valley Ranch", "Sunnymead", "Edgemont"],
        image: "/images/city-moreno-valley.webp",
        imageAlt:
            "Aerial view over Moreno Valley, California, with a lake, tract homes and the surrounding mountains",
        featured: true,
    },
    {
        slug: "fontana",
        name: "Fontana",
        county: "San Bernardino",
        zips: ["92335", "92336", "92337"],
        schools: "Fontana Unified · Etiwanda School District",
        blurb:
            "Fontana is a major logistics-employment centre and one of the most active markets in the region for rental investment. The 210 freeway splits it into two genuinely different cities: north Fontana's newer master-planned tracts against the foothills, and the older established south.",
        buyerNote:
            "North Fontana carries newer construction, foothill views, and in parts the Etiwanda School District rather than Fontana Unified — a distinction that carries real price weight. South Fontana is materially more accessible. Both are worth looking at; they are simply not the same purchase.",
        sellerNote:
            "Do not comp across the 210. North and south Fontana have different buyers, different school districts and different price ceilings, and a valuation that averages the two will be wrong in whichever direction costs you money.",
        submarkets: ["North Fontana", "Sierra Lakes", "Southridge", "Village of Heritage"],
        image: "/images/city-fontana.webp",
        imageAlt:
            "Aerial view of a retail centre in Fontana, California, at dusk with the foothills rising behind it",
        featured: true,
    },

    /* ------------------------------------------------------------------
       Also serving. Real coverage, stated in the footer and in schema, but
       without a dedicated landing page — a city page has to earn itself with
       genuinely differentiated content, and these don't yet have the local
       photography or the depth to justify one.
       ------------------------------------------------------------------ */
    { slug: "ontario", name: "Ontario", county: "San Bernardino", zips: ["91761", "91762", "91764"], schools: "Ontario-Montclair SD · Chaffey Joint Union HSD", blurb: "The airport, the logistics corridor and Ontario Ranch make this the region's most active market for first-time buyers and rental investors.", buyerNote: "Entry pricing is among the most accessible in the region, and CalHFA Dream For All assistance goes furthest here.", sellerNote: "Ontario buyers are disproportionately FHA-financed, so deferred maintenance surfaces as repair credits later.", submarkets: ["Ontario Ranch", "Downtown Ontario", "Creekside", "Rich-Haven"], featured: false },
    { slug: "eastvale", name: "Eastvale", county: "Riverside", zips: ["92880"], schools: "Corona-Norco Unified School District", blurb: "Incorporated in 2010 and built almost entirely of large-floorplan construction from the 2000s onward.", buyerNote: "The most square footage per dollar in the footprint — offset by Mello-Roos that raises the true monthly cost.", sellerNote: "Buyers compare floorplans directly across a large stock of similar homes, so presentation decides price.", submarkets: ["The Enclave", "Riverbend", "Harada"], featured: false },
    { slug: "upland", name: "Upland", county: "San Bernardino", zips: ["91784", "91786"], schools: "Upland Unified School District", blurb: "Established, tree-lined and architecturally varied, with foothill neighbourhoods below the San Gabriels.", buyerNote: "Character and mature landscaping instead of new construction, and little to no Mello-Roos.", sellerNote: "Character is the premium here, and generic listing photography destroys it.", submarkets: ["North Upland", "Historic Downtown", "San Antonio Heights"], featured: false },
    { slug: "diamond-bar", name: "Diamond Bar", county: "Los Angeles", zips: ["91765"], schools: "Walnut Valley Unified · Pomona Unified School District", blurb: "Directly across the Los Angeles County line from Chino Hills, where school district drives a real price gap.", buyerNote: "Split between Walnut Valley Unified and Pomona Unified; verify the attendance area first, not last.", sellerNote: "Walnut Valley attendance is the headline if you have it, and must be priced honestly if you don't.", submarkets: ["The Country Estates", "Diamond Bar North"], featured: false },
    { slug: "montclair", name: "Montclair", county: "San Bernardino", zips: ["91763"], schools: "Ontario-Montclair SD · Chaffey Joint Union HSD", blurb: "A compact, accessibly-priced city between Ontario and Pomona with direct Metrolink access.", buyerNote: "One of the most accessible entry points in the footprint, with transit access toward Los Angeles.", sellerNote: "Condition drives price here; FHA-financed buyers dominate the pool.", submarkets: ["Montclair Place area", "North Montclair"], featured: false },
    { slug: "claremont", name: "Claremont", county: "Los Angeles", zips: ["91711"], schools: "Claremont Unified School District", blurb: "The Colleges, the Village, and a tree-canopied older housing stock make Claremont its own distinct market.", buyerNote: "You pay for character, walkability and Claremont Unified — inventory stays tight.", sellerNote: "Architectural photography and historical accuracy in the listing matter more here than anywhere nearby.", submarkets: ["The Village", "Claraboya", "North Claremont"], featured: false },
    { slug: "pomona", name: "Pomona", county: "Los Angeles", zips: ["91766", "91767", "91768"], schools: "Pomona Unified School District", blurb: "A large, varied Los Angeles County market with strong investor interest and significant historic housing stock.", buyerNote: "Among the most accessible LA County entry prices; sub-market variation is wide.", sellerNote: "Comping must stay tight — Pomona's neighborhoods differ sharply block to block.", submarkets: ["Lincoln Park", "Phillips Ranch", "Ganesha Hills"], featured: false },
];

export const FEATURED_AREAS = AREAS.filter((a) => a.featured);

/* ------------------------------------------------------------------- SALES */

export interface SaleRecord {
    address: string;
    city: string;
    zip: string;
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    when: string;
    side: "Buyer" | "Seller";
}

/** Sebastian's personally-represented closed transactions. */
export const SALES: SaleRecord[] = [
    { address: "6226 Washington Ave", city: "Whittier", zip: "90601", price: "$865,000", beds: 2, baths: 2, sqft: 1713, when: "Sold 9 days ago", side: "Buyer" },
    { address: "1777 Mitchell Ave #29", city: "Tustin", zip: "92780", price: "$685,000", beds: 5, baths: 3, sqft: 1472, when: "Sold 18 days ago", side: "Buyer" },
    { address: "2823 E Schumacher Paseo", city: "Ontario", zip: "91762", price: "$628,000", beds: 3, baths: 3, sqft: 1593, when: "Sold 3 months ago", side: "Buyer" },
    { address: "15318 Cajon St", city: "Hesperia", zip: "92345", price: "$500,000", beds: 4, baths: 3, sqft: 2246, when: "Sold 2 years ago", side: "Buyer" },
    { address: "8872 Maple Ave Unit J", city: "Montclair", zip: "91763", price: "$485,000", beds: 1, baths: 2, sqft: 1126, when: "Sold 8 months ago", side: "Buyer" },
    { address: "20701 Beach Blvd Space 82", city: "Huntington Beach", zip: "92648", price: "$275,000", beds: 3, baths: 2, sqft: 1566, when: "Sold 1 year ago", side: "Buyer" },
    { address: "4400 Philadelphia St Space 216", city: "Chino", zip: "91710", price: "$245,000", beds: 2, baths: 2, sqft: 1248, when: "Sold 1 year ago", side: "Buyer" },
];

/* ------------------------------------------------------------------ ROUTES */

export interface RouteDef {
    path: string;
    label: string;
    priority: string;
    changefreq: string;
}

/** Every indexable route. Consumed by the sitemap and the prerenderer. */
export const ROUTES: RouteDef[] = [
    { path: "/", label: "Home", priority: "1.0", changefreq: "weekly" },
    { path: "/sell", label: "Sell", priority: "0.9", changefreq: "monthly" },
    { path: "/buy", label: "Buy", priority: "0.9", changefreq: "monthly" },
    { path: "/invest", label: "Invest", priority: "0.9", changefreq: "monthly" },
    { path: "/areas", label: "Areas", priority: "0.8", changefreq: "monthly" },
    { path: "/about", label: "About", priority: "0.8", changefreq: "monthly" },
    { path: "/reviews", label: "Reviews", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", label: "Contact", priority: "0.8", changefreq: "monthly" },
    ...FEATURED_AREAS.map((a) => ({
        path: `/areas/${a.slug}`,
        label: a.name,
        priority: "0.7",
        changefreq: "monthly",
    })),
];

/** Nav is deliberately shorter than ROUTES — six items is the legibility cap. */
export const NAV = [
    { path: "/sell", label: "Sell" },
    { path: "/buy", label: "Buy" },
    { path: "/invest", label: "Invest" },
    { path: "/areas", label: "Areas" },
    { path: "/about", label: "About" },
];
