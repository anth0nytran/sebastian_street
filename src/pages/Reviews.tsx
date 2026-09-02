import { Star, ExternalLink } from "lucide-react";
import SEO, { AGENT_ID } from "@/hooks/useSEO";
import { STATS, AGENT, LINKS, SITE_URL, PHOTOS, CLIENT_PHOTOS } from "@/data/site";
import reviewsData from "@/data/reviews.json";
import type { Review } from "@/types";
import { Reveal, Eyebrow, SectionHead, ActionLink, ActionAnchor, PhotoBand } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";
import { cn } from "@/lib/utils";

const REVIEWS = reviewsData as Review[];

export default function Reviews() {
    /**
     * Review schema is emitted for Sebastian's own verified reviews only.
     *
     * The brokerage team's 3,233 Zillow reviews are real, but they are not his
     * reviews — marking them up under his entity would be a misrepresentation
     * that Google treats as a structured-data violation. The team number is
     * still stated on the page, in words, labelled as a team figure.
     */
    const reviewNodes = REVIEWS.map((review, i) => ({
        "@type": "Review",
        "@id": `${SITE_URL}/reviews#review-${review.id}`,
        position: i + 1,
        itemReviewed: { "@id": AGENT_ID },
        author: { "@type": "Person", name: review.author },
        datePublished: toIsoDate(review.date),
        reviewRating: {
            "@type": "Rating",
            ratingValue: String(review.rating),
            bestRating: "5",
            worstRating: "1",
        },
        reviewBody: review.text,
        ...(review.transaction ? { about: review.transaction } : {}),
    }));

    return (
        <>
            <SEO
                title={`Client Reviews — ${AGENT.name}, REALTOR®`}
                description={`${STATS.reviewCount} verified client reviews for ${AGENT.name}, REALTOR® (DRE #${AGENT.dre}) — ${STATS.rating}-star average across buyer and seller transactions in the Inland Empire and Southern California.`}
                path="/reviews"
                breadcrumbs={[{ name: "Reviews", path: "/reviews" }]}
                extraGraph={[
                    {
                        "@type": "AggregateRating",
                        "@id": `${SITE_URL}/reviews#rating`,
                        itemReviewed: { "@id": AGENT_ID },
                        ratingValue: STATS.rating,
                        bestRating: "5",
                        worstRating: "1",
                        ratingCount: STATS.reviewCount,
                        reviewCount: STATS.reviewCount,
                    },
                    ...reviewNodes,
                ]}
            />

            {/* ------------------------------------------------------- HERO */}
            <Backdrop ghost="5.0" className="flex min-h-[58svh] items-end pb-14 pt-36 md:pb-20">
                <div className="canvas">
                    <Reveal y={16}>
                        <Eyebrow tone="dark" className="mb-6">
                            Verified Client Reviews
                        </Eyebrow>
                        <h1 className="mb-8 max-w-3xl text-d1 uppercase text-white text-balance">
                            In their
                            <br />
                            <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-soft bg-clip-text text-transparent">
                                own words.
                            </span>
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            <span className="flex items-center gap-3">
                                <span className="flex" aria-hidden="true">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                                    ))}
                                </span>
                                <span className="font-serif text-2xl font-black tracking-tight text-white">
                                    {STATS.rating}
                                </span>
                            </span>
                            <span className="font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white/50">
                                {STATS.reviewCount} verified reviews for {AGENT.firstName}
                            </span>
                            <a
                                href={LINKS.zillow}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-white"
                            >
                                View on Zillow
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </Backdrop>

            {/* ------------------------------------------------- TEAM NOTE
                Stated in prose, not marked up as his reviews. */}
            <div className="border-b border-black/[0.08] bg-neutral-50">
                <div className="canvas py-6">
                    <p className="max-w-4xl text-body-sm text-neutral-500 text-pretty">
                        The {STATS.reviewCount} reviews below are {AGENT.firstName}'s own, from clients he
                        personally represented. Separately, {AGENT.brokerage} carries{" "}
                        {STATS.teamReviewCount.toLocaleString()} verified reviews across the full team — a team
                        figure, listed here for context rather than presented as individual production.
                    </p>
                </div>
            </div>

            {/* ------------------------------------------------ CLIENT PHOTOS
                Real closings, captioned for what they show. Deliberately placed
                above the quotes and not interleaved with them: attaching a
                photograph of one family to another family's review would be a
                misattribution, however good it looked. */}
            <section className="border-b border-black/[0.08]">
                <SectionHead
                    eyebrow="Closing Day"
                    title={
                        <>
                            The part that
                            <br />
                            doesn't fit in a review
                        </>
                    }
                    aside={
                        <p className="max-w-sm font-sans text-body-sm text-neutral-500">
                            Handing over keys is the whole point of the job. These are clients at their homes on
                            closing day.
                        </p>
                    }
                />
                {/* These are vertical phone photos. Forcing them into a wide
                    banner crops away most of the frame and magnifies what's
                    left, so the frame matches the source: 3:4 portrait, in a
                    measured container rather than full-bleed. */}
                <div className="canvas py-section-sm">
                    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                        {CLIENT_PHOTOS.map((photo, i) => (
                            <Reveal key={photo.src} delay={i * 0.1}>
                                <figure className="group">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
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
            </section>

            {/* ---------------------------------------------------- REVIEWS */}
            <section>
                <SectionHead
                    eyebrow="Every Review"
                    title="What Clients Said"
                    aside={
                        <p className="max-w-xs font-sans text-body-sm text-neutral-500">
                            Unedited, in full, with the transaction each one came from.
                        </p>
                    }
                />

                <div className="mx-auto grid max-w-canvas grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {REVIEWS.map((review, i) => (
                        <Reveal
                            key={review.id}
                            delay={(i % 3) * 0.08}
                            className={cn(
                                "border-b border-black/[0.08]",
                                // Column rules, per breakpoint, without a stray
                                // rule on the last item in each row.
                                i % 2 === 0 && "md:border-r lg:border-r-0",
                                i % 3 !== 2 && "lg:border-r"
                            )}
                        >
                            <figure className="flex h-full flex-col p-6 md:p-10">
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="flex" aria-hidden="true">
                                        {Array.from({ length: review.rating }).map((_, s) => (
                                            <Star key={s} className="mr-0.5 h-3.5 w-3.5 fill-accent text-accent" />
                                        ))}
                                    </span>
                                    <time className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                        {review.date}
                                    </time>
                                </div>

                                {review.transaction && (
                                    <p className="mb-5 border-l-2 border-accent pl-4 font-sans text-[0.6875rem] font-bold uppercase leading-relaxed tracking-[0.08em] text-neutral-500">
                                        {review.transaction}
                                    </p>
                                )}

                                <blockquote className="mb-8 max-w-[46ch] flex-1 text-body text-neutral-600 text-pretty">
                                    “{review.text}”
                                </blockquote>

                                <figcaption className="mt-auto flex items-center gap-3 border-t border-black/[0.08] pt-5">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-black font-serif text-[0.6875rem] font-black tracking-wider text-white">
                                        {initials(review.author)}
                                    </span>
                                    <span>
                                        <span className="block font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-black">
                                            {review.author}
                                        </span>
                                        <span className="mt-0.5 block font-sans text-[0.5625rem] uppercase tracking-[0.15em] text-neutral-400">
                                            Verified client
                                        </span>
                                    </span>
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* -------------------------------------------------------- CTA */}
            <PhotoBand src={PHOTOS.ranchland.src} alt={PHOTOS.ranchland.alt} scrim={0.88}>
                <div className="mx-auto max-w-3xl px-6 py-section text-center md:px-12">
                    <Reveal>
                        <h2 className="mb-7 text-d2 uppercase text-white text-balance">
                            Be the next one
                        </h2>
                        <p className="mx-auto mb-11 max-w-xl text-body text-white/55 text-pretty">
                            Whether you're selling in Chino Hills, buying your first home in Ontario, or
                            underwriting a rental in Fontana — the first conversation costs nothing.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <ActionLink to="/contact" variant="invert">
                                Get Free Home Valuation
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

function initials(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

/**
 * Reviews arrive as human dates ("Jan 22, 2025"). schema.org datePublished
 * wants ISO 8601. An unparseable date drops the field rather than emitting an
 * invalid one — a malformed date invalidates the whole Review node.
 */
function toIsoDate(input: string): string | undefined {
    const parsed = new Date(input);
    if (Number.isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString().slice(0, 10);
}
