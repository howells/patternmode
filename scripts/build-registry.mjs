import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { parse as parseCss } from "postcss";
import { parse as parseYaml } from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "..");
const themeDir = path.join(repoRoot, "packages", "theme");
const registryDir = path.join(themeDir, "registry");
const processEnv = globalThis.process.env;

/**
 * Component packages, as a fixed allowlist. Directory scanning is deliberately
 * avoided: `@howells/site-ui` is private and must never leak into the registry.
 */
const COMPONENT_PACKAGES = [
  "aperto",
  "briolette",
  "deck",
  "halo",
  "parquet",
  "scrollframe",
  "stacksheet",
  "status",
  "swatch",
  "tags",
];

/**
 * @typedef {{ dir: string; npm: string; registryName: string; targetDir: string }} LibPackage
 */

/** @type {LibPackage[]} */
const LIB_PACKAGES = [
  {
    dir: "system",
    npm: "@patternmode/system",
    registryName: "system",
    targetDir: "lib/patternmode/system",
  },
  {
    dir: "motion",
    npm: "@howells/motion",
    registryName: "motion",
    targetDir: "lib/patternmode/motion",
  },
];

/**
 * Internal workspace specifiers that become registryDependencies (URL form)
 * rather than npm `dependencies`, mapped to their registry item name.
 */
const INTERNAL_REGISTRY = new Map([
  ["@howells/motion", "motion"],
  ["@patternmode/scrollframe", "scrollframe"],
  ["@patternmode/system", "system"],
]);

/**
 * Bare-specifier -> vendored-path map applied to every staged source file.
 * Covers the three documented cross-package runtime imports
 * (`@patternmode/system` -> `@/lib/patternmode/system`, `@howells/motion` ->
 * `@/lib/patternmode/motion`, `@patternmode/scrollframe` ->
 * `@/components/patternmode/scrollframe`) and, generated from the same
 * allowlists, every package's own specifier so self-referential imports in
 * JSDoc examples (e.g. `@patternmode/aperto`) also point at their vendored
 * location. Subpaths are preserved; anything not in this map is left untouched
 * for the guardrail to flag.
 */
/** @type {Map<string, string>} */
const INTERNAL_SPECIFIER_TARGETS = new Map();
for (const lib of LIB_PACKAGES) {
  INTERNAL_SPECIFIER_TARGETS.set(lib.npm, `@/${lib.targetDir}`);
}
for (const componentName of COMPONENT_PACKAGES) {
  INTERNAL_SPECIFIER_TARGETS.set(
    `@patternmode/${componentName}`,
    `@/components/patternmode/${componentName}`,
  );
}

/** Per-package CSS handling strategy. Hard-coded — never sniffed. */
const CSS_STYLE = new Map([
  ["aperto", "B"],
  ["briolette", "A"],
  ["deck", "A"],
  ["halo", "A"],
  ["parquet", "B"],
  ["scrollframe", "A"],
  ["stacksheet", "C"],
  ["status", "A"],
  ["swatch", "A"],
  ["tags", "A"],
]);

/**
 * Packages whose vendored sources must have top-level `declare global` blocks
 * that declare `process` removed during staging. stacksheet ships a minimal
 * ambient `var process` typing so its source typechecks in browser contexts
 * without the `@types/node` package; vendored into a consumer Next.js app
 * where `@types/node` IS in scope (almost always, transitively), that
 * declaration collides with the Node one and TypeScript fails with TS2403 —
 * no consumer tsconfig setting can avoid it. The block is type-only, so
 * stripping it leaves runtime
 * behavior unchanged. Only `process` blocks are stripped: stacksheet's other
 * ambient declaration (`var CloseWatcher`, a Chromium-120+ API that no TS DOM
 * lib declares) is load-bearing for consumers and must stay, or every
 * consumer's typecheck breaks with TS7017 at the `globalThis.CloseWatcher`
 * usage. The build fails loudly if a listed package no longer contains any
 * process-declaring block, so a future stacksheet refactor can't silently
 * change staging semantics.
 */
const STRIP_GLOBAL_DECLARATIONS = new Set(["stacksheet"]);

/** Absolute path to each style-B package's source CSS file. */
const STYLE_B_CSS = new Map([
  ["aperto", path.join(repoRoot, "packages", "aperto", "styles.css")],
  ["parquet", path.join(repoRoot, "packages", "parquet", "src", "styles.css")],
]);

