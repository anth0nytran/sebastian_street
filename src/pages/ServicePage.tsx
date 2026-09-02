import { Navigate } from "react-router-dom";
import { Star } from "lucide-react";
import SEO, { AGENT_ID } from "@/hooks/useSEO";
import { SERVICES, FEATURED_AREAS, STATS, AGENT, SITE_URL, LINKS, PHOTOS, type ServiceDef } from "@/data/site";
import LeadForm from "@/components/LeadForm";
import {
    Reveal,
    Eyebrow,
    SectionHead,
    ActionLink,
    ActionAnchor,
    QuietLink,
    FaqSection,
    PhotoBand,
    StatRow,
} from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";
import { cn } from "@/lib/utils";

/**
 * One template renders /sell, /buy and /invest.
 *
 * The alternative — three near-identical page files — is how service pages
 * drift apart until only one of them has the schema and the FAQ. Content lives
 * in data/site.ts; this file owns nothing but layout.
 */
export default function ServicePage({ slug }: { slug: ServiceDef["slug"] }) {
    const service = SERVICES.find((s) => s.slug === slug);

    // Reachable only if a route is added without a matching data entry.
    if (!service) return <Navigate to="/" replace />;

    return (
        <>
            <SEO
                title={service.metaTitle}
                description={service.metaDescription}
                path={`/${service.slug}`}
                breadcrumbs={[{ name: service.name, path: `/${service.slug}` }]}
                faqs={service.faqs}
                extraGraph={[
                    {
                        "@type": "Service",
                        "@id": `${SITE_URL}/${service.slug}#service`,
                        name: `${service.name} Real Estate — Chino Hills & Inland Empire`,
                        description: service.promise,
                        serviceType: service.eyebrow,
                        provider: { "@id": AGENT_ID },
                        url: `${SITE_URL}/${service.slug}`,
                        areaServed: FEATURED_AREAS.map((a) => ({
                            "@type": "City",
                            name: a.name,
                            containedInPlace: { "@type": "State", name: "California" },
                        })),
                        // The numbered process rail, expressed so an answer
                        // engine can lift the steps as an ordered procedure.
                        hasOfferCatalog: {
                            "@type": "OfferCatalog",
                            name: `${service.name} Process`,
                            itemListElement: service.steps.map((step, i) => ({
                                "@type": "Offer",
                                position: i + 1,
                                itemOffered: {
                                    "@type": "Service",
                                    name: step.title,
                                    description: step.body,
                                },
                            })),
                        },
                    },
                ]}
            />

            <ServiceHero service={service} />
            <Pillars service={service} />
            <Process service={service} />
            <ProofBand />
            <Faq service={service} />
            <ConversionBand service={service} />
        </>
    );
}

/* -------------------------------------------------------------------- HERO */

function ServiceHero({ service }: { service: ServiceDef }) {
    return (
        <Backdrop
            ghost={service.name.toUpperCase()}
            className="flex min-h-[74svh] items-end pb-16 pt-40 md:pb-24"
        >
            <div className="canvas">
                <Reveal y={16}>
                    <Eyebrow tone="dark" className="mb-6">
                        {service.eyebrow} · Chino Hills & the Inland Empire
                    </Eyebrow>
                    <h1 className="mb-9 max-w-[16ch] text-d1 uppercase text-white">
                        {service.headline[0]}
                        <br />
                        <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-soft bg-clip-text text-transparent">
                            {service.headline[1]}
                        </span>
                    </h1>
                    <p className="mb-11 max-w-2xl text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-[1.72] text-white/65 text-pretty">
                        {service.promise}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <ActionLink to="/contact" variant="invert" className="w-full sm:w-auto">
                            {service.cta.label}
                        </ActionLink>
                        <ActionAnchor
                            href={LINKS.bookCall}
                            variant="outline-invert"
                            arrow={false}
                            className="w-full sm:w-auto"
                        >
                            Book a Strategy Call
                        </ActionAnchor>
                    </div>
                </Reveal>
            </div>
        </Backdrop>
    );
}

/* ----------------------------------------------------------------- PILLARS */

