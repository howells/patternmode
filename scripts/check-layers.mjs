import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Fails when a published stylesheet contains a style rule outside every cascade
 * layer.
 *
 * A layerless declaration outranks every rule in a named layer regardless of
 * specificity, so a layerless component rule cannot be overridden by a
 * consumer's own Tailwind utility at any specificity they can write. Stacksheet
 * shipped that defect until 2.0.4; aperto and parquet shipped it until the
 * cascade-layer patch, at 51 and 12 rules. Nothing caught either, because the
 * build exits 0 and the source looks fine — the layering only exists in the
 * emitted artifact.
 *
 * Reads the built CSS, never the source: a nearest-preceding-`@layer` grep gives
 * the wrong answer because layer blocks close and reopen, and Tailwind minifies
 * the four-name declaration, so the declaration text is not assertable either.
 */

const root = process.cwd();
const packagesDirectory = path.join(root, "packages");

/**
 * Tailwind emits this block outside every layer on purpose: it initialises the
 * `--tw-*` custom properties for browsers without `@property`. It sets no
 * visual property and overrides nothing a consumer would write.
 */
const TAILWIND_PROPERTY_FALLBACK =
  /^\*\s*,\s*:?:?before\s*,\s*:?:?after(?<backdrop>\s*,\s*:?:?backdrop)?$/u;

/**
 * @param {string} css Stylesheet source.
 * @returns {string} The same CSS with comments removed, so a leading banner
 *   cannot be mistaken for part of the next rule's prelude.
 */
const stripComments = (css) => css.replaceAll(/\/\*[\S\s]*?\*\//gu, "");

/**
 * @param {string} css Built stylesheet.
 * @returns {string[]} Preludes of style rules that sit outside every layer.
 */
const findLayerlessRules = (css) => {
  /** @type {string[]} */
  const layerless = [];
  let depth = 0;
  /** @type {number | null} */
  let layerDepth = null;
  let start = 0;

  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];

    if (character === "{") {
      const prelude = css.slice(start, index).trim().replaceAll(/\s+/gu, " ");
      const isLayerBlock = /^@layer\b/u.test(prelude);
      const isAtRule = prelude.startsWith("@");

      if (
        layerDepth === null &&
        !isAtRule &&
        prelude.length > 0 &&
        !TAILWIND_PROPERTY_FALLBACK.test(prelude)
      ) {
        layerless.push(prelude);
      }
      if (isLayerBlock && layerDepth === null) {
        layerDepth = depth + 1;
      }
      depth += 1;
      start = index + 1;
      continue;
    }

    if (character === "}") {
      depth -= 1;
      if (layerDepth !== null && depth < layerDepth) {
        layerDepth = null;
      }
      start = index + 1;
      continue;
    }

    if (character === ";" && depth === 0) {
      start = index + 1;
    }
  }

  return layerless;
};

/** @type {string[]} */
const failures = [];
let scanned = 0;

for (const entry of readdirSync(packagesDirectory, { withFileTypes: true })) {
  if (!entry.isDirectory()) {
    continue;
  }
  const stylesheet = path.join(packagesDirectory, entry.name, "dist", "styles.css");
  if (!existsSync(stylesheet)) {
    continue;
  }

  scanned += 1;
  const layerless = findLayerlessRules(stripComments(readFileSync(stylesheet, "utf-8")));
  if (layerless.length === 0) {
    continue;
  }

  failures.push(
    `${path.relative(root, stylesheet)} — ${layerless.length} layerless style rule(s):`,
    ...layerless.slice(0, 8).map((prelude) => `    ${prelude.slice(0, 100)}`),
    ...(layerless.length > 8 ? [`    …and ${layerless.length - 8} more`] : []),
  );
}

if (scanned === 0) {
  console.error("No built stylesheets found. Run the build before check:layers.");
  process.exit(1);
}

if (failures.length > 0) {
  console.error("Layerless style rules found in published CSS:\n");
  console.error(failures.join("\n"));
  console.error(
    "\nA layerless rule outranks every rule in a named layer regardless of specificity,",
  );
  console.error("so a consumer cannot override it. Wrap the rules in `@layer components`.");
  process.exit(1);
}

console.log(`Cascade layers are clean. (${scanned} stylesheets)`);
