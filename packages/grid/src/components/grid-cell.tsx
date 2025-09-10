"use client";

import { cx } from "@patternmode/utils/cx";
import type { GridCellProps } from "../types";
import { gridCellVariants } from "../variants";

/**
 * Grid cell component for positioning content within a grid.
 *
 * Provides precise control over grid item positioning using CSS Grid properties.
 * Supports spanning multiple columns/rows, explicit positioning, and named areas.
 *
 * @example
 * // Basic grid cell (auto-positioned)
 * <GridCell>Auto-positioned content</GridCell>
 *
 * @example
 * // Spanning multiple columns and rows
 * <GridCell colSpan={2} rowSpan={3}>
 *   Content spanning 2 columns and 3 rows
 * </GridCell>
 *
 * @example
 * // Explicit positioning with start coordinates
 * <GridCell colStart={2} rowStart={1}>
 *   Positioned at column 2, row 1
 * </GridCell>
 *
 * @example
 * // Precise positioning with start and end coordinates
 * <GridCell colStart={1} colEnd={4} rowStart={2} rowEnd={4}>
 *   Spans from column 1-3 and row 2-3
 * </GridCell>
 *
 * @example
 * // Using named grid areas
 * <GridCell area="header">
 *   Header content
 * </GridCell>
 *
 * @example
 * // Combining properties for complex layouts
 * <GridCell
 *   colStart={1}
 *   colEnd={3}
 *   rowStart={1}
 *   rowEnd={2}
 *   className="custom-styling"
 * >
 *   Complex positioned content
 * </GridCell>
 */
export const GridCell = ({
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  colEnd,
  rowEnd,
  area,
  className,
  children,
  style,
  ...props
}: GridCellProps) => {
  // Dynamic grid classes are referenced in tailwind-classes.ts
  // and will be found by Tailwind's @source scanner in consuming apps
  const spanClasses = [
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
    colStart && `col-start-${colStart}`,
    rowStart && `row-start-${rowStart}`,
    colEnd && `col-end-${colEnd}`,
    rowEnd && `row-end-${rowEnd}`,
  ]
    .filter(Boolean)
    .join(" ");

  // Handle grid-area via style prop
  const combinedStyle = area ? { ...style, gridArea: area } : style;

  return (
    <div
      className={cx(gridCellVariants(), spanClasses, className)}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

GridCell.displayName = "GridCell";
