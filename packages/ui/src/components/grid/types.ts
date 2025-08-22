import type {
	ResponsiveSpacing,
	SpacingValue,
} from "@patternmode/utils/spacing";
import type React from "react";
import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";

/**
 * Props for the Grid component.
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
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for the GridCell component.
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
 * Props for the GridAuto component.
 */
export type GridAutoProps = {
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
