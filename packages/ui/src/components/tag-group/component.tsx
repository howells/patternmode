"use client";

import type { VariantProps } from "tailwind-variants";
import * as React from "react";
import { tv } from "tailwind-variants";
import type { GapValue, ResponsiveSpacing } from "../../lib/spacing-utils";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getGapClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";
import type { TagProps } from "../tag/component";

const tagGroupVariants = tv({
  base: "flex flex-wrap items-center",
  variants: {
    align: {
      start: "justify-start",
      center: "justify-center", 
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
  },
  defaultVariants: {
    align: "start",
    direction: "row",
  },
});

type TagGroupProps = {
  /**
   * Whether tags in the group can be dismissed.
   * Individual tags can override this by specifying their own dismissible prop.
   */
  dismissible?: boolean;
  /**
   * Callback when any tag dismiss button is clicked.
   * Individual tags can override this with their own onDismiss handler.
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Gap between tags. Can be responsive.
   * Automatically calculated based on tag size if not provided.
   */
  gap?: GapValue | ResponsiveSpacing<GapValue>;
  /**
   * Horizontal alignment of the tag group.
   * Controls how tags are distributed within the container.
   */
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Layout direction for the tag group.
   * Controls whether tags flow horizontally or vertically.
   */
  direction?: "row" | "column";
  /**
   * Additional CSS classes for the container.
   * Applied to the tag group wrapper element.
   */
  className?: string;
  /**
   * Child tags to render.
   * Should only contain Tag components.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

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
    if (child.type && typeof child.type === "function" && child.type.displayName === "Tag") {
      const childProps = { ...child.props };
      
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

export type { TagGroupProps };