/**
 * Canonical shadcn theme-variable names permitted in `cssVars.light`/`.dark`.
 * Any other key must start with `shadow-`. Used by --check.
 */
const CANONICAL_CSS_VARS = new Set(
  `background foreground card card-foreground popover popover-foreground primary
   primary-foreground secondary secondary-foreground muted muted-foreground accent
   accent-foreground destructive destructive-foreground border input ring radius
   chart-1 chart-2 chart-3 chart-4 chart-5 sidebar sidebar-foreground sidebar-primary
   sidebar-primary-foreground sidebar-accent sidebar-accent-foreground sidebar-border
   sidebar-ring`.split(/\s+/u),
);

/** Every item name the registry must emit, in index order. */
const EXPECTED_ITEM_NAMES = ["theme", "font-inter", "system", "motion", ...COMPONENT_PACKAGES];

/**
 * @typedef {{ name: string; version: string; description?: string; dependencies?: Record<string, string> }} Manifest
 */

/**
 * @typedef {{ path: string; target: string; type: string; content?: string }} RegistryFile
 */

/**
 * @typedef {{
 *   light?: Record<string, string>;
 *   dark?: Record<string, string>;
 *   theme?: Record<string, string>;
 * }} CssVars
 */

/**
 * @typedef {{
 *   name: string;
 *   type: string;
 *   title?: string;
 *   description?: string;
 *   dependencies?: string[];
 *   registryDependencies?: string[];
 *   files?: RegistryFile[];
 *   css?: object;
 *   cssVars?: CssVars;
 *   docs?: string;
 *   font?: object;
 *   meta?: object;
 * }} RegistryItem
 */

/**
 * @param {unknown} value Candidate value.
 * @returns {value is Record<string, unknown>} Whether the value is a non-null object.
 */
const isPlainRecord = (value) => typeof value === "object" && value !== null;

/**
 * @param {unknown} value Candidate value.
 * @returns {value is Manifest} Whether the value is a package manifest.
 */
const isManifest = (value) =>
  typeof value === "object" &&
  value !== null &&
  "name" in value &&
  typeof value.name === "string" &&
  "version" in value &&
  typeof value.version === "string";

/**
 * @param {unknown} value Candidate value.
 * @returns {value is RegistryItem} Whether the value is a registry item.
 */
const isRegistryItem = (value) =>
  typeof value === "object" &&
  value !== null &&
  "name" in value &&
  typeof value.name === "string" &&
  "type" in value &&
  typeof value.type === "string";

/**
 * @param {string} filePath Absolute path to a JSON file.
 * @returns {unknown} Parsed JSON, typed as unknown for the caller to narrow.
 */
const readJson = (filePath) => {
  /** @type {unknown} */
  const parsed = JSON.parse(readFileSync(filePath, "utf-8"));
  return parsed;
};

/**
 * @param {string} name Package directory name (e.g. "swatch").
 * @returns {Manifest} The package manifest.
 */
const readManifest = (name) => {
  const parsed = readJson(path.join(repoRoot, "packages", name, "package.json"));
  if (!isManifest(parsed)) {
    throw new Error(`packages/${name}/package.json is not a package manifest`);
  }
  return parsed;
};

/**
 * Coerce an unknown value into a flat string->string record, dropping non-string entries.
 * @param {unknown} value Candidate value.
 * @returns {Record<string, string>} Sanitised record.
 */
const asStringRecord = (value) => {
  /** @type {Record<string, string>} */
  const out = {};
  if (typeof value === "object" && value !== null) {
    for (const [key, entry] of Object.entries(value)) {
      if (typeof entry === "string") {
        out[key] = entry;
      }
    }
  }
  return out;
};

/**
 * Read the value at `key` on an unknown object, or undefined.
 * @param {unknown} value Candidate object.
 * @param {string} key Property key.
 * @returns {unknown} The property value, if any.
 */
const propAt = (value, key) =>
  (typeof value === "object" && value !== null ? Object.entries(value) : []).find(
    ([entryKey]) => entryKey === key,
  )?.[1];

