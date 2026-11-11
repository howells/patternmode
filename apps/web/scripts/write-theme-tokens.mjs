import { writeFileSync } from "node:fs";
import path from "node:path";

import theme from "../../../packages/theme/registry/theme/item.json" with { type: "json" };

const root = path.resolve(import.meta.dirname, "../../..");
const dest = path.join(root, "apps/web/app/theme-tokens.css");

/*
 * The light tokens the site reads, by name. Their values come from the theme;
 * only these are written, so a token the site never set stays unset.
 */
const NAMES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
  "ring",
  "destructive",
  "radius",
  "shadow-sm",
  "shadow-md",
  "shadow-xl",
];

const light = new Map(Object.entries(theme.cssVars.light));

const lines = NAMES.map((name) => {
  const value = light.get(name);
  if (value === undefined) {
    throw new Error(`packages/theme/registry/theme/item.json has no light token "${name}".`);
  }
  return `  --${name}: ${value};`;
});

writeFileSync(
  dest,
  `/* Written by scripts/write-theme-tokens.mjs from packages/theme. Do not edit. */\n:root {\n${lines.join("\n")}\n}\n`,
);

console.log(`Wrote ${NAMES.length} theme tokens to ${path.relative(root, dest)}.`);
