import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { expect, it } from "vitest";

import { collectSourceFiles } from "../../../scripts/registry/sources.mjs";
import { readWorkspace } from "../../../scripts/registry/workspace.mjs";

/**
 * A registry item is vendored into a consumer's app, where a test file or
 * fixture breaks the build (its `vitest` imports do not resolve) and ships code
 * nobody asked for. This checks every file a registry item would carry against
 * an independent definition of test-only code: its name, or what it imports.
 */

const TEST_NAME = /\.(?:test|spec|browser)\.|fixture|test-double/u;
const TEST_IMPORT = /["'](?:vitest|@vitest\/|@testing-library\/|playwright)/u;

/**
 * @param {string} dir Directory to walk.
 * @returns {string[]} Every file under it.
 */
const walk = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));

const { registryPackages } = readWorkspace();

it("has registry packages with test-only files to keep out", () => {
  const testFiles = registryPackages.flatMap((pkg) =>
    walk(path.join(pkg.directory, "src")).filter((file) => TEST_NAME.test(path.basename(file))),
  );
  expect(registryPackages.length).toBeGreaterThan(0);
  expect(testFiles.length).toBeGreaterThan(0);
});

it("ships no test, fixture or test-double file in any registry item", () => {
  const leaked = registryPackages.flatMap((pkg) =>
    collectSourceFiles(path.join(pkg.directory, "src"), pkg.entries)
      .filter(
        (file) =>
          TEST_NAME.test(path.basename(file)) || TEST_IMPORT.test(readFileSync(file, "utf-8")),
      )
      .map((file) => `${pkg.registryName}: ${path.relative(pkg.directory, file)}`),
  );
  expect(leaked).toStrictEqual([]);
});
