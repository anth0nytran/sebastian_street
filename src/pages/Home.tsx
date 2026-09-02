import { Link } from "react-router-dom";
import { ArrowRight, LineChart, Home as HomeIcon, Building2, Star, MapPin, ShieldCheck } from "lucide-react";
import SEO, { AGENT_ID } from "@/hooks/useSEO";
import {
    AGENT,
    SITE_URL,
    SERVICES,
    STATS,
    SALES,
    CREDENTIALS,
    FEATURED_AREAS,
    LINKS,
    PHOTOS,
    CLIENT_PHOTOS,
} from "@/data/site";
import reviewsData from "@/data/reviews.json";
import type { Review } from "@/types";
import {
    Reveal,
    Eyebrow,
    RuleLabel,
    SectionHead,
    ActionLink,
    QuietLink,
    HeroStat,
    StatRow,
    Marquee,
    FaqSection,
    PhotoBand,
} from "@/components/ui";
import { cn } from "@/lib/utils";

const REVIEWS = reviewsData as Review[];

const SERVICE_ICONS = {
    sell: LineChart,
    buy: HomeIcon,
    invest: Building2,
} as const;

/**
 * Homepage FAQs answer the queries that bring someone to an agent site cold.
 * These are deliberately different from the service-page FAQs — duplicating the
 * same Q&A across pages splits the ranking signal instead of compounding it.
 */
const HOME_FAQS = [
    {
        q: "Who is the best real estate agent in Chino Hills?",
        a: "Sebastian Street is a licensed California REALTOR® (DRE #02208742) with eHomes | The Toro Group, representing buyers, sellers and investors across Chino Hills and the greater Inland Empire from an office on Central Avenue in Chino. He holds a 5.0-star rating from verified client reviews, is an approved originating partner for the CalHFA Dream For All down payment assistance program, and works across all three counties that meet at Chino Hills — San Bernardino, Riverside and Los Angeles.",
    },
    {
        q: "What areas does Sebastian Street serve?",
        a: "Chino Hills, Chino, Rancho Cucamonga, Corona, Riverside, San Bernardino, Moreno Valley and Fontana are the core markets, with additional coverage in Ontario, Eastvale, Upland, Diamond Bar, Montclair, Claremont and Pomona. That footprint spans San Bernardino County, Riverside County and eastern Los Angeles County — the three counties that converge at the Chino Hills border.",
    },
    {
        q: "How do I get a free home valuation in Chino Hills?",
        a: "Submit your property address through the valuation request form on this site, or call (626) 632-2559. Sebastian prepares a written valuation from closed comparable sales matched to your specific tract rather than a ZIP-code average, and delivers it within 24 hours. There is no cost and no obligation to list.",
    },
    {
        q: "Does Sebastian Street work with first-time home buyers?",
        a: "Yes, and first-time buyers are a significant share of the practice. Sebastian is an approved originating partner for CalHFA Dream For All, California's shared-appreciation down payment assistance program, and also guides buyers through conventional 3%-down, FHA 3.5%-down and VA zero-down financing. Eligibility is confirmed before touring so buyers shop with an accurate budget.",
    },
    {
        q: "What does a real estate agent cost in California?",
        a: "Since the 2024 NAR settlement changes, both listing-side and buyer-side compensation are negotiated and disclosed in writing rather than assumed from a standard rate. Sellers agree to a listing fee and separately decide what, if anything, to offer a buyer's broker. Buyers sign a written representation agreement specifying their agent's compensation before touring homes. Sebastian provides written net-proceeds and cost estimates before any agreement is signed.",
    },
];

/* -------------------------------------------------------------------- HERO */

