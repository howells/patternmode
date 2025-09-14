"use client";

import { cx } from "@patternmode/utils/cx";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
} from "@patternmode/utils/spacing";
import * as React from "react";
import type { TagGroupProps } from "../types";
import { tagGroupVariants } from "../variants";

export const TagGroup = ({
  dismissible,
  onDismiss,
  gap = 2,
  justify = "start",
  direction = "row",
  className,
  children,
  ...props
}: TagGroupProps) => {
  const baseGap = getBaseSpacingValue(gap) ?? 2;
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);
  const baseGapClass = getGapClass(baseGap);

  return (
    <div
      className={cx(
        tagGroupVariants({ justify, direction }),
        baseGapClass,
        responsiveGapClasses,
        className
      )}
      data-testid="tag-group"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const childProps: Record<string, unknown> = {};
        if (dismissible && onDismiss) {
          childProps.dismissible = true;
          childProps.onDismiss = () => onDismiss(index);
        }
        return React.cloneElement(child as React.ReactElement, childProps);
      })}
    </div>
  );
};
