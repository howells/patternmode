#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const PACKAGES = [
  "menu",
  "context-menu",
  "popover",
  "navigation-menu",
  "search-field",
  "tag-input",
  "select",
  "combobox",
];

const forbid = /\bshadow-(?!none\b)[A-Za-z0-9-]+/g;

/** Recursively walk a directory and return file paths */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const offenders = [];

for (const name of PACKAGES) {
  const base = join(ROOT, "packages", name, "src");
  try {
    const files = walk(base).filter((f) => [".ts", ".tsx"].includes(extname(f)));
    for (const f of files) {
      const content = readFileSync(f, "utf8");
      const lines = content.split(/\r?\n/);
      lines.forEach((line, i) => {
        const m = line.match(forbid);
        if (m) {
          offenders.push({ file: f, line: i + 1, match: m.join(", ") });
        }
      });
    }
  } catch {
    // package may not exist in workspace (safe to ignore)
  }
}

if (offenders.length) {
  console.error("\n[check-dropdown-surfaces] Found forbidden shadow classes on dropdown surfaces:\n");
  for (const o of offenders) {
    console.error(`- ${o.file}:${o.line} -> ${o.match}`);
  }
  console.error("\nReplace with border-only surfaces via @patternmode/utils/floating-surface.\n");
  process.exit(1);
}

console.log("[check-dropdown-surfaces] OK: no forbidden shadow classes found.");

