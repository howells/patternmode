/**
 * Grid Components
 *
 * A flexible grid system for creating responsive layouts with visual guides.
 * Provides CSS Grid-based components with support for responsive breakpoints,
 * customizable spacing, and optional visual guides for design alignment.
 *
 * Features:
 * - Responsive grid columns and rows
 * - Visual column and row guides
 * - Grid cell positioning and spanning
 * - Auto-generated numbered cells
 * - Customizable styling variants
 * - TypeScript support for responsive values
 *
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
 * // Grid with visual guides
 * <Grid
 *   columns={6}
 *   rows={4}
 *   showColumnGuides
 *   showRowGuides
 *   minHeight="lg"
 * >
 *   <GridCell>Header</GridCell>
 *   <GridCell colSpan={4} rowSpan={2}>Main Content</GridCell>
 *   <GridCell>Content</GridCell>
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
 * <Grid columns={12} gap={2} showColumnGuides={false}>
 *   <GridCell colSpan={3}>Sidebar</GridCell>
 *   <GridCell colSpan={9}>Main Content</GridCell>
 *   <GridCell colSpan={12}>Footer</GridCell>
 * </Grid>
 *
 * // Design system grid
 * <Grid
 *   columns={8}
 *   rows={6}
 *   gap={3}
 *   showColumnGuides
 *   showRowGuides
 *   className="bg-zinc-50"
 * >
 *   <GridCell colStart={2} colSpan={2} rowStart={2}>Component A</GridCell>
 *   <GridCell colStart={5} colSpan={3} rowStart={1} rowSpan={3}>Component B</GridCell>
 *   <GridCell colStart={1} colSpan={4} rowStart={4}>Component C</GridCell>
 * </Grid>
 * ```
 */

"use client";

import { cx } from "@/lib/utils";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Responsive value type for grid properties.
 *
 * Allows specifying different values for different screen sizes.
 * Can be a single value or an object with breakpoint-specific values.
 */
type ResponsiveValue<T> =
  | T
  | {
      /** Small screens (640px+) */
      sm?: T;
      /** Medium screens (768px+) */
      md?: T;
      /** Large screens (1024px+) */
      lg?: T;
      /** Extra large screens (1280px+) */
      xl?: T;
      /** 2X large screens (1536px+) */
      "2xl"?: T;
    };

// Grid variants
const gridVariants = tv({
  base: [
    "relative w-full h-full",
    // Grid background pattern
    "bg-[linear-gradient(to_right,_rgb(226_232_240)_1px,_transparent_1px),linear-gradient(to_bottom,_rgb(226_232_240)_1px,_transparent_1px)]",
    "dark:bg-[linear-gradient(to_right,_rgb(51_65_85)_1px,_transparent_1px),linear-gradient(to_bottom,_rgb(51_65_85)_1px,_transparent_1px)]",
  ],
  variants: {
    showColumnGuides: {
      true: "",
      false: "bg-none",
    },
    showRowGuides: {
      true: "",
      false: "[background-image:none]",
    },
    minHeight: {
      none: "",
      sm: "min-h-[100px]",
      md: "min-h-[200px]",
      lg: "min-h-[300px]",
      xl: "min-h-[400px]",
    },
  },
  compoundVariants: [
    {
      showColumnGuides: false,
      showRowGuides: false,
      class: "bg-none [background-image:none]",
    },
    {
      showColumnGuides: false,
      showRowGuides: true,
      class:
        "bg-[linear-gradient(to_bottom,_rgb(226_232_240)_1px,_transparent_1px)] dark:bg-[linear-gradient(to_bottom,_rgb(51_65_85)_1px,_transparent_1px)]",
    },
    {
      showColumnGuides: true,
      showRowGuides: false,
      class:
        "bg-[linear-gradient(to_right,_rgb(226_232_240)_1px,_transparent_1px)] dark:bg-[linear-gradient(to_right,_rgb(51_65_85)_1px,_transparent_1px)]",
    },
  ],
  defaultVariants: {
    showColumnGuides: true,
    showRowGuides: true,
    minHeight: "md",
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
  rows: ResponsiveValue<number> | undefined
): string => {
  const styles: string[] = [];
  const breakpoints = {
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  };

  // Handle columns
  if (columns !== undefined) {
    if (typeof columns === "object") {
      Object.entries(columns).forEach(([breakpoint, value]) => {
        if (value !== undefined) {
          const prefix =
            breakpoints[breakpoint as keyof typeof breakpoints] || "";
          styles.push(`${prefix}grid-cols-${value}`);
          styles.push(`${prefix}[background-size:${100 / value}%_20px]`);
        }
      });
    } else {
      styles.push(`grid-cols-${columns}`);
      styles.push(`[background-size:${100 / columns}%_20px]`);
    }
  }

  // Handle rows
  if (rows !== undefined) {
    if (typeof rows === "object") {
      Object.entries(rows).forEach(([breakpoint, value]) => {
        if (value !== undefined) {
          const prefix =
            breakpoints[breakpoint as keyof typeof breakpoints] || "";
          styles.push(`${prefix}grid-rows-${value}`);
        }
      });
    } else {
      styles.push(`grid-rows-${rows}`);
    }
  }

  return styles.join(" ");
};

// Helper function to get base value for variants
const getBaseValue = <T,>(
  value: ResponsiveValue<T> | undefined
): T | undefined => {
  if (!value) return undefined;
  if (typeof value === "object" && value !== null) {
    const responsiveObj = value as {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };
    return responsiveObj.sm || responsiveObj.md || responsiveObj.lg;
  }
  return value as T;
};

/**
 * Props for the Grid component.
 *
 * Configuration for responsive grid layouts with visual guides and spacing.
 *
 * @interface GridProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns - can be responsive object or single number */
  columns?: ResponsiveValue<number>;
  /** Number of rows - can be responsive object or single number */
  rows?: ResponsiveValue<number>;
  /** Gap between grid items (Tailwind spacing scale) */
  gap?: number;
  /** Whether to show visual column guide lines */
  showColumnGuides?: boolean;
  /** Whether to show visual row guide lines */
  showRowGuides?: boolean;
  /** Grid content including GridCell components */
  children?: React.ReactNode;
  /** Minimum height constraint for the grid */
  minHeight?: "none" | "sm" | "md" | "lg" | "xl";
}

/**
 * Root grid component for creating responsive CSS Grid layouts.
 *
 * Provides a flexible grid system with optional visual guides for design alignment.
 * Supports responsive column and row configurations with customizable spacing.
 *
 * @param columns - Number of columns (responsive)
 * @param rows - Number of rows (responsive)
 * @param gap - Gap between grid items
 * @param showColumnGuides - Show visual column guides
 * @param showRowGuides - Show visual row guides
 * @param minHeight - Minimum height constraint
 * @param className - Additional CSS classes
 * @param children - Grid content
 *
 * @component
 * @example
 * ```tsx
 * // Responsive grid
 * <Grid columns={{ sm: 2, md: 4, lg: 6 }} gap={4}>
 *   <GridCell>Item 1</GridCell>
 *   <GridCell colSpan={2}>Wide Item</GridCell>
 *   <GridCell>Item 3</GridCell>
 * </Grid>
 *
 * // Design system grid with guides
 * <Grid
 *   columns={12}
 *   rows={8}
 *   showColumnGuides
 *   showRowGuides
 *   minHeight="lg"
 * >
 *   <GridCell colSpan={3}>Sidebar</GridCell>
 *   <GridCell colSpan={9}>Main</GridCell>
 * </Grid>
 * ```
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 6,
      rows,
      gap = 4,
      showColumnGuides = true,
      showRowGuides = true,
      className,
      children,
      minHeight = "md",
      ...props
    },
    ref
  ) => {
    const responsiveGridStyles = generateResponsiveGridStyles(columns, rows);

    return (
      <div
        ref={ref}
        className={cx(
          "grid",
          `gap-${gap}`,
          gridVariants({
            showColumnGuides,
            showRowGuides,
            minHeight,
          }),
          responsiveGridStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

/**
 * Props for the GridCell component.
 *
 * Configuration for individual grid cell positioning and spanning.
 *
 * @interface GridCellProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface GridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns the cell should span */
  colSpan?: number;
  /** Number of rows the cell should span */
  rowSpan?: number;
  /** Starting column position (1-based) */
  colStart?: number;
  /** Starting row position (1-based) */
  rowStart?: number;
  /** Cell content */
  children?: React.ReactNode;
}

