/**
 * SYSTEM PRIMITIVES
 *
 * Everything visual in this site is assembled from the pieces in this file.
 * If a page needs a new arrangement of utilities, the question to ask first is
 * whether it's really a new primitive — most of the time it isn't, and the
 * consistency is worth more than the variation.
 */
import { useState, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- MOTION */

/** The system easing. Every entrance uses it; nothing else is permitted. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered entrance.
 *
 * Honors prefers-reduced-motion by rendering the final state immediately
 * rather than animating to it — the content still appears, it just doesn't
 * travel. `once` is always true: re-animating on scroll-back reads as a bug.
 */
export function Reveal({
    children,
    delay = 0,
    y = 20,
    className,
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();
    if (reduce) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

/* --------------------------------------------------------------- LABELS */

/** Micro-caps label. `tone` picks the accessible accent stop for the ground. */
export function Eyebrow({
    children,
    tone = "light",
    className,
}: {
    children: ReactNode;
    tone?: "light" | "dark";
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-block font-sans text-eyebrow uppercase",
                // accent-deep clears 4.5:1 on white; plain accent would not.
                tone === "light" ? "text-accent-deep" : "text-accent",
                className
            )}
        >
            {children}
        </span>
    );
}

/** Short rule + label, used above stat blocks and column heads. */
export function RuleLabel({
    children,
    tone = "light",
    accentRule = false,
}: {
    children: ReactNode;
    tone?: "light" | "dark";
    accentRule?: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
            <span
                className={cn(
                    "block h-[2px] w-6 flex-shrink-0",
                    accentRule ? "bg-accent" : tone === "light" ? "bg-black" : "bg-white"
                )}
            />
            <span
                className={cn(
                    "font-sans text-eyebrow uppercase",
                    tone === "light" ? "text-black" : "text-white/60"
                )}
            >
                {children}
            </span>
        </div>
    );
}

/**
 * The standard section opener: eyebrow, display heading, optional right-hand
 * aside — sitting on a hairline rule. Reused on nearly every section so the
 * vertical rhythm of the whole site stays identical.
 */
export function SectionHead({
    eyebrow,
    title,
    aside,
    tone = "light",
    className,
}: {
    eyebrow: string;
    title: ReactNode;
    aside?: ReactNode;
    tone?: "light" | "dark";
    className?: string;
}) {
    return (
        <div
            className={cn(
                "border-b",
                tone === "light" ? "border-black/[0.08]" : "border-white/10",
                className
            )}
        >
            <div className="canvas flex flex-col gap-7 py-10 md:flex-row md:items-end md:justify-between md:py-14">
                <Reveal>
                    <Eyebrow tone={tone} className="mb-3">
                        {eyebrow}
                    </Eyebrow>
                    <h2
                        className={cn(
                            "text-d2 uppercase text-balance",
                            tone === "light" ? "text-black" : "text-white"
                        )}
                    >
                        {title}
                    </h2>
                </Reveal>
                {aside && (
                    <Reveal delay={0.1} className="md:text-right md:pl-8">
                        {aside}
                    </Reveal>
                )}
            </div>
        </div>
    );
}

/* ---------------------------------------------------------------- ACTIONS */

type ButtonVariant = "primary" | "invert" | "outline" | "outline-invert";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
    primary: "bg-black text-white hover:bg-accent hover:text-black",
    invert: "bg-white text-black hover:bg-accent hover:text-black",
    outline: "border border-black/20 text-black hover:border-black hover:bg-black hover:text-white",
    "outline-invert":
        "border border-white/30 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-black",
};

const BUTTON_BASE =
    "group inline-flex items-center justify-center gap-3 px-8 py-5 font-sans text-[0.6875rem] font-black uppercase tracking-[0.2em] transition-colors duration-300 ease-editorial";

