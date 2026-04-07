import { BREAKPOINTS, type Breakpoint } from "./breakpoint";

/**
 * Mode for responsive classes - either screen (viewport) or container queries.
 */
export type ResponsiveMode = "screen" | "container";

/**
 * A value that can be either a single static value or a responsive object
 * keyed by breakpoint names. Used throughout the design system to let
 * consumers provide per-breakpoint overrides for props like `gap`, `columns`,
 * `direction`, etc.
 *
 * @example
 * // Static value - same at every breakpoint
 * const gap: ResponsiveValue<Size> = "4";
 *
 * @example
 * // Responsive object - different values per breakpoint
 * const gap: ResponsiveValue<Size> = { base: "2", md: "4", xl: "6" };
 */
export type ResponsiveValue<T> =
  | T
  | (Partial<Record<Breakpoint, T>> & { base?: T });

/**
 * Screen breakpoint prefixes (viewport media queries)
 */
export const SCREEN_PREFIX: Record<Breakpoint, string> = {
  base: "",
  "2xs": "2xs:",
  xs: "xs:",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
  "2xl": "2xl:",
  "3xl": "3xl:",
};

/**
 * Container query prefixes
 */
export const CONTAINER_PREFIX: Record<Breakpoint, string> = {
  base: "",
  "2xs": "@2xs:",
  xs: "@xs:",
  sm: "@sm:",
  md: "@md:",
  lg: "@lg:",
  xl: "@xl:",
  "2xl": "@2xl:",
  "3xl": "@3xl:",
};

/**
 * Check if a value is a responsive object (has breakpoint keys)
 */
export function isResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
): value is Partial<Record<Breakpoint, T>> & { base?: T } {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Returns the Tailwind class prefix for a given breakpoint and responsive mode.
 *
 * In `"screen"` mode, returns viewport prefixes like `"md:"`.
 * In `"container"` mode, returns container-query prefixes like `"@md:"`.
 * The `"base"` breakpoint always returns an empty string.
 *
 * @param breakpoint - Target breakpoint name
 * @param mode - `"screen"` (default) for viewport media queries, `"container"` for container queries
 * @returns The Tailwind prefix string (e.g., `"lg:"`, `"@lg:"`, or `""` for base)
 */
export function getBreakpointPrefix(
  breakpoint: Breakpoint,
  mode: ResponsiveMode = "screen",
): string {
  return mode === "container"
    ? CONTAINER_PREFIX[breakpoint]
    : SCREEN_PREFIX[breakpoint];
}

/**
 * Generate responsive classes from a value and class map
 *
 * @param value - Static value or responsive object
 * @param classMap - Map of value to class name (without breakpoint prefix)
 * @param mode - "screen" (default) or "container"
 * @returns Array of class names with appropriate breakpoint prefixes
 *
 * @example
 * ```ts
 * const GAP_CLASS = { xs: "gap-2", sm: "gap-3", base: "gap-4" };
 * getResponsiveClasses("base", GAP_CLASS, "screen");
 * // → ["gap-4"]
 *
 * getResponsiveClasses({ base: "xs", md: "base" }, GAP_CLASS, "screen");
 * // → ["gap-2", "md:gap-4"]
 *
 * getResponsiveClasses({ base: "xs", md: "base" }, GAP_CLASS, "container");
 * // → ["gap-2", "@md:gap-4"]
 * ```
 */
export function getResponsiveClasses<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  classMap: Record<T, string>,
  mode: ResponsiveMode = "screen",
): string[] {
  if (value === undefined) {
    return [];
  }

  const classes: string[] = [];
  const prefixMap = mode === "container" ? CONTAINER_PREFIX : SCREEN_PREFIX;

  // Static value (not responsive object)
  if (!isResponsiveValue(value)) {
    const cls = classMap[value as T];
    if (cls) {
      classes.push(cls);
    }
    return classes;
  }

  // Responsive object - handle base first
  const baseValue = value.base;
  if (baseValue !== undefined) {
    const cls = classMap[baseValue as T];
    if (cls) {
      classes.push(cls);
    }
  }

  // Handle each breakpoint
  for (const bp of BREAKPOINTS) {
    const bpValue = value[bp];
    if (bpValue !== undefined) {
      const cls = classMap[bpValue as T];
      if (cls) {
        classes.push(`${prefixMap[bp]}${cls}`);
      }
    }
  }

  return classes;
}

/**
 * Push responsive classes to an array (mutates the array)
 * Convenience wrapper around getResponsiveClasses for the pattern used in Flex
 *
 * @param classes - Array to push classes into
 * @param value - Static value or responsive object
 * @param classMap - Map of value to class name
 * @param mode - "screen" (default) or "container"
 */
export function pushResponsiveClasses<T extends string | number>(
  classes: string[],
  value: ResponsiveValue<T> | undefined,
  classMap: Record<T, string>,
  mode: ResponsiveMode = "screen",
): void {
  const responsiveClasses = getResponsiveClasses(value, classMap, mode);
  classes.push(...responsiveClasses);
}
