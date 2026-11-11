import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { parse as parseYaml } from "yaml";
import { z } from "zod";

/**
 * The workspace as the registry sees it: every package manifest, the pnpm
 * catalog, and which packages are registry items.
 *
 * A package is a registry item when its manifest carries a `registry` field;
 * everything else (item name, vendored directory, CSS handling) is derived from
 * that field and the manifest's `name`, so adding a package to the registry is
 * an edit to its own `package.json` and nothing else.
 */

export const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

const stringRecord = z.record(z.string(), z.string());

/**
 * `css`: a component's stylesheet, authored with Tailwind `@apply`. It ships
 * verbatim as `styles.css` beside the component and is imported from its
 * `index.ts`, so the consumer's Tailwind compiles it.
 */
const registryFieldSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("lib") }),
  z.strictObject({ css: z.string(), type: z.literal("component") }),
]);

const exportConditionsSchema = z.looseObject({
  default: z.string().optional(),
  import: z.string().optional(),
});
const exportTargetSchema = z.union([z.string(), exportConditionsSchema]);

const manifestSchema = z.object({
  dependencies: stringRecord.optional(),
  description: z.string().optional(),
  exports: z.record(z.string(), exportTargetSchema).optional(),
  name: z.string(),
  peerDependencies: stringRecord.optional(),
  private: z.boolean().optional(),
  registry: registryFieldSchema.optional(),
  version: z.string(),
});

/** @typedef {z.infer<typeof manifestSchema>} Manifest */

/**
 * @typedef {object} RegistryPackage
 * @property {string} registryName Item name: the unscoped package name.
 * @property {"lib" | "component"} type Item kind.
 * @property {string} directory Absolute package directory.
 * @property {string[]} entries Absolute source files behind the package's JavaScript exports.
 * @property {string} targetDir Where the vendored source lands in a consumer.
 * @property {string | undefined} css Absolute path of a component's stylesheet; undefined for a lib.
 * @property {Manifest} manifest The package manifest.
 */

/**
 * @typedef {object} Workspace
 * @property {Map<string, string>} versions Every workspace package's version, by name.
 * @property {Record<string, string>} catalog The default pnpm catalog.
 * @property {RegistryPackage[]} registryPackages Libs first, then components, each by name.
 */

/**
 * Every `packages/*` manifest, validated. A directory without a `package.json`
 * is not a package; one with an invalid manifest throws.
 * @returns {{ directory: string; manifest: Manifest }[]} Manifests with their directories.
 */
const readManifests = () => {
  const packagesRoot = path.join(REPO_ROOT, "packages");
  return readdirSync(packagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesRoot, entry.name))
    .filter((directory) => existsSync(path.join(directory, "package.json")))
    .map((directory) => {
      const manifestPath = path.join(directory, "package.json");
      const parsed = manifestSchema.safeParse(JSON.parse(readFileSync(manifestPath, "utf-8")));
      if (!parsed.success) {
        throw new Error(
          `${path.relative(REPO_ROOT, manifestPath)} is not a valid manifest: ${parsed.error.message}`,
        );
      }
      return { directory, manifest: parsed.data };
    });
};

/**
 * The source file behind each JavaScript export: `./dist/<name>.(m)js` is built
 * from `src/<name>.ts(x)`. Stylesheet and manifest exports are skipped.
 * @param {string} directory Absolute package directory.
 * @param {Manifest} manifest Its manifest.
 * @returns {string[]} Absolute entry files.
 */
const sourceEntries = (directory, manifest) =>
  Object.entries(manifest.exports ?? {})
    .filter(([key]) => key !== "./package.json" && key !== "./styles.css")
    .map(([key, target]) => {
      const plain = z.string().safeParse(target);
      const conditions = exportConditionsSchema.safeParse(target).data;
      const built = plain.success ? plain.data : (conditions?.default ?? conditions?.import);
      const stem = /^\.\/dist\/(?<stem>.+)\.m?js$/u.exec(built ?? "")?.groups?.stem;
      const entry = [".ts", ".tsx"]
        .map((extension) => path.join(directory, "src", `${stem}${extension}`))
        .find((candidate) => stem !== undefined && existsSync(candidate));
      if (entry === undefined) {
        throw new Error(`${manifest.name} export "${key}" has no src/<name>.ts(x) behind it`);
      }
      return entry;
    });

/**
 * @param {string} directory Absolute package directory.
 * @param {Manifest} manifest Its manifest.
 * @returns {RegistryPackage | null} The registry package, or null when it is not one.
 */
const toRegistryPackage = (directory, manifest) => {
  const field = manifest.registry;
  if (field === undefined) {
    return null;
  }
  if (manifest.private === true) {
    throw new Error(`${manifest.name} is private and cannot be a registry item.`);
  }
  const registryName = manifest.name.split("/").at(-1) ?? manifest.name;
  if (field.type === "lib") {
    return {
      css: undefined,
      directory,
      entries: sourceEntries(directory, manifest),
      manifest,
      registryName,
      targetDir: `lib/patternmode/${registryName}`,
      type: "lib",
    };
  }
  return {
    css: path.join(directory, field.css),
    directory,
    entries: sourceEntries(directory, manifest),
    manifest,
    registryName,
    targetDir: `components/patternmode/${registryName}`,
    type: "component",
  };
};

/**
 * Read the workspace once for a registry build.
 * @returns {Workspace} Versions, catalog and registry packages.
 */
export const readWorkspace = () => {
  const manifests = readManifests();
  const workspaceFile = path.join(REPO_ROOT, "pnpm-workspace.yaml");
  const { catalog } = z
    .object({ catalog: stringRecord })
    .parse(parseYaml(readFileSync(workspaceFile, "utf-8")));

  const registryPackages = manifests
    .map(({ directory, manifest }) => toRegistryPackage(directory, manifest))
    .filter((entry) => entry !== null)
    .toSorted(
      (a, b) =>
        Number(a.type === "component") - Number(b.type === "component") ||
        a.registryName.localeCompare(b.registryName),
    );

  return {
    catalog,
    registryPackages,
    versions: new Map(manifests.map(({ manifest }) => [manifest.name, manifest.version])),
  };
};
