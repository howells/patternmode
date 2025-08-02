/**
 * Grid Components.
 *
 * A flexible grid system for creating responsive layouts.
 * Provides CSS Grid-based components with support for responsive breakpoints
 * and customizable spacing.
 *
 * Features:
 * - Responsive grid columns and rows
 * - Grid cell positioning and spanning
 * - Auto-generated numbered cells
 * - TypeScript support for responsive values.
 *
 * @category layout
 * @icon LayoutGrid
 * @example
 * ```tsx
 * // Basic responsive grid
 * <Grid columns={{ sm: 2, md: 4, lg: 6 }} gap={4}>
 *   <GridCell>Item 1</GridCell>
 *   <GridCell>Item 2</GridCell>
 *   <GridCell colSpan={2}>Wide Item</GridCell>
 *   <GridCell>Item 4</GridCell>
 * </Grid>
 *
 * // Auto-generated grid
 * <GridAuto
 *   columns={5}
 *   cellCount={10}
 *   renderCell={(index) => `Cell ${index + 1}`}
 * />
 *
 * // Layout grid
 * <Grid columns={12} gap={2}>
 *   <GridCell colSpan={3}>Sidebar</GridCell>
 *   <GridCell colSpan={9}>Main Content</GridCell>
 *   <GridCell colSpan={12}>Footer</GridCell>
 * </Grid>
 * ```
 */

"use client";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../../lib/utils";

/**
 * Responsive value type for grid properties.
 *
 * Allows specifying different values for different screen sizes.
 * Can be a single value or an object with breakpoint-specific values.
 */
type ResponsiveValue<T>
  = | T
    | {
    /**
     * Small screens (640px+).
     */
      "sm"?: T;
      /**
       * Medium screens (768px+).
       */
      "md"?: T;
      /**
       * Large screens (1024px+).
       */
      "lg"?: T;
      /**
       * Extra large screens (1280px+).
       */
      "xl"?: T;
      /**
       * 2X large screens (1536px+).
       */
      "2xl"?: T;
    };

// Grid variants - simplified without guides
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

// Grid cell variants - purely for layout positioning
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
 *
 * Configuration for responsive grid layouts with spacing.
 *
 * @interface GridProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
type GridProps = {
  /**
   * Number of columns - can be responsive object or single number.
   */
  columns?: ResponsiveValue<number>;
  /**
   * Number of rows - can be responsive object or single number.
   */
  rows?: ResponsiveValue<number>;
  /**
   * Gap between grid items (Tailwind spacing scale).
   */
  gap?: number;
  /**
   * Grid content including GridCell components.
   */
  children?: React.ReactNode;
  /**
   * Minimum height constraint for the grid.
   */
  minHeight?: "none" | "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Root grid component for creating responsive CSS Grid layouts.
 *
 * Provides a flexible grid system with responsive column and row configurations
 * and customizable spacing.
 *
 * @param columns - Number of columns (responsive).
 * @param rows - Number of rows (responsive).
 * @param gap - Gap between grid items.
 * @param minHeight - Minimum height constraint.
 * @param className - Additional CSS classes.
 * @param children - Grid content.
 */
/**
 * Layout grid component with responsive columns and flexible item placement.
 *
 * @id grid
 * @name Grid
 * @icon Grid3x3
 * @category utility
 * @component
 * @param props - Component properties.
 * @param props.columns - Number of columns (can be responsive object or single number).
 * @param props.rows - Number of rows (can be responsive object or single number).
 * @param props.gap - Gap between grid items (Tailwind spacing scale).
 * @param props.minHeight - Minimum height constraint for the grid (none, sm, md, lg, xl).
 * @param props.children - Grid content including GridCell components.
 * @param props.className - Additional CSS classes.
 */
const Grid = (
  { ref, columns = 6, rows, gap = 4, className, children, minHeight = "none", ...props }: GridProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  const responsiveGridStyles = generateResponsiveGridStyles(columns, rows);

  return (
    <div
      ref={ref}
      className={cx(
        "grid",
        `gap-${gap}`,
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
 *
 * Configuration for individual grid cell positioning and spanning.
 *
 * @interface GridCellProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
type GridCellProps = {
  /**
   * Number of columns the cell should span.
   */
  colSpan?: number;
  /**
   * Number of rows the cell should span.
   */
  rowSpan?: number;
  /**
   * Starting column position (1-based).
   */
  colStart?: number;
  /**
   * Starting row position (1-based).
   */
  rowStart?: number;
  /**
   * Cell content.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Grid cell component for positioning content within a grid.
 *
 * Provides flexible grid cell positioning with spanning, styling variants,
 * and responsive behavior. Used within Grid components for layout control.
 *
 * @param colSpan - Number of columns to span.
 * @param rowSpan - Number of rows to span.
 * @param colStart - Starting column position.
 * @param rowStart - Starting row position.
 * @param className - Additional CSS classes.
 * @param children - Cell content.
 *
 * @component
 * @example
 * ```tsx
 * // Basic grid cell
 * <GridCell>Content</GridCell>
 *
 * // Spanning cell
 * <GridCell colSpan={2} rowSpan={3}>Large Content</GridCell>
 *
 * // Positioned cell
 * <GridCell colStart={3} rowStart={2}>Positioned</GridCell>
 * ```
 */
const GridCell = (
  { ref, colSpan, rowSpan, colStart, rowStart, className, children, ...props }: GridCellProps & { ref?: React.RefObject<HTMLDivElement | null> },
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
      ref={ref}
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
 *
 * Configuration for auto-generated grid cells with optional customization.
 * Extends GridProps but replaces children with auto-generation options.
 *
 * @interface GridAutoProps
 * @augments Omit<GridProps, "children">
 */
type GridAutoProps = {
  /**
   * Number of cells to automatically generate.
   */
  cellCount?: number;
  /**
   * Custom renderer function for cell content.
   */
  renderCell?: (index: number) => React.ReactNode;
} & Omit<GridProps, "children">;

/**
 * Auto-generating grid component for rapid prototyping.
 *
 * Creates a grid with automatically generated numbered cells or custom content.
 * Useful for design system documentation, prototyping, and testing layouts.
 *
 * @param cellCount - Number of cells to generate.
 * @param renderCell - Custom function to render cell content.
 * @param gridProps - All other Grid component props.
 *
 * @component
 * @example
 * ```tsx
 * // Auto-numbered cells
 * <GridAuto columns={6} cellCount={12} />
 *
 * // Custom cell content
 * <GridAuto
 *   columns={4}
 *   cellCount={8}
 *   renderCell={(index) => (
 *     <div>
 *       <h3>Item {index + 1}</h3>
 *       <p>Description</p>
 *     </div>
 *   )}
 * />
 *
 * // Design system grid
 * <GridAuto
 *   columns={8}
 *   cellCount={24}
 *   gap={2}
 *   renderCell={(index) => `${index + 1}`}
 * />
 * ```
 */
const GridAuto = ({ ref, cellCount = 6, renderCell, ...gridProps }: GridAutoProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Grid ref={ref} {...gridProps}>
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
  GridCell,
  type GridCellProps,
  gridCellVariants,
  type GridProps,
  gridVariants,
  type ResponsiveValue,
};
