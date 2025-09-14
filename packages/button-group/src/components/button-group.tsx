"use client";

import { cx } from "@patternmode/utils/cx";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
} from "@patternmode/utils/spacing";
import * as React from "react";
import type { ButtonGroupProps } from "../types";
import { buttonGroupVariants } from "../variants";

/**
 * Container for grouping buttons with shared styling and consistent spacing.
 */
export const ButtonGroup = ({
  variant,
  size = "base",
  gap,
  justify = "start",
  wrap = false,
  className,
  children,
  ...props
}: ButtonGroupProps) => {
  const defaultGap = React.useMemo(() => {
    if (gap) {
      return gap;
    }
    const GAP_SM = 1 as const;
    const GAP_MD = 2 as const;
    const GAP_LG = 3 as const;
    switch (size) {
      case "xs":
        return GAP_SM;
      case "sm":
        return GAP_MD;
      case "base":
        return GAP_MD;
      case "lg":
        return GAP_LG;
      case "icon-xs":
        return GAP_SM;
      case "icon-sm":
        return GAP_MD;
      case "icon":
        return GAP_MD;
      case "icon-lg":
        return GAP_LG;
      default:
        return GAP_MD;
    }
  }, [gap, size]);

  const baseGap = getBaseSpacingValue(defaultGap);
  const responsiveGapClasses = generateResponsiveSpacingClasses(
    "gap",
    defaultGap
  );
  const baseGapClass = baseGap !== undefined ? getGapClass(baseGap) : "";

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    // Only apply to Button components by displayName
    if (
      child.type &&
      typeof child.type === "function" &&
      (child.type as { displayName?: string })?.displayName === "Button"
    ) {
      const newProps: Record<string, unknown> = {};
      const childProps = child.props as Record<string, unknown>;
      if (variant && !childProps.variant) {
        newProps.variant = variant;
      }
      if (size && !childProps.size) {
        newProps.size = size;
      }
      return React.cloneElement(child, newProps);
    }
    return child;
  });

  return (
    <div
      className={cx(
        buttonGroupVariants({ justify, wrap }),
        baseGapClass,
        responsiveGapClasses,
        className
      )}
      data-testid="button-group"
      {...props}
    >
      {enhancedChildren}
    </div>
  );
};
