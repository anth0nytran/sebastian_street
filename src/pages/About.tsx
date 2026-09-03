import { ExternalLink } from "lucide-react";
import SEO, { PERSON_ID, AGENT_ID } from "@/hooks/useSEO";
import { AGENT, OFFICE, CREDENTIALS, STATS, SALES, LINKS, SITE_URL, FEATURED_AREAS, PHOTOS, SOCIAL_LINKS } from "@/data/site";
import {
    Reveal,
    Eyebrow,
    SectionHead,
    ActionLink,
    ActionAnchor,
    StatRow,
    FaqSection,
    PhotoBand, ScrollRail } from "@/components/ui";
import { cn } from "@/lib/utils";

const ABOUT_FAQS = [
    {
        q: "Is Sebastian Street a licensed real estate agent?",
        a: `Yes. Sebastian Street holds an active California real estate license, DRE #${AGENT.dre}, issued by the California Department of Real Estate, and is a REALTOR® — a member of the National Association of REALTORS® bound by its Code of Ethics. License status can be verified independently through the California DRE public license lookup.`,
    },
    {
        q: "What brokerage does Sebastian Street work with?",
        a: `Sebastian is affiliated with ${AGENT.brokerage}, operating from ${OFFICE.street}, ${OFFICE.locality}, ${OFFICE.region} ${OFFICE.postalCode}. He practises as an individual agent under that brokerage rather than as part of a team, so every client he takes on is worked by him directly.`,
    },
    {
        q: "How long has Sebastian Street been selling real estate?",
        a: "Sebastian actively represents buyers, sellers and investors across Southern California, with a practice centered on Chino Hills and the greater Inland Empire. He works as a solo agent under eHomes. Every production figure published on this site is his own and is verifiable — the closed transactions listed here, and the thirteen five-star reviews on his Zillow profile. No brokerage-wide or team figure appears anywhere on this site.",
    },
    {
        q: "What makes Sebastian different from other Inland Empire agents?",
        a: "Three things, concretely. He works the three-county seam where Chino Hills, Eastvale and Diamond Bar meet, so county-level differences in tax rate, school district and Mello-Roos exposure get priced in rather than discovered at disclosure. He is an approved originating partner for CalHFA Dream For All, which most agents do not originate and therefore never raise with qualifying buyers. And every valuation is built from closed sales matched to the specific tract rather than a ZIP-code average.",
    },
    {
        q: "How do I contact Sebastian Street?",
        a: `Call or text ${AGENT.phone}, email ${AGENT.email}, or submit the valuation request form on this site. The office is at ${OFFICE.street}, ${OFFICE.locality}, ${OFFICE.region} ${OFFICE.postalCode}. Hours are ${AGENT.hours.label}.`,
    },
];

