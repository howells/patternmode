"use client";

import { cx } from "@patternmode/utils/cx";
import {
  createResponsiveClasses,
  getResponsiveBase,
} from "@patternmode/utils/responsive-utils";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
  getPaddingClass,
} from "@patternmode/utils/spacing";
import type * as React from "react";
import type { StackProps, StackRenderProps } from "../types";
import { stackVariants } from "../variants";

/**
 * Layout component for vertical or horizontal stacking with configurable spacing and responsive direction.
 */
const Stack = ({
  ref,
  direction = "vertical",
  gap,
  padding,
  align,
  justify,
  wrap = false,
  as: Component = "div",
  className,
  children,
  ...props
}: StackProps & { ref?: React.RefObject<HTMLElement | null> }) => {
  // Get base values for non-responsive cases
  const DEFAULT_GAP = 4;
  const baseGapValue = getBaseSpacingValue(gap) ?? DEFAULT_GAP;
  const basePadding = getBaseSpacingValue(padding);
  const baseDirection = getResponsiveBase(direction, "vertical");

  // Generate responsive classes using shared utilities
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveSpacingClasses(
    "padding",
    padding
  );
  const responsiveDirectionClasses =
    createResponsiveClasses.direction(direction);

  // Get base classes for fallback
  const baseGapClass = getGapClass(baseGapValue);
  const basePaddingClass =
    basePadding !== undefined ? getPaddingClass(basePadding) : "";

  const generatedClasses = stackVariants({
    direction: baseDirection as "vertical" | "horizontal",
    align,
    justify,
    wrap,
  });

  // Support render props pattern
  const computedClasses = cx(
    generatedClasses,
    baseGapClass,
    basePaddingClass,
    responsiveDirectionClasses,
    responsiveGapClasses,
    responsivePaddingClasses,
    className
  );

  const renderProps: StackRenderProps = {
    className: computedClasses,
    direction: baseDirection,
    gap: baseGapValue,
    padding: basePadding,
  };

  return (
    <Component
      className={computedClasses}
      data-testid="stack"
      ref={ref}
      {...props}
    >
      {typeof children === "function" ? children(renderProps) : children}
    </Component>
  );
};

Stack.displayName = "Stack";

/**
 * Vertical stack helper component.
 */
const VStack = ({
  ref,
  children,
  ...props
}: Omit<StackProps, "direction"> & {
  ref?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode | ((props: StackRenderProps) => React.ReactNode);
}) => (
  <Stack direction="vertical" ref={ref} {...props}>
    {children}
  </Stack>
);
VStack.displayName = "VStack";

/**
 * Horizontal stack helper component.
 */
const HStack = ({
  ref,
  children,
  ...props
}: Omit<StackProps, "direction"> & {
  ref?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode | ((props: StackRenderProps) => React.ReactNode);
}) => (
  <Stack direction="horizontal" ref={ref} {...props}>
    {children}
  </Stack>
);
HStack.displayName = "HStack";

export { HStack, Stack, VStack };
export type { StackRenderProps } from "../types";