/**
 * Convert plain CSS text into the shadcn registry-item `css` object form.
 * Rules become { selector: { prop: value } }; at-rules become
 * { "@layer components": { ...nested } }. Throws on duplicate keys rather
 * than silently merging order-dependent CSS.
 * @param {string} cssText Raw CSS source.
 * @param {string} sourceLabel Human-readable origin for error messages.
 * @returns {Record<string, unknown>} The registry-item `css` object.
 */
const cssToRegistryObject = (cssText, sourceLabel) => {
  const root = parseCss(cssText, { from: sourceLabel });
  /**
   * @param {import("postcss").Container} container A postcss container node.
   * @returns {Record<string, unknown>} Nested object for the container.
   */
  const walk = (container) => {
    /** @type {Record<string, unknown>} */
    const out = {};
    /**
     * @param {string} key Object key.
     * @param {unknown} value Object value.
     * @returns {void}
     */
    const setKey = (key, value) => {
      if (key in out) {
        const existing = out[key];
        if (isPlainRecord(existing) && isPlainRecord(value)) {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedKey in existing) {
              throw new Error(
                `duplicate declaration "${nestedKey}" under "${key}" in ${sourceLabel}`,
              );
            }
            existing[nestedKey] = nestedValue;
          }
          return;
        }
        throw new Error(`duplicate key "${key}" in ${sourceLabel}`);
      }
      out[key] = value;
    };
    for (const node of container.nodes ?? []) {
      if (node.type === "rule") {
        setKey(node.selector, walk(node));
      } else if (node.type === "atrule") {
        setKey(node.params ? `@${node.name} ${node.params}` : `@${node.name}`, walk(node));
      } else if (node.type === "decl") {
        const value = node.value.replaceAll(/\s+/gu, " ").trim();
        setKey(node.prop, value + (node.important ? " !important" : ""));
      }
    }
    return out;
  };
  return walk(root);
};

/**
 * Resolve the base URL baked into registryDependencies. Refuses to bake
 * localhost into a Vercel production build.
 * @returns {string} The base URL, without a trailing slash.
 */
const resolveBaseUrl = () => {
  const explicit = processEnv.REGISTRY_BASE_URL;
  if (explicit !== undefined && explicit.trim() !== "") {
    return explicit.trim().replace(/\/+$/u, "");
  }
  const vercel = processEnv.VERCEL;
  if (vercel !== undefined && vercel !== "") {
    throw new Error(
      "REGISTRY_BASE_URL is required on Vercel: refusing to bake http://localhost:3000 into a production registry.",
    );
  }
  console.warn(
    "REGISTRY_BASE_URL is not set; defaulting to http://localhost:3000. Set it for any non-local build.",
  );
  return "http://localhost:3000";
};

/**
 * @typedef {{
 *   versions: Map<string, string>;
 *   catalog: Record<string, string>;
 *   catalogs: Record<string, Record<string, string>>;
 * }} Workspace
 */

/**
 * Build a map of every workspace package name to its concrete version, plus
 * the parsed catalog(s) from pnpm-workspace.yaml.
 * @returns {Workspace} Workspace resolution context.
 */
const loadWorkspace = () => {
  /** @type {unknown} */
  const workspace = parseYaml(readFileSync(path.join(repoRoot, "pnpm-workspace.yaml"), "utf-8"));
  /** @type {Map<string, string>} */
  const versions = new Map();
  const packagesRoot = path.join(repoRoot, "packages");
  for (const entry of readdirSync(packagesRoot, { withFileTypes: true })) {
    const manifestPath = path.join(packagesRoot, entry.name, "package.json");
    if (!entry.isDirectory() || !existsSync(manifestPath)) {
      continue;
    }
    const parsed = readJson(manifestPath);
    if (isManifest(parsed)) {
      versions.set(parsed.name, parsed.version);
    }
  }
  /** @type {Record<string, Record<string, string>>} */
  const catalogs = {};
  const rawCatalogs = propAt(workspace, "catalogs");
  if (typeof rawCatalogs === "object" && rawCatalogs !== null) {
    for (const [name, entry] of Object.entries(rawCatalogs)) {
      catalogs[name] = asStringRecord(entry);
    }
  }
  return { catalog: asStringRecord(propAt(workspace, "catalog")), catalogs, versions };
};

/**
 * Resolve a `dependencies` range to a concrete semver range, expanding
 * `catalog:` and `workspace:*` specifiers.
 * @param {string} name Dependency name.
 * @param {string} range Raw range from package.json.
 * @param {Workspace} ws Workspace context.
 * @returns {string} A concrete semver range.
 */
