"use client";

import { cx } from "@patternmode/utils/cx";
import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import { createResponsiveClasses } from "@patternmode/utils/responsive-utils";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
} from "@patternmode/utils/spacing";
import type { GridAutoProps, GridCellProps, GridProps } from "./types";
import { gridCellVariants, gridVariants } from "./variants";

// Generate responsive grid styles using shared utilities
const generateResponsiveGridStyles = (
  columns: ResponsiveValue<number> | undefined,
  rows: ResponsiveValue<number> | undefined
): string => {
  const columnClasses = createResponsiveClasses.gridColumns(columns);
  const rowClasses = createResponsiveClasses.gridRows(rows);

  return [columnClasses, rowClasses].filter(Boolean).join(" ");
};

/**
 * Root grid component for creating responsive CSS Grid layouts.
 */
export const Grid = ({
  columns = 6,
  rows,
  gap = 4,
  className,
  children,
  minHeight = "none",
  ...props
}: GridProps) => {
  const responsiveGridStyles = generateResponsiveGridStyles(columns, rows);

  // Get base gap value for non-responsive case
  const baseGap = getBaseSpacingValue(gap) ?? 4;

  // Generate responsive gap classes
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);

  // Get base gap class for fallback
  const baseGapClass = getGapClass(baseGap);

  return (
    <div
      className={cx(
        "grid",
        baseGapClass,
        responsiveGapClasses,
        gridVariants({ minHeight }),
        responsiveGridStyles,
        className
      )}
      data-testid="grid"
      {...props}
    >
      {children}
    </div>
  );
};

Grid.displayName = "Grid";

/**
 * Grid cell component for positioning content within a grid.
 */
export const GridCell = ({
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  className,
  children,
  ...props
}: GridCellProps) => {
  const spanClasses = [
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
    colStart && `col-start-${colStart}`,
    rowStart && `row-start-${rowStart}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cx(gridCellVariants(), spanClasses, className)} {...props}>
      {children}
    </div>
  );
};

GridCell.displayName = "GridCell";

/**
 * Auto-generating grid component for rapid prototyping.
 */
export const GridAuto = ({
  cellCount = 6,
  renderCell,
  ...gridProps
}: GridAutoProps) => {
  return (
    <Grid {...gridProps}>
      {Array.from({ length: cellCount }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static, non-reordered prototype grid
        <GridCell key={`grid-cell-${index}`}>
          {renderCell ? renderCell(index) : index + 1}
        </GridCell>
      ))}
    </Grid>
  );
};

GridAuto.displayName = "GridAuto";
