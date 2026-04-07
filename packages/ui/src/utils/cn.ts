import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom tailwind-merge configured for Tailwind v4.
 *
 * In Tailwind v4, font-size utilities (text-*) use CSS variables for line-height:
 * `line-height: var(--tw-leading, var(--text-lg--line-height))`
 *
 * Leading utilities (leading-*) set the --tw-leading variable, so they work
 * together rather than conflicting. We override the default conflictingClassGroups
 * to prevent tailwind-merge from stripping leading-* when text-* is present.
 */
const twMerge = extendTailwindMerge({
  override: {
    conflictingClassGroups: {
      "font-size": [],
    },
  },
});

/**
 * Merge and deduplicate Tailwind CSS class names.
 * Combines clsx conditional logic with tailwind-merge conflict resolution.
 *
 * @param inputs - Class values (strings, arrays, objects, or falsy values)
 * @returns Merged and deduplicated class string
 *
 * @example
 * ```ts
 * cn("px-4 py-2", isActive && "bg-primary", "px-6");
 * // → "py-2 px-6 bg-primary" (px-6 wins over px-4)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
