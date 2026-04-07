import type { SemanticVariant } from "../lib/variant";

/**
 * Focus input variants aligned with semantic variants.
 */
type FocusInputVariant = SemanticVariant;

/** Focus input classes by variant - spelled out for Tailwind scanning */
const FOCUS_INPUT_CLASSES: Record<FocusInputVariant, readonly string[]> = {
  default: [
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-gray-400/50",
    "focus-visible:border-border",
    "data-[focused=true]:ring-2",
    "data-[focused=true]:ring-gray-400/50",
    "data-[focused=true]:border-border",
    "transition-[box-shadow,border-color]",
  ],
  secondary: [
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-gray-300/50",
    "focus-visible:border-border",
    "data-[focused=true]:ring-2",
    "data-[focused=true]:ring-gray-300/50",
    "data-[focused=true]:border-border",
    "transition-[box-shadow,border-color]",
  ],
  affirmative: [
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-green-400/50",
    "focus-visible:border-border",
    "data-[focused=true]:ring-2",
    "data-[focused=true]:ring-green-400/50",
    "data-[focused=true]:border-border",
    "transition-[box-shadow,border-color]",
  ],
  warning: [
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-amber-400/50",
    "focus-visible:border-border",
    "data-[focused=true]:ring-2",
    "data-[focused=true]:ring-amber-400/50",
    "data-[focused=true]:border-border",
    "transition-[box-shadow,border-color]",
  ],
  destructive: [
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-red-400/50",
    "focus-visible:border-border",
    "data-[focused=true]:ring-2",
    "data-[focused=true]:ring-red-400/50",
    "data-[focused=true]:border-border",
    "transition-[box-shadow,border-color]",
  ],
};

/**
 * Provides consistent focus styles for input-like components.
 * Supports both native :focus-visible and programmatic data-focused attribute.
 *
 * Variants aligned with semantic color system:
 * - default: gray-400 (standard input focus)
 * - secondary: gray-300
 * - affirmative: green-400
 * - warning: amber-400
 * - destructive: red-400
 *
 * @param variant - Focus ring color variant (defaults to "default")
 * @returns Array of Tailwind classes for focus ring styling
 *
 * @example
 * ```tsx
 * // Default gray focus ring
 * className={cn(focusInput(), "other-classes")}
 *
 * // Destructive red focus ring
 * className={cn(focusInput("destructive"), "other-classes")}
 * ```
 */
export function focusInput(variant: FocusInputVariant = "default") {
  return FOCUS_INPUT_CLASSES[variant];
}