/** Internal navigation action. */
export function ActionLink({
    to,
    children,
    variant = "primary",
    arrow = true,
    className,
}: {
    to: string;
    children: ReactNode;
    variant?: ButtonVariant;
    arrow?: boolean;
    className?: string;
}) {
    return (
        <Link to={to} className={cn(BUTTON_BASE, BUTTON_STYLES[variant], className)}>
            {children}
            {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </Link>
    );
}

/** External / tel: / mailto: action. Same visual contract as ActionLink. */
export function ActionAnchor({
    href,
    children,
    variant = "primary",
    arrow = true,
    external = true,
    className,
}: {
    href: string;
    children: ReactNode;
    variant?: ButtonVariant;
    arrow?: boolean;
    external?: boolean;
    className?: string;
}) {
    return (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(BUTTON_BASE, BUTTON_STYLES[variant], className)}
        >
            {children}
            {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </a>
    );
}

/** Understated inline link with an underline that draws in on hover. */
export function QuietLink({
    to,
    children,
    tone = "light",
}: {
    to: string;
    children: ReactNode;
    tone?: "light" | "dark";
}) {
    return (
        <Link
            to={to}
            className={cn(
                "group inline-flex items-center gap-2 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] transition-colors",
                tone === "light" ? "text-black hover:text-accent-deep" : "text-white hover:text-accent"
            )}
        >
            <span>{children}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
    );
}

/* ------------------------------------------------------------------ STATS */

/**
 * The oversized numeral. This is the system's loudest single element, so a
 * page gets one hero stat at most — after that they stop reading as emphasis.
 */
export function HeroStat({
    value,
    label,
    tone = "light",
}: {
    value: string;
    label: string;
    tone?: "light" | "dark";
}) {
    return (
        <div className="flex items-end gap-4">
            <span
                className={cn(
                    "font-serif text-stat",
                    tone === "light" ? "text-black" : "text-white"
                )}
            >
                {value}
            </span>
            <span
                className={cn(
                    "pb-2 font-sans text-eyebrow uppercase",
                    tone === "light" ? "text-neutral-400" : "text-white/40"
                )}
            >
                {label}
            </span>
        </div>
    );
}

/**
 * Divided row of supporting figures. Sits under a HeroStat.
 *
 * Columns are derived from the item count rather than fixed at four. A hard
 * `sm:grid-cols-4` looks correct with exactly four stats and leaves a visibly
 * dead cell with three — which is what shipped the first time.
 */
const STAT_COLUMNS: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-5",
    6: "grid-cols-3 sm:grid-cols-6",
};

