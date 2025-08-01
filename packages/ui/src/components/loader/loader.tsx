/**
 * Loader Component.
 *
 * A spinning loader component for indicating loading states and async operations.
 * Built with Lucide React's Loader2 icon and tailwind-variants for consistent
 * sizing and styling across different contexts.
 *
 * Features:
 * - Multiple size variants (xs, sm, base, lg, xl)
 * - Smooth CSS animation with spin effect
 * - Accessible with screen reader support
 * - Inherits text color from parent context
 * - Consistent styling with tailwind-variants
 * - Centered alignment with flexbox.
 *
 * @example
 * ```tsx
 * // Basic loader
 * <Loader aria-label="Loading..." />
 *
 * // Different sizes
 * <Loader size="xs" aria-label="Small loader" />
 * <Loader size="lg" aria-label="Large loader" />
 * <Loader size="xl" aria-label="Extra large loader" />
 *
 * // With custom styling
 * <Loader
 *   size="lg"
 *   className="text-blue-500"
 *   aria-label="Loading data"
 * />
 *
 * // In button context
 * <button disabled className="flex items-center gap-2">
 *   <Loader size="sm" aria-label="Submitting" />
 *   <span>Submitting...</span>
 * </button>
 *
 * // Loading state indicator
 * <div className="text-center py-8">
 *   <Loader size="lg" aria-label="Loading content" />
 *   <p className="mt-2 text-zinc-600">Please wait...</p>
 * </div>
 *
 * // Card loading state
 * <div className="bg-white rounded-lg p-6 shadow">
 *   <div className="flex justify-center">
 *     <Loader aria-label="Loading card content" />
 *   </div>
 * </div>
 * ```
 */

import type { VariantProps } from "tailwind-variants";

import { Loader2 } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

/**
 * Tailwind variants for the loader component.
 *
 * Defines size variants and base styling for the spinning loader icon.
 * Uses CSS animation for smooth rotation and inherits color from parent.
 */
const loaderVariants = tv({
  base: [
    // base
    "animate-spin",
    // text color - inherit from parent
    "text-current",
  ],
  variants: {
    size: {
      /**
       * Extra small - 12px (0.75rem).
       */
      xs: "size-3",
      /**
       * Small - 16px (1rem).
       */
      sm: "size-4",
      /**
       * Base/default - 16px (1rem).
       */
      base: "size-4",
      /**
       * Large - 24px (1.5rem).
       */
      lg: "size-6",
      /**
       * Extra large - 32px (2rem).
       */
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

/**
 * Props for the Loader component.
 *
 * Extends HTML div props with size variants and accessibility support.
 *
 * @interface LoaderProps
 * @augments React.ComponentPropsWithoutRef<"div">
 * @augments VariantProps<typeof loaderVariants>
 */
type LoaderProps = {
  /**
   * Accessible label for screen readers describing the loading state.
   */
  "aria-label"?: string;
  /**
   * Optional visible label text displayed to the right of the spinner.
   * If provided without aria-label, will also be used as the aria-label.
   */
  "label"?: string;
} & React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof loaderVariants>;

/**
 * Loading indicator component with various animation styles for async operations.
 *
 * @id loader
 * @name Loader
 * @icon Loader2
 * @category ui
 * @component
 * @param props - Component properties.
 */
const Loader = ({ ref: forwardedRef, size, className, "aria-label": ariaLabel, label, ...props }: LoaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const finalAriaLabel = ariaLabel || label;

  return (
    <div
      ref={forwardedRef}
      className={cx("inline-flex items-center justify-center", label && "gap-3", className)}
      {...props}
    >
      <Loader2 className={cx(loaderVariants({ size }))} aria-hidden="true" />
      {label && <span className="text-current">{label}</span>}
      {finalAriaLabel && <span className="sr-only">{finalAriaLabel}</span>}
    </div>
  );
};

Loader.displayName = "Loader";

export { Loader, type LoaderProps, loaderVariants };
