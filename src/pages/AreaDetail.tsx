import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO, { AGENT_ID } from "@/hooks/useSEO";
import { AREAS, FEATURED_AREAS, SITE_URL, AGENT, SERVICES, PHOTOS, type AreaDef } from "@/data/site";
import LeadForm from "@/components/LeadForm";
import { Reveal, Eyebrow, SectionHead, ActionLink, FaqSection, PhotoBand } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";
import { cn } from "@/lib/utils";

/**
 * City landing page, one per featured area.
 *
 * These exist because a single site-wide page cannot rank for "Chino Hills
 * listing agent" and "Eastvale real estate agent" simultaneously — local intent
 * needs a dedicated, genuinely differentiated URL per city. The content is
 * differentiated on real distinctions (submarkets, school districts, county tax
 * and Mello-Roos exposure), not spun from a template with the city swapped,
 * which is exactly what a doorway-page penalty is for.
 */
export default function AreaDetail() {
    const { slug } = useParams<{ slug: string }>();
    const area = AREAS.find((a) => a.slug === slug && a.featured);

    if (!area) return <Navigate to="/areas" replace />;

    const faqs = buildAreaFaqs(area);
    const others = FEATURED_AREAS.filter((a) => a.slug !== area.slug).slice(0, 4);

    return (
        <>
            <SEO
                title={`${area.name} Real Estate Agent — Buy, Sell & Invest`}
                description={`${area.name}, CA real estate representation from Sebastian Street, REALTOR® (DRE #${AGENT.dre}). ${area.county} County · ${area.schools} · ZIP ${area.zips.join(", ")}. Free home valuation in 24 hours.`}
                path={`/areas/${area.slug}`}
                {...(area.image ? { image: area.image, imageAlt: area.imageAlt } : {})}
                breadcrumbs={[
                    { name: "Service Areas", path: "/areas" },
                    { name: area.name, path: `/areas/${area.slug}` },
                ]}
                faqs={faqs}
                extraGraph={[
                    {
                        "@type": "Place",
                        "@id": `${SITE_URL}/areas/${area.slug}#place`,
                        name: `${area.name}, California`,
                        description: area.blurb,
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: area.name,
                            addressRegion: "CA",
                            addressCountry: "US",
                        },
                        containedInPlace: {
                            "@type": "AdministrativeArea",
                            name: `${area.county} County, California`,
                        },
                    },
                    {
                        "@type": "Service",
                        "@id": `${SITE_URL}/areas/${area.slug}#service`,
                        name: `Real Estate Services in ${area.name}, CA`,
                        description: `Buyer, seller and investment representation in ${area.name}, ${area.county} County, California.`,
                        provider: { "@id": AGENT_ID },
                        areaServed: { "@id": `${SITE_URL}/areas/${area.slug}#place` },
                        url: `${SITE_URL}/areas/${area.slug}`,
                    },
                ]}
            />

            {/* ------------------------------------------------------- HERO
                A photograph only when we have one OF THIS CITY. Cities without
                their own photo keep the typographic backdrop rather than
                borrowing a neighbour's view and captioning it wrongly. Both
                branches render the identical content block below. */}
            <HeroShell area={area}>
                <div className="canvas">
                    <Reveal y={16}>
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-white/40">
                                <li>
                                    <Link to="/areas" className="transition-colors hover:text-accent">
                                        Service Areas
                                    </Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li className="text-accent">{area.name}</li>
                            </ol>
                        </nav>

                        <h1 className="mb-8 max-w-4xl text-d1 uppercase text-white text-balance">
                            {area.name}
                            <br />
                            <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-soft bg-clip-text text-transparent">
                                Real Estate
                            </span>
                        </h1>
                        <p className="max-w-2xl text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-[1.72] text-white/65 text-pretty">
                            {area.blurb}
                        </p>
                    </Reveal>
                </div>
            </HeroShell>

            {/* --------------------------------------------------- FACT ROW
                A compact, scannable fact table. This block exists as much for
                answer engines as for readers — it's the densest set of
                verifiable local facts on the page, in a structure that lifts
                cleanly into a generated answer. */}
            <section className="border-b border-black/[0.08] bg-neutral-50">
                <dl className="mx-auto grid max-w-canvas grid-cols-2 lg:grid-cols-4">
                    {[
                        { term: "County", value: `${area.county} County` },
                        { term: "ZIP Codes", value: area.zips.join(" · ") },
                        { term: "School District", value: area.schools },
                        { term: "Submarkets", value: `${area.submarkets.length} distinct areas` },
                    ].map((fact, i) => (
                        <div
                            key={fact.term}
                            className={cn(
                                "border-black/[0.08] p-6 md:p-9 lg:p-10",
                                i < 2 && "border-b lg:border-b-0",
                                i % 2 === 0 && "border-r",
                                i === 2 && "lg:border-r"
                            )}
                        >
                            <dt className="font-sans text-micro uppercase text-neutral-400">
                                {fact.term}
                            </dt>
                            <dd className="mt-2.5 font-serif text-[0.9375rem] font-black leading-snug tracking-tight text-black md:text-[1.0625rem]">
                                {fact.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* -------------------------------------------- BUYER vs SELLER */}
            <section>
                <SectionHead
                    eyebrow={`${area.name} Market`}
                    title="What Actually Matters Here"
                    aside={
                        <p className="max-w-xs font-sans text-body-sm text-neutral-500">
                            Buying and selling in {area.name} are different problems with different failure
                            modes. Both are worth understanding before you commit.
                        </p>
                    }
                />

                <div className="mx-auto grid max-w-canvas grid-cols-1 lg:grid-cols-2">
                    {(
                        [
                            { label: "If You're Buying", body: area.buyerNote, to: "/buy", cta: "Buyer Representation" },
                            { label: "If You're Selling", body: area.sellerNote, to: "/sell", cta: "Listing Representation" },
                        ] as const
                    ).map((block, i) => (
                        <Reveal
                            key={block.label}
                            delay={i * 0.1}
                            className={cn("border-b border-black/[0.08]", i === 0 && "lg:border-r")}
                        >
                            <div className="flex h-full flex-col p-6 md:p-10 lg:p-14">
                                <Eyebrow className="mb-5">{block.label}</Eyebrow>
                                <p className="mb-10 max-w-[42ch] flex-1 font-serif text-[1.0625rem] font-black leading-[1.55] tracking-tight text-black md:text-[1.1875rem] text-pretty">
                                    {block.body}
                                </p>
                                <Link
                                    to={block.to}
                                    className="group mt-auto inline-flex items-center gap-2 self-start border-b border-black/20 pb-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:border-accent hover:text-accent-deep"
                                >
                                    {block.cta}
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* -------------------------------------------------- SUBMARKETS */}
            <section className="on-dark bg-black">
                <SectionHead
                    eyebrow="Not One Market"
                    title={`${area.name} Submarkets`}
                    tone="dark"
                    aside={
                        <p className="max-w-xs font-sans text-body-sm text-white/45">
                            Pricing a home against the wrong submarket is the most expensive mistake made in this
                            city — in both directions.
                        </p>
                    }
                />
                <div className="canvas py-section-sm">
                    <ul className="flex flex-wrap gap-3.5">
                        {area.submarkets.map((sub, i) => (
                            <Reveal key={sub} delay={i * 0.05}>
                                <li className="border border-white/15 px-6 py-3.5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-accent hover:text-accent">
                                    {sub}
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            {/* -------------------------------------------------- SERVICES */}
            <section className="border-t border-black/[0.08]">
                <SectionHead eyebrow="How I Can Help" title={`Working in ${area.name}`} />
                <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-3">
                    {SERVICES.map((service, i) => (
                        <Reveal
                            key={service.slug}
                            delay={i * 0.08}
                            className={cn(
                                "border-b border-black/[0.08] md:border-b-0",
                                i < SERVICES.length - 1 && "md:border-r"
                            )}
                        >
                            <Link
                                to={`/${service.slug}`}
                                className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-neutral-50 md:p-10"
                            >
                                <span className="mb-6 block font-serif text-[2.25rem] font-black leading-none text-black/[0.08] transition-colors duration-500 group-hover:text-accent/30">
                                    0{i + 1}
                                </span>
                                <h3 className="mb-4 text-d4 uppercase text-black">
                                    {service.name} in {area.name}
                                </h3>
                                <p className="mb-7 flex-1 text-body-sm text-neutral-500 text-pretty">
                                    {service.promise}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-2 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-black transition-colors group-hover:text-accent-deep">
                                    Learn More
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* -------------------------------------------------------- FAQ */}
            <FaqSection
                eyebrow={`${area.name} Questions`}
                title={
                    <>
                        Answers,
                        <br />
                        straight
                    </>
                }
                note={`Specific to ${area.name} — ${area.county} County, ZIP ${toProseList(area.zips)}.`}
                faqs={faqs}
            />

            {/* ------------------------------------------------ CONVERSION */}
            <PhotoBand src={PHOTOS.ranchland.src} alt={PHOTOS.ranchland.alt} scrim={0.9}>
                <div className="canvas py-section">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                        <Reveal>
                            <Eyebrow tone="dark" className="mb-5">
                                {area.name}, CA
                            </Eyebrow>
                            <h2 className="mb-7 text-d2 uppercase text-white text-balance">
                                What's your {area.name} home worth?
                            </h2>
                            <p className="mb-10 max-w-lg text-body text-white/55 text-pretty">
                                A written valuation built from closed sales in your actual{" "}
                                {area.name} submarket — not a {area.zips[0]} ZIP-code average. Free, no
                                obligation, delivered within 24 hours.
                            </p>

                            <div className="border-t border-white/10 pt-8">
                                <span className="mb-5 block font-sans text-eyebrow uppercase text-white/35">
                                    Nearby Markets
                                </span>
                                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                                    {others.map((other) => (
                                        <li key={other.slug}>
                                            <Link
                                                to={`/areas/${other.slug}`}
                                                className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-accent"
                                            >
                                                {other.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-9">
                                <ActionLink to="/contact" variant="outline-invert" arrow={false}>
                                    Or Send a Message
                                </ActionLink>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="border border-white/10 bg-black/70 p-6 backdrop-blur-sm md:p-10">
                                <LeadForm
                                    tone="dark"
                                    source={`${area.name} Area Page`}
                                    title={`${area.name} Home Valuation`}
                                    subtitle="Free and no obligation. Sebastian responds personally within one business day."
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </PhotoBand>
        </>
    );
}

/**
 * Joins a list into readable prose: "a", "a and b", "a, b and c".
 *
 * `zips.join(" and ")` was fine for Chino's two codes and produced
 * "92407 and 92408 and 92410 and 92411" for San Bernardino's seven. Cities in
 * this footprint range from one ZIP to eight, so the formatting has to survive
 * both ends.
 */
function toProseList(items: readonly string[], max = 4): string {
    const shown = items.slice(0, max);
    const remainder = items.length - shown.length;
    const joined =
        shown.length <= 1
            ? (shown[0] ?? "")
            : `${shown.slice(0, -1).join(", ")} and ${shown[shown.length - 1]}`;
    return remainder > 0 ? `${joined} and ${remainder} more` : joined;
}

/**
 * Hero container: a real photograph of this city, or the typographic backdrop.
 *
 * Split out so both branches are guaranteed to wrap the same content at the
 * same measurements — the failure mode otherwise is two hero layouts that
 * quietly drift apart as one gets tweaked.
 */
function HeroShell({ area, children }: { area: AreaDef; children: ReactNode }) {
    if (!area.image) {
        return (
            <Backdrop
                ghost={area.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                className="flex min-h-[62svh] flex-col justify-end pb-14 pt-36 md:pb-20"
            >
                {children}
            </Backdrop>
        );
    }

    return (
        <section className="on-dark relative flex min-h-[62svh] flex-col justify-end overflow-hidden bg-black pb-14 pt-36 md:pb-20">
            <div className="absolute inset-0 z-0">
                <img
                    src={area.image}
                    alt={area.imageAlt ?? `${area.name}, California`}
                    fetchPriority="high"
                    decoding="sync"
                    style={{ objectPosition: area.imagePosition ?? "50% 50%" }}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35" />
            </div>
            <div className="relative z-10 w-full">{children}</div>
        </section>
    );
}

/**
 * City FAQs are composed from that city's own facts, so each page answers
 * questions with genuinely different content rather than the same paragraph
 * with a find-and-replaced city name.
 */
function buildAreaFaqs(area: AreaDef) {
    return [
        {
            q: `Who is a good real estate agent in ${area.name}, CA?`,
            a: `Sebastian Street is a licensed California REALTOR® (DRE #${AGENT.dre}) with ${AGENT.brokerage}, representing buyers, sellers and investors in ${area.name} and across the greater Inland Empire from an office in Chino. ${area.name} sits in ${area.county} County and is served by ${area.schools}. Sebastian can be reached at ${AGENT.phone}.`,
        },
        {
            q: `What ZIP codes cover ${area.name}?`,
            a: `${area.name} is covered by ZIP ${area.zips.length > 1 ? "codes" : "code"} ${toProseList(area.zips, 8)}, in ${area.county} County, California. Note that a single ZIP code in this area frequently spans several distinct submarkets — in ${area.name} that includes ${area.submarkets.slice(0, 3).join(", ")} — so a ZIP-level price average is a poor guide to what any individual home is worth.`,
        },
        {
            q: `What school district serves ${area.name}?`,
            a: `${area.name} is served by ${area.schools}. School attendance boundaries do not always follow city or ZIP code lines, and in this region attendance area is one of the strongest drivers of price. Verify the specific attendance area for any address before making an offer.`,
        },
        {
            q: `What should I know before buying in ${area.name}?`,
            a: area.buyerNote,
        },
        {
            q: `What should I know before selling in ${area.name}?`,
            a: area.sellerNote,
        },
    ];
}