/**
 * Grid cell component for positioning content within a grid.
 *
 * Provides flexible grid cell positioning with spanning, styling variants,
 * and responsive behavior. Used within Grid components for layout control.
 *
 * @param colSpan - Number of columns to span
 * @param rowSpan - Number of rows to span
 * @param colStart - Starting column position
 * @param rowStart - Starting row position
 * @param className - Additional CSS classes
 * @param children - Cell content
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
const GridCell = React.forwardRef<HTMLDivElement, GridCellProps>(
  (
    { colSpan, rowSpan, colStart, rowStart, className, children, ...props },
    ref
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
  }
);

GridCell.displayName = "GridCell";

/**
 * Props for the GridAuto component.
 *
 * Configuration for auto-generated grid cells with optional customization.
 * Extends GridProps but replaces children with auto-generation options.
 *
 * @interface GridAutoProps
 * @extends Omit<GridProps, "children">
 */
interface GridAutoProps extends Omit<GridProps, "children"> {
  /** Number of cells to automatically generate */
  cellCount?: number;
  /** Custom renderer function for cell content */
  renderCell?: (index: number) => React.ReactNode;
}

/**
 * Auto-generating grid component for rapid prototyping.
 *
 * Creates a grid with automatically generated numbered cells or custom content.
 * Useful for design system documentation, prototyping, and testing layouts.
 *
 * @param cellCount - Number of cells to generate
 * @param renderCell - Custom function to render cell content
 * @param gridProps - All other Grid component props
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
 *   showColumnGuides
 *   showRowGuides
 *   gap={2}
 *   renderCell={(index) => `${index + 1}`}
 * />
 * ```
 */
const GridAuto = React.forwardRef<HTMLDivElement, GridAutoProps>(
  ({ cellCount = 6, renderCell, ...gridProps }, ref) => {
    return (
      <Grid ref={ref} {...gridProps}>
        {Array.from({ length: cellCount }, (_, index) => (
          <GridCell key={index}>
            {renderCell ? renderCell(index) : index + 1}
          </GridCell>
        ))}
      </Grid>
    );
  }
);

GridAuto.displayName = "GridAuto";

export {
  Grid,
  GridAuto,
  GridCell,
  gridCellVariants,
  gridVariants,
  type GridCellProps,
  type GridProps,
  type ResponsiveValue,
};
