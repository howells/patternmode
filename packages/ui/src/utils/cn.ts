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
 * cn utility.
 * Import from "@patternmode/ui/utils/cn".
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