export function StatRow({
    stats,
    tone = "light",
}: {
    stats: readonly { value: string; label: string }[];
    tone?: "light" | "dark";
}) {
    const light = tone === "light";
    const rule = light ? "border-black/[0.08]" : "border-white/10";
    // Only the 4-stat layout wraps to two rows on mobile; every other count
    // stays on one line, so the divider rule differs between the two cases.
    const wraps = stats.length === 4;

    return (
        <div className={cn("grid border-t pt-5", STAT_COLUMNS[stats.length] ?? "grid-cols-2", rule)}>
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className={cn(
                        "py-2 pr-3",
                        wraps
                            ? cn(i % 2 !== 0 && "border-l pl-4 sm:pl-5", i % 2 === 0 && i > 0 && "sm:border-l sm:pl-5")
                            : i > 0 && "border-l pl-4 sm:pl-5",
                        i > 0 && rule
                    )}
                >
                    <span
                        className={cn(
                            "block font-serif text-[1.25rem] font-black leading-[1.1] tracking-tight md:text-[1.5rem]",
                            light ? "text-black" : "text-white"
                        )}
                    >
                        {stat.value}
                    </span>
                    <span
                        className={cn(
                            "mt-2 block font-sans text-micro uppercase",
                            light ? "text-neutral-400" : "text-white/35"
                        )}
                    >
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

/**
 * FAQ section with the heading beside the questions on wide screens.
 *
 * The single-column version left roughly half a 1600px viewport empty next to
 * a max-w-4xl accordion. Pairing a sticky heading column with the questions
 * fills that space, keeps the section title visible while a long list is being
 * read, and matches the two-column rhythm the rest of the page already uses.
 */
export function FaqSection({
    eyebrow,
    title,
    note,
    faqs,
    tone = "light",
    id = "faq",
}: {
    eyebrow: string;
    title: ReactNode;
    note?: string;
    faqs: readonly { q: string; a: string }[];
    tone?: "light" | "dark";
    id?: string;
}) {
    const light = tone === "light";
    return (
        <section
            id={id}
            className={cn("border-t", light ? "border-black/[0.08]" : "on-dark border-white/10 bg-black")}
        >
            <div className="canvas py-section-sm">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.75fr] lg:gap-20">
                    <Reveal className="lg:sticky lg:top-32 lg:self-start">
                        <Eyebrow tone={tone} className="mb-4">
                            {eyebrow}
                        </Eyebrow>
                        <h2 className={cn("text-d2 uppercase text-balance", light ? "text-black" : "text-white")}>
                            {title}
                        </h2>
                        {note && (
                            <p
                                className={cn(
                                    "mt-6 max-w-xs text-body-sm text-pretty",
                                    light ? "text-neutral-500" : "text-white/45"
                                )}
                            >
                                {note}
                            </p>
                        )}
                    </Reveal>

                    <div>
                        <FaqAccordion faqs={faqs} tone={tone} />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* --------------------------------------------------------------- MARQUEE */

/**
 * Infinite logo/claim rail.
 *
 * The children are rendered twice and the track translates exactly -50%, which
 * is what makes the loop seamless. Duplicating the content is not a mistake —
 * the second copy is aria-hidden so screen readers hear the list once.
 */
export function Marquee({
    children,
    duration = "60s",
    className,
}: {
    children: ReactNode;
    duration?: string;
    className?: string;
}) {
    return (
        <div className={cn("fade-x relative w-full overflow-hidden", className)}>
            <div
                className="flex w-max animate-marquee motion-reduce:animate-none"
                style={{ ["--marquee-duration" as string]: duration }}
            >
                <div className="flex flex-none items-center">{children}</div>
                <div className="flex flex-none items-center" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* --------------------------------------------------------------------- FAQ */

/**
 * Accessible accordion.
 *
 * Every answer stays mounted whether or not its panel is open — the panel is
 * animated to zero height, never unmounted. That is load-bearing, not a style
 * choice: these same strings are emitted as FAQPage schema, and schema
 * describing text that isn't in the HTML is both a structured-data violation
 * and useless to an answer engine that can't find the visible copy. Wrapping
 * this in <AnimatePresence> would silently drop every collapsed answer from
 * the prerendered document.
 */
export function FaqAccordion({
    faqs,
    tone = "light",
}: {
    faqs: readonly { q: string; a: string }[];
    tone?: "light" | "dark";
}) {
    const [open, setOpen] = useState<number | null>(0);
    const reduce = useReducedMotion();
    const light = tone === "light";

    return (
        <div className={cn("border-t", light ? "border-black/[0.08]" : "border-white/10")}>
            {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                    <div
                        key={faq.q}
                        className={cn("border-b", light ? "border-black/[0.08]" : "border-white/10")}
                    >
                        <h3>
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${i}`}
                                id={`faq-trigger-${i}`}
                                className={cn(
                                    "flex w-full items-start justify-between gap-6 py-7 text-left transition-colors md:py-8",
                                    light ? "hover:bg-neutral-50/60" : "hover:bg-white/[0.03]"
                                )}
                            >
                                <span
                                    className={cn(
                                        "font-serif text-[0.95rem] font-black leading-snug tracking-tight md:text-[1.0625rem]",
                                        light ? "text-black" : "text-white"
                                    )}
                                >
                                    {faq.q}
                                </span>
                                <span
                                    className={cn(
                                        "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center border transition-colors",
                                        isOpen
                                            ? "border-accent bg-accent text-black"
                                            : light
                                              ? "border-black/15 text-black"
                                              : "border-white/20 text-white"
                                    )}
                                >
                                    {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                                </span>
                            </button>
                        </h3>
                        <motion.div
                            id={`faq-panel-${i}`}
                            role="region"
                            aria-labelledby={`faq-trigger-${i}`}
                            initial={false}
                            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }}
                            className="overflow-hidden"
                        >
                            <p
                                className={cn(
                                    "max-w-[68ch] pb-8 pr-6 text-body text-pretty md:pr-10",
                                    light ? "text-neutral-600" : "text-white/55"
                                )}
                            >
                                {faq.a}
                            </p>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}

/* ---------------------------------------------------------------- IMAGERY */

/**
 * Full-bleed photographic band with a black scrim.
 *
 * `scrim` is a 0-1 opacity, not a class, because every one of these needs a
 * different value to keep white text at contrast over a different photo.
 */
export function PhotoBand({
    src,
    alt,
    scrim = 0.82,
    grayscale = false,
    children,
    className,
    priority = false,
}: {
    src: string;
    alt: string;
    scrim?: number;
    grayscale?: boolean;
    children: ReactNode;
    className?: string;
    priority?: boolean;
}) {
    return (
        <section className={cn("on-dark relative overflow-hidden", className)}>
            <div className="absolute inset-0 z-0">
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    // The decorative band image must never beat the LCP element
                    // to the network on pages where it isn't the hero.
                    fetchPriority={priority ? "high" : "low"}
                    decoding="async"
                    className={cn("h-full w-full object-cover", grayscale && "grayscale")}
                />
                <div className="absolute inset-0 bg-black" style={{ opacity: scrim }} />
            </div>
            <div className="relative z-10">{children}</div>
        </section>
    );
}

/* --------------------------------------------------------- SCROLL RAIL */

/** Horizontal card rail with keyboard-reachable prev/next controls. */
export function ScrollRail({
    children,
    label,
    tone = "light",
}: {
    children: ReactNode;
    label: string;
    tone?: "light" | "dark";
}) {
    const ref = useRef<HTMLDivElement>(null);

    const scroll = (dir: -1 | 1) => {
        const el = ref.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>("[data-rail-item]");
        el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: "smooth" });
    };

    return (
        <div className="relative">
            <div
                ref={ref}
                role="region"
                aria-label={label}
                tabIndex={0}
                className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
            >
                {children}
            </div>
            <div className="mt-8 flex gap-2">
                {([-1, 1] as const).map((dir) => (
                    <button
                        key={dir}
                        type="button"
                        onClick={() => scroll(dir)}
                        aria-label={dir === -1 ? `Previous ${label}` : `Next ${label}`}
                        className={cn(
                            "flex h-11 w-11 items-center justify-center border transition-colors",
                            tone === "light"
                                ? "border-black/15 text-black hover:border-black hover:bg-black hover:text-white"
                                : "border-white/20 text-white hover:border-white hover:bg-white hover:text-black"
                        )}
                    >
                        <ArrowRight className={cn("h-4 w-4", dir === -1 && "rotate-180")} />
                    </button>
                ))}
            </div>
        </div>
    );
}
