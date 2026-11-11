import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { z } from "zod";

import { cssToRegistryObject } from "./css.mjs";
import { collectSourceFiles, stageSource } from "./sources.mjs";
import { REPO_ROOT } from "./workspace.mjs";

/**
 * Builders for every registry item: the hand-authored theme and font items
 * under `packages/theme/registry`, and one item per registry package.
 */

/** @typedef {import("./workspace.mjs").Workspace} Workspace */
/** @typedef {import("./workspace.mjs").RegistryPackage} RegistryPackage */

/**
 * @typedef {{ path: string; target: string; type: string; content?: string }} RegistryFile
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
 *   cssVars?: { light?: Record<string, string>; dark?: Record<string, string>; theme?: Record<string, string> };
 *   docs?: string;
 *   meta?: object;
 * }} RegistryItem
 */

/**
 * @typedef {object} BuildContext
 * @property {string} baseUrl Registry base URL, without a trailing slash.
 * @property {Workspace} workspace The workspace.
 * @property {string} stageRoot Directory shadcn builds from; staged paths are relative to it.
 */

const handAuthoredDir = path.join(REPO_ROOT, "packages", "theme", "registry");

const handAuthoredItemSchema = z.looseObject({
  dependencies: z.array(z.string()).optional(),
  name: z.string(),
  type: z.string(),
});

/**
 * @param {string} name Hand-authored item directory.
 * @param {string} baseUrl Registry base URL substituted for `__REGISTRY_BASE_URL__`.
 * @returns {RegistryItem} The parsed item.
 */
const readHandAuthoredItem = (name, baseUrl) => {
  const raw = readFileSync(path.join(handAuthoredDir, name, "item.json"), "utf-8");
  const parsed = handAuthoredItemSchema.safeParse(
    JSON.parse(raw.replaceAll("__REGISTRY_BASE_URL__", baseUrl)),
  );
  if (!parsed.success || parsed.data.name !== name) {
    throw new Error(
      `packages/theme/registry/${name}/item.json is not a registry item named "${name}"`,
    );
  }
  // Hand-authored items bypass catalog resolution, so nothing else pins them.
  for (const dependency of parsed.data.dependencies ?? []) {
    const at = dependency.lastIndexOf("@");
    if (at <= 0 || at === dependency.length - 1) {
      throw new Error(`${name} dependency "${dependency}" must be pinned as name@range`);
    }
  }
  return parsed.data;
};

/**
 * The theme item, with `theme.css` compiled into its `css` field, followed by
 * every other hand-authored item (the fonts) in directory order.
 * @param {string} baseUrl Registry base URL.
 * @returns {RegistryItem[]} The hand-authored items.
 */
export const buildHandAuthoredItems = (baseUrl) => {
  const theme = readHandAuthoredItem("theme", baseUrl);
  theme.css = cssToRegistryObject(
    readFileSync(path.join(handAuthoredDir, "theme", "theme.css"), "utf-8"),
    "packages/theme/registry/theme/theme.css",
  );
  const others = readdirSync(handAuthoredDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "theme")
    .map((entry) => readHandAuthoredItem(entry.name, baseUrl));
  return [theme, ...others];
};

/**
 * Resolve a `dependencies` range to a concrete semver range, expanding
 * `catalog:` and `workspace:` specifiers.
 * @param {string} name Dependency name.
 * @param {string} range Raw range from package.json.
 * @param {Workspace} workspace Workspace context.
 * @returns {string} A concrete semver range.
 */
const resolveRange = (name, range, workspace) => {
  if (range === "catalog:") {
    const resolved = workspace.catalog[name];
    if (resolved === undefined) {
      throw new Error(`no catalog entry for ${name}`);
    }
    return resolved;
  }
  if (range.startsWith("catalog:")) {
    throw new Error(`${name}: named catalogs are not used in this workspace (${range})`);
  }
  if (range.startsWith("workspace:")) {
    const version = workspace.versions.get(name);
    if (version === undefined) {
      throw new Error(`no workspace package found for ${name}`);
    }
    return `^${version}`;
  }
  return range;
};

