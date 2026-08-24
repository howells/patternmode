import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

/**
 * Which packages a release covers, read from the workspace rather than listed.
 *
 * Both halves of the release need this - `release.mjs` to publish and
 * `verify-release.mjs` to read the result back - and they must agree exactly. A
 * package the publisher ships and the verifier does not know about is precisely
 * the release nobody checks.
 */

export const REPO_ROOT = path.resolve(import.meta.dirname, "..");

/** Workspace roots holding publishable packages. Everything under `apps/` is private. */
const PACKAGE_DIRECTORIES = ["packages"];

/**
 * The fields of a `package.json` a release depends on.
 *
 * Validated rather than asserted, because a manifest missing a name or a version
 * has to stop the release where it is read, not surface later as a tarball
 * nobody can install. `private` packages are allowed to omit both, so the
 * requirement is applied after that check rather than in the schema.
 */
const manifestSchema = z.object({
  dependencies: z.record(z.string(), z.string()).default({}),
  name: z.string().optional(),
  private: z.boolean().default(false),
  version: z.string().optional(),
});

/**
 * @typedef {object} Package
 * @property {string} name The package's npm name.
 * @property {string} version The version in its manifest.
 * @property {string} directory Absolute path to the package.
 * @property {string[]} workspaceDependencies Names of workspace packages it depends on.
 */

/**
 * Every publishable package in the workspace.
 *
 * A package is publishable when it is not marked `private`, which is the same
 * test npm itself applies - so a package cannot be publishable here and refused
 * there, and adding one to the workspace needs no edit to any release script.
 *
 * @returns {Promise<Package[]>} Every non-private workspace package.
 */
export const readPublishablePackages = async () => {
  /** @type {Package[]} */
  const packages = [];

  for (const parent of PACKAGE_DIRECTORIES) {
    const entries = await readdir(path.join(REPO_ROOT, parent), { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const directory = path.join(REPO_ROOT, parent, entry.name);
      /** @type {string} */
      let raw;

      try {
        raw = await readFile(path.join(directory, "package.json"), "utf-8");
      } catch {
        // A directory under packages/ with no package.json is not a package.
        // One that has a malformed manifest still throws, below.
        continue;
      }

      const manifest = manifestSchema.parse(JSON.parse(raw));
      if (manifest.private) {
        continue;
      }

      if (manifest.name === undefined || manifest.version === undefined) {
        throw new Error(`${directory}/package.json is publishable but has no name or version.`);
      }

      const workspaceDependencies = Object.entries(manifest.dependencies)
        .filter(([, range]) => range.startsWith("workspace:"))
        .map(([dependency]) => dependency);

      packages.push({
        directory,
        name: manifest.name,
        version: manifest.version,
        workspaceDependencies,
      });
    }
  }

  return packages;
};

/**
 * Sort packages so every package follows the ones it depends on.
 *
 * A dependent must not reach the registry before the package it resolves a real
 * version of, or the first person to install it gets an unresolvable dependency.
 * The order is computed rather than written down: this workspace has fourteen
 * publishable packages and three layers of dependency between them, and a
 * hand-maintained list is one new package away from being wrong in a way that
 * only shows up mid-release.
 *
 * @param {Package[]} packages Every publishable package.
 * @returns {Package[]} The same packages, dependencies first.
 */
export const inDependencyOrder = (packages) => {
  const byName = new Map(packages.map((entry) => [entry.name, entry]));
  /** @type {Package[]} */
  const ordered = [];
  /** @type {Set<string>} */
  const settled = new Set();
  /** @type {Set<string>} */
  const visiting = new Set();

  /** @param {Package} entry The package to place after its dependencies. */
  const visit = (entry) => {
    if (settled.has(entry.name)) {
      return;
    }
    if (visiting.has(entry.name)) {
      throw new Error(`Dependency cycle through ${entry.name}; cannot order the release.`);
    }

    visiting.add(entry.name);
    for (const dependency of entry.workspaceDependencies) {
      const target = byName.get(dependency);
      if (target === undefined) {
        // A workspace dependency on a private package is a packaging bug rather
        // than something to route around: it cannot be published, so the
        // dependent would ship a dependency nobody can install.
        throw new Error(
          `${entry.name} depends on ${dependency}, which is not a publishable workspace package.`,
        );
      }
      visit(target);
    }
    visiting.delete(entry.name);

    settled.add(entry.name);
    ordered.push(entry);
  };

  for (const entry of packages.toSorted((a, b) => a.name.localeCompare(b.name))) {
    visit(entry);
  }

  return ordered;
};
