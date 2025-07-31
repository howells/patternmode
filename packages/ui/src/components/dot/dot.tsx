"use client";

import { cx } from "../../lib/utils";
import {
  getColorClasses,
  type GlobalSemanticVariant,
  type TailwindColor,
} from "../../lib/variants";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

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

interface DotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    Omit<VariantProps<typeof dotVariants>, "variant"> {
  /**
   * The semantic variant to display
 * @example
 * ```tsx
 * <Dot color="green" />
 * ```
   */
  variant?: DotVariant;
  /**
   * Optional label to display next to the dot
   */
  label?: string;
  /**
   * Whether to show animation for active statuses
   */
  animated?: boolean;
  /**
   * Size of the dot
   */
  size?: "sm" | "default" | "lg";
}

// Use the central getColorClasses utility

/**
 * A small dot indicator to show status or state.
 *
 * Dot
 *
 * @component
 * @id dot
 * @name Dot
 */
const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  (
    {
      variant = "default",
      label,
      animated = false,
      size = "default",
      className,
      ...props
    },
    ref
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
            animated && `before:bg-${colorClasses.color}-500`
          )}
          aria-hidden="true"
        />
        {label && <span>{label}</span>}
      </span>
    );
  }
);

Dot.displayName = "Dot";

export { Dot, dotIndicatorVariants, dotVariants, type DotProps };
