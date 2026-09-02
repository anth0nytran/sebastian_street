/**
 * QuickLaunchWeb "Editorial Authority" design system.
 * See BLUEPRINT.md for the reasoning behind every token here.
 *
 * Two rules govern this file:
 *  1. Nothing is rounded. --radius is 0 and stays 0. The whole system reads as
 *     print/legal/architectural, and a single stray rounded-lg breaks it.
 *  2. There is exactly ONE chromatic accent. Everything else is black, white,
 *     or a neutral. Restraint is what makes the accent land.
 */
import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                // "serif" is a role, not a classification: it's the display face.
                // Montserrat at weight 900 gives the compressed editorial headline
                // that carries this system. Inter carries every running text.
                serif: ['"Montserrat"', "system-ui", "sans-serif"],
                sans: ['"Inter"', "system-ui", "sans-serif"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                /**
                 * The single accent, in three calibrated stops.
                 *
                 * accent       #C9A227  — fills, rules, icons, and text ON DARK.
                 *                         4.9:1 on #0A0A0A. Safe for small text there.
                 * accent-deep  #7A5E0C  — the ON-WHITE text stop. 5.6:1 on white,
                 *                         so micro-caps labels stay WCAG AA. Never
                 *                         use plain `accent` for small text on white.
                 * accent-soft  #E8CF7A  — hairlines and 5-10% wash fills only.
                 */
                accent: {
                    DEFAULT: "#C9A227",
                    deep: "#7A5E0C",
                    soft: "#E8CF7A",
                    foreground: "#0A0A0A",
                },
            },
            /** Everything is square. This is the system's loudest decision. */
            borderRadius: {
                lg: "var(--radius)",
                md: "var(--radius)",
                sm: "var(--radius)",
            },
            /**
             * Fluid display scale. Replaces `text-3xl md:text-5xl lg:text-6xl`
             * chains — one class, continuous across every viewport, no jumps at
             * breakpoints. d1 is the hero, d4 is a card heading.
             */
            fontSize: {
                d1: ["clamp(2.5rem, 7vw, 5.75rem)", { lineHeight: "0.94", letterSpacing: "-0.03em", fontWeight: "900" }],
                d2: ["clamp(2rem, 5.2vw, 4rem)", { lineHeight: "0.98", letterSpacing: "-0.025em", fontWeight: "900" }],
                d3: ["clamp(1.6rem, 3.4vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "900" }],
                d4: ["clamp(1.15rem, 2vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "900" }],
                /** The counter/statistic face. Enormous, tight, unmistakable. */
                stat: ["clamp(3.25rem, 8vw, 7.5rem)", { lineHeight: "0.78", letterSpacing: "-0.045em", fontWeight: "900" }],
                /** Micro-caps eyebrow label — the system's connective tissue. */
                eyebrow: ["0.5625rem", { lineHeight: "1.2", letterSpacing: "0.3em", fontWeight: "700" }],
                /**
                 * The smallest label in the system. Anything below this stops
                 * being quiet and starts being unreadable — 8px caps at
                 * 0.22em tracking is a squint, not a detail.
                 */
                micro: ["0.5625rem", { lineHeight: "1.5", letterSpacing: "0.22em", fontWeight: "700" }],
                /**
                 * Running body copy.
                 *
                 * Fluid, not fixed. A flat 15px is comfortable on a phone and
                 * mean on a 1920px display, where the same type sits in a much
                 * wider column and the eye has further to travel per line. It
                 * grows to 17px, and the leading eases off slightly as it does
                 * — long lines need proportionally less leading, not more.
                 */
                body: ["clamp(0.9375rem, 0.885rem + 0.22vw, 1.0625rem)", { lineHeight: "1.78" }],
                "body-sm": ["clamp(0.8125rem, 0.785rem + 0.12vw, 0.9375rem)", { lineHeight: "1.75" }],
            },
            /** Named section rhythm so vertical spacing is decided once. */
            spacing: {
                section: "clamp(4.5rem, 9vw, 9.5rem)",
                "section-sm": "clamp(3rem, 5.5vw, 6.5rem)",
                gutter: "clamp(1.5rem, 4vw, 4rem)",
            },
            maxWidth: {
                /** Full editorial bleed — the grid container. */
                canvas: "1800px",
                /**
                 * Measure caps. Running prose past ~75 characters costs the
                 * reader the start of the next line; these are the guardrails.
                 * `measure` is the default for body copy inside a wide card.
                 */
                "measure-sm": "28rem",
                measure: "34rem",
                "measure-lg": "42rem",
            },
            transitionTimingFunction: {
                /** The system easing. Used for every non-trivial transition. */
                editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
                /** Slower sibling, for morphing chrome (the nav pill). */
                morph: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
            keyframes: {
                marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
                "reveal-up": {
                    from: { opacity: "0", transform: "translateY(1.25rem)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                marquee: "marquee var(--marquee-duration, 60s) linear infinite",
                "reveal-up": "reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
            },
        },
    },
    plugins: [tailwindcssAnimate],
}
