"use client";

import type { ResponsiveSpacing, SpacingValue } from "../../lib/spacing-utils";
import React from "react";

import { tv } from "tailwind-variants";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getGapClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";

/**
 * Responsive value type for grid properties.
 */
type ResponsiveValue<T>
  = | T
    | {
    /**
     * Small screens (640px+).
     * Defines grid behavior for mobile landscape and up.
     */
      "sm"?: T;
      /**
       * Medium screens (768px+).
       * Defines grid behavior for tablets and up.
       */
      "md"?: T;
      /**
       * Large screens (1024px+).
       * Defines grid behavior for desktop and up.
       */
      "lg"?: T;
      /**
       * Extra large screens (1280px+).
       * Defines grid behavior for large desktop screens.
       */
      "xl"?: T;
      /**
       * 2X large screens (1536px+).
       * Defines grid behavior for extra large displays.
       */
      "2xl"?: T;
    };

// Grid variants
const gridVariants = tv({
  base: "relative w-full",
  variants: {
    minHeight: {
      none: "",
      sm: "min-h-[100px]",
      md: "min-h-[200px]",
      lg: "min-h-[300px]",
      xl: "min-h-[400px]",
    },
  },
  defaultVariants: {
    minHeight: "none",
  },
});

// Grid cell variants
const gridCellVariants = tv({
  base: "relative",
  variants: {},
  defaultVariants: {},
});

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
 * Props for the Grid component.
 */
type GridProps = {
  /**
   * Number of columns - can be responsive object or single number.
   * Controls the CSS Grid template columns across different screen sizes.
   */
  columns?: ResponsiveValue<number>;
  /**
   * Number of rows - can be responsive object or single number.
   * Controls the CSS Grid template rows across different screen sizes.
   */
  rows?: ResponsiveValue<number>;
  /**
   * Gap between grid items (4px grid scale: 0-24) - can be responsive.
   * Uses the standardized spacing scale for consistent spacing.
   */
  gap?: ResponsiveSpacing<SpacingValue>;
  /**
   * Grid content including GridCell components.
   * Should contain GridCell components or other grid items.
   */
  children?: React.ReactNode;
  /**
   * Minimum height constraint for the grid.
   * Useful for maintaining layout structure when grid is empty.
   */
  minHeight?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Root grid component for creating responsive CSS Grid layouts.
 */
const Grid = (
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
 * Props for the GridCell component.
 */
type GridCellProps = {
  /**
   * Number of columns the cell should span.
   * Controls how many grid columns this cell occupies.
   */
  colSpan?: number;
  /**
   * Number of rows the cell should span.
   * Controls how many grid rows this cell occupies.
   */
  rowSpan?: number;
  /**
   * Starting column position (1-based).
   * Explicitly places the cell at a specific column.
   */
  colStart?: number;
  /**
   * Starting row position (1-based).
   * Explicitly places the cell at a specific row.
   */
  rowStart?: number;
  /**
   * Cell content.
   * Any React content to display within the grid cell.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Grid cell component for positioning content within a grid.
 */
const GridCell = (
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
 * Props for the GridAuto component.
 */
type GridAutoProps = {
  /**
   * Number of cells to automatically generate.
   * Creates this many grid cells with auto-generated content.
   */
  cellCount?: number;
  /**
   * Custom renderer function for cell content.
   * Function that receives the cell index and returns content for that cell.
   */
  renderCell?: (index: number) => React.ReactNode;
} & Omit<GridProps, "children">;

/**
 * Auto-generating grid component for rapid prototyping.
 */
const GridAuto = ({ cellCount = 6, renderCell, ...gridProps }: GridAutoProps) => {
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

export {
  Grid,
  GridAuto,
  type GridAutoProps,
  GridCell,
  type GridCellProps,
  gridCellVariants,
  type GridProps,
  gridVariants,
  type ResponsiveValue,
};
