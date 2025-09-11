"use client";

import { mergeProps } from "@base-ui-components/react/merge-props";
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
import React from "react";
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
  render,
  ...props
}: StackProps & {
  ref?: React.RefObject<HTMLElement | null>;
  render?: React.JSX.Element;
}) => {
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
    // Ensure base flex class is always included
    "flex",
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

  // If render prop is provided, use render prop pattern
  if (render) {
    // Extract layout-specific props that shouldn't be HTML attributes
    const {
      gap: _,
      padding: __,
      align: ___,
      justify: ____,
      wrap: _____,
      as: ______,
      ...htmlProps
    } = { gap, padding, align, justify, wrap, as: Component, ...props };

    // Merge className properly using cx to ensure all classes are combined
    const existingClassName = render.props?.className;
    const mergedClassName = existingClassName
      ? cx(existingClassName, computedClasses)
      : computedClasses;

    const defaultProps = { ref, className: mergedClassName };
    const mergedProps = mergeProps(render.props || {}, defaultProps, htmlProps);
    return React.cloneElement(render, mergedProps, children);
  }

  // Otherwise use the standard as/Component pattern
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
  render = <div />,
  children,
  // Extract layout-specific props that shouldn't be HTML attributes
  gap,
  padding,
  align,
  justify,
  wrap,
  as,
  className,
  ...htmlProps
}: Omit<StackProps, "direction"> & {
  ref?: React.RefObject<HTMLElement | null>;
  render?: React.JSX.Element;
  children?: React.ReactNode;
}) => {
  // Get base values for non-responsive cases
  const DEFAULT_GAP = 4;
  const baseGapValue = getBaseSpacingValue(gap) ?? DEFAULT_GAP;
  const basePadding = getBaseSpacingValue(padding);

  // Generate responsive classes using shared utilities
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveSpacingClasses(
    "padding",
    padding
  );

  // Get base classes for fallback
  const baseGapClass = getGapClass(baseGapValue);
  const basePaddingClass =
    basePadding !== undefined ? getPaddingClass(basePadding) : "";

  // Generate alignment and justification classes
  const alignmentClasses = cx(
    align === "start" && "items-start",
    align === "center" && "items-center",
    align === "end" && "items-end",
    align === "stretch" && "items-stretch",
    justify === "start" && "justify-start",
    justify === "center" && "justify-center",
    justify === "end" && "justify-end",
    justify === "between" && "justify-between",
    justify === "around" && "justify-around",
    justify === "evenly" && "justify-evenly",
    wrap && "flex-wrap"
  );

  // Combine all classes
  const vStackClasses = cx(
    "flex",
    "flex-col",
    baseGapClass,
    basePaddingClass,
    responsiveGapClasses,
    responsivePaddingClasses,
    alignmentClasses,
    className
  );

  // Merge className properly using cx to ensure all classes are combined
  const existingClassName = render.props?.className;
  const mergedClassName = existingClassName
    ? cx(existingClassName, vStackClasses)
    : vStackClasses;

  const defaultProps = {
    ref,
    className: mergedClassName,
  };

  // Only merge HTML-compatible props with the render element
  const mergedProps = mergeProps(render.props || {}, defaultProps, htmlProps);

  return React.cloneElement(render, mergedProps, children);
};
VStack.displayName = "VStack";

/**
 * Horizontal stack helper component.
 */
const HStack = ({
  ref,
  render = <div />,
  children,
  // Extract layout-specific props that shouldn't be HTML attributes
  gap,
  padding,
  align,
  justify,
  wrap,
  as,
  className,
  ...htmlProps
}: Omit<StackProps, "direction"> & {
  ref?: React.RefObject<HTMLElement | null>;
  render?: React.JSX.Element;
  children?: React.ReactNode;
}) => {
  // Get base values for non-responsive cases
  const DEFAULT_GAP = 4;
  const baseGapValue = getBaseSpacingValue(gap) ?? DEFAULT_GAP;
  const basePadding = getBaseSpacingValue(padding);

  // Generate responsive classes using shared utilities
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveSpacingClasses(
    "padding",
    padding
  );

  // Get base classes for fallback
  const baseGapClass = getGapClass(baseGapValue);
  const basePaddingClass =
    basePadding !== undefined ? getPaddingClass(basePadding) : "";

  // Generate alignment and justification classes
  const alignmentClasses = cx(
    align === "start" && "items-start",
    align === "center" && "items-center",
    align === "end" && "items-end",
    align === "stretch" && "items-stretch",
    justify === "start" && "justify-start",
    justify === "center" && "justify-center",
    justify === "end" && "justify-end",
    justify === "between" && "justify-between",
    justify === "around" && "justify-around",
    justify === "evenly" && "justify-evenly",
    wrap && "flex-wrap"
  );

  // Combine all classes
  const hStackClasses = cx(
    "flex",
    "flex-row",
    baseGapClass,
    basePaddingClass,
    responsiveGapClasses,
    responsivePaddingClasses,
    alignmentClasses,
    className
  );

  // Merge className properly using cx to ensure all classes are combined
  const existingClassName = render.props?.className;
  const mergedClassName = existingClassName
    ? cx(existingClassName, hStackClasses)
    : hStackClasses;

  const defaultProps = {
    ref,
    className: mergedClassName,
  };

  // Only merge HTML-compatible props with the render element
  const mergedProps = mergeProps(render.props || {}, defaultProps, htmlProps);

  return React.cloneElement(render, mergedProps, children);
};
HStack.displayName = "HStack";

export { HStack, Stack, VStack };
export type { StackRenderProps } from "../types";