const resolveRange = (name, range, ws) => {
  if (range === "catalog:" || range === "catalog:default") {
    if (!(name in ws.catalog)) {
      throw new Error(`no catalog entry for ${name}`);
    }
    return ws.catalog[name];
  }
  if (range.startsWith("catalog:")) {
    const catalogName = range.slice("catalog:".length);
    if (!(catalogName in ws.catalogs) || !(name in ws.catalogs[catalogName])) {
      throw new Error(`no entry for ${name} in catalog "${catalogName}"`);
    }
    return ws.catalogs[catalogName][name];
  }
  if (range.startsWith("workspace:")) {
    const version = ws.versions.get(name);
    if (version === undefined) {
      throw new Error(`no workspace package found for ${name}`);
    }
    return `^${version}`;
  }
  return range;
};

/**
 * @typedef {{ dependencies: string[]; registryDependencies: string[] }} SplitDeps
 */

/**
 * Split a package's runtime dependencies into external npm `dependencies`
 * (as `name@range` strings) and internal `registryDependencies` (as URLs).
 * @param {Manifest} manifest Package manifest.
 * @param {Workspace} ws Workspace context.
 * @param {string} baseUrl Registry base URL.
 * @returns {SplitDeps} Split dependencies.
 */
const splitDependencies = (manifest, ws, baseUrl) => {
  /** @type {string[]} */
  const dependencies = [];
  /** @type {string[]} */
  const registryDependencies = [];
  for (const [name, range] of Object.entries(manifest.dependencies ?? {})) {
    if (range.startsWith("workspace:") || ws.versions.has(name)) {
      const registryName = INTERNAL_REGISTRY.get(name);
      if (registryName === undefined) {
        throw new Error(`internal dependency ${name} in ${manifest.name} has no registry mapping`);
      }
      registryDependencies.push(`${baseUrl}/r/${registryName}.json`);
      continue;
    }
    if (name === "react" || name === "react-dom") {
      continue;
    }
    dependencies.push(`${name}@${resolveRange(name, range, ws)}`);
  }
  return { dependencies, registryDependencies };
};

/**
 * Recursively collect `.ts`/`.tsx` files under a directory, excluding tests.
 * @param {string} dir Directory to walk.
 * @returns {string[]} Absolute file paths, sorted for determinism.
 */
const collectSourceFiles = (dir) => {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(full));
      continue;
    }
    if (!/\.(?:ts|tsx)$/u.test(entry.name)) {
      continue;
    }
    if (/\.test\.[^.]+$/u.test(entry.name) || /\.integration\.test\.[^.]+$/u.test(entry.name)) {
      continue;
    }
    files.push(full);
  }
  return files.toSorted();
};

/**
 * Replacer for {@link rewriteSpecifiers}: map a matched internal specifier to
 * its vendored `@/` alias, preserving any subpath. Unmapped specifiers are
 * returned unchanged for the guardrail to flag.
 * @param {string} full The full quoted match.
 * @param {string} quote The quote character.
 * @param {string} spec The bare specifier.
 * @returns {string} The replacement text.
 */
const mapSpecifierMatch = (full, quote, spec) => {
  const subpathIndex = spec.indexOf("/", spec.indexOf("/") + 1);
  const pkg = subpathIndex === -1 ? spec : spec.slice(0, subpathIndex);
  const rest = subpathIndex === -1 ? "" : spec.slice(subpathIndex);
  const base = INTERNAL_SPECIFIER_TARGETS.get(pkg);
  return base === undefined ? full : `${quote}${base}${rest}${quote}`;
};

/**
 * Rewrite internal quoted specifiers (both quote styles) to their `@/`
 * vendored aliases, preserving any subpath after the package name.
 * @param {string} source Source text.
 * @returns {string} Rewritten source.
 */
