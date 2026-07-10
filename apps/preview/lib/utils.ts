import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and de-conflict Tailwind utilities.
 * @param inputs Class values to combine.
 * @returns The merged class string.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
