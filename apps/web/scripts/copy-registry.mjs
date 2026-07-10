import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../..");
const source = path.join(root, "packages/theme/dist/registry");
const dest = path.join(root, "apps/web/public/r");

/**
 * @param {string} dir Directory to scan.
 * @returns {string[]} Names of `.json` files directly inside `dir`.
 */
const jsonFilesIn = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map((entry) => entry.name)
    : [];

const registryFiles = jsonFilesIn(source);

if (registryFiles.length === 0) {
  console.error(
    `No registry files found at ${path.relative(root, source)}. Run "pnpm turbo run build --filter=@patternmode/theme" first.`,
  );
  process.exit(1);
}

rmSync(dest, { force: true, recursive: true });
mkdirSync(dest, { recursive: true });

for (const file of registryFiles) {
  copyFileSync(path.join(source, file), path.join(dest, file));
}

console.log(`Copied ${registryFiles.length} registry file(s) to ${path.relative(root, dest)}.`);
