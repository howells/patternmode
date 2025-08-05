"use client";

import type { GridAutoProps, GridCellProps, GridProps, ResponsiveValue } from "./types";
import React from "react";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getGapClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";
import { gridCellVariants, gridVariants } from "./variants";

// Helper function to generate responsive grid styles
const generateResponsiveGridStyles = (
  columns: ResponsiveValue<number> | undefined,
  rows: ResponsiveValue<number> | undefined,
): string => {
  const styles: string[] = [];
  const breakpoints = {
    "sm": "sm:",
    "md": "md:",
    "lg": "lg:",
    "xl": "xl:",
    "2xl": "2xl:",
  };

  // Handle columns
  if (columns !== undefined) {
    if (typeof columns === "object") {
      Object.entries(columns).forEach(([breakpoint, value]) => {
        if (value !== undefined) {
          const prefix
            = breakpoints[breakpoint as keyof typeof breakpoints] || "";
          styles.push(`${prefix}grid-cols-${value}`);
        }
      });
    }
    else {
      styles.push(`grid-cols-${columns}`);
    }
  }

  // Handle rows
  if (rows !== undefined) {
    if (typeof rows === "object") {
      Object.entries(rows).forEach(([breakpoint, value]) => {
        if (value !== undefined) {
          const prefix
            = breakpoints[breakpoint as keyof typeof breakpoints] || "";
          styles.push(`${prefix}grid-rows-${value}`);
        }
      });
    }
    else {
      styles.push(`grid-rows-${rows}`);
    }
  }

  return styles.join(" ");
};

/**
 * Root grid component for creating responsive CSS Grid layouts.
 */
export const Grid = (
  { columns = 6, rows, gap = 4, className, children, minHeight = "none", ...props }: GridProps,
) => {
  const responsiveGridStyles = generateResponsiveGridStyles(columns, rows);

  // Get base gap value for non-responsive case
  const baseGap = getBaseSpacingValue(gap) ?? 4;

  // Generate responsive gap classes
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);

  // Get base gap class for fallback
  const baseGapClass = getGapClass(baseGap);

  return (
    <div
      data-testid="grid"
      className={cx(
        "grid",
        baseGapClass,
        responsiveGapClasses,
        gridVariants({ minHeight }),
        responsiveGridStyles,
        className,
      )}
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
export const GridCell = (
  { colSpan, rowSpan, colStart, rowStart, className, children, ...props }: GridCellProps,
) => {
  const spanClasses = [
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
    colStart && `col-start-${colStart}`,
    rowStart && `row-start-${rowStart}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cx(gridCellVariants(), spanClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

GridCell.displayName = "GridCell";

/**
 * Auto-generating grid component for rapid prototyping.
 */
export const GridAuto = ({ cellCount = 6, renderCell, ...gridProps }: GridAutoProps) => {
  return (
    <Grid {...gridProps}>
      {Array.from({ length: cellCount }, (_, index) => (
        <GridCell key={index}>
          {renderCell ? renderCell(index) : index + 1}
        </GridCell>
      ))}
    </Grid>
  );
};

GridAuto.displayName = "GridAuto";
