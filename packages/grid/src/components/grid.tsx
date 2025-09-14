"use client";

import { cx } from "@patternmode/utils/cx";
import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import { createResponsiveClasses } from "@patternmode/utils/responsive-utils";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getGapClass,
} from "@patternmode/utils/spacing";
import type { GridProps } from "../types";
import { gridVariants } from "../variants";

const DEFAULT_GAP = 4;

// Generate responsive grid styles using shared utilities
const generateResponsiveGridStyles = (
  columns: ResponsiveValue<number> | undefined,
  rows: ResponsiveValue<number> | undefined
): string => {
  const columnClasses = createResponsiveClasses.gridColumns(columns);
  const rowClasses = createResponsiveClasses.gridRows(rows);

  return [columnClasses, rowClasses].filter(Boolean).join(" ");
};

// Generate auto-flow classes
const generateAutoFlowClasses = (
  autoFlow: ResponsiveValue<"row" | "column" | "dense"> | undefined
): string => {
  if (!autoFlow) {
    return "";
  }

  const toClass = (val: "row" | "column" | "dense") =>
    val === "dense" ? "grid-flow-dense" : `grid-flow-${val}`;

  if (typeof autoFlow === "string") {
    return toClass(autoFlow);
  }

  const classes: string[] = [];
  if (autoFlow.default) {
    classes.push(toClass(autoFlow.default));
  }
  for (const [breakpoint, value] of Object.entries(autoFlow)) {
    if (breakpoint === "default" || !value) {
      continue;
    }
    const prefix = breakpoint === "sm" ? "" : `${breakpoint}:`;
    classes.push(`${prefix}${toClass(value)}`);
  }

  return classes.join(" ");
};

/**
 * Root grid component for creating responsive CSS Grid layouts.
 *
 * A powerful, flexible grid system that provides CSS Grid functionality with
 * responsive breakpoints, template areas, and auto-flow control. Perfect for
 * creating complex layouts, dashboards, and responsive designs.
 *
 * @note This component's dynamic grid classes are referenced in tailwind-classes.ts.
 * When used in apps with @source directives pointing to this package, Tailwind
 * will find these string literals and include the corresponding CSS in the build.
 *
 * @example
 * // Basic responsive grid
 * <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
 *   <GridCell>Item 1</GridCell>
 *   <GridCell>Item 2</GridCell>
 *   <GridCell>Item 3</GridCell>
 * </Grid>
 *
 * @example
 * // Grid with template areas for semantic layouts
 * <Grid
 *   templateAreas={`
 *     "header header header"
 *     "sidebar main main"
 *     "footer footer footer"
 *   `}
 *   gap={4}
 *   minHeight="lg"
 * >
 *   <GridCell area="header">Header</GridCell>
 *   <GridCell area="sidebar">Sidebar</GridCell>
 *   <GridCell area="main">Main Content</GridCell>
 *   <GridCell area="footer">Footer</GridCell>
 * </Grid>
 *
 * @example
 * // Grid with auto-flow control
 * <Grid columns={3} autoFlow="dense" gap={4}>
 *   <GridCell colSpan={2}>Wide Item</GridCell>
 *   <GridCell>Narrow Item 1</GridCell>
 *   <GridCell>Narrow Item 2</GridCell>
 *   <GridCell colSpan={2}>Another Wide Item</GridCell>
 * </Grid>
 *
 * @example
 * // Advanced positioning with start/end coordinates
 * <Grid columns={6} rows={4} gap={2}>
 *   <GridCell colStart={1} colEnd={3} rowStart={1} rowEnd={3}>
 *     Top Left Area
 *   </GridCell>
 *   <GridCell colStart={4} colEnd={7} rowStart={1} rowEnd={2}>
 *     Top Right Area
 *   </GridCell>
 * </Grid>
 *
 * @example
 * // Responsive grid with breakpoints
 * <Grid
 *   columns={{
 *     default: 1,    // Mobile: 1 column
 *     sm: 2,         // Small: 2 columns
 *     md: 3,         // Medium: 3 columns
 *     lg: 4,         // Large: 4 columns
 *     xl: 6          // Extra large: 6 columns
 *   }}
 *   gap={{
 *     default: 2,   // Small gap on mobile
 *     md: 4,         // Medium gap on larger screens
 *     lg: 6          // Large gap on desktop
 *   }}
 * >
 *   {items.map((item, index) => (
 *     <GridCell key={index}>{item.content}</GridCell>
 *   ))}
 * </Grid>
 *
 * @example
 * // Full viewport grid for hero sections or landing pages
 * <Grid viewport="fill" columns={2} gap={8}>
 *   <GridCell className="flex items-center justify-center">
 *     <div className="text-center">
 *       <h1>Welcome to our app</h1>
 *       <p>Full viewport experience</p>
 *     </div>
 *   </GridCell>
 *   <GridCell className="flex items-center justify-center">
 *     <img src="/hero-image.jpg" alt="Hero" />
 *   </GridCell>
 * </Grid>
 *
 * @example
 * // Viewport height only for sticky sections
 * <Grid viewport="height" columns={3} gap={4}>
 *   <GridCell>Content that fills viewport height</GridCell>
 *   <GridCell>Responsive width maintained</GridCell>
 *   <GridCell>Perfect for dashboards</GridCell>
 * </Grid>
 *
 * @example
 * // Debug mode to visualize grid cell boundaries
 * <Grid debug columns={3} gap={4}>
 *   <GridCell>Cell 1</GridCell>
 *   <GridCell>Cell 2</GridCell>
 *   <GridCell>Cell 3</GridCell>
 *   <GridCell>Cell 4</GridCell>
 *   <GridCell>Cell 5</GridCell>
 *   <GridCell>Cell 6</GridCell>
 * </Grid>
 */
export const Grid = ({
  columns = 6,
  rows,
  gap = 4,
  className,
  children,
  minHeight = "none",
  viewport = "none",
  templateAreas,
  autoFlow,
  debug = false,
  style,
  ...props
}: GridProps) => {
  const responsiveGridStyles = generateResponsiveGridStyles(columns, rows);
  const autoFlowClasses = generateAutoFlowClasses(autoFlow);

  // Get base gap value for non-responsive case
  const baseGap = getBaseSpacingValue(gap) ?? DEFAULT_GAP;

  // Generate responsive gap classes
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", gap);

  // Get base gap class for fallback
  const baseGapClass = getGapClass(baseGap);

  // Handle templateAreas via style prop
  const combinedStyle = templateAreas
    ? {
        ...style,
        gridTemplateAreas:
          typeof templateAreas === "string"
            ? templateAreas
            : templateAreas.default,
      }
    : style;

  return (
    <div
      className={cx(
        "grid",
        baseGapClass,
        responsiveGapClasses,
        gridVariants({ minHeight, viewport, debug }),
        responsiveGridStyles,
        autoFlowClasses,
        className
      )}
      data-testid="grid"
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.displayName = "Grid";
