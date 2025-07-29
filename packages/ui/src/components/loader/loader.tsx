/**
 * Loader Component
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
 * - Centered alignment with flexbox
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

import { Loader2 } from "lucide-react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

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
      /** Extra small - 12px (0.75rem) */
      xs: "size-3",
      /** Small - 16px (1rem) */
      sm: "size-4",
      /** Base/default - 16px (1rem) */
      base: "size-4",
      /** Large - 24px (1.5rem) */
      lg: "size-6",
      /** Extra large - 32px (2rem) */
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
 * @extends React.ComponentPropsWithoutRef<"div">
 * @extends VariantProps<typeof loaderVariants>
 */
interface LoaderProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof loaderVariants> {
  /** Accessible label for screen readers describing the loading state */
  "aria-label"?: string;
}

/**
 * A spinning loader component for indicating loading states.
 *
 * Displays a rotating icon to indicate that content is loading or an
 * operation is in progress. Provides visual feedback to users during
 * async operations with accessible screen reader support.
 *
 * @param size - Size variant for the loader (xs, sm, base, lg, xl)
 * @param className - Additional CSS classes
 * @param aria-label - Accessible description for screen readers
 * @param props - Additional HTML div props
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Loader aria-label="Loading..." />
 *
 * // Large loader
 * <Loader size="lg" aria-label="Loading data" />
 *
 * // Custom color
 * <Loader className="text-blue-500" aria-label="Processing" />
 *
 * // In button
 * <button disabled>
 *   <Loader size="sm" aria-label="Submitting" />
 *   <span>Submit</span>
 * </button>
 * ```
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ size, className, "aria-label": ariaLabel, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cx("inline-flex items-center justify-center", className)}
        {...props}
      >
        <Loader2 className={cx(loaderVariants({ size }))} aria-hidden="true" />
        {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
      </div>
    );
  }
);

Loader.displayName = "Loader";

export { Loader, loaderVariants, type LoaderProps };
