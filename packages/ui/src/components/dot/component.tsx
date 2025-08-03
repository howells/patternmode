"use client";

import type { VariantProps } from "tailwind-variants";
import type { GlobalSemanticVariant, TailwindColor } from "../../lib/variants";
import React from "react";

import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
import {
  getColorClasses,
} from "../../lib/variants";

// Dot-specific variant type (semantic + all Tailwind colors)
export type DotVariant = GlobalSemanticVariant | TailwindColor;

// Simple dot variants - just handle sizing
const dotVariants = tv({
  base: ["inline-flex items-center gap-2", "font-medium"],
  variants: {
    size: {
      sm: "text-2xs",
      default: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// Simple dot indicator variants - just handle sizing and base styles
const dotIndicatorVariants = tv({
  base: ["relative rounded-full", "flex-shrink-0"],
  variants: {
    size: {
      sm: "w-1.5 h-1.5",
      default: "w-2 h-2",
      lg: "w-2.5 h-2.5",
    },
    animated: {
      true: "animate-pulse before:absolute before:inset-0 before:rounded-full before:animate-ping before:opacity-75",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    animated: false,
  },
});

type DotProps = {
  /**
   * The semantic variant to display.
   * Supports both semantic variants (success, warning, error, etc.) and all Tailwind color names.
   * @default "default"
   * @example
   * ```tsx
   * <Dot variant="success" />
   * <Dot variant="blue" />
   * ```
   */
  variant?: DotVariant;
  /**
   * Optional label to display next to the dot.
   * When provided, creates a labeled indicator with text.
   */
  label?: string;
  /**
   * Whether to show animation for active statuses.
   * Adds a pulsing animation effect to indicate activity.
   * @default false
   */
  animated?: boolean;
  /**
   * Size of the dot.
   * Controls both the dot size and text size when label is provided.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
} & React.HTMLAttributes<HTMLSpanElement> & Omit<VariantProps<typeof dotVariants>, "variant">;

/**
 * Small circular indicator component for status, notifications, or decorative purposes.
 */
const Dot = (
  { ref, variant = "default", label, animated = false, size = "default", className, ...props }: DotProps & { ref?: React.RefObject<HTMLSpanElement | null> },
) => {
  const colorClasses = getColorClasses(variant);

  return (
    <span
      ref={ref}
      className={cx(dotVariants({ size }), colorClasses.text, className)}
      {...props}
    >
      <span
        className={cx(
          dotIndicatorVariants({ size, animated }),
          colorClasses.bgSolid,
          // Add dynamic before: color for animation
          animated && `before:bg-${colorClasses.color}-500`,
        )}
        aria-hidden="true"
      />
      {label && <span>{label}</span>}
    </span>
  );
};

Dot.displayName = "Dot";

export { Dot, dotIndicatorVariants, type DotProps, dotVariants };
