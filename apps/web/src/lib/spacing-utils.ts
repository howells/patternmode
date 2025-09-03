/**
 * Shared spacing utilities for the web app.
 * Moved from @patternmode/utils as app-only helpers.
 */

import { tv } from "tailwind-variants";

export type SpacingValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24;

export type GapValue = SpacingValue | -6 | -5 | -4 | -3 | -2 | -1;

export type ResponsiveSpacing<T> =
  | T
  | {
      default?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
      "max-sm"?: T;
      "max-md"?: T;
      "max-lg"?: T;
      "max-xl"?: T;
    };

export const paddingVariants = {
  0: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8",
  10: "p-10",
  12: "p-12",
  16: "p-16",
  20: "p-20",
  24: "p-24",
} as const;

export const gapVariants = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
  "-6": "",
  "-5": "",
  "-4": "",
  "-3": "",
  "-2": "",
  "-1": "",
} as const;

export const spacingVariants = tv({
  variants: {
    padding: paddingVariants,
    gap: gapVariants,
  },
});

export const generateResponsiveSpacingClasses = (
  property: "padding" | "gap",
  value: ResponsiveSpacing<SpacingValue | GapValue> | undefined
): string => {
  if (!value || typeof value !== "object") return "";
  const classes: string[] = [];
  const breakpoints = {
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  };
  Object.entries(value).forEach(([breakpoint, val]) => {
    if (val === undefined) return;
    const prefix = (breakpoints as Record<string, string>)[breakpoint] || "";
    if (property === "padding") classes.push(`${prefix}p-${val}`);
    else classes.push(`${prefix}gap-${String(val)}`);
  });
  return classes.join(" ");
};

export const getBaseSpacingValue = <T>(
  value: ResponsiveSpacing<T> | undefined
): T | undefined => {
  if (value === undefined || value === null) return;
  if (typeof value === "object") {
    const responsiveObj = value as {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };
    return responsiveObj.sm;
  }
  return value as T;
};
