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

/*
 * The dark tokens the site draws on dark grounds inside the light page (code
 * samples, the dark catalogue figures), written as --dark-<name>.
 */
const DARK_NAMES = ["background", "card", "foreground", "muted-foreground", "border"];

/**
 * @param {"dark" | "light"} mode Which theme mode the tokens come from.
 * @param {Record<string, string>} tokens That mode's tokens from item.json.
 * @param {string[]} names The tokens to write.
 * @param {string} prefix Prepended to each written name.
 * @returns {string[]} One custom property declaration per name.
 */
const tokenLines = (mode, tokens, names, prefix) => {
  const values = new Map(Object.entries(tokens));
  return names.map((name) => {
    const value = values.get(name);
    if (value === undefined) {
      throw new Error(`packages/theme/registry/theme/item.json has no ${mode} token "${name}".`);
    }
    return `  --${prefix}${name}: ${value};`;
  });
};

const lines = [
  ...tokenLines("light", theme.cssVars.light, NAMES, ""),
  ...tokenLines("dark", theme.cssVars.dark, DARK_NAMES, "dark-"),
];

writeFileSync(
  dest,
  `/* Written by scripts/write-theme-tokens.mjs from packages/theme. Do not edit. */\n:root {\n${lines.join("\n")}\n}\n`,
);

console.log(`Wrote ${lines.length} theme tokens to ${path.relative(root, dest)}.`);
