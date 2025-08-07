/**
 * Tailwind CSS Utilities
 *
 * Helper functions for working with Tailwind CSS classes.
 */

import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
