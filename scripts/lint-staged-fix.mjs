import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

/**
 * lint-staged wrapper for howells-fix.
 *
 * howells-fix exits non-zero when every file it receives is on its internal
 * ignore list (package.json, turbo.json, css, changelogs, …), which fails
 * commits whose staged set is entirely ignored files. Treat that one case
 * as success; pass every other outcome through unchanged.
 */
const binary = fileURLToPath(new URL("../node_modules/.bin/howells-fix", import.meta.url));
const result = spawnSync(binary, process.argv.slice(2), {
  encoding: "utf-8",
  stdio: ["ignore", "pipe", "pipe"],
});
const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
process.stdout.write(output);

const onlyIgnoredFiles = output.includes("No files found to lint");
process.exit(result.status !== 0 && onlyIgnoredFiles ? 0 : (result.status ?? 1));