function Hero() {
    return (
        <section className="on-dark relative flex min-h-[92svh] items-center overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <img
                    src={PHOTOS.chinoHillsAerial.src}
                    alt={PHOTOS.chinoHillsAerial.alt}
                    // The LCP element: eager, high priority, decoded up front.
                    fetchPriority="high"
                    decoding="sync"
                    className="h-full w-full object-cover"
                />
                {/* Scrim, tuned rather than blanket-darkened. A flat overlay
                    heavy enough to hold the headline also erases the snow-capped
                    ridgeline that makes this photo worth using. Instead: a
                    vertical gradient dark at the nav and the trust row, open
                    across the middle, plus a soft radial pool behind the text
                    only — so contrast is bought where the type actually sits. */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(58% 46% at 50% 46%, rgba(0,0,0,0.62), rgba(0,0,0,0.18) 62%, transparent 82%)",
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-40 text-center md:px-12 md:pb-32">
                <Reveal y={16}>
                    <span className="mb-9 inline-block border border-white/25 bg-black/40 px-4 py-2 font-sans text-eyebrow uppercase text-white/85 backdrop-blur-sm">
                        Chino Hills · Greater Inland Empire
                    </span>
                </Reveal>

                <Reveal delay={0.1} y={16}>
                    {/* No text-balance here: the line break is authored, and
                        balancing fights it into an unwanted third line. */}
                    <h1 className="mb-9 text-d1 uppercase text-white">
                        Buy. Sell. Invest.
                        <br />
                        <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-soft bg-clip-text text-transparent">
                            Without guessing.
                        </span>
                    </h1>
                </Reveal>

                <Reveal delay={0.2} y={16}>
                    <p className="mx-auto mb-12 max-w-2xl text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-[1.72] text-white/70 md:text-lg text-pretty">
                        Buying, selling and investment representation across Chino Hills, Riverside, San
                        Bernardino and the greater Inland Empire — priced from closed sales on your street,
                        never a ZIP-code average.
                    </p>
                </Reveal>

                <Reveal delay={0.3} y={16}>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <ActionLink to="/contact" variant="invert" className="w-full min-w-[280px] sm:w-auto">
                            Get Free Home Valuation
                        </ActionLink>
                        <ActionLink
                            to="/buy"
                            variant="outline-invert"
                            arrow={false}
                            className="w-full min-w-[280px] sm:w-auto"
                        >
                            Start a Home Search
                        </ActionLink>
                    </div>
                </Reveal>

                <Reveal delay={0.4} y={16}>
                    <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-9">
                        <span className="flex items-center gap-2">
                            <span className="flex" aria-hidden="true">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                                ))}
                            </span>
                            <span className="font-sans text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/55">
                                {STATS.rating} rating · {STATS.reviewCount} verified reviews
                            </span>
                        </span>
                        <span className="font-sans text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/55">
                            CA DRE #{AGENT.dre}
                        </span>
                        <span className="font-sans text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/55">
                            {AGENT.brokerage}
                        </span>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------ CREDENTIALS */

