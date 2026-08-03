/**
 * Hard-coded registry configuration for scripts/build-registry.mjs.
 *
 * Extracted so the builder stays under the max-lines cap, and because this is
 * the part a human edits when a package is added or its CSS strategy changes —
 * the builder itself is machinery and should not need reading for that.
 */

import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");

/**
 * Component packages, as a fixed allowlist. Directory scanning is deliberately
 * avoided: `@howells/site-ui` is private and must never leak into the registry.
 */
export const COMPONENT_PACKAGES = [
  "aperto",
  "briolette",
  "deck",
  "halo",
  "parquet",
  "scrollframe",
  "stacksheet",
  "status",
  "swatch",
  "tags",
  "verge",
];

/**
 * @typedef {{ dir: string; npm: string; registryName: string; targetDir: string }} LibPackage
 */

/** @type {LibPackage[]} */
export const LIB_PACKAGES = [
  {
    dir: "system",
    npm: "@patternmode/system",
    registryName: "system",
    targetDir: "lib/patternmode/system",
  },
  {
    dir: "motion",
    npm: "@howells/motion",
    registryName: "motion",
    targetDir: "lib/patternmode/motion",
  },
];

/**
 * Internal workspace specifiers that become registryDependencies (URL form)
 * rather than npm `dependencies`, mapped to their registry item name.
 */
export const INTERNAL_REGISTRY = new Map([
  ["@howells/motion", "motion"],
  ["@patternmode/scrollframe", "scrollframe"],
  ["@patternmode/system", "system"],
]);

/**
 * Bare-specifier -> vendored-path map applied to every staged source file.
 * Covers the three documented cross-package runtime imports
 * (`@patternmode/system` -> `@/lib/patternmode/system`, `@howells/motion` ->
 * `@/lib/patternmode/motion`, `@patternmode/scrollframe` ->
 * `@/components/patternmode/scrollframe`) and, generated from the same
 * allowlists, every package's own specifier so self-referential imports in
 * JSDoc examples (e.g. `@patternmode/aperto`) also point at their vendored
 * location. Subpaths are preserved; anything not in this map is left untouched
 * for the guardrail to flag.
 */
/** @type {Map<string, string>} */
export const INTERNAL_SPECIFIER_TARGETS = new Map();
for (const lib of LIB_PACKAGES) {
  INTERNAL_SPECIFIER_TARGETS.set(lib.npm, `@/${lib.targetDir}`);
}
for (const componentName of COMPONENT_PACKAGES) {
  INTERNAL_SPECIFIER_TARGETS.set(
    `@patternmode/${componentName}`,
    `@/components/patternmode/${componentName}`,
  );
}

/** Per-package CSS handling strategy. Hard-coded — never sniffed. */
export const CSS_STYLE = new Map([
  ["aperto", "B"],
  ["briolette", "A"],
  ["deck", "A"],
  ["halo", "A"],
  ["parquet", "B"],
  ["scrollframe", "A"],
  ["stacksheet", "C"],
  ["status", "A"],
  ["swatch", "A"],
  ["tags", "A"],
  ["verge", "B"],
]);

/**
 * Packages whose vendored sources must have top-level `declare global` blocks
 * that declare `process` removed during staging. stacksheet ships a minimal
 * ambient `var process` typing so its source typechecks in browser contexts
 * without the `@types/node` package; vendored into a consumer Next.js app
 * where `@types/node` IS in scope (almost always, transitively), that
 * declaration collides with the Node one and TypeScript fails with TS2403 —
 * no consumer tsconfig setting can avoid it. The block is type-only, so
 * stripping it leaves runtime
 * behavior unchanged. Only `process` blocks are stripped: stacksheet's other
 * ambient declaration (`var CloseWatcher`, a Chromium-120+ API that no TS DOM
 * lib declares) is load-bearing for consumers and must stay, or every
 * consumer's typecheck breaks with TS7017 at the `globalThis.CloseWatcher`
 * usage. The build fails loudly if a listed package no longer contains any
 * process-declaring block, so a future stacksheet refactor can't silently
 * change staging semantics.
 */
export const STRIP_GLOBAL_DECLARATIONS = new Set(["stacksheet"]);

/** Absolute path to each style-B package's source CSS file. */
export const STYLE_B_CSS = new Map([
  ["aperto", path.join(repoRoot, "packages", "aperto", "styles.css")],
  ["parquet", path.join(repoRoot, "packages", "parquet", "src", "styles.css")],
  ["verge", path.join(repoRoot, "packages", "verge", "src", "styles.css")],
]);

/**
 * Canonical shadcn theme-variable names permitted in `cssVars.light`/`.dark`.
 * Any other key must start with `shadow-`. Used by --check.
 */
export const CANONICAL_CSS_VARS = new Set(
  `background foreground card card-foreground popover popover-foreground primary
   primary-foreground secondary secondary-foreground muted muted-foreground accent
   accent-foreground destructive destructive-foreground border input ring radius
   chart-1 chart-2 chart-3 chart-4 chart-5 sidebar sidebar-foreground sidebar-primary
   sidebar-primary-foreground sidebar-accent sidebar-accent-foreground sidebar-border
   sidebar-ring`.split(/\s+/u),
);

/** Every item name the registry must emit, in index order. */
export const EXPECTED_ITEM_NAMES = [
  "theme",
  "font-inter",
  "system",
  "motion",
  ...COMPONENT_PACKAGES,
];
