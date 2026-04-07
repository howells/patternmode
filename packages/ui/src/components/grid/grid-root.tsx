import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import type { FlexAlign } from "../../lib/alignment";
import type { FlexJustify } from "../../lib/justify";
import type { ResponsiveMode, ResponsiveValue } from "../../lib/responsive";
import type { GapSize } from "../../lib/responsive-classes";
import { getGridClasses } from "./grid-utils";

export interface GridProps extends React.ComponentProps<"div"> {
  /** Align items on the block axis. Can be responsive. */
  align?: ResponsiveValue<FlexAlign>;
  /** Total columns in the layout. Can be a number or responsive object. Defaults to 12. */
  columns?: ResponsiveValue<number>;
  /** Gap between items. Can be responsive. Defaults to "base" (16px). */
  gap?: ResponsiveValue<GapSize>;
  /** When true, columns grow equally to fill available space. */
  grow?: boolean;
  /** Justify items on the inline axis. Can be responsive. */
  justify?: ResponsiveValue<FlexJustify>;
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Horizontal gap between items. Can be responsive. Overrides gap on inline axis. */
  xGap?: ResponsiveValue<GapSize>;
  /** Vertical gap between items. Can be responsive. Overrides gap on block axis. */
  yGap?: ResponsiveValue<GapSize>;
}

/**
 * CSS Grid layout component with configurable columns, gaps, and alignment.
 *
 * @param props - The grid props
 * @param props.columns - Total columns in the layout. Can be a number or responsive object. Defaults to 12.
 * @param props.gap - Gap between items. Can be responsive. Defaults to "base" (16px).
 * @param props.xGap - Horizontal gap between items. Can be responsive. Overrides gap on inline axis.
 * @param props.yGap - Vertical gap between items. Can be responsive. Overrides gap on block axis.
 * @param props.grow - When true, columns grow equally to fill available space. Defaults to false.
 * @param props.align - Align items on the block axis. Can be responsive.
 * @param props.justify - Justify items on the inline axis. Can be responsive.
 * @param props.responsiveMode - "screen" (viewport, default) or "container" (container queries).
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Grid items (use GridCol for column spans).
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <Grid columns={12} gap="base">
 *   <GridCol span={6}>Half width</GridCol>
 *   <GridCol span={6}>Half width</GridCol>
 * </Grid>
 * <Grid columns={{ base: 1, md: 2, lg: 4 }} responsiveMode="container" />
 * ```
 */
export function Grid({
  className,
  children,
  columns = 12,
  gap = "base",
  xGap,
  yGap,
  grow = false,
  align = "stretch",
  justify = "flex-start",
  responsiveMode = "screen",
  ...props
}: GridProps) {
  const gridClasses = getGridClasses({
    columns,
    gap,
    xGap,
    yGap,
    grow,
    align,
    justify,
    mode: responsiveMode,
  });

  return (
    <div
      className={cn(gridClasses, className)}
      data-component="grid"
      data-slot="grid"
      {...props}
    >
      {children}
    </div>
  );
}
