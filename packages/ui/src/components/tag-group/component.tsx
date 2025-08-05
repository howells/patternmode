"use client";

import type { TagGroupProps } from "./types";
import * as React from "react";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getGapClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";
import { tagGroupVariants } from "./variants";

/**
 * Container for grouping tags with shared styling and consistent spacing.
 */
export const TagGroup = ({
  dismissible,
  onDismiss,
  gap = 2,
  align = "start",
  direction = "row",
  className,
  children,
  ...props
}: TagGroupProps) => {
  // Generate responsive gap classes
  const baseGap = getBaseSpacingValue(gap);
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const baseGapClass = baseGap !== undefined ? getGapClass(baseGap) : "";

  // Clone children and inject inherited props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Only apply props to Tag components
    if (child.type && typeof child.type === "function" && (child.type as any).displayName === "Tag") {
      const childProps = { ...(child.props as Record<string, any>) };

      // Apply inherited dismissible if child doesn't have one
      if (dismissible !== undefined && childProps.dismissible === undefined) {
        childProps.dismissible = dismissible;
      }

      // Apply inherited onDismiss if child doesn't have one
      if (onDismiss && !childProps.onDismiss) {
        childProps.onDismiss = onDismiss;
      }

      return React.cloneElement(child, childProps);
    }

    return child;
  });

  return (
    <div
      data-testid="tag-group"
      className={cx(
        tagGroupVariants({ align, direction }),
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

TagGroup.displayName = "TagGroup";
