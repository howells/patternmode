/**
 * Type guards for parsed JSON in the theme tests. The tests are plain `.mjs`
 * files, where a guard cannot be declared, so the guards live here.
 */

export interface PackageJson {
  readonly name: string;
  readonly private?: boolean;
}

export interface CssVarsItem {
  readonly cssVars: object;
}

export const isObject = (value: unknown): value is object =>
  typeof value === "object" && value !== null;

export const isPackageJson = (value: unknown): value is PackageJson =>
  isObject(value) && "name" in value && typeof value.name === "string";

export const hasCssVars = (value: unknown): value is CssVarsItem =>
  isObject(value) && "cssVars" in value && isObject(value.cssVars);
