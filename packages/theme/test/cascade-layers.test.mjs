import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { expect, it } from "vitest";

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
 *
 * This lives in `@patternmode/theme` because theme depends on every component
 * package, so turbo builds all of them before this test runs.
 */

const root = path.resolve(import.meta.dirname, "../../..");
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

/**
 * @param {string} directory Directory to walk.
 * @returns {string[]} Every `.css` file beneath it.
 */
const collectStylesheets = (directory) => {
  if (!existsSync(directory)) {
    return [];
  }
  /** @type {string[]} */
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...collectStylesheets(full));
      continue;
    }
    if (entry.name.endsWith(".css")) {
      found.push(full);
    }
  }
  return found;
};

/** @returns {string[]} Every stylesheet a consumer receives. */
const publishedStylesheets = () => {
  /** @type {string[]} */
  const stylesheets = [];

  for (const entry of readdirSync(packagesDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const built = path.join(packagesDirectory, entry.name, "dist", "styles.css");
    if (existsSync(built)) {
      stylesheets.push(built);
    }
    /*
     * The registry ships CSS that is not a package build output — `theme.css`
     * lands in every consumer through the registry rather than through a
     * `dist/`, so a check that only walks `dist/styles.css` would never see it.
     * That is the same blind spot the token vocabulary check had: the one file
     * installed into everybody was the one file exempt from it.
     */
    stylesheets.push(...collectStylesheets(path.join(packagesDirectory, entry.name, "registry")));
  }

  return stylesheets;
};

it("ships no style rule outside a cascade layer", () => {
  const stylesheets = publishedStylesheets();

  // A pass over nothing is not a pass: without built CSS this would approve
  // every stylesheet in the workspace.
  expect(stylesheets.length).toBeGreaterThan(0);

  /** @type {Record<string, string[]>} */
  const layerlessByStylesheet = {};
  for (const stylesheet of stylesheets) {
    const layerless = findLayerlessRules(stripComments(readFileSync(stylesheet, "utf-8")));
    if (layerless.length > 0) {
      layerlessByStylesheet[path.relative(root, stylesheet)] = layerless;
    }
  }

  // A layerless rule outranks every rule in a named layer regardless of
  // specificity, so a consumer cannot override it. Wrap the rules in
  // `@layer components`.
  expect(layerlessByStylesheet).toEqual({});
});
