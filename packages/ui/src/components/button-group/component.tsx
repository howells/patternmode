"use client";

import type { ButtonGroupProps } from "./types";
import * as React from "react";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getGapClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";
import { buttonGroupVariants } from "./variants";

/**
 * Container for grouping buttons with shared styling and consistent spacing.
 */
export const ButtonGroup = ({
  variant,
  size = "default",
  gap,
  align = "start",
  wrap = false,
  className,
  children,
  ...props
}: ButtonGroupProps) => {
  // Calculate default gap based on size if not provided
  const defaultGap = React.useMemo(() => {
    if (gap) { return gap; }

    switch (size) {
      case "xs":
        return 1;
      case "sm":
        return 2;
      case "default":
        return 2;
      case "lg":
        return 3;
      case "icon-xs":
        return 1;
      case "icon-sm":
        return 2;
      case "icon":
        return 2;
      case "icon-lg":
        return 3;
      default:
        return 2;
    }
  }, [gap, size]);

  // Generate responsive gap classes
  const baseGap = getBaseSpacingValue(defaultGap);
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", defaultGap);
  const baseGapClass = baseGap !== undefined ? getGapClass(baseGap) : "";

  // Clone children and inject inherited props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Only apply props to Button components
    if ((child.type as any)?.displayName === "Button") {
      const newProps: Record<string, unknown> = {};
      const childProps = child.props as Record<string, unknown>;

      // Apply inherited variant if child doesn't have one
      if (variant && !childProps.variant) {
        newProps.variant = variant;
      }

      // Apply inherited size if child doesn't have one
      if (size && !childProps.size) {
        newProps.size = size;
      }

      return React.cloneElement(child, newProps);
    }

    return child;
  });

  return (
    <div
      data-testid="button-group"
      className={cx(
        buttonGroupVariants({ align, wrap }),
        baseGapClass,
        responsiveGapClasses,
        className,
      )}
      {...props}
    >
      {enhancedChildren}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";