function Pillars({ service }: { service: ServiceDef }) {
    return (
        <section>
            <SectionHead
                eyebrow="How This Actually Works"
                title={
                    <>
                        What you're
                        <br />
                        paying for
                    </>
                }
                aside={
                    <p className="max-w-sm font-sans text-body-sm text-neutral-500">
                        Three things that change the outcome — not a list of adjectives every agent site already
                        claims.
                    </p>
                }
            />

            <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-3">
                {service.pillars.map((pillar, i) => (
                    <Reveal
                        key={pillar.title}
                        delay={i * 0.1}
                        className={cn(
                            "border-b border-black/[0.08] md:border-b-0",
                            i < service.pillars.length - 1 && "md:border-r"
                        )}
                    >
                        <article className="flex h-full flex-col p-6 md:p-10 lg:p-14">
                            <span className="mb-8 block font-serif text-[2.75rem] font-black leading-none text-accent">
                                0{i + 1}
                            </span>
                            <h3 className="mb-5 max-w-[22ch] font-serif text-[1.0625rem] font-black leading-snug tracking-tight text-black md:text-[1.1875rem]">
                                {pillar.title}
                            </h3>
                            <p className="max-w-[46ch] text-body text-neutral-600 text-pretty">{pillar.body}</p>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

/* ----------------------------------------------------------------- PROCESS */

function Process({ service }: { service: ServiceDef }) {
    return (
        <section id="process" className="on-dark border-t border-black/[0.08] bg-black">
            <SectionHead
                eyebrow="The Process"
                title="Four Steps, No Surprises"
                tone="dark"
                aside={
                    <p className="max-w-sm font-sans text-body-sm text-white/45">
                        You'll know what happens next at every stage, and what it costs, before it happens.
                    </p>
                }
            />

            <ol className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {service.steps.map((step, i) => (
                    <Reveal
                        key={step.title}
                        delay={i * 0.08}
                        className={cn(
                            "border-b border-white/10",
                            // Two columns at md, four at lg — the divider rules
                            // differ between those two grids.
                            i % 2 === 0 && "md:border-r",
                            i < service.steps.length - 1 && "lg:border-r",
                            i === 1 && "lg:border-r"
                        )}
                    >
                        <li className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-white/[0.03] md:p-10 lg:p-12">
                            <div className="mb-8 flex items-center gap-4">
                                <span className="font-serif text-2xl font-black text-accent">0{i + 1}</span>
                                <span className="h-px flex-1 bg-white/15 transition-colors duration-500 group-hover:bg-accent/40" />
                            </div>
                            <h3 className="mb-4 font-serif text-base font-black leading-snug tracking-tight text-white">
                                {step.title}
                            </h3>
                            <p className="max-w-[42ch] text-body-sm text-white/45 text-pretty">{step.body}</p>
                        </li>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}

/* ------------------------------------------------------------- PROOF BAND */

function ProofBand() {
    return (
        <section className="border-t border-black/[0.08] bg-neutral-50">
            <div className="canvas grid grid-cols-1 gap-12 py-section-sm lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <Reveal>
                    <Eyebrow className="mb-4">Behind the Representation</Eyebrow>
                    <h2 className="mb-6 max-w-[18ch] text-d3 uppercase text-black text-balance">
                        An individual agent, a brokerage team behind him
                    </h2>
                    <p className="mb-9 max-w-xl text-body text-neutral-600 text-pretty">
                        Sebastian is licensed in California as REALTOR® DRE #{AGENT.dre} and works within{" "}
                        {AGENT.brokerage} — a team carrying {STATS.teamReviewCount.toLocaleString()} verified
                        reviews and more than 25 years of leadership tenure. You get an individual agent's
                        attention with institutional marketing reach behind it.
                    </p>
                    <StatRow stats={STATS.team} />
                    <p className="mt-5 font-sans text-[0.625rem] uppercase tracking-[0.15em] text-neutral-400">
                        Figures reflect brokerage team production, not individual production.
                    </p>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="flex h-full flex-col justify-between border border-black/10 bg-white p-6 md:p-10 lg:p-12">
                        <div>
                            <span className="mb-7 flex items-center gap-3">
                                <span className="flex" aria-hidden="true">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                                    ))}
                                </span>
                                <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                    {STATS.rating} · {STATS.reviewCount} verified client reviews
                                </span>
                            </span>
                            <blockquote className="mb-8 font-serif text-lg font-black leading-snug tracking-tight text-black md:text-xl text-balance">
                                “Sebastian met every need at every step. When an issue came up during our purchase
                                he quickly negotiated new terms and kept communication clear.”
                            </blockquote>
                            <span className="block font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-black">
                                Celina Carey
                            </span>
                            <span className="mt-1.5 block font-sans text-[0.625rem] text-neutral-400">
                                Represented as both seller and buyer
                            </span>
                        </div>
                        <div className="mt-10 border-t border-black/[0.08] pt-6">
                            <QuietLink to="/reviews">Read All Reviews</QuietLink>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* --------------------------------------------------------------------- FAQ */

function Faq({ service }: { service: ServiceDef }) {
    return (
        <FaqSection
            eyebrow="Questions People Actually Ask"
            title={
                <>
                    Straight
                    <br />
                    answers
                </>
            }
            note={`What comes up in nearly every ${service.name.toLowerCase()}-side conversation, answered before you have to ask.`}
            faqs={service.faqs}
        />
    );
}

/* -------------------------------------------------------- CONVERSION BAND */

function ConversionBand({ service }: { service: ServiceDef }) {
    return (
        <PhotoBand src={PHOTOS.newHomes.src} alt={PHOTOS.newHomes.alt} scrim={0.9}>
            <div className="canvas py-section">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <Eyebrow tone="dark" className="mb-5">
                            Next Step
                        </Eyebrow>
                        <h2 className="mb-7 text-d2 uppercase text-white text-balance">{service.cta.label}</h2>
                        <p className="mb-10 max-w-lg text-body text-white/55 text-pretty">{service.promise}</p>

                        <div className="space-y-5 border-t border-white/10 pt-8">
                            {FEATURED_AREAS.slice(0, 4).map((area) => (
                                <div key={area.slug} className="flex items-baseline gap-4">
                                    <span className="h-[2px] w-4 flex-shrink-0 translate-y-[-0.3em] bg-accent" />
                                    <span className="font-sans text-body-sm text-white/50">
                                        <span className="font-bold text-white">{area.name}</span> —{" "}
                                        {service.slug === "sell" ? area.sellerNote : area.buyerNote}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="border border-white/10 bg-black/70 p-6 backdrop-blur-sm md:p-10">
                            <LeadForm
                                tone="dark"
                                defaultInterest={
                                    service.slug === "sell"
                                        ? "Selling"
                                        : service.slug === "buy"
                                          ? "Buying"
                                          : "Just curious"
                                }
                                source={`${service.name} Page`}
                                title={service.cta.label}
                                subtitle="No cost, no obligation. Sebastian responds personally within one business day."
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </PhotoBand>
    );
}
