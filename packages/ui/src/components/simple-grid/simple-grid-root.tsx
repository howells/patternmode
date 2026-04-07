import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import {
  pushResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import {
  GAP_CLASS,
  type GapSize,
  GRID_COLS_CLASS,
} from "../../lib/responsive-classes";

export interface SimpleGridProps extends React.ComponentProps<"div"> {
  /** Number of equal columns. Can be responsive. */
  cols?: ResponsiveValue<number>;
  /** Gap between items. Can be responsive. */
  gap?: ResponsiveValue<GapSize>;
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
}

/**
 * Simple grid layout with equal-width columns and consistent spacing.
 *
 * @param props - The simple grid props
 * @param props.cols - Number of equal columns. Can be responsive. Defaults to 3.
 * @param props.gap - Gap between items. Can be responsive. Defaults to "base" (16px).
 * @param props.responsiveMode - "screen" (viewport, default) or "container" (container queries).
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Grid items.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <SimpleGrid cols={4} gap="lg">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </SimpleGrid>
 * <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} responsiveMode="container" />
 * ```
 */
export function SimpleGrid({
  className,
  cols = 3,
  gap = "base",
  responsiveMode = "screen",
  ...props
}: SimpleGridProps) {
  const classes: string[] = ["grid"];

  pushResponsiveClasses(classes, cols, GRID_COLS_CLASS, responsiveMode);
  pushResponsiveClasses(classes, gap, GAP_CLASS, responsiveMode);

  return (
    <div
      className={cn(classes.join(" "), className)}
      data-component="simple-grid"
      data-slot="simple-grid"
      {...props}
    />
  );
}
