import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const buildStyles = () => {
  const dir = mkdtempSync(path.join(tmpdir(), "stacksheet-css-"));
  const outFile = path.join(dir, "styles.css");
  try {
    execFileSync(
      "pnpm",
      ["exec", "tailwindcss", "-i", "./src/styles.css", "-o", outFile, "--minify"],
      { cwd: process.cwd(), stdio: "pipe" },
    );
    return readFileSync(outFile, "utf-8");
  } finally {
    rmSync(dir, { force: true, recursive: true });
  }
};

describe("styles.css", () => {
  let css = "";
  beforeAll(() => {
    css = buildStyles();
  });

  it("keeps Back and Close at a 44px tap target", () => {
    for (const part of ["back", "close"]) {
      const rule = new RegExp(`\\.patternmode-stacksheet__${part}\\{[^}]*`, "u").exec(css)?.[0];
      expect(rule).toContain("min-height:calc(var(--spacing,.25rem) * 11)");
      expect(rule).toContain("min-width:calc(var(--spacing,.25rem) * 11)");
    }
  });

  it("ships its rules in the components layer, beneath every app utility", () => {
    // In `utilities` this sheet competed with the app's own utilities on load
    // order, and a rule here beat the app's responsive variants.
    expect(css).toContain("@layer components{.patternmode-stacksheet__");
    expect(css).not.toMatch(/@layer utilities\{/u);
  });

  it("ships only its own classes, no generic utilities", () => {
    const rules = css.replaceAll(/\/\*[\s\S]*?\*\//gu, "");
    const classes = new Set(rules.match(/\.[a-z][\w-]*(?=[{\s,:>[.])/gu));
    expect(
      [...classes].filter((name) => !name.startsWith(".patternmode-stacksheet__")),
    ).toStrictEqual([]);
  });

  it("ships no Tailwind Preflight or theme globals", () => {
    expect(css).not.toContain(":root,:host");
    expect(css).not.toContain("box-sizing:border-box");
    expect(css).not.toContain("border-color:currentcolor");
  });
});
