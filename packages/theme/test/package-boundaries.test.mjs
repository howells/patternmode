import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { expect, it } from "vitest";

/**
 * A published package must not reference a private workspace package, by import
 * or by name: the reference resolves in the repo and breaks for the first
 * stranger who installs the tarball.
 *
 * This lives in `@patternmode/theme` because theme depends on every component
 * package, so it sees the whole published surface.
 */

const root = path.resolve(import.meta.dirname, "../../..");

/**
 * @typedef {{
 *   name: string;
 *   private?: boolean;
 * }} PackageJson
 */

/**
 * @param {unknown} value Value to test.
 * @returns {value is PackageJson} Whether the value is a package manifest.
 */
const isPackageJson = (value) =>
  typeof value === "object" && value !== null && "name" in value && typeof value.name === "string";

/**
 * @param {string} filePath Manifest file path.
 * @returns {PackageJson} Parsed package manifest.
 */
const readPackageJson = (filePath) => {
  /** @type {unknown} */
  const parsed = JSON.parse(readFileSync(filePath, "utf-8"));
  if (!isPackageJson(parsed)) {
    throw new Error(`${path.relative(root, filePath)} is not a package manifest.`);
  }
  return parsed;
};

const workspaceRoots = ["apps", "packages"];

const workspaceManifests = () =>
  workspaceRoots.flatMap((workspaceDir) =>
    readdirSync(path.join(root, workspaceDir), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const packagePath = path.join(workspaceDir, entry.name);
        return {
          manifestPath: path.join(packagePath, "package.json"),
          packagePath,
        };
      })
      .filter(({ manifestPath }) => existsSync(path.join(root, manifestPath))),
  );

/**
 * @param {string} dir Directory to walk.
 * @returns {string[]} Matching source files.
 */
const walk = (dir) => {
  const entries = readdirSync(dir);
  /** @type {string[]} */
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      if (entry === "dist" || entry === "node_modules" || entry === ".turbo") {
        continue;
      }
      files.push(...walk(filePath));
      continue;
    }

    if (/\.(?<extension>ts|tsx|js|jsx|json)$/u.test(entry)) {
      files.push(filePath);
    }
  }

  return files;
};

const manifests = workspaceManifests().map(({ manifestPath, packagePath }) => ({
  manifestPath,
  packageJson: readPackageJson(path.join(root, manifestPath)),
  packagePath,
}));

const privatePackages = manifests.filter(({ packageJson }) => packageJson.private === true);
const publicPackages = manifests.filter(
  ({ packageJson, packagePath }) =>
    packagePath.startsWith("packages/") && packageJson.private !== true,
);

it("has private packages to police and public packages to police them in", () => {
  expect(privatePackages.length).toBeGreaterThan(0);
  expect(publicPackages.length).toBeGreaterThan(0);
});

it("keeps every private workspace surface out of published source", () => {
  const forbidden = privatePackages.flatMap(({ packageJson, packagePath }) => [
    packageJson.name,
    packagePath,
  ]);

  /** @type {string[]} */
  const references = [];
  for (const { packagePath } of publicPackages) {
    for (const file of walk(path.join(root, packagePath, "src"))) {
      const source = readFileSync(file, "utf-8");
      for (const name of forbidden) {
        if (source.includes(name)) {
          references.push(`${path.relative(root, file)} references ${name}`);
        }
      }
    }
  }

  expect(references).toEqual([]);
});
