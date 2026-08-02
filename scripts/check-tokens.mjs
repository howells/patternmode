import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

/**
 * Names allowed inside `var(--NAME…)` references in component package CSS.
 * Mirrors the shadcn theme variable vocabulary, plus Tailwind's own
 * internal custom properties (font-*, shadow-*, spacing, tw-*).
 */
const ALLOWLIST = new Set([
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "radius",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]);

const ALLOWED_PREFIXES = ["font-", "shadow-", "spacing", "tw-"];

/**
 * Custom properties injected at runtime by Base UI anchor positioning
 * (tags popover); they are never defined in CSS.
 */
const RUNTIME_PROVIDED = new Set(["available-height", "anchor-width"]);

/**
 * Documented consumer-tunable theming knobs: referenced with fallbacks in
 * package CSS but intentionally never defined by the package itself —
 * consumers set them to override the defaults.
 */
const CONSUMER_TUNABLE = new Set([
  "aperto-radius",
  "aperto-caption-allowance",
  "aperto-expanded-width",
]);

/**
 * @param {string} dir Directory to walk.
 * @param {RegExp} filePattern Filename pattern to collect.
 * @returns {string[]} Matching files.
 */
const walk = (dir, filePattern) => {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = readdirSync(dir);
  /** @type {string[]} */
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      if (entry === "dist" || entry === "node_modules") {
        continue;
      }
      files.push(...walk(filePath, filePattern));
      continue;
    }

    if (filePattern.test(entry)) {
      files.push(filePath);
    }
  }

  return files;
};

const packagesDir = path.join(root, "packages");
const packageNames = readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

/** @type {Map<string, string[]>} CSS files to scan, grouped by package. */
const cssFilesByPackage = new Map();

for (const packageName of packageNames) {
  const files = walk(path.join(packagesDir, packageName, "src"), /\.css$/u);
  if (packageName === "aperto") {
    const apertoStyles = path.join(packagesDir, "aperto", "styles.css");
    if (existsSync(apertoStyles)) {
      files.push(apertoStyles);
    }
  }
  if (files.length > 0) {
    cssFilesByPackage.set(packageName, files);
  }
}

const cssDeclarationPattern = /--(?<name>[a-zA-Z0-9-]+)\s*:/gu;
const inlineStyleKeyPattern = /"--(?<name>[a-zA-Z0-9-]+)"\s*\??:/gu;

/**
 * Collects custom properties a package defines itself: `--NAME:` declarations
 * in its scanned CSS, plus quoted `"--NAME":` style-object keys in its
 * src TS/TSX (component-local properties set via runtime inline styles,
 * e.g. deck's `--deck-perspective`).
 *
 * @param {string} packageName Package directory name.
 * @returns {Set<string>} Names defined within the package.
 */
const definedNamesForPackage = (packageName) => {
  /** @type {Set<string>} */
  const names = new Set();

  for (const file of cssFilesByPackage.get(packageName) ?? []) {
    const source = readFileSync(file, "utf-8");
    for (const match of source.matchAll(cssDeclarationPattern)) {
      const name = match.groups?.name;
      if (name !== undefined && name !== "") {
        names.add(name);
      }
    }
  }

  for (const file of walk(path.join(packagesDir, packageName, "src"), /\.(?:ts|tsx)$/u)) {
    const source = readFileSync(file, "utf-8");
    for (const match of source.matchAll(inlineStyleKeyPattern)) {
      const name = match.groups?.name;
      if (name !== undefined && name !== "") {
        names.add(name);
      }
    }
  }

  return names;
};

/**
 * @param {string} name Custom property name (without the leading `--`).
 * @param {Set<string>} packageDefined Names the owning package defines itself.
 * @returns {boolean} Whether the name is permitted.
 */
const isAllowed = (name, packageDefined) =>
  ALLOWLIST.has(name) ||
  name.startsWith("patternmode-") ||
  ALLOWED_PREFIXES.some((prefix) => name.startsWith(prefix)) ||
  packageDefined.has(name) ||
  RUNTIME_PROVIDED.has(name) ||
  CONSUMER_TUNABLE.has(name);

const varPattern = /var\(\s*--(?<name>[a-zA-Z0-9-]+)/gu;

const violations = [];
let fileCount = 0;
let occurrenceCount = 0;

for (const [packageName, files] of cssFilesByPackage) {
  const packageDefined = definedNamesForPackage(packageName);

  for (const file of files) {
    fileCount += 1;
    // Scanned whole-file rather than line by line: the formatter wraps long
    // `var(…)` calls so the name can sit on the line after its `var(`, and a
    // per-line match silently skips those references.
    const source = readFileSync(file, "utf-8");

    for (const match of source.matchAll(varPattern)) {
      const name = match.groups?.name;
      if (name === undefined || name === "") {
        continue;
      }
      occurrenceCount += 1;
      if (!isAllowed(name, packageDefined)) {
        const line = source.slice(0, match.index).split("\n").length;
        violations.push(`${path.relative(root, file)}:${line}  var(--${name})`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log(
  `Token vocabulary is clean. (${fileCount} files, ${occurrenceCount} var(--…) occurrences)`,
);
