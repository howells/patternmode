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
 */
type LoaderProps = {
  /**
   * The size variant of the loader icon.
   * Controls the width and height dimensions of the spinner.
   * @default "base"
   */
  "size"?: "xs" | "sm" | "base" | "lg" | "xl";

  /**
   * Accessible label for screen readers describing the loading state.
   * Essential for accessibility when the loader has no visible text.
   */
  "aria-label"?: string;

  /**
   * Optional visible label text displayed to the right of the spinner.
   * If provided without aria-label, will also be used as the aria-label.
   * Creates a horizontal layout with the spinner and text side by side.
   */
  "label"?: string;
} & React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof loaderVariants>;

/**
 * Spinning loader component for indicating loading states and async operations.
 */
const Loader = ({
  ref: forwardedRef,
  size = "base",
  className,
  "aria-label": ariaLabel,
  label,
  ...props
}: LoaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
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
