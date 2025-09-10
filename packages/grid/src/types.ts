import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import type {
  ResponsiveSpacing,
  SpacingValue,
} from "@patternmode/utils/spacing";
import type React from "react";

/**
 * Props for the Grid component.
 *
 * @public
 */
export type GridProps = {
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
   * Viewport sizing variants for full-screen layouts.
   * 'fill' uses dynamic viewport height (h-dvh) for mobile compatibility.
   * 'height' only constrains height, 'width' only constrains width.
   */
  viewport?: "none" | "fill" | "height" | "width";
  /**
   * Named grid areas for semantic layouts.
   * Define areas like "header header" "sidebar main" "footer footer"
   */
  templateAreas?: ResponsiveValue<string>;
  /**
   * Grid auto-flow direction: "row", "column", or "dense".
   * Controls how items are placed in the grid.
   */
  autoFlow?: ResponsiveValue<"row" | "column" | "dense">;
  /**
   * Enable debug mode to visualize grid cell boundaries.
   * Adds red background and borders to all grid cells for layout debugging.
   */
  debug?: boolean;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for the GridCell component.
 *
 * @public
 */
export type GridCellProps = {
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
   * Ending column position (1-based).
   * Specifies where the column span ends.
   */
  colEnd?: number;
  /**
   * Ending row position (1-based).
   * Specifies where the row span ends.
   */
  rowEnd?: number;
  /**
   * Named grid area for semantic layouts.
   * References an area defined in the parent Grid's templateAreas.
   */
  area?: string;
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
