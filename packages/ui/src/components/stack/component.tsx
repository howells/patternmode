"use client";

import type { VariantProps } from "tailwind-variants";

import type { GapValue, ResponsiveSpacing, SpacingValue } from "../../lib/spacing-utils";
import * as React from "react";

import { tv } from "tailwind-variants";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
  getPaddingClass,
} from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";

/**
 * Stack direction options.
 */
type StackDirection = "vertical" | "horizontal";

// Stack variants using shared spacing utilities
const stackVariants = tv({
  base: "flex",
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  compoundVariants: [
    // Negative spacing for horizontal direction - these will be handled by responsive utilities
    // but keeping compound variants for complex negative spacing scenarios
    { direction: "horizontal", class: "space-x-0" }, // Base case for negative spacing
    { direction: "vertical", class: "space-y-0" }, // Base case for negative spacing
  ],
  defaultVariants: {
    direction: "vertical",
    wrap: false,
  },
});

type StackProps = {
  /**
   * The direction of the stack - can be responsive.
   * Controls whether children are arranged vertically or horizontally.
   */
  direction?: ResponsiveSpacing<StackDirection>;
  /**
   * Gap between items (4px grid scale) - can be responsive.
   * Supports values from 0-24 using the 4px grid system, plus negative values for overlapping.
   */
  gap?: ResponsiveSpacing<GapValue>;
  /**
   * Padding around the stack (4px grid scale) - can be responsive.
   * Adds internal spacing around all stack content using the 4px grid system.
   */
  padding?: ResponsiveSpacing<SpacingValue>;
  /**
   * How to align items along the cross axis.
   * Controls alignment perpendicular to the stack direction.
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /**
   * How to distribute items along the main axis.
   * Controls spacing and distribution along the stack direction.
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Whether items should wrap to new lines.
   * Allows content to flow to multiple rows/columns when space is limited.
   */
  wrap?: boolean;
  /**
   * The HTML element to render.
   * Allows semantic flexibility while maintaining stack layout behavior.
   */
  as?: React.ElementType;
  /**
   * Stack content.
   * The child elements to be arranged in the stack layout.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement> & Omit<VariantProps<typeof stackVariants>, "gap" | "padding" | "direction">;

/**
 * Layout component for arranging items vertically or horizontally with consistent spacing.
 */
const Stack = (
  { ref, direction = "vertical", gap, padding, align, justify, wrap = false, as: Component = "div", className, children, ...props }: StackProps & { ref?: React.RefObject<HTMLElement | null> },
) => {
  // Get base values for non-responsive cases
  const baseDirection = getBaseSpacingValue(direction) ?? "vertical";
  const baseGapValue = getBaseSpacingValue(gap) ?? 4;
  const basePadding = getBaseSpacingValue(padding);

  // Generate responsive classes using shared utilities
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveSpacingClasses("padding", padding);

  // Get base classes for fallback
  const baseGapClass = getGapClass(baseGapValue);
  const basePaddingClass = basePadding !== undefined ? getPaddingClass(basePadding) : "";

  // Generate responsive direction classes (custom logic since direction isn't standard spacing)
  const responsiveDirectionClasses = typeof direction === "object" && direction !== null
    ? Object.entries(direction)
        .map(([breakpoint, value]) => {
          if (value === undefined) {
            return "";
          }
          const prefix = breakpoint === "sm" ? "sm:" : breakpoint === "md" ? "md:" : breakpoint === "lg" ? "lg:" : breakpoint === "xl" ? "xl:" : breakpoint === "2xl" ? "2xl:" : "";
          return `${prefix}${value === "vertical" ? "flex-col" : "flex-row"}`;
        })
        .filter(Boolean)
        .join(" ")
    : "";

  const generatedClasses = stackVariants({
    direction: baseDirection as "vertical" | "horizontal",
    align,
    justify,
    wrap,
  });

  return (
    <Component
      ref={ref}
      className={cx(
        generatedClasses,
        baseGapClass,
        basePaddingClass,
        responsiveDirectionClasses,
        responsiveGapClasses,
        responsivePaddingClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Stack.displayName = "Stack";

/**
 * Vertical stack helper component.
 */
const VStack = ({ ref, ...props }: Omit<StackProps, "direction"> & { ref?: React.RefObject<HTMLElement | null> }) => <Stack ref={ref} direction="vertical" {...props} />;
VStack.displayName = "VStack";

/**
 * Horizontal stack helper component.
 */
const HStack = ({ ref, ...props }: Omit<StackProps, "direction"> & { ref?: React.RefObject<HTMLElement | null> }) => <Stack ref={ref} direction="horizontal" {...props} />;
HStack.displayName = "HStack";

export {
  HStack,
  type ResponsiveSpacing,
  Stack,
  type StackProps,
  stackVariants,
  VStack,
};
