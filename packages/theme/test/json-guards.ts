/**
 * Type guards for parsed JSON in the theme tests. The tests are plain `.mjs`
 * files, where a guard cannot be declared, so the guards live here.
 */

export interface PackageJson {
  readonly exports?: object;
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

/** Whether a package exports a `./styles.css` entry. */
export const exportsStylesheet = (manifest: PackageJson): boolean =>
  manifest.exports !== undefined && "./styles.css" in manifest.exports;
