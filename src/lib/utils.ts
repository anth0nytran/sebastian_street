import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about our custom font sizes.
 *
 * Out of the box it only knows Tailwind's stock scale, so it can't tell
 * whether `text-d2` is a font size or a text colour — and it guesses colour.
 * That makes `cn("text-d2", "text-black")` resolve to just `text-black`,
 * silently dropping the type scale and rendering a display heading at body
 * size. It looks like a CSS bug and it isn't one.
 *
 * Registering the custom scale under `font-size` puts `text-d2` in the right
 * conflict group, so it collides with other sizes and coexists with colours.
 * Any font size added to tailwind.config.js must be added here too.
 */
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": [
                { text: ["d1", "d2", "d3", "d4", "stat", "eyebrow", "micro", "body", "body-sm"] },
            ],
        },
    },
});

/** Conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
