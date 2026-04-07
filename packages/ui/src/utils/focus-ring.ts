import type { SemanticVariant } from "../lib/variant";

/**
 * Focus ring variants aligned with semantic variants + brand.
 */
type FocusRingVariant = SemanticVariant | "brand";

/** Focus ring classes by variant - spelled out for Tailwind scanning */
const FOCUS_RING_CLASSES: Record<FocusRingVariant, readonly string[]> = {
  default: [
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-gray-400/50",
    "data-[focused=true]:ring-[3px]",
    "data-[focused=true]:ring-gray-400/50",
    "transition-[box-shadow]",
  ],
  secondary: [
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-gray-300/50",
    "data-[focused=true]:ring-[3px]",
    "data-[focused=true]:ring-gray-300/50",
    "transition-[box-shadow]",
  ],
  affirmative: [
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-green-400/50",
    "data-[focused=true]:ring-[3px]",
    "data-[focused=true]:ring-green-400/50",
    "transition-[box-shadow]",
  ],
  warning: [
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-amber-400/50",
    "data-[focused=true]:ring-[3px]",
    "data-[focused=true]:ring-amber-400/50",
    "transition-[box-shadow]",
  ],
  destructive: [
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-red-400/50",
    "data-[focused=true]:ring-[3px]",
    "data-[focused=true]:ring-red-400/50",
    "transition-[box-shadow]",
  ],
  brand: [
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-yellow-400/25",
    "data-[focused=true]:ring-[3px]",
    "data-[focused=true]:ring-yellow-400/25",
    "transition-[box-shadow]",
  ],
};

/**
 * Provides consistent focus styles for interactive elements (buttons, links, etc.).
 * Supports both native :focus-visible and programmatic data-focused attribute.
 *
 * Variants aligned with semantic color system:
 * - default: gray-400
 * - secondary: gray-300
 * - affirmative: green-400
 * - warning: amber-400
 * - destructive: red-400
 * - brand: yellow-400
 *
 * @param variant - Focus ring color variant (defaults to "default")
 * @returns Array of Tailwind classes for focus ring styling
 *
 * @example
 * ```tsx
 * // Default gray focus ring
 * className={cn(focusRing(), "other-classes")}
 *
 * // Affirmative green focus ring
 * className={cn(focusRing("affirmative"), "other-classes")}
 *
 * // Destructive red focus ring
 * className={cn(focusRing("destructive"), "other-classes")}
 * ```
 */
export function focusRing(variant: FocusRingVariant = "default") {
  return FOCUS_RING_CLASSES[variant];
}
