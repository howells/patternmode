import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

const testDir = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = resolve(testDir, "../../../..");

const GLASS_SCRIM_BLUR_REGEX = /\.glass-scrim\s*\{[^}]*backdrop-blur-md/;
const GLASS_SURFACE_BLUR_REGEX = /\.glass-surface\s*\{[^}]*backdrop-blur-md/;
const GLASS_MEDIA_BLUR_REGEX = /\.glass-media\s*\{[^}]*backdrop-blur-md/;
const GLASS_SCRIM_BG_REGEX = /\.glass-scrim\s*\{[^}]*bg-black\/20/;
const GLASS_SURFACE_BG_REGEX = /\.glass-surface\s*\{[^}]*bg-background\/80/;
const GLASS_MEDIA_BG_REGEX = /\.glass-media\s*\{[^}]*bg-black\/40/;

describe("glass utilities", () => {
  test("defines all glass utilities with backdrop-blur-md", async () => {
    const css = await readFile(
      resolve(repoRoot, "packages/tailwind-config/shared-styles.css"),
      "utf8",
    );

    // All three glass utilities should exist
    expect(css).toContain(".glass-scrim");
    expect(css).toContain(".glass-surface");
    expect(css).toContain(".glass-media");

    // All should use backdrop-blur-md (12px)
    expect(css).toMatch(GLASS_SCRIM_BLUR_REGEX);
    expect(css).toMatch(GLASS_SURFACE_BLUR_REGEX);
    expect(css).toMatch(GLASS_MEDIA_BLUR_REGEX);
  });

  test("glass-scrim uses dark overlay for modals", async () => {
    const css = await readFile(
      resolve(repoRoot, "packages/tailwind-config/shared-styles.css"),
      "utf8",
    );

    expect(css).toMatch(GLASS_SCRIM_BG_REGEX);
  });

  test("glass-surface uses background color for floating UI", async () => {
    const css = await readFile(
      resolve(repoRoot, "packages/tailwind-config/shared-styles.css"),
      "utf8",
    );

    expect(css).toMatch(GLASS_SURFACE_BG_REGEX);
  });

  test("glass-media uses dark background for image labels", async () => {
    const css = await readFile(
      resolve(repoRoot, "packages/tailwind-config/shared-styles.css"),
      "utf8",
    );

    expect(css).toMatch(GLASS_MEDIA_BG_REGEX);
  });
});