function CredentialRail() {
    return (
        <div className="border-y border-black/[0.08] bg-neutral-50 py-7">
            <Marquee duration="70s">
                {CREDENTIALS.map((c) => (
                    <div
                        key={c.label}
                        className="flex flex-none items-center gap-4 border-r border-black/[0.08] px-8 md:px-14"
                    >
                        <span className="h-9 w-[2px] flex-shrink-0 bg-accent" />
                        <span className="flex flex-col">
                            <span className="font-sans text-micro uppercase text-neutral-400">
                                {c.label}
                            </span>
                            <span className="mt-1.5 whitespace-nowrap font-serif text-[0.8125rem] font-black tracking-tight text-black">
                                {c.value}
                            </span>
                        </span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
}

/* ---------------------------------------------------------------- SERVICES */

function ServicesGrid() {
    return (
        <section id="services">
            <SectionHead
                eyebrow="Three Ways to Work Together"
                title={
                    <>
                        What do you
                        <br />
                        need done?
                    </>
                }
                aside={
                    <p className="max-w-sm font-sans text-body-sm text-neutral-500">
                        Every engagement starts the same way — a straight conversation about what you're actually
                        trying to accomplish, before anyone talks about listings.
                    </p>
                }
            />

            <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-3">
                {SERVICES.map((service, i) => {
                    const Icon = SERVICE_ICONS[service.slug];
                    return (
                        <Reveal
                            key={service.slug}
                            delay={i * 0.1}
                            className={cn(
                                "border-b border-black/[0.08] md:border-b-0",
                                i < SERVICES.length - 1 && "md:border-r"
                            )}
                        >
                            <Link
                                to={`/${service.slug}`}
                                className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-neutral-50 md:p-10 lg:p-14"
                            >
                                <div className="mb-9 flex items-start justify-between">
                                    <span className="flex h-14 w-14 items-center justify-center border border-black/10 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent md:h-16 md:w-16">
                                        <Icon
                                            className="h-6 w-6 text-black/70 transition-colors duration-500 group-hover:text-black md:h-7 md:w-7"
                                            strokeWidth={1.5}
                                        />
                                    </span>
                                    <span className="font-serif text-[2.75rem] font-black leading-none text-black/[0.07] transition-colors duration-500 group-hover:text-accent/25">
                                        0{i + 1}
                                    </span>
                                </div>

                                <Eyebrow className="mb-3">{service.eyebrow}</Eyebrow>
                                <h3 className="mb-6 text-d3 uppercase text-black">{service.name}</h3>
                                <p className="mb-11 max-w-[46ch] flex-1 text-body text-neutral-500 text-pretty">
                                    {service.promise}
                                </p>

                                <span className="mt-auto inline-flex items-center gap-2 self-start border-b border-black/20 pb-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-black transition-colors group-hover:border-accent group-hover:text-accent-deep">
                                    {service.cta.label}
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------ TRACK RECORD */

function TrackRecord() {
    return (
        <section id="track-record" className="border-t border-black/[0.08]">
            <SectionHead
                eyebrow="Proven Production"
                title="The Track Record"
                aside={<QuietLink to="/reviews">Read Client Reviews</QuietLink>}
            />

            <div className="mx-auto grid max-w-canvas grid-cols-1 lg:grid-cols-2">
                {/* Team production. Labelled as team everywhere it appears —
                    presenting brokerage volume as personal volume is the fastest
                    way to lose credibility with an informed seller. */}
                <Reveal className="border-b border-black/[0.08] bg-neutral-50/60 lg:border-b-0 lg:border-r">
                    <div className="px-6 py-12 md:px-12 md:py-16 lg:px-16">
                        <RuleLabel accentRule>eHomes | The Toro Group · Team</RuleLabel>
                        <div className="mt-8">
                            <HeroStat value="5,091" label="Total Team Sales" />
                        </div>
                        <div className="mt-10">
                            <StatRow stats={STATS.team.slice(1)} />
                        </div>
                        <p className="mt-8 max-w-md text-body-sm text-neutral-500 text-pretty">
                            Sebastian works inside a brokerage team with 25+ years of leadership tenure and{" "}
                            {STATS.teamReviewCount.toLocaleString()} verified team reviews — which means
                            institutional marketing reach and vendor relationships behind an individual agent's
                            attention.
                        </p>
                    </div>
                </Reveal>

                {/* Sebastian's own closings. Smaller number, stated plainly. */}
                <Reveal delay={0.1} className="flex flex-col">
                    <div className="px-6 pb-7 pt-12 md:px-12 md:pt-16 lg:px-16">
                        <RuleLabel>{AGENT.name} · Personally Represented</RuleLabel>
                    </div>
                    <div className="flex flex-1 flex-col border-t border-black/[0.08]">
                        <div className="flex items-center justify-between bg-neutral-50/60 px-6 py-3.5 md:px-12 lg:px-16">
                            <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-black">
                                Recent Closings
                            </span>
                            <span className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                Verified
                            </span>
                        </div>
                        {SALES.slice(0, 6).map((sale) => (
                            <div
                                key={sale.address}
                                className="flex flex-1 items-center justify-between gap-4 border-t border-black/[0.04] px-6 py-4 transition-colors hover:bg-neutral-50/70 md:px-12 lg:px-16"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-baseline gap-3">
                                        <span className="font-serif text-[1.0625rem] font-black tracking-tight text-black">
                                            {sale.price}
                                        </span>
                                        <span className="bg-black px-2 py-0.5 font-sans text-[0.4375rem] font-bold uppercase tracking-[0.2em] text-white">
                                            {sale.side} Side
                                        </span>
                                    </div>
                                    <p className="truncate font-sans text-[0.625rem] font-bold uppercase tracking-wider text-neutral-400">
                                        <span className="text-neutral-600">{sale.address}</span>
                                        <span className="px-2 text-neutral-300">·</span>
                                        {sale.beds}bd {sale.baths}ba {sale.sqft.toLocaleString()}sf
                                    </p>
                                </div>
                                <div className="hidden flex-shrink-0 flex-col items-end sm:flex">
                                    <span className="flex items-center gap-1 font-sans text-[0.625rem] font-bold uppercase tracking-wider text-neutral-500">
                                        <MapPin className="h-3 w-3 text-neutral-400" /> {sale.city}
                                    </span>
                                    <span className="mt-0.5 font-sans text-[0.5625rem] uppercase tracking-wider text-neutral-400">
                                        {sale.when}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ PROFILE */

function Profile() {
    return (
        <PhotoBand
            src={PHOTOS.ranchland.src}
            alt={PHOTOS.ranchland.alt}
            scrim={0.82}
            className="border-t border-black/[0.08]"
        >
            <div className="mx-auto max-w-4xl px-6 py-section text-center md:px-12">
                <Reveal>
                    <Eyebrow tone="dark" className="mb-8">
                        The Person Behind the Results
                    </Eyebrow>

                    <div className="mb-8 flex items-center justify-center gap-5 md:gap-6">
                        <img
                            src={AGENT.headshot}
                            alt={`${AGENT.name}, REALTOR®`}
                            loading="lazy"
                            width={96}
                            height={96}
                            className="h-20 w-20 flex-shrink-0 border border-white/15 object-cover object-top md:h-24 md:w-24"
                        />
                        <div className="text-left">
                            <h2 className="mb-2 text-d3 uppercase text-white">{AGENT.name}</h2>
                            <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-white/35">
                                REALTOR® · CA DRE #{AGENT.dre}
                            </span>
                        </div>
                    </div>

                    <span className="mx-auto mb-8 block h-[2px] w-8 bg-accent" />

                    <p className="mx-auto mb-10 max-w-3xl font-serif text-xl italic leading-[1.45] tracking-tight text-white md:text-2xl text-balance">
                        “Most people don't lose money on a house because they picked the wrong home. They lose it
                        because nobody ran the numbers honestly before they signed.”
                    </p>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="mx-auto max-w-3xl space-y-5">
                        <p className="text-body text-white/55 text-pretty">
                            Sebastian works out of Chino and covers the three-county seam where Chino Hills,
                            Eastvale and Diamond Bar meet — a stretch where the property tax rate, the Mello-Roos
                            exposure and the school district can all change inside of a five-minute drive. Most of
                            what he does for clients is making sure those differences show up in the math before
                            an offer gets written, not after.
                        </p>
                        <p className="text-body font-semibold text-white text-pretty">
                            Whether you're selling a Chino Hills home, buying your first place in Ontario, or
                            underwriting a rental in Fontana — the first conversation is free and there's no
                            pressure attached to it.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
                        <ActionLink to="/about" variant="invert">
                            More About Sebastian
                        </ActionLink>
                        <a
                            href={LINKS.bookCall}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 border-b border-white/30 pb-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
                        >
                            Book a Strategy Call
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </Reveal>
            </div>
        </PhotoBand>
    );
}

/* -------------------------------------------------------------------- AREAS */

function AreasShowcase() {
    return (
        <section className="on-dark bg-black">
            <div className="px-6 py-section-sm text-center md:px-12">
                <Reveal>
                    <Eyebrow tone="dark" className="mb-6">
                        San Bernardino · Riverside · Los Angeles
                    </Eyebrow>
                    <h2 className="mb-6 text-d2 uppercase text-white text-balance">Where We Work</h2>
                    <p className="mx-auto max-w-2xl text-body text-white/45 text-pretty">
                        The Inland Empire is not one market. Chino Hills, Eastvale and Diamond Bar sit minutes
                        apart in three different counties, with different tax rates, different school districts
                        and different Mello-Roos exposure. Knowing the difference is the job.
                    </p>
                </Reveal>
            </div>

            {/* City grid. A tile shows a photograph only where a real photo of
                THAT city exists; the rest stay typographic rather than borrowing
                a neighbouring city's view. Mixed treatments in one grid is the
                honest arrangement, and the shared layout keeps it coherent. */}
            <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURED_AREAS.map((area, i) => (
                    <Reveal
                        key={area.slug}
                        delay={(i % 4) * 0.08}
                        className={cn(
                            "border-b border-white/10",
                            i % 2 === 0 && "sm:border-r",
                            i % 4 !== 3 && "lg:border-r"
                        )}
                    >
                        <Link
                            to={`/areas/${area.slug}`}
                            className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden p-7 transition-colors duration-500 md:min-h-[16rem] md:p-9"
                        >
                            {area.image ? (
                                <>
                                    <img
                                        src={area.image}
                                        alt={area.imageAlt ?? `${area.name}, California`}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full object-cover brightness-[0.34] transition-all [transition-duration:1400ms] ease-out group-hover:scale-[1.06] group-hover:brightness-[0.55]"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20"
                                    />
                                </>
                            ) : (
                                <>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 transition-colors duration-500 group-hover:bg-white/[0.04]"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -bottom-6 right-3 select-none font-serif text-[6rem] font-black leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-accent/20"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </>
                            )}

                            <span className="relative">
                                <span className="mb-5 block h-[2px] w-6 bg-accent transition-all duration-500 group-hover:w-12" />
                                <span className="mb-2 block font-sans text-micro uppercase text-white/45">
                                    {area.county} County
                                </span>
                                <span className="block font-serif text-xl font-black leading-tight tracking-tight text-white md:text-2xl">
                                    {area.name}
                                </span>
                            </span>

                            <span className="relative mt-8">
                                <span className="mb-3.5 block font-sans text-[0.5625rem] font-medium leading-relaxed tracking-wide text-white/40">
                                    ZIP {area.zips.join(" · ")}
                                    <span className="mx-2 text-white/20">|</span>
                                    {area.submarkets.length} submarkets
                                </span>
                                <span className="flex items-center gap-1.5 font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors duration-500 group-hover:text-accent">
                                    View Market
                                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </span>
                            </span>
                        </Link>
                    </Reveal>
                ))}
            </div>

            <div className="border-t border-white/10 px-6 py-9 text-center md:px-12">
                <QuietLink to="/areas" tone="dark">
                    See All Service Areas
                </QuietLink>
            </div>
        </section>
    );
}

/* ----------------------------------------------------------------- REVIEWS */

function ReviewsStrip() {
    const featured = REVIEWS.slice(0, 3);
    return (
        <section className="border-t border-black/[0.08]">
            <SectionHead
                eyebrow="Verified Client Reviews"
                title={
                    <>
                        What clients
                        <br />
                        actually say
                    </>
                }
                aside={
                    <div className="inline-flex items-center gap-3 border border-black/10 bg-neutral-50 px-5 py-3">
                        <span className="flex" aria-hidden="true">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                            ))}
                        </span>
                        <span className="flex flex-col text-left">
                            <span className="font-serif text-sm font-black leading-none text-black">
                                {STATS.rating}
                            </span>
                            <span className="mt-1 font-sans text-micro uppercase leading-none text-neutral-500">
                                {STATS.reviewCount} reviews
                            </span>
                        </span>
                    </div>
                }
            />

            <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-3">
                {featured.map((review, i) => (
                    <Reveal
                        key={review.id}
                        delay={i * 0.1}
                        className={cn(
                            "border-b border-black/[0.08] md:border-b-0",
                            i < featured.length - 1 && "md:border-r"
                        )}
                    >
                        <figure className="flex h-full flex-col p-6 md:p-10 lg:p-14">
                            <span className="mb-7 flex" aria-hidden="true">
                                {Array.from({ length: review.rating }).map((_, s) => (
                                    <Star key={s} className="mr-0.5 h-3.5 w-3.5 fill-accent text-accent" />
                                ))}
                            </span>
                            <blockquote className="mb-10 max-w-[46ch] flex-1 text-body text-neutral-600 text-pretty">
                                “{review.text}”
                            </blockquote>
                            <figcaption className="mt-auto border-t border-black/[0.08] pt-6">
                                <span className="block font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-black">
                                    {review.author}
                                </span>
                                {review.transaction && (
                                    <span className="mt-1.5 block font-sans text-[0.625rem] leading-relaxed text-neutral-400">
                                        {review.transaction}
                                    </span>
                                )}
                            </figcaption>
                        </figure>
                    </Reveal>
                ))}
            </div>

            {/* Documentary proof. Captioned generically and kept apart from the
                quotes above — pairing a real family's photo with a named
                reviewer they aren't would be a misattribution.

                Vertical phone photos, shown at their native 3:4 in a measured
                container. Cropping them into a wide band threw most of the
                frame away and blew up what remained. */}
            <div className="border-t border-black/[0.08] bg-neutral-50/60">
                <div className="canvas py-section-sm">
                    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                        {CLIENT_PHOTOS.map((photo, i) => (
                            <Reveal key={photo.src} delay={i * 0.1}>
                                <figure className="group">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            loading="lazy"
                                            decoding="async"
                                            width={1200}
                                            height={1600}
                                            className="h-full w-full object-cover transition-transform [transition-duration:1400ms] ease-out group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <figcaption className="mt-5 flex items-start gap-3">
                                        <span className="mt-[0.55em] h-[2px] w-5 flex-shrink-0 bg-accent" />
                                        <span className="font-sans text-[0.6875rem] font-medium leading-relaxed text-neutral-600">
                                            {photo.caption}
                                        </span>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-black/[0.08] px-6 py-9 text-center md:px-12">
                <QuietLink to="/reviews">Read All {STATS.reviewCount} Reviews</QuietLink>
            </div>
        </section>
    );
}

/* --------------------------------------------------------------- FINAL CTA */

function FinalCta() {
    return (
        <PhotoBand src={PHOTOS.retailSunset.src} alt={PHOTOS.retailSunset.alt} scrim={0.86}>
            <div className="mx-auto max-w-4xl px-6 py-section text-center md:px-12">
                <Reveal>
                    <ShieldCheck className="mx-auto mb-9 h-12 w-12 text-accent" strokeWidth={1} />
                    <h2 className="mb-7 text-d2 uppercase text-white text-balance">
                        Find out what your home is really worth
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-body text-white/55 text-pretty">
                        Automated estimates average an entire ZIP code. You'll get a written valuation built from
                        closed sales matched to your tract, your lot and your HOA — prepared by a licensed
                        REALTOR® and delivered within 24 hours.
                    </p>

                    <ul className="mx-auto mb-12 flex w-fit flex-col items-start gap-4">
                        {[
                            "100% free — no obligation to list",
                            "Written analysis from closed comparable sales",
                            "Delivered within 24 hours",
                        ].map((line) => (
                            <li key={line} className="flex items-center gap-3.5">
                                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center bg-accent">
                                    <svg viewBox="0 0 10 8" className="h-2.5 w-2.5" aria-hidden="true">
                                        <path
                                            d="M1 4l2.5 2.5L9 1"
                                            fill="none"
                                            stroke="#000"
                                            strokeWidth="2"
                                            strokeLinecap="square"
                                        />
                                    </svg>
                                </span>
                                <span className="text-body-sm text-white/70">{line}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <ActionLink to="/contact" variant="invert" className="w-full min-w-[280px] sm:w-auto">
                            Get My Free Valuation
                        </ActionLink>
                        <a
                            href={AGENT.phoneHref}
                            className="group inline-flex w-full min-w-[280px] items-center justify-center gap-3 border border-white/30 px-8 py-5 font-sans text-[0.6875rem] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-black sm:w-auto"
                        >
                            Call {AGENT.phone}
                        </a>
                    </div>
                </Reveal>
            </div>
        </PhotoBand>
    );
}

/* -------------------------------------------------------------------- PAGE */

export default function Home() {
    /**
     * The homepage carries the Service catalog and the aggregate rating.
     * Both attach to the existing #real-estate-agent node by @id rather than
     * minting a second business entity.
     */
    const extraGraph = [
        {
            "@type": "AggregateRating",
            "@id": `${SITE_URL}/#rating`,
            itemReviewed: { "@id": AGENT_ID },
            ratingValue: STATS.rating,
            bestRating: "5",
            worstRating: "1",
            ratingCount: STATS.reviewCount,
            reviewCount: STATS.reviewCount,
        },
        {
            "@type": "ItemList",
            "@id": `${SITE_URL}/#services`,
            name: "Real Estate Services",
            itemListElement: SERVICES.map((service, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                    "@type": "Service",
                    "@id": `${SITE_URL}/${service.slug}#service`,
                    name: `${service.name} Real Estate — Chino Hills & Inland Empire`,
                    description: service.promise,
                    serviceType: service.eyebrow,
                    provider: { "@id": AGENT_ID },
                    areaServed: FEATURED_AREAS.map((a) => ({ "@type": "City", name: a.name })),
                    url: `${SITE_URL}/${service.slug}`,
                },
            })),
        },
    ];

    return (
        <>
            <SEO
                title="Chino Hills Real Estate Agent — Buy, Sell & Invest | Sebastian Street, REALTOR®"
                description="Sebastian Street is a Chino Hills & Inland Empire REALTOR® (DRE #02208742) helping clients buy, sell and invest across Chino, Rancho Cucamonga, Corona, Riverside & San Bernardino. 5.0★ rated. Free home valuation in 24 hours."
                path="/"
                faqs={HOME_FAQS}
                extraGraph={extraGraph}
            />

            <Hero />
            <CredentialRail />
            <ServicesGrid />
            <TrackRecord />
            <Profile />
            <AreasShowcase />
            <ReviewsStrip />
            <FaqSection
                eyebrow="Common Questions"
                title={
                    <>
                        Answers,
                        <br />
                        straight
                    </>
                }
                note="The questions people actually type before they call an agent — answered without the hedging."
                faqs={HOME_FAQS}
            />
            <FinalCta />
        </>
    );
}
