export const PATTERNMODE_SIZES = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"] as const;

/** Shared size token names used by Patternmode primitives. */
export type PatternmodeSize = (typeof PATTERNMODE_SIZES)[number];

/** CSS size value accepted by helpers; numbers are interpreted as pixels. */
export type CssSize = number | string;

export const PATTERNMODE_SIZE_VALUES = {
  "2xl": "3.5rem",
  "2xs": "1rem",
  "3xl": "4rem",
  base: "2rem",
  lg: "2.5rem",
  sm: "1.5rem",
  xl: "3rem",
  xs: "1.25rem",
} as const satisfies Record<PatternmodeSize, string>;

export const PATTERNMODE_SIZE_PIXELS = {
  "2xl": 56,
  "2xs": 16,
  "3xl": 64,
  base: 32,
  lg: 40,
  sm: 24,
  xl: 48,
  xs: 20,
} as const satisfies Record<PatternmodeSize, number>;

export const getPatternmodeSizeValue = (size: PatternmodeSize): string =>
  PATTERNMODE_SIZE_VALUES[size];

/** Converts numeric size values to pixel strings while preserving CSS strings. */
export const toCssSize = (value: CssSize | undefined): string | undefined => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
};

/** Builds a CSS custom-property style object for a Patternmode size token. */
export const getSizeVariableStyle = (
  size: PatternmodeSize,
  variableName = "--patternmode-size",
): Record<string, string> => ({
  [variableName]: getPatternmodeSizeValue(size),
});

export type ClassNameValue = false | null | string | undefined;

/** Joins class names and returns `undefined` when no truthy classes remain. */
export const joinClassNames = (...parts: ClassNameValue[]): string | undefined => {
  const out = parts.filter(Boolean).join(" ").trim();
  return out.length > 0 ? out : undefined;
};

export const BREAKPOINT_VALUES = {
  "2xl": 1536,
  "2xs": 320,
  "3xl": 1920,
  lg: 1024,
  md: 768,
  sm: 640,
  xl: 1280,
  xs: 480,
} as const;

/** Responsive breakpoint key, including `base` for unprefixed classes. */
export type Breakpoint = keyof typeof BREAKPOINT_VALUES | "base";

export const BREAKPOINTS = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
] as const satisfies readonly (keyof typeof BREAKPOINT_VALUES)[];

/** Selects Tailwind screen prefixes or container-query prefixes. */
export type ResponsiveMode = "screen" | "container";

/** Single value or breakpoint map with optional unprefixed `base` value. */
export type ResponsiveValue<T> = T | (Partial<Record<Breakpoint, T>> & { base?: T });

export const SCREEN_PREFIX = {
  "2xl": "2xl:",
  "2xs": "2xs:",
  "3xl": "3xl:",
  base: "",
  lg: "lg:",
  md: "md:",
  sm: "sm:",
  xl: "xl:",
  xs: "xs:",
} as const satisfies Record<Breakpoint, string>;

export const CONTAINER_PREFIX = {
  "2xl": "@2xl:",
  "2xs": "@2xs:",
  "3xl": "@3xl:",
  base: "",
  lg: "@lg:",
  md: "@md:",
  sm: "@sm:",
  xl: "@xl:",
  xs: "@xs:",
} as const satisfies Record<Breakpoint, string>;

export const isResponsiveValue = <T>(
  value: ResponsiveValue<T> | undefined,
): value is Partial<Record<Breakpoint, T>> & { base?: T } =>
  !!value && typeof value === "object" && !Array.isArray(value);

/** Returns the class prefix for a breakpoint in screen or container mode. */
export const getBreakpointPrefix = (
  breakpoint: Breakpoint,
  mode: ResponsiveMode = "screen",
): string => (mode === "container" ? CONTAINER_PREFIX[breakpoint] : SCREEN_PREFIX[breakpoint]);

/**
 * Expands a responsive value into Tailwind-style class names.
 *
 * Missing values or values absent from `classMap` are ignored, preserving the
 * caller's existing class list without fallback classes.
 */
export const getResponsiveClasses = <T extends number | string>(
  value: ResponsiveValue<T> | undefined,
  classMap: Record<T, string>,
  mode: ResponsiveMode = "screen",
): string[] => {
  if (value === undefined) {
    return [];
  }

  if (!isResponsiveValue(value)) {
    const className = classMap[value as T];
    return className ? [className] : [];
  }

  const classes: string[] = [];
  if (value.base !== undefined) {
    const className = classMap[value.base as T];
    if (className) {
      classes.push(className);
    }
  }

  for (const breakpoint of BREAKPOINTS) {
    const breakpointValue = value[breakpoint];
    if (breakpointValue === undefined) {
      continue;
    }

    const className = classMap[breakpointValue as T];
    if (className) {
      classes.push(`${getBreakpointPrefix(breakpoint, mode)}${className}`);
    }
  }

  return classes;
};

export const pushResponsiveClasses = <T extends number | string>(
  classes: string[],
  value: ResponsiveValue<T> | undefined,
  classMap: Record<T, string>,
  mode: ResponsiveMode = "screen",
): void => {
  classes.push(...getResponsiveClasses(value, classMap, mode));
};

export const OBJECT_FITS = ["contain", "cover", "fill", "none", "scale-down"] as const;

export type ObjectFit = (typeof OBJECT_FITS)[number];

/** Object sizing options shared by media-like primitives. */
export interface ObjectSizing {
  /**
   * CSS `object-fit` value.
   *
   * Default `"cover"`.
   */
  fit?: ObjectFit;
  /**
   * CSS height; numbers are interpreted as pixels.
   *
   * Default `"100%"`.
   */
  height?: CssSize;
  /**
   * CSS `object-position` value.
   *
   * Default `"center"`.
   */
  position?: string;
  /**
   * CSS width; numbers are interpreted as pixels.
   *
   * Default `"100%"`.
   */
  width?: CssSize;
}

/** Normalized object sizing style with concrete CSS strings. */
export interface ObjectSizingStyle {
  height: string;
  objectFit: ObjectFit;
  objectPosition: string;
  width: string;
}

/** Resolves object sizing props into a complete inline style object. */
export const getObjectSizingStyle = (sizing: ObjectSizing = {}): ObjectSizingStyle => ({
  height: toCssSize(sizing.height) ?? "100%",
  objectFit: sizing.fit ?? "cover",
  objectPosition: sizing.position ?? "center",
  width: toCssSize(sizing.width) ?? "100%",
});
