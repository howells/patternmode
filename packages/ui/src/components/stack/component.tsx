"use client";

import type { StackProps } from "./types";
import * as React from "react";
import { createResponsiveClasses, getResponsiveBase } from "../../presentation/responsive-utils";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
  getPaddingClass,
} from "../../presentation/spacing-utils";
import { cx } from "../../utils/cx";
import { stackVariants } from "./variants";

/**
 * Layout component for vertical or horizontal stacking with configurable spacing and responsive direction.
 */
const Stack = (
  { ref, direction = "vertical", gap, padding, align, justify, wrap = false, as: Component = "div", className, children, ...props }: StackProps & { ref?: React.RefObject<HTMLElement | null> },
) => {
  // Get base values for non-responsive cases
  const baseGapValue = getBaseSpacingValue(gap) ?? 4;
  const basePadding = getBaseSpacingValue(padding);
  const baseDirection = getResponsiveBase(direction, "vertical");

  // Generate responsive classes using shared utilities
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveSpacingClasses("padding", padding);
  const responsiveDirectionClasses = createResponsiveClasses.direction(direction);

  // Get base classes for fallback
  const baseGapClass = getGapClass(baseGapValue);
  const basePaddingClass = basePadding !== undefined ? getPaddingClass(basePadding) : "";

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