const rewriteSpecifiers = (source) =>
  source.replaceAll(
    /(?<quote>["'])(?<spec>@(?:patternmode|howells)\/[^"']+)\k<quote>/gu,
    mapSpecifierMatch,
  );

/**
 * Guardrail: fail loudly if any internal specifier survived rewriting.
 * @param {string} content Staged file content.
 * @param {string} label File label for the error message.
 * @returns {void}
 */
const assertNoInternalSpecifiers = (content, label) => {
  const match = /(?<specifier>["']@(?:patternmode|howells)\/[^"']*)/u.exec(content);
  if (match?.groups) {
    throw new Error(`unrewritten internal specifier ${match.groups.specifier} in ${label}`);
  }
};

/**
 * Find the line index of the closing brace that balances the first `{` at or
 * after `startIndex`, or -1 when the block never closes.
 * @param {string[]} lines Source lines.
 * @param {number} startIndex Line index where the block opens.
 * @returns {number} Closing line index, or -1.
 */
const findBraceBlockEnd = (lines, startIndex) => {
  let depth = 0;
  let sawBrace = false;
  for (let scan = startIndex; scan < lines.length; scan += 1) {
    for (const char of lines[scan]) {
      if (char === "{") {
        depth += 1;
        sawBrace = true;
      } else if (char === "}") {
        depth -= 1;
      }
    }
    if (sawBrace && depth === 0) {
      return scan;
    }
  }
  return -1;
};

/** Matches a `process` variable declaration inside a `declare global` body. */
const GLOBAL_PROCESS_DECLARATION = /\b(?:var|let|const)\s+process\b/u;

/**
 * Remove top-level `declare global { ... }` blocks whose body declares
 * `process` — plus any `//` comment lines attached directly above them — from
 * a source file, located by content rather than line numbers. Only `process`
 * blocks collide with the `@types/node` typings in consumer apps (TS2403);
 * all other
 * declare-global blocks (e.g. stacksheet's `var CloseWatcher`) are left
 * intact, comments included, because consumers need them — no TS lib ships
 * those declarations. See {@link STRIP_GLOBAL_DECLARATIONS}. The stripped
 * blocks are type-only, so runtime behavior is unchanged.
 * @param {string} source Raw source text.
 * @param {string} fileLabel Human-readable file label for errors.
 * @returns {{ content: string; strippedCount: number }} Stripped source and block count.
 */
const stripGlobalProcessDeclarations = (source, fileLabel) => {
  const lines = source.split("\n");
  let strippedCount = 0;
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].startsWith("declare global")) {
      continue;
    }
    const endIndex = findBraceBlockEnd(lines, index);
    if (endIndex === -1) {
      throw new Error(`unterminated declare global block in ${fileLabel}`);
    }
    const body = lines.slice(index, endIndex + 1).join("\n");
    if (!GLOBAL_PROCESS_DECLARATION.test(body)) {
      index = endIndex;
      continue;
    }
    let startIndex = index;
    while (startIndex > 0 && lines[startIndex - 1].trimStart().startsWith("//")) {
      startIndex -= 1;
    }
    lines.splice(startIndex, endIndex - startIndex + 1);
    const atBlankPair =
      startIndex > 0 &&
      startIndex < lines.length &&
      lines[startIndex - 1].trim() === "" &&
      lines[startIndex].trim() === "";
    if (atBlankPair) {
      lines.splice(startIndex, 1);
    }
    strippedCount += 1;
    index = startIndex - 1;
  }
  return { content: lines.join("\n"), strippedCount };
};

/**
 * Transform a source file for staging: rewrite specifiers, prepend a
 * provenance comment (after a leading `"use client";` directive, if any), and
 * optionally inject a stylesheet import.
 * @param {string} raw Raw source text.
 * @param {string} sourceLabel `<npm-name>@<version>` provenance label.
 * @param {string} fileLabel Human-readable file label for errors.
 * @param {boolean} injectStyleImport Whether to inject `import "./styles.css";`.
 * @returns {string} Transformed content.
 */
const stageSource = (raw, sourceLabel, fileLabel, injectStyleImport) => {
  const lines = rewriteSpecifiers(raw).split("\n");
  const hasDirective = lines[0] === '"use client";' || lines[0] === "'use client';";
  const provenance = `// vendored from ${sourceLabel} — generated by scripts/build-registry.mjs; do not hand-edit.`;
  const insertAt = hasDirective ? 1 : 0;
  lines.splice(insertAt, 0, provenance);
  if (injectStyleImport) {
    lines.splice(insertAt + 1, 0, 'import "./styles.css";');
  }
  const content = lines.join("\n");
  assertNoInternalSpecifiers(content, fileLabel);
  return content;
};

/**
 * Write staged content at `<stagingDir>/<target>` and return the file `path`
 * (relative to the theme dir) that shadcn will resolve.
 * @param {string} stagingDir Absolute staging directory.
 * @param {string} target Registry target path (posix).
 * @param {string} content File content.
 * @returns {string} Theme-relative staging path.
 */
const writeStaged = (stagingDir, target, content) => {
  const absolute = path.join(stagingDir, target);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
  return path.relative(themeDir, absolute).split(path.sep).join("/");
};

/**
 * Build the hand-authored `theme` item: substitute the base URL and compile
 * `theme.css` into the item's `css` field.
 * @param {string} baseUrl Registry base URL.
 * @returns {RegistryItem} The theme registry item.
 */
const buildThemeItem = (baseUrl) => {
  const rawText = readFileSync(path.join(registryDir, "theme", "item.json"), "utf-8");
  /** @type {unknown} */
  const parsed = JSON.parse(rawText.replaceAll("__REGISTRY_BASE_URL__", baseUrl));
  if (!isRegistryItem(parsed)) {
    throw new Error("theme item.json is not a registry item");
  }
  const cssText = readFileSync(path.join(registryDir, "theme", "theme.css"), "utf-8");
  parsed.css = cssToRegistryObject(cssText, "packages/theme/registry/theme/theme.css");
  return parsed;
};

/**
 * Read the hand-authored `font-inter` item verbatim.
 * @returns {RegistryItem} The font registry item.
 */
const readFontItem = () => {
  const parsed = readJson(path.join(registryDir, "font-inter", "item.json"));
  if (!isRegistryItem(parsed)) {
    throw new Error("font-inter item.json is not a registry item");
  }
  return parsed;
};

/**
 * Build a lib item (registry:lib) for a shared package.
 * @param {LibPackage} lib Lib package descriptor.
 * @param {string} stagingDir Absolute staging directory.
 * @param {Workspace} ws Workspace context.
 * @param {string} baseUrl Registry base URL.
 * @returns {RegistryItem} The lib registry item.
 */
const buildLibItem = (lib, stagingDir, ws, baseUrl) => {
  const manifest = readManifest(lib.dir);
  const sourceVersion = `${lib.npm}@${manifest.version}`;
  const srcDir = path.join(repoRoot, "packages", lib.dir, "src");
  const { dependencies, registryDependencies } = splitDependencies(manifest, ws, baseUrl);

  /** @type {RegistryFile[]} */
  const files = [];
  for (const file of collectSourceFiles(srcDir)) {
    const relative = path.relative(srcDir, file).split(path.sep).join("/");
    const target = `${lib.targetDir}/${relative}`;
    const content = stageSource(readFileSync(file, "utf-8"), sourceVersion, target, false);
    files.push({ path: writeStaged(stagingDir, target, content), target, type: "registry:lib" });
  }

  /** @type {RegistryItem} */
  const item = {
    description: manifest.description,
    files,
    meta: { sourceVersion },
    name: lib.registryName,
    title: manifest.name,
    type: "registry:lib",
  };
  if (dependencies.length > 0) {
    item.dependencies = dependencies;
  }
  if (registryDependencies.length > 0) {
    item.registryDependencies = registryDependencies;
  }
  return item;
};

/**
 * Build a component item (registry:component) for a package.
 * @param {string} name Component package directory name.
 * @param {string} stagingDir Absolute staging directory.
 * @param {Workspace} ws Workspace context.
 * @param {string} baseUrl Registry base URL.
 * @returns {RegistryItem} The component registry item.
 */
const buildComponentItem = (name, stagingDir, ws, baseUrl) => {
  const manifest = readManifest(name);
  const sourceVersion = `${manifest.name}@${manifest.version}`;
  const srcDir = path.join(repoRoot, "packages", name, "src");
  const { dependencies, registryDependencies } = splitDependencies(manifest, ws, baseUrl);
  const style = CSS_STYLE.get(name);
  const stripGlobals = STRIP_GLOBAL_DECLARATIONS.has(name);
  let strippedGlobals = 0;

  /** @type {RegistryFile[]} */
  const files = [];
  for (const file of collectSourceFiles(srcDir)) {
    const relative = path.relative(srcDir, file).split(path.sep).join("/");
    const target = `components/patternmode/${name}/${relative}`;
    let raw = readFileSync(file, "utf-8");
    if (stripGlobals) {
      const stripped = stripGlobalProcessDeclarations(raw, target);
      raw = stripped.content;
      strippedGlobals += stripped.strippedCount;
    }
    const content = stageSource(
      raw,
      sourceVersion,
      target,
      style === "B" && relative === "index.ts",
    );
    files.push({
      path: writeStaged(stagingDir, target, content),
      target,
      type: "registry:component",
    });
  }

  if (stripGlobals && strippedGlobals === 0) {
    throw new Error(
      `expected at least one process-declaring declare global block in packages/${name}/src but found none; ` +
        `if ${name} no longer ships an ambient process typing, remove it from STRIP_GLOBAL_DECLARATIONS.`,
    );
  }

  /** @type {RegistryItem} */
  const item = {
    description: manifest.description,
    files,
    meta: { sourceVersion },
    name,
    title: manifest.name,
    type: "registry:component",
  };
  if (dependencies.length > 0) {
    item.dependencies = dependencies;
  }
  if (registryDependencies.length > 0) {
    item.registryDependencies = registryDependencies;
  }

  if (style === "A") {
    const cssText = readFileSync(path.join(srcDir, "styles.css"), "utf-8");
    item.css = cssToRegistryObject(cssText, `packages/${name}/src/styles.css`);
  } else if (style === "B") {
    const cssPath = STYLE_B_CSS.get(name);
    if (cssPath === undefined) {
      throw new Error(`no style-B CSS path registered for ${name}`);
    }
    const target = `components/patternmode/${name}/styles.css`;
    files.push({
      path: writeStaged(stagingDir, target, readFileSync(cssPath, "utf-8")),
      target,
      type: "registry:file",
    });
    item.docs = "Requires Tailwind CSS v4 (uses @reference/@apply).";
  }

  return item;
};

/**
 * @typedef {{ $schema: string; homepage: string; items: RegistryItem[]; name: string }} Registry
 */

/**
 * Assemble all 14 registry items and write the staging tree.
 * @param {string} stagingDir Absolute staging directory.
 * @param {Workspace} ws Workspace context.
 * @param {string} baseUrl Registry base URL.
 * @returns {Registry} The registry index.
 */
const buildStaging = (stagingDir, ws, baseUrl) => {
  rmSync(stagingDir, { force: true, recursive: true });
  mkdirSync(stagingDir, { recursive: true });

  /** @type {RegistryItem[]} */
  const items = [
    buildThemeItem(baseUrl),
    readFontItem(),
    ...LIB_PACKAGES.map((lib) => buildLibItem(lib, stagingDir, ws, baseUrl)),
    ...COMPONENT_PACKAGES.map((name) => buildComponentItem(name, stagingDir, ws, baseUrl)),
  ];

  /** @type {Registry} */
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    homepage: baseUrl,
    items,
    name: "patternmode",
  };
  writeFileSync(path.join(stagingDir, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
  return registry;
};

/**
 * Run `shadcn build` against the staged registry, emitting item JSONs into
 * `outputDir`. Uses the pinned packages/theme devDep via `pnpm exec`.
 * @param {string} outputDir Output directory, relative to the theme dir.
 * @param {boolean} quiet Suppress shadcn's stdout.
 * @returns {void}
 */
const runShadcnBuild = (outputDir, quiet) => {
  execFileSync(
    "pnpm",
    ["exec", "shadcn", "build", ".staging/registry.json", "--output", outputDir],
    {
      cwd: themeDir,
      stdio: quiet ? "ignore" : "inherit",
    },
  );
};

/**
 * Load every emitted item JSON (except the registry index), collecting parse
 * failures.
 * @param {string} outputDir Absolute output directory.
 * @param {string[]} failures Accumulated failure messages.
 * @returns {Map<string, RegistryItem>} Parsed items by name.
 */
const collectEmittedItems = (outputDir, failures) => {
  /** @type {Map<string, RegistryItem>} */
  const items = new Map();
  for (const file of readdirSync(outputDir)) {
    if (!file.endsWith(".json") || file === "registry.json") {
      continue;
    }
    try {
      const parsed = readJson(path.join(outputDir, file));
      if (isRegistryItem(parsed)) {
        items.set(parsed.name, parsed);
      } else {
        failures.push(`${file} is not a valid registry item`);
      }
    } catch (error) {
      failures.push(
        `${file} does not parse: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  return items;
};

/**
 * Validate the theme item's cssVars against the canonical vocabulary.
 * @param {Map<string, RegistryItem>} items Parsed items.
 * @param {string[]} failures Accumulated failure messages.
 * @returns {void}
 */
const checkThemeVars = (items, failures) => {
  const cssVars = items.get("theme")?.cssVars;
  if (!cssVars) {
    return;
  }
  for (const [mode, vars] of Object.entries({ dark: cssVars.dark, light: cssVars.light })) {
    if (vars === undefined) {
      continue;
    }
    for (const key of Object.keys(vars)) {
      if (!CANONICAL_CSS_VARS.has(key) && !key.startsWith("shadow-")) {
        failures.push(`theme cssVars.${mode} has non-canonical key "${key}"`);
      }
    }
  }
};

/**
 * Ensure no emitted item content leaks an internal specifier.
 * @param {Map<string, RegistryItem>} items Parsed items.
 * @param {string[]} failures Accumulated failure messages.
 * @returns {void}
 */
const checkNoLeaks = (items, failures) => {
  for (const item of items.values()) {
    /** @type {string[]} */
    const blobs = [];
    for (const file of item.files ?? []) {
      if (typeof file.content === "string") {
        blobs.push(file.content);
      }
    }
    if (item.css) {
      blobs.push(JSON.stringify(item.css));
    }
    if (blobs.some((blob) => /["']@patternmode\//u.test(blob) || /["']@howells\//u.test(blob))) {
      failures.push(`item "${item.name}" leaks an internal specifier`);
    }
  }
};

/**
 * Ensure exactly the 14 expected items were emitted.
 * @param {Map<string, RegistryItem>} items Parsed items.
 * @param {string[]} failures Accumulated failure messages.
 * @returns {void}
 */
const checkItemSet = (items, failures) => {
  const names = [...items.keys()].toSorted();
  const expected = [...EXPECTED_ITEM_NAMES].toSorted();
  if (names.length !== expected.length || names.some((name, index) => name !== expected[index])) {
    failures.push(`expected exactly 14 items [${expected.join(", ")}], got [${names.join(", ")}]`);
  }
};

/**
 * Validate the emitted registry (--check).
 * @param {string} outputDir Absolute output directory.
 * @returns {string[]} Failure messages (empty when valid).
 */
const validateOutput = (outputDir) => {
  /** @type {string[]} */
  const failures = [];
  const items = collectEmittedItems(outputDir, failures);
  checkThemeVars(items, failures);
  checkNoLeaks(items, failures);
  checkItemSet(items, failures);
  return failures;
};

/**
 * Entry point.
 * @returns {void}
 */
const main = () => {
  const check = globalThis.process.argv.includes("--check");
  const debug = globalThis.process.argv.includes("--debug");
  const baseUrl = resolveBaseUrl();
  const ws = loadWorkspace();
  const stagingDir = path.join(themeDir, ".staging");

  if (check) {
    const outputRel = ".check-dist";
    const outputDir = path.join(themeDir, outputRel);
    rmSync(outputDir, { force: true, recursive: true });
    buildStaging(stagingDir, ws, baseUrl);
    runShadcnBuild(outputRel, true);
    const failures = validateOutput(outputDir);
    rmSync(outputDir, { force: true, recursive: true });
    rmSync(stagingDir, { force: true, recursive: true });
    if (failures.length > 0) {
      console.error(`Registry check failed:\n${failures.map((line) => `  - ${line}`).join("\n")}`);
      globalThis.process.exit(1);
    }
    console.log(
      "Registry check passed: 14 items, cssVars canonical, no internal specifiers leaked.",
    );
    return;
  }

  const outputRel = path.join("dist", "registry");
  const outputDir = path.join(themeDir, outputRel);
  rmSync(outputDir, { force: true, recursive: true });
  buildStaging(stagingDir, ws, baseUrl);
  runShadcnBuild(outputRel, false);
  copyFileSync(path.join(stagingDir, "registry.json"), path.join(outputDir, "registry.json"));
  if (!debug) {
    rmSync(stagingDir, { force: true, recursive: true });
  }
  console.log(
    `Built registry → ${path.relative(repoRoot, outputDir)} (14 items, base ${baseUrl}).`,
  );
};

main();
