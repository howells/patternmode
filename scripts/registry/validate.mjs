import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { z } from "zod";

/**
 * Checks on what `shadcn build` emitted, run on every build.
 */

/**
 * shadcn's theme-variable vocabulary: the only names permitted in the theme
 * item's `cssVars.light`/`.dark`, apart from `shadow-*`.
 */
const CANONICAL_CSS_VARS = new Set(
  `background foreground card card-foreground popover popover-foreground primary
   primary-foreground secondary secondary-foreground muted muted-foreground accent
   accent-foreground destructive destructive-foreground border input ring radius
   chart-1 chart-2 chart-3 chart-4 chart-5 sidebar sidebar-foreground sidebar-primary
   sidebar-primary-foreground sidebar-accent sidebar-accent-foreground sidebar-border
   sidebar-ring`.split(/\s+/u),
);

const emittedItemSchema = z.looseObject({
  css: z.unknown().optional(),
  cssVars: z
    .looseObject({
      dark: z.record(z.string(), z.string()).optional(),
      light: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  files: z.array(z.looseObject({ content: z.string().optional() })).optional(),
  name: z.string(),
});

/**
 * Throw unless the emitted registry holds exactly the expected items, the
 * theme's cssVars are canonical, and no item leaks an internal specifier.
 * @param {string} outputDir Absolute output directory.
 * @param {string[]} expectedNames Every item name that was staged.
 * @returns {void}
 */
export const validateOutput = (outputDir, expectedNames) => {
  /** @type {string[]} */
  const failures = [];
  const items = readdirSync(outputDir)
    .filter((file) => file.endsWith(".json") && file !== "registry.json")
    .map((file) => {
      const parsed = emittedItemSchema.safeParse(
        JSON.parse(readFileSync(path.join(outputDir, file), "utf-8")),
      );
      if (!parsed.success) {
        throw new Error(`${file} is not a registry item: ${parsed.error.message}`);
      }
      return parsed.data;
    });

  const names = items.map((item) => item.name).toSorted();
  const expected = expectedNames.toSorted();
  if (names.join(",") !== expected.join(",")) {
    failures.push(`expected items [${expected.join(", ")}], got [${names.join(", ")}]`);
  }

  const cssVars = items.find((item) => item.name === "theme")?.cssVars;
  for (const [mode, vars] of Object.entries({ dark: cssVars?.dark, light: cssVars?.light })) {
    for (const key of Object.keys(vars ?? {})) {
      if (!CANONICAL_CSS_VARS.has(key) && !key.startsWith("shadow-")) {
        failures.push(`theme cssVars.${mode} has non-canonical key "${key}"`);
      }
    }
  }

  for (const item of items) {
    const blobs = [
      ...(item.files ?? []).map((file) => file.content ?? ""),
      JSON.stringify(item.css ?? {}),
    ];
    if (blobs.some((blob) => /["']@(?:patternmode|howells)\//u.test(blob))) {
      failures.push(`item "${item.name}" leaks an internal specifier`);
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Registry validation failed:\n${failures.map((line) => `  - ${line}`).join("\n")}`,
    );
  }
};