/**
 * Split a package's runtime dependencies (regular and peer) into external npm
 * `dependencies` (`name@range`) and internal `registryDependencies` (URLs).
 * Peers are runtime imports too: a vendored copy has no manifest to declare
 * them, so the item must.
 * @param {RegistryPackage} pkg The package.
 * @param {BuildContext} context Build context.
 * @returns {{ dependencies: string[]; registryDependencies: string[] }} Split dependencies.
 */
const splitDependencies = (pkg, { baseUrl, workspace }) => {
  const registryNames = new Map(
    workspace.registryPackages.map((entry) => [entry.manifest.name, entry.registryName]),
  );
  /** @type {string[]} */
  const dependencies = [];
  /** @type {string[]} */
  const registryDependencies = [];
  const runtime = { ...pkg.manifest.peerDependencies, ...pkg.manifest.dependencies };
  for (const [name, range] of Object.entries(runtime)) {
    if (range.startsWith("workspace:") || workspace.versions.has(name)) {
      const registryName = registryNames.get(name);
      if (registryName === undefined) {
        throw new Error(`${pkg.manifest.name} depends on ${name}, which is not a registry item`);
      }
      registryDependencies.push(`${baseUrl}/r/${registryName}.json`);
    } else if (name !== "react" && name !== "react-dom") {
      dependencies.push(`${name}@${resolveRange(name, range, workspace)}`);
    }
  }
  return { dependencies, registryDependencies };
};

/**
 * Write staged content at `<stageRoot>/.staging/<target>`.
 * @param {string} stageRoot Directory shadcn builds from.
 * @param {string} target Registry target path (posix).
 * @param {string} content File content.
 * @returns {string} The path shadcn resolves, relative to `stageRoot`.
 */
const writeStaged = (stageRoot, target, content) => {
  const absolute = path.join(stageRoot, ".staging", target);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
  return path.relative(stageRoot, absolute).split(path.sep).join("/");
};

/**
 * Build the item for one registry package and stage its files.
 * @param {RegistryPackage} pkg The package.
 * @param {BuildContext} context Build context.
 * @returns {RegistryItem} The registry item.
 */
export const buildPackageItem = (pkg, context) => {
  const { manifest } = pkg;
  const sourceVersion = `${manifest.name}@${manifest.version}`;
  const srcDir = path.join(pkg.directory, "src");
  const fileType = `registry:${pkg.type}`;
  const targets = new Map(
    context.workspace.registryPackages.map((entry) => [
      entry.manifest.name,
      `@/${entry.targetDir}`,
    ]),
  );

  /** @type {RegistryFile[]} */
  const files = collectSourceFiles(srcDir, pkg.entries).map((file) => {
    const relative = path.relative(srcDir, file).split(path.sep).join("/");
    const target = `${pkg.targetDir}/${relative}`;
    const content = stageSource(readFileSync(file, "utf-8"), {
      fileLabel: target,
      injectStyleImport: pkg.css !== undefined && relative === "index.ts",
      sourceLabel: sourceVersion,
      targets,
    });
    return { path: writeStaged(context.stageRoot, target, content), target, type: fileType };
  });

  const { dependencies, registryDependencies } = splitDependencies(pkg, context);

  /** @type {RegistryItem} */
  const item = {
    description: manifest.description,
    files,
    meta: { sourceVersion },
    name: pkg.registryName,
    title: manifest.name,
    type: fileType,
  };
  if (dependencies.length > 0) {
    item.dependencies = dependencies;
  }
  if (registryDependencies.length > 0) {
    item.registryDependencies = registryDependencies;
  }

  if (pkg.css !== undefined) {
    const target = `${pkg.targetDir}/styles.css`;
    files.push({
      path: writeStaged(context.stageRoot, target, readFileSync(pkg.css, "utf-8")),
      target,
      type: "registry:file",
    });
    item.docs = "Requires Tailwind CSS v4 (uses @reference/@apply).";
  }

  return item;
};
