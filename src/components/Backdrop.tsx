import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ARCHITECTURAL BACKDROP — the type-led alternative to a photographic hero.
 *
 * Why this exists instead of a stock photo:
 *
 * A geo-targeted site makes a geographic claim on every page. A hero photo of
 * somewhere else quietly contradicts it — coastal imagery on an Inland Empire
 * page reads as "this agent works at the beach", and an alt attribute naming a
 * city the photo isn't of is simply false. Until real local photography exists,
 * a drafting-table surface of hairline rules says nothing untrue, weighs
 * nothing (no image request at all, so it can never be the LCP bottleneck),
 * and suits a system already built on 1px rules and heavy display type.
 *
 * Entirely CSS: a measured grid, a corner wash, and an optional oversized ghost
 * numeral for depth. Swap in <PhotoBand> per-page once genuine local photos
 * are available — the layout contract is identical.
 */
export function Backdrop({
    children,
    ghost,
    className,
    grid = true,
}: {
    children: ReactNode;
    /** Oversized watermark glyph or word behind the content. */
    ghost?: string;
    className?: string;
    grid?: boolean;
}) {
    return (
        <section className={cn("on-dark relative overflow-hidden bg-black", className)}>
            {/* Drafting grid. Two layers at different scales keeps it from
                reading as a flat repeating texture. */}
            {grid && (
                <>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.16]"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "clamp(3rem, 7vw, 6rem) clamp(3rem, 7vw, 6rem)",
                            maskImage: "radial-gradient(120% 90% at 50% 0%, #000 15%, transparent 78%)",
                            WebkitMaskImage:
                                "radial-gradient(120% 90% at 50% 0%, #000 15%, transparent 78%)",
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, rgba(201,162,39,0.9) 1px, transparent 1px)",
                            backgroundSize: "clamp(12rem, 26vw, 22rem) 100%",
                        }}
                    />
                </>
            )}

            {/* Warm corner wash — the only place the accent appears as light. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(90% 60% at 82% 8%, rgba(201,162,39,0.16), transparent 60%), radial-gradient(70% 50% at 0% 100%, rgba(255,255,255,0.05), transparent 55%)",
                }}
            />

            {/* Ghost glyph. Clipped to the band and pinned to the baseline so it
                reads as a watermark sunk into the surface rather than a stray
                shape. Sized off the band, not the viewport, so it stays
                proportional in a short hero and a tall one alike. */}
            {ghost && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 hidden translate-y-[0.22em] select-none font-serif font-black leading-none tracking-tighter text-white/[0.04] sm:block"
                    style={{ fontSize: "clamp(9rem, 22vw, 20rem)", paddingRight: "0.04em" }}
                >
                    {ghost}
                </span>
            )}

            {/* Base rule, so the band always closes on a hard edge. */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

            {/*
             * w-full is load-bearing. `className` lands on the <section>, which
             * is where callers put their flex/min-height, so this wrapper is the
             * flex ITEM. Without w-full it shrinks to its content and every
             * `mx-auto` inside centres against the wrong box — which reads as
             * the whole hero drifting left of centre on wide screens.
             */}
            <div className="relative z-10 w-full">{children}</div>
        </section>
    );
}
