import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import SEO, { AGENT_ID } from "@/hooks/useSEO";
import { AREAS, FEATURED_AREAS, SITE_URL, PHOTOS } from "@/data/site";
import { Reveal, Eyebrow, SectionHead, ActionLink, FaqSection } from "@/components/ui";
import { cn } from "@/lib/utils";

const COUNTIES = ["San Bernardino", "Riverside", "Los Angeles"] as const;

const AREAS_FAQS = [
    {
        q: "What cities does Sebastian Street cover in the Inland Empire?",
        a: "Core markets are Chino Hills, Chino, Rancho Cucamonga, Corona, Riverside, San Bernardino, Moreno Valley and Fontana, with additional coverage in Ontario, Eastvale, Upland, Diamond Bar, Montclair, Claremont and Pomona. That footprint spans three counties: San Bernardino, Riverside and eastern Los Angeles County.",
    },
    {
        q: "Why does the county matter when buying in the Inland Empire?",
        a: "Chino Hills, Eastvale and Diamond Bar sit within minutes of each other but fall in San Bernardino, Riverside and Los Angeles counties respectively. County lines change the property tax rate applied to your assessed value, the school district your address is assigned to, and often the Mello-Roos exposure attached to the tract. Two otherwise-comparable homes across a county line can carry meaningfully different monthly costs.",
    },
];

