import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { buildHandAuthoredItems, buildPackageItem } from "./registry/items.mjs";
import { validateOutput } from "./registry/validate.mjs";
import { readWorkspace, REPO_ROOT } from "./registry/workspace.mjs";

/**
 * Build the patternmode shadcn registry.
 *
 *   REGISTRY_BASE_URL=<url> node scripts/build-registry.mjs <output-dir>
 *
 * `REGISTRY_BASE_URL` is baked into every registryDependency, so it is
 * required: a registry built against the wrong host installs from the wrong
 * place. `<output-dir>` (relative to the working directory) is emptied and
 * receives one JSON file per item plus `registry.json`.
 */

/**
 * @returns {string} The base URL, without a trailing slash.
 */
const readBaseUrl = () => {
  const raw = globalThis.process.env.REGISTRY_BASE_URL?.trim();
  if (raw === undefined || raw === "") {
    throw new Error(
      "REGISTRY_BASE_URL is required (e.g. http://localhost:3000 for a local build).",
    );
  }
  const baseUrl = raw.replace(/\/+$/u, "");
  if (!URL.canParse(baseUrl) || !["http:", "https:"].includes(new URL(baseUrl).protocol)) {
    throw new Error("REGISTRY_BASE_URL must be an absolute HTTP or HTTPS URL.");
  }
  return baseUrl;
};

/**
 * @returns {string} Absolute output directory from the first argument.
 */
const readOutputDir = () => {
  const [output] = globalThis.process.argv.slice(2);
  if (output === undefined) {
    throw new Error("usage: node scripts/build-registry.mjs <output-dir>");
  }
  return path.resolve(output);
};

const baseUrl = readBaseUrl();
const outputDir = readOutputDir();
const workspace = readWorkspace();
const stageRoot = mkdtempSync(path.join(tmpdir(), "patternmode-registry-"));

try {
  const context = { baseUrl, stageRoot, workspace };
  const items = [
    ...buildHandAuthoredItems(baseUrl),
    ...workspace.registryPackages.map((pkg) => buildPackageItem(pkg, context)),
  ];
  const registryJson = path.join(stageRoot, "registry.json");
  writeFileSync(
    registryJson,
    `${JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry.json", homepage: baseUrl, items, name: "patternmode" }, null, 2)}\n`,
  );

  rmSync(outputDir, { force: true, recursive: true });
  mkdirSync(outputDir, { recursive: true });
  // The pinned shadcn is a packages/theme devDependency.
  execFileSync(
    "pnpm",
    [
      "--dir",
      path.join(REPO_ROOT, "packages", "theme"),
      "exec",
      "shadcn",
      "build",
      registryJson,
      "--cwd",
      stageRoot,
      "--output",
      outputDir,
    ],
    { stdio: "inherit" },
  );
  copyFileSync(registryJson, path.join(outputDir, "registry.json"));
  validateOutput(
    outputDir,
    items.map((item) => item.name),
  );
  console.log(`Built registry → ${outputDir} (${items.length} items, base ${baseUrl}).`);
} finally {
  rmSync(stageRoot, { force: true, recursive: true });
}