export default function About() {
    return (
        <>
            <SEO
                title={`About ${AGENT.name} — Chino Hills REALTOR®`}
                description={`${AGENT.name}, REALTOR® (CA DRE #${AGENT.dre}) with ${AGENT.brokerage}. Buyer, seller and investment representation across Chino Hills and the greater Inland Empire — San Bernardino, Riverside and Los Angeles counties.`}
                path="/about"
                type="profile"
                image={AGENT.headshot}
                imageAlt={`${AGENT.name}, REALTOR®`}
                breadcrumbs={[{ name: "About", path: "/about" }]}
                faqs={ABOUT_FAQS}
                extraGraph={[
                    {
                        "@type": "ProfilePage",
                        "@id": `${SITE_URL}/about#profile`,
                        mainEntity: { "@id": PERSON_ID },
                        about: { "@id": PERSON_ID },
                    },
                    {
                        "@type": "Organization",
                        "@id": `${SITE_URL}/#brokerage`,
                        name: AGENT.brokerage,
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: OFFICE.street,
                            addressLocality: OFFICE.locality,
                            addressRegion: OFFICE.region,
                            postalCode: OFFICE.postalCode,
                            addressCountry: OFFICE.country,
                        },
                        member: { "@id": PERSON_ID },
                        parentOrganization: { "@id": AGENT_ID },
                    },
                ]}
            />

            {/* ------------------------------------------------------- HERO */}
            <section className="on-dark relative flex min-h-[70svh] items-end pb-14 pt-36 md:pb-20 overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <img
                    src={PHOTOS.ranchland.src}
                    alt={PHOTOS.ranchland.alt}
                    fetchPriority="high"
                    decoding="sync"
                    style={{ objectPosition: "50% 50%" }}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/82 to-black/62" />
                <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="canvas relative z-10">
                    <div className="flex flex-col gap-9 md:flex-row md:items-end">
                        <Reveal y={16}>
                            <div className="w-44 flex-shrink-0 border border-white/15 md:w-64">
                                <img
                                    src={AGENT.portrait}
                                    alt={`${AGENT.name}, REALTOR®`}
                                    width={1200}
                                    height={1600}
                                    fetchPriority="high"
                                    className="aspect-[3/4] w-full object-cover object-top"
                                />
                            </div>
                        </Reveal>
                        <Reveal delay={0.1} y={16}>
                            <Eyebrow tone="dark" className="mb-5">
                                REALTOR® · CA DRE #{AGENT.dre} · {AGENT.brokerage}
                            </Eyebrow>
                            <h1 className="mb-6 text-d1 uppercase text-white text-balance">{AGENT.name}</h1>
                            <p className="max-w-2xl text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-[1.72] text-white/65 text-pretty">
                                Buyer, seller and investment representation across Chino Hills and the greater
                                Inland Empire — working the seam where San Bernardino, Riverside and Los Angeles
                                counties meet.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------- BIOGRAPHY */}
            <section>
                <SectionHead
                    eyebrow="Background"
                    title="Why This Practice Looks Like This"
                    aside={
                        <div className="flex flex-wrap gap-4 md:justify-end">
                            {SOCIAL_LINKS.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 font-sans text-[0.625rem] font-bold uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-accent-deep"
                                >
                                    {label}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            ))}
                        </div>
                    }
                />

                <div className="mx-auto grid max-w-canvas grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
                    <Reveal className="border-b border-black/[0.08] lg:border-b-0 lg:border-r">
                        <div className="space-y-6 p-6 md:p-12 lg:p-16">
                            <p className="font-serif text-lg font-black leading-snug tracking-tight text-black md:text-xl text-balance">
                                The Inland Empire is one of the few places in Southern California where three
                                counties meet inside a fifteen-minute drive — and almost nobody prices for it.
                            </p>
                            <p className="text-body text-neutral-600 text-pretty">
                                Sebastian works out of an office on Central Avenue in Chino, at the center of a
                                footprint that reaches Chino Hills and Ontario in San Bernardino County, Eastvale
                                and Corona in Riverside County, and Diamond Bar and Claremont in Los Angeles
                                County. Homes that look comparable on a listing site can carry very different
                                monthly costs across those lines, because the property tax rate, the school
                                district assignment and the Mello-Roos exposure all change with them.
                            </p>
                            <p className="text-body text-neutral-600 text-pretty">
                                Most of the work happens before anyone writes an offer or signs a listing
                                agreement. For sellers, that means a valuation built from closed sales matched to
                                the actual tract rather than a ZIP-code average — in Chino Hills, where 91709
                                spans Los Serranos condominiums through custom Vellano estates, that distinction
                                is worth six figures. For buyers, it means confirming CalHFA Dream For All
                                eligibility and modeling real carrying cost, including Mello-Roos, before touring
                                anything. For investors, it means underwriting on the reassessed tax basis rather
                                than the seller's current one.
                            </p>
                            <p className="text-body text-neutral-600 text-pretty">
                                Sebastian is affiliated with {AGENT.brokerage}, which gives him brokerage
                                marketing reach and vendor relationships to draw on. He practises solo under
                                it: no team, no handoff, and no company-wide production figures anywhere on
                                this site. Every number published here is a transaction he closed or a review
                                a client of his wrote — presenting brokerage volume as personal volume is the
                                fastest way to lose an informed client's trust, and it isn't worth the
                                headline.
                            </p>
                            <p className="text-body font-semibold text-black text-pretty">
                                If your situation falls outside this footprint, you'll get an honest referral
                                rather than a stretch.
                            </p>
                        </div>
                    </Reveal>

                    {/* Credential stack — the E-E-A-T block. Everything here is
                        independently checkable, and the ones with a public record
                        link out to it. */}
                    <Reveal delay={0.1}>
                        <div className="bg-neutral-50/60 p-6 md:p-10 lg:p-12">
                            <Eyebrow className="mb-8">Credentials & Affiliations</Eyebrow>
                            <dl className="space-y-6">
                                {CREDENTIALS.map((cred) => (
                                    <div key={cred.label} className="border-l-2 border-accent pl-5">
                                        <dt className="font-sans text-micro uppercase text-neutral-400">
                                            {cred.label}
                                        </dt>
                                        <dd>
                                            <span className="mt-1.5 block font-serif text-[0.9375rem] font-black tracking-tight text-black">
                                                {cred.href ? (
                                                    <a
                                                        href={cred.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-deep"
                                                    >
                                                        {cred.value}
                                                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                                    </a>
                                                ) : (
                                                    cred.value
                                                )}
                                            </span>
                                            <span className="mt-1 block font-sans text-[0.6875rem] leading-relaxed text-neutral-500">
                                                {cred.detail}
                                            </span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* -------------------------------------------------- PRODUCTION */}
            <section id="track-record" className="on-dark border-t border-black/[0.08] bg-black">
                <SectionHead
                    eyebrow="Production"
                    title="The Numbers, Labelled"
                    tone="dark"
                    aside={
                        <p className="max-w-xs font-sans text-body-sm text-white/45">
                            Every figure below is Sebastian's own. Nothing here belongs to a brokerage, a
                            team, or anyone else's production.
                        </p>
                    }
                />

                {/* Stats full width. In the old two-column version the price
                    range wrapped onto three lines inside a half-width column. */}
                <Reveal className="border-b border-white/10">
                    <div className="canvas py-section-sm">
                        <span className="mb-8 flex items-center gap-3">
                            <span className="h-[2px] w-6 bg-accent" />
                            <span className="font-sans text-eyebrow uppercase text-white/60">
                                {AGENT.name} · Verified Record
                            </span>
                        </span>
                        <StatRow stats={STATS.own} tone="dark" />

                        {/* The claim on the left, the means of checking it on the
                            right. A page that says "verifiable" and then makes the
                            reader go find the records is only half the argument. */}
                        <div className="mt-10 grid grid-cols-1 gap-9 lg:grid-cols-[1fr_auto] lg:gap-16">
                            <p className="max-w-measure-lg text-body-sm text-white/40 text-pretty">
                                Reviews and ratings come from his Zillow profile, where each one is tied to a
                                transaction he closed. The closings and the price range come from the
                                transactions below. Nothing is rounded up and nothing is borrowed.
                            </p>
                            <div className="lg:min-w-[15rem]">
                                <span className="mb-5 block font-sans text-micro uppercase text-white/35">
                                    Check it yourself
                                </span>
                                <ul className="space-y-3">
                                    {[
                                        { label: "Reviews on Zillow", href: LINKS.zillow },
                                        {
                                            label: `DRE #${AGENT.dre} lookup`,
                                            href: "https://www2.dre.ca.gov/PublicASP/pplinfo.asp",
                                        },
                                    ].map(({ label, href }) => (
                                        <li key={label}>
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-accent"
                                            >
                                                {label}
                                                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* A rail rather than a list: thirteen closings as rows made the
                    section taller than the screen twice over, and the count only
                    goes up from here. */}
                <Reveal delay={0.1}>
                    <div className="canvas py-section-sm">
                        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
                            <span className="flex items-center gap-3">
                                <span className="h-[2px] w-6 bg-white" />
                                <span className="font-sans text-eyebrow uppercase text-white/60">
                                    {AGENT.name} · Personally Represented
                                </span>
                            </span>
                            <span className="font-sans text-micro uppercase text-white/30">
                                {SALES.length} closings · scroll for more
                            </span>
                        </div>

                        <ScrollRail label="closed transactions" tone="dark">
                            {SALES.map((sale) => (
                                <article
                                    key={sale.address}
                                    data-rail-item
                                    className="flex w-[17rem] flex-shrink-0 snap-start flex-col justify-between border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 md:w-[19rem]"
                                >
                                    <div className="mb-8 flex items-center justify-between gap-3">
                                        <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-white/35">
                                            {sale.closed ?? `CA ${sale.zip}`}
                                        </span>
                                        {sale.side && (
                                            <span className="flex-shrink-0 font-sans text-[0.5625rem] font-bold uppercase tracking-[0.15em] text-accent">
                                                {sale.side === "Buyer & Seller" ? "Both Sides" : `${sale.side} Side`}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <span className="block font-serif text-[1.5rem] font-black leading-none tracking-tight text-white">
                                            {sale.price}
                                        </span>
                                        <span className="mt-4 block truncate font-sans text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/70">
                                            {sale.address}
                                        </span>
                                        <span className="mt-1.5 block font-sans text-[0.625rem] uppercase tracking-wider text-white/35">
                                            {sale.city}, CA {sale.zip}
                                        </span>
                                        <span className="mt-4 block border-t border-white/10 pt-3 font-sans text-[0.625rem] uppercase tracking-wider text-white/45">
                                            {sale.beds}bd · {sale.baths}ba · {sale.sqft.toLocaleString()}sf
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </ScrollRail>
                    </div>
                </Reveal>
            </section>

            {/* -------------------------------------------------- FOOTPRINT */}
            <section className="border-t border-black/[0.08]">
                <SectionHead eyebrow="Coverage" title="Where Sebastian Works" />
                <div className="canvas py-section-sm">
                    <ul className="flex flex-wrap gap-3">
                        {FEATURED_AREAS.map((area, i) => (
                            <Reveal key={area.slug} delay={i * 0.04}>
                                <li
                                    className={cn(
                                        "border border-black/12 px-5 py-3 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-neutral-600"
                                    )}
                                >
                                    {area.name}
                                    <span className="ml-2 text-[0.5625rem] text-neutral-400">
                                        {area.county} Co.
                                    </span>
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            {/* -------------------------------------------------------- FAQ */}
            <FaqSection
                eyebrow="About Sebastian"
                title={
                    <>
                        Common
                        <br />
                        questions
                    </>
                }
                note="Licensing, brokerage and coverage — the things worth verifying before you hand someone your largest asset."
                faqs={ABOUT_FAQS}
            />

            {/* -------------------------------------------------------- CTA */}
            <PhotoBand src={PHOTOS.golf.src} alt={PHOTOS.golf.alt} scrim={0.88}>
                <div className="mx-auto max-w-3xl px-6 py-section text-center md:px-12">
                    <Reveal>
                        <h2 className="mb-7 text-d2 uppercase text-white text-balance">
                            Start with a straight conversation
                        </h2>
                        <p className="mx-auto mb-11 max-w-xl text-body text-white/55 text-pretty">
                            No pitch and no pressure — just an honest read on what your situation actually calls
                            for, whether that turns into a transaction or not.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <ActionLink to="/contact" variant="invert">
                                Get in Touch
                            </ActionLink>
                            <ActionAnchor href={LINKS.bookCall} variant="outline-invert" arrow={false}>
                                Book a Strategy Call
                            </ActionAnchor>
                        </div>
                    </Reveal>
                </div>
            </PhotoBand>
        </>
    );
}
