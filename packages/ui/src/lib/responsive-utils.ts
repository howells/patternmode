/**
 * Shared responsive utilities for handling breakpoint-based properties.
 * Provides standardized responsive types and class generation utilities.
 * 
 * Tailwind 4 Class Detection:
 * flex-col flex-row sm:flex-col sm:flex-row md:flex-col md:flex-row 
 * lg:flex-col lg:flex-row xl:flex-col xl:flex-row 2xl:flex-col 2xl:flex-row
 * max-sm:flex-col max-sm:flex-row max-md:flex-col max-md:flex-row 
 * max-lg:flex-col max-lg:flex-row max-xl:flex-col max-xl:flex-row
 * grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6
 * grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
 * sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
 * md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
 * lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
 * xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6
 * 2xl:grid-cols-1 2xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-cols-5 2xl:grid-cols-6
 */

/**
 * Enhanced responsive value type supporting both min-width and max-width breakpoints.
 * Also supports a 'default' key for explicit base values.
 */
export type ResponsiveValue<T> = T | {
  /**
   * Default/base value (no breakpoint prefix).
   */
  "default"?: T;
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
  /**
   * Max small screens (639px and below).
   */
  "max-sm"?: T;
  /**
   * Max medium screens (767px and below).
   */
  "max-md"?: T;
  /**
   * Max large screens (1023px and below).
   */
  "max-lg"?: T;
  /**
   * Max extra large screens (1279px and below).
   */
  "max-xl"?: T;
};

/**
 * Mapping of breakpoint keys to their CSS prefixes.
 */
const BREAKPOINT_PREFIXES: Record<string, string> = {
  "default": "",
  "sm": "sm:",
  "md": "md:",
  "lg": "lg:",
  "xl": "xl:",
  "2xl": "2xl:",
  "max-sm": "max-sm:",
  "max-md": "max-md:",
  "max-lg": "max-lg:",
  "max-xl": "max-xl:",
};

/**
 * Extract the base/default value from a responsive value.
 * For objects, checks for 'default' key first, then falls back to provided fallback.
 * For primitives, returns the value directly.
 */
export function getResponsiveBase<T>(value: ResponsiveValue<T> | undefined, fallback: T): T {
  if (value === undefined) {
    return fallback;
  }
  
  if (typeof value === "object" && value !== null) {
    // Check if there's an explicit default, otherwise use fallback
    return (value as Record<string, T>).default ?? fallback;
  }
  
  return value as T;
}

/**
 * Generate responsive CSS classes from a responsive value and class generator function.
 * 
 * @param value - The responsive value (string/number or object with breakpoints)
 * @param classGenerator - Function to generate the CSS class from a value
 * @returns Space-separated string of responsive classes
 * 
 * @example
 * ```tsx
 * // For direction: { default: "horizontal", lg: "vertical" }
 * generateResponsiveClasses(direction, (dir) => dir === "vertical" ? "flex-col" : "flex-row")
 * // Returns: "flex-row lg:flex-col"
 * 
 * // For columns: { sm: 2, lg: 4 }
 * generateResponsiveClasses(columns, (cols) => `grid-cols-${cols}`)
 * // Returns: "sm:grid-cols-2 lg:grid-cols-4"
 * ```
 */
export function generateResponsiveClasses<T>(
  value: ResponsiveValue<T> | undefined,
  classGenerator: (value: T) => string,
): string {
  if (value === undefined) {
    return "";
  }

  // Handle primitive values
  if (typeof value !== "object" || value === null) {
    return classGenerator(value as T);
  }

  // Handle responsive objects
  const classes: string[] = [];
  const responsiveValue = value as Record<string, T>;

  Object.entries(responsiveValue).forEach(([breakpoint, val]) => {
    if (val === undefined) {
      return;
    }

    const prefix = BREAKPOINT_PREFIXES[breakpoint];
    if (prefix !== undefined) {
      const className = classGenerator(val);
      classes.push(`${prefix}${className}`);
    }
  });

  return classes.join(" ");
}

/**
 * Common responsive class generators for frequently used properties.
 */
export const responsiveClassGenerators = {
  /**
   * Generate direction classes (flex-col/flex-row).
   */
  direction: (direction: "vertical" | "horizontal"): string =>
    direction === "vertical" ? "flex-col" : "flex-row",
  
  /**
   * Generate grid column classes.
   */
  gridColumns: (columns: number): string => `grid-cols-${columns}`,
  
  /**
   * Generate grid row classes.
   */
  gridRows: (rows: number): string => `grid-rows-${rows}`,
  
  /**
   * Generate display classes.
   */
  display: (display: "block" | "flex" | "grid" | "inline" | "hidden"): string => 
    display === "hidden" ? "hidden" : `${display}`,
  
  /**
   * Generate text alignment classes.
   */
  textAlign: (align: "left" | "center" | "right" | "justify"): string => 
    `text-${align}`,
};

/**
 * Type-safe wrapper for common responsive properties.
 * Provides pre-configured class generators for common use cases.
 */
export const createResponsiveClasses = {
  /**
   * Generate responsive direction classes for flex layouts.
   */
  direction: (value: ResponsiveValue<"vertical" | "horizontal"> | undefined): string =>
    generateResponsiveClasses(value, responsiveClassGenerators.direction),
    
  /**
   * Generate responsive grid column classes.
   */
  gridColumns: (value: ResponsiveValue<number> | undefined): string =>
    generateResponsiveClasses(value, responsiveClassGenerators.gridColumns),
    
  /**
   * Generate responsive grid row classes.
   */
  gridRows: (value: ResponsiveValue<number> | undefined): string =>
    generateResponsiveClasses(value, responsiveClassGenerators.gridRows),
    
  /**
   * Generate responsive display classes.
   */
  display: (value: ResponsiveValue<"block" | "flex" | "grid" | "inline" | "hidden"> | undefined): string =>
    generateResponsiveClasses(value, responsiveClassGenerators.display),
    
  /**
   * Generate responsive text alignment classes.
   */
  textAlign: (value: ResponsiveValue<"left" | "center" | "right" | "justify"> | undefined): string =>
    generateResponsiveClasses(value, responsiveClassGenerators.textAlign),
};