"use client";

import type { VariantProps } from "tailwind-variants";

import type { GapValue, ResponsiveSpacing, SpacingValue } from "../../lib/spacing-utils";
import * as React from "react";

import { tv } from "tailwind-variants";
import {

  gapVariants,
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  paddingVariants,

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
    gap: gapVariants,
    padding: paddingVariants,
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
    // Negative spacing for horizontal direction
    { direction: "horizontal", gap: "-6", class: "-space-x-6" },
    { direction: "horizontal", gap: "-5", class: "-space-x-5" },
    { direction: "horizontal", gap: "-4", class: "-space-x-4" },
    { direction: "horizontal", gap: "-3", class: "-space-x-3" },
    { direction: "horizontal", gap: "-2", class: "-space-x-2" },
    { direction: "horizontal", gap: "-1", class: "-space-x-1" },
    // Negative spacing for vertical direction
    { direction: "vertical", gap: "-6", class: "-space-y-6" },
    { direction: "vertical", gap: "-5", class: "-space-y-5" },
    { direction: "vertical", gap: "-4", class: "-space-y-4" },
    { direction: "vertical", gap: "-3", class: "-space-y-3" },
    { direction: "vertical", gap: "-2", class: "-space-y-2" },
    { direction: "vertical", gap: "-1", class: "-space-y-1" },
  ],
  defaultVariants: {
    direction: "vertical",
    gap: "4",
    wrap: false,
  },
});

/**
 * Stack gap values using 4px grid scale.
 * Accepts both numbers and strings for developer convenience.
 */
type StackGap = "-6" | "-5" | "-4" | "-3" | "-2" | "-1" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

// Helper function to convert gap values to strings
const normalizeGapValue = (value: StackGap): string => {
  return String(value);
};

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
  // Get base values for the variants system
  const baseDirection = getBaseSpacingValue(direction) ?? "vertical";
  const baseGapValue = getBaseSpacingValue(gap) ?? 4;
  const basePadding = getBaseSpacingValue(padding);

  // Normalize gap value to string for tailwind variants
  const baseGap = normalizeGapValue(baseGapValue);

  // Debug logging for negative gaps
  if (typeof baseGapValue === "number" && baseGapValue < 0) {
    console.warn("Stack Debug:", {
      direction: baseDirection,
      gap: baseGap,
      baseGapValue,
      originalGap: gap,
    });
  }

  // Generate responsive classes using shared utilities
  const responsiveDirectionClasses = generateResponsiveSpacingClasses(
    "gap", // Using gap as placeholder since we need custom logic for direction
    direction as ResponsiveSpacing<GapValue>, // Type assertion for compatibility
  )
    .replace(/gap-/g, "")
    .split(" ")
    .map((cls) => {
      if (cls.includes("vertical")) {
        return cls.replace("vertical", "flex-col");
      }
      if (cls.includes("horizontal")) {
        return cls.replace("horizontal", "flex-row");
      }
      return cls;
    })
    .join(" ");

  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveSpacingClasses("padding", padding);

  const generatedClasses = stackVariants({
    direction: baseDirection as "vertical" | "horizontal",
    gap: baseGap as "4" | "0" | "1" | "2" | "3" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | "-6" | "-5" | "-4" | "-3" | "-2" | "-1",
    padding: basePadding as SpacingValue,
    align,
    justify,
    wrap,
  });

  // Debug logging for negative gaps
  if (typeof baseGapValue === "number" && baseGapValue < 0) {
    console.warn("Generated classes:", generatedClasses);
  }

  return (
    <Component
      ref={ref}
      className={cx(
        generatedClasses,
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
