"use client";

import type { StackProps } from "./types";
import * as React from "react";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
  getPaddingClass,
} from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";
import { stackVariants } from "./variants";

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
      data-testid="stack"
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

export { HStack, Stack, VStack };
