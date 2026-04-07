import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import {
  pushResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import { ORDER_CLASS, type OrderValue } from "../../lib/responsive-classes";
import { COL_SPAN_CLASS, COL_START_CLASS } from "./grid-utils";

export interface GridColProps extends React.ComponentProps<"div"> {
  /** CSS order value (1-12, "first", "last", "none"). Can be responsive. */
  order?: ResponsiveValue<OrderValue>;
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Number of columns this item spans. Can be responsive. */
  span?: ResponsiveValue<number>;
  /** Column start position (1-based). Can be responsive. */
  start?: ResponsiveValue<number>;
}

/**
 * GridCol UI component.
 * Import from "@patternmode/ui/components/grid".
 */
export function GridCol({
  className,
  span = 1,
  start,
  order,
  style,
  responsiveMode = "screen",
  ...props
}: GridColProps) {
  const classes: string[] = [];

  pushResponsiveClasses(classes, span, COL_SPAN_CLASS, responsiveMode);

  if (start !== undefined) {
    pushResponsiveClasses(classes, start, COL_START_CLASS, responsiveMode);
  }

  if (order !== undefined) {
    pushResponsiveClasses(classes, order, ORDER_CLASS, responsiveMode);
  }

  return (
    <div
      className={cn(classes.join(" "), className)}
      data-component="grid-col"
      data-slot="grid-col"
      style={style}
      {...props}
    />
  );
}
