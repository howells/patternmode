import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

/**
 * @param {unknown} value Parsed registry item.
 * @returns {value is { cssVars: Record<string, unknown> }} Whether it carries a `cssVars` object.
 */
const hasCssVars = (value) =>
  typeof value === "object" &&
  value !== null &&
  "cssVars" in value &&
  typeof value.cssVars === "object" &&
  value.cssVars !== null;

/**
 * Names allowed inside `var(--NAME…)` references in component package CSS,
 * **derived from the theme that actually defines them** rather than restated
 * here.
 *
 * A hand-maintained copy of this list checks spelling, not existence: a name
 * could sit in the allowlist while the theme defined it nowhere, and a
 * component referencing it would pass the gate and then render from its hex
 * fallback forever. That was live — `destructive-foreground` was allowlisted
 * and defined in neither mode — and it is the same shape as the
 * `--border-subtle` name this repo retired. Deriving makes the class
 * unwriteable instead of fixing one instance.
 *
 * The union of all three `cssVars` blocks is taken, not the intersection:
 * `light` is the base and `dark` overrides it, so `radius` legitimately
 * appears only under `light`.
 *
 * @returns {Set<string>} Every custom property name the theme defines.
 */
const themeDefinedNames = () => {
  const itemPath = path.join(root, "packages/theme/registry/theme/item.json");
  if (!existsSync(itemPath)) {
    throw new Error(
      `Theme registry item not found at ${path.relative(root, itemPath)}. The token gate derives its vocabulary from it and cannot run without it.`,
    );
  }

  /** @type {unknown} */
  const item = JSON.parse(readFileSync(itemPath, "utf-8"));
  if (!hasCssVars(item)) {
    throw new Error(
      `${path.relative(root, itemPath)} declares no \`cssVars\` object. The token gate has no vocabulary to check against.`,
    );
  }

  /** @type {Set<string>} */
  const names = new Set();
  for (const block of Object.values(item.cssVars)) {
    if (typeof block !== "object" || block === null) {
      continue;
    }
    for (const name of Object.keys(block)) {
      names.add(name);
    }
  }

  if (names.size === 0) {
    throw new Error(
      `${path.relative(root, itemPath)} defines zero custom properties. Refusing to run a gate that would pass everything.`,
    );
  }

  return names;
};

const ALLOWLIST = themeDefinedNames();

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
  // `theme` has no `src/` — its generator lives at repo root by design
  // (spec 002) and its CSS ships from the registry directory. Without this the
  // one file that injects base CSS into every consumer is the only one exempt
  // from the vocabulary gate. It references nothing today; the point is that it
  // cannot start to unnoticed.
  if (packageName === "theme") {
    files.push(...walk(path.join(packagesDir, "theme", "registry"), /\.css$/u));
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