export default function Areas() {
    return (
        <>
            <SEO
                title="Service Areas — Chino Hills & the Greater Inland Empire"
                description="Real estate representation across Chino Hills, Chino, Rancho Cucamonga, Corona, Riverside, San Bernardino, Moreno Valley and Fontana — spanning San Bernardino, Riverside and Los Angeles counties."
                path="/areas"
                breadcrumbs={[{ name: "Service Areas", path: "/areas" }]}
                faqs={AREAS_FAQS}
                extraGraph={[
                    {
                        "@type": "ItemList",
                        "@id": `${SITE_URL}/areas#list`,
                        name: "Inland Empire Service Areas",
                        numberOfItems: FEATURED_AREAS.length,
                        itemListElement: FEATURED_AREAS.map((area, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `${SITE_URL}/areas/${area.slug}`,
                            name: `${area.name}, CA Real Estate`,
                        })),
                    },
                    {
                        "@type": "Place",
                        "@id": `${SITE_URL}/areas#place`,
                        name: "Greater Inland Empire",
                        description:
                            "The San Bernardino, Riverside and eastern Los Angeles County markets served by Sebastian Street, REALTOR®.",
                        containsPlace: AREAS.map((a) => ({ "@type": "City", name: a.name })),
                        additionalProperty: { "@type": "PropertyValue", name: "Represented by", value: { "@id": AGENT_ID } },
                    },
                ]}
            />

            <section className="on-dark relative flex min-h-[62svh] flex-col justify-end overflow-hidden bg-black pb-14 pt-36 md:pb-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={PHOTOS.chinoHillsAerial.src}
                        alt={PHOTOS.chinoHillsAerial.alt}
                        fetchPriority="high"
                        decoding="sync"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/45" />
                </div>
                <div className="canvas relative z-10">
                    <Reveal y={16}>
                        <Eyebrow tone="dark" className="mb-6">
                            San Bernardino · Riverside · Los Angeles
                        </Eyebrow>
                        <h1 className="mb-8 max-w-4xl text-d1 uppercase text-white text-balance">
                            Three counties.
                            <br />
                            <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-soft bg-clip-text text-transparent">
                                One market seam.
                            </span>
                        </h1>
                        <p className="max-w-2xl text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-[1.72] text-white/65 text-pretty">
                            Chino Hills, Eastvale and Diamond Bar sit within minutes of each other in three
                            different counties. The tax rate, the school district and the Mello-Roos exposure all
                            change at those lines — and almost nobody prices for it.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Featured markets — each has a dedicated, indexable landing page. */}
            <SectionHead
                eyebrow="Core Markets"
                title="Areas Serviced Most"
                aside={
                    <p className="max-w-xs font-sans text-body-sm text-neutral-500">
                        Eight cities with dedicated market coverage. Each one has its own submarkets, school
                        boundaries and pricing logic.
                    </p>
                }
            />

            <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-2">
                {FEATURED_AREAS.map((area, i) => (
                    <Reveal
                        key={area.slug}
                        delay={(i % 2) * 0.08}
                        className={cn(
                            "border-b border-black/[0.08]",
                            i % 2 === 0 && "md:border-r"
                        )}
                    >
                        <Link
                            to={`/areas/${area.slug}`}
                            className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-neutral-50 md:p-10 lg:p-12"
                        >
                            <div className="mb-6 flex items-start justify-between gap-6">
                                <div>
                                    <Eyebrow className="mb-3">{area.county} County</Eyebrow>
                                    <h2 className="text-d3 uppercase text-black">{area.name}</h2>
                                </div>
                                {area.image ? (
                                    <span className="relative h-20 w-28 flex-shrink-0 overflow-hidden md:h-24 md:w-36">
                                        <img
                                            src={area.image}
                                            alt={area.imageAlt ?? `${area.name}, California`}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                                        />
                                    </span>
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        className="select-none font-serif text-[3.25rem] font-black leading-none text-black/[0.06] transition-colors duration-500 group-hover:text-accent/25"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                )}
                            </div>

                            <p className="mb-9 max-w-[58ch] flex-1 text-body text-neutral-600 text-pretty">{area.blurb}</p>

                            <dl className="mb-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-black/[0.08] pt-6">
                                <div>
                                    <dt className="font-sans text-micro uppercase text-neutral-400">
                                        ZIP Codes
                                    </dt>
                                    <dd className="mt-1.5 font-serif text-[0.8125rem] font-black tracking-tight text-black">
                                        {area.zips.join(" · ")}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-sans text-micro uppercase text-neutral-400">
                                        Schools
                                    </dt>
                                    <dd className="mt-1.5 font-sans text-[0.6875rem] font-medium leading-snug text-neutral-600">
                                        {area.schools}
                                    </dd>
                                </div>
                            </dl>

                            <span className="mt-auto inline-flex items-center gap-2 border-b border-black/20 pb-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-black transition-colors group-hover:border-accent group-hover:text-accent-deep">
                                {area.name} Market Guide
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </Reveal>
                ))}
            </div>

            {/* FAQs. These are the same strings emitted as FAQPage schema in
                the SEO component above — they must stay rendered here. */}
            <FaqSection
                eyebrow="Coverage Questions"
                title={
                    <>
                        Answers,
                        <br />
                        straight
                    </>
                }
                note="Why the county line matters more here than almost anywhere else in Southern California."
                faqs={AREAS_FAQS}
            />

            {/* Additional coverage, grouped by county. */}
            <section className="on-dark border-t border-black/[0.08] bg-black">
                <SectionHead eyebrow="Also Serving" title="Additional Coverage" tone="dark" />
                <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-3">
                    {COUNTIES.map((county, i) => {
                        const cities = AREAS.filter((a) => a.county === county);
                        return (
                            <Reveal
                                key={county}
                                delay={i * 0.08}
                                className={cn(
                                    "border-b border-white/10",
                                    i < COUNTIES.length - 1 && "md:border-b-0 md:border-r"
                                )}
                            >
                                <div className="p-6 md:p-10 lg:p-12">
                                    <h3 className="mb-7 flex items-center gap-3 font-sans text-eyebrow uppercase text-white/40">
                                        <span className="h-px w-4 bg-accent" />
                                        {county} County
                                    </h3>
                                    <ul className="space-y-3.5">
                                        {cities.map((city) => (
                                            <li key={city.slug}>
                                                {city.featured ? (
                                                    <Link
                                                        to={`/areas/${city.slug}`}
                                                        className="group flex items-center gap-2 font-serif text-base font-black tracking-tight text-white transition-colors hover:text-accent"
                                                    >
                                                        {city.name}
                                                        <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                                    </Link>
                                                ) : (
                                                    <span className="flex items-center gap-2 font-serif text-base font-black tracking-tight text-white/40">
                                                        <MapPin className="h-3 w-3 text-white/20" />
                                                        {city.name}
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <div className="border-t border-white/10 px-6 py-section-sm text-center md:px-12">
                    <Reveal>
                        <h2 className="mb-5 text-d3 uppercase text-white text-balance">
                            Don't see your city?
                        </h2>
                        <p className="mx-auto mb-9 max-w-xl text-body text-white/50 text-pretty">
                            Coverage extends well past this list across Southern California. If you're buying,
                            selling or investing anywhere in the region, ask — and if it's outside the footprint,
                            you'll get an honest referral rather than a stretch.
                        </p>
                        <ActionLink to="/contact" variant="invert">
                            Ask About Your Area
                        </ActionLink>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
