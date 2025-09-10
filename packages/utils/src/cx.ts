// Re-export cx function for external use
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines CSS class names using clsx and merges Tailwind CSS classes with tailwind-merge.
 *
 * @param inputs - CSS class names, objects, or arrays to be combined
 * @returns A merged string of CSS class names with Tailwind conflicts resolved
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
