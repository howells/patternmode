/** biome-ignore-all lint/performance/noBarrelFile: intentional package or module entrypoint */
import type { FlexAlign } from "../../lib/alignment";
import type { FlexJustify } from "../../lib/justify";
import {
  getResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import {
  ALIGN_CLASS,
  GAP_CLASS,
  GAP_X_CLASS,
  GAP_Y_CLASS,
  type GapSize,
  GRID_COLS_CLASS,
  JUSTIFY_CLASS,
} from "../../lib/responsive-classes";

export { COL_SPAN_CLASS, COL_START_CLASS } from "../../lib/responsive-classes";

/**
 * Get column classes for the grid based on column configuration
 */
function getColumnClasses(
  columns: ResponsiveValue<number>,
  grow: boolean,
  mode: ResponsiveMode,
): string[] {
  if (grow) {
    return ["grid-cols-[repeat(auto-fit,minmax(0,1fr))]"];
  }

  return getResponsiveClasses(columns, GRID_COLS_CLASS, mode);
}

/**
 * Build all grid classes based on grid props
 */
export function getGridClasses({
  columns = 12,
  gap = "base",
  xGap,
  yGap,
  grow = false,
  align = "stretch",
  justify = "flex-start",
  mode = "screen",
}: {
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<GapSize>;
  xGap?: ResponsiveValue<GapSize>;
  yGap?: ResponsiveValue<GapSize>;
  grow?: boolean;
  align?: ResponsiveValue<FlexAlign>;
  justify?: ResponsiveValue<FlexJustify>;
  mode?: ResponsiveMode;
}): string[] {
  const classes: string[] = ["grid"];

  classes.push(...getColumnClasses(columns, grow, mode));

  // Handle gap - if xGap or yGap are specified, use those instead of gap
  if (xGap !== undefined || yGap !== undefined) {
    if (xGap === undefined) {
      classes.push(...getResponsiveClasses(gap, GAP_X_CLASS, mode));
    } else {
      classes.push(...getResponsiveClasses(xGap, GAP_X_CLASS, mode));
    }
    if (yGap === undefined) {
      classes.push(...getResponsiveClasses(gap, GAP_Y_CLASS, mode));
    } else {
      classes.push(...getResponsiveClasses(yGap, GAP_Y_CLASS, mode));
    }
  } else {
    classes.push(...getResponsiveClasses(gap, GAP_CLASS, mode));
  }

  classes.push(...getResponsiveClasses(align, ALIGN_CLASS, mode));
  classes.push(...getResponsiveClasses(justify, JUSTIFY_CLASS, mode));

  return classes;
}
