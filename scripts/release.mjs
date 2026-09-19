import { spawn } from "node:child_process";
import { once } from "node:events";
import { tmpdir } from "node:os";

import { REPO_ROOT, inDependencyOrder, readPublishablePackages } from "./workspace-packages.mjs";

/**
 * Publish every workspace package the registry does not already have.
 *
 * This runs in GitHub Actions, not on a laptop. Authentication is trusted
 * publishing over OIDC: npm exchanges the workflow's id-token for publish
 * rights, so no credential exists here to pass and none is passed. It will not
 * work from a developer machine, which is the point - npm is removing every
 * unattended local publishing path, and granular tokens lose the ability to
 * publish at all in January 2027.
 *
 * **pnpm packs, npm publishes, and the split is not incidental.** Ten of these
 * packages depend on another through the `workspace:*` protocol. Only pnpm
 * rewrites that to a real version number when it packs; `npm pack` ships the
 * literal string and the release is uninstallable. So each package is packed by
 * pnpm, which gets the dependencies right, and the tarball is handed to npm,
 * which gets the authentication right.
 *
 * Versioning stays with changesets: `pnpm version-packages`, review, commit,
 * then `pnpm typecheck && pnpm lint && pnpm build && pnpm test`, then run this.
 */

const isDryRun = globalThis.process.argv.includes("--dry-run");

/**
 * Run a command and return its stdout, throwing on a non-zero exit.
 *
 * @param {string} command The executable.
 * @param {string[]} args Its arguments.
 * @param {{cwd?: string, env?: NodeJS.ProcessEnv, quiet?: boolean}} [options] Working
 *   directory, environment, and whether the command's stderr is expected output
 *   rather than a fault.
 * @returns {Promise<string>} Everything the command wrote to stdout.
 */
const run = async (command, args, options = {}) => {
  const child = spawn(command, args, {
    cwd: options.cwd ?? REPO_ROOT,
    env: options.env ?? globalThis.process.env,
    stdio: ["ignore", "pipe", options.quiet === true ? "ignore" : "inherit"],
  });

  let stdout = "";
  child.stdout.setEncoding("utf-8");
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });

  /** @type {[number | null, NodeJS.Signals | null]} */
  const closeEvent = await once(child, "close");
  const [exitCode] = closeEvent;

  if (exitCode !== 0) {
    throw new Error(`${command} ${args.join(" ")} exited with ${exitCode ?? 1}`);
  }

  return stdout;
};

/**
 * Whether the registry already has this exact version.
 *
 * Makes a re-run after a partial failure safe, which matters more here than in a
 * two-package repo: a release is fourteen publishes and a network fault halfway
 * through must not need unpicking by hand. Unpublishing is unavailable after 72
 * hours, so re-running is the only recovery there is.
 *
 * @param {import("./workspace-packages.mjs").Package} entry The package to look up.
 * @returns {Promise<boolean>} True when that version is already published.
 */
const alreadyPublished = async (entry) => {
  try {
    // The only place in this script where stderr is dropped, and the exception
    // that proves the rule: a 404 here is the answer to the question, not a
    // fault. Printing fourteen of them buries a real failure in noise. Every
    // other command in this file keeps its stderr.
    await run("npm", ["view", `${entry.name}@${entry.version}`, "version"], { quiet: true });
    return true;
  } catch {
    return false;
  }
};

/**
 * Pack a package with pnpm and refuse a tarball that still names a workspace
 * protocol.
 *
 * `npm pack --dry-run` does not catch this and neither does anything else in the
 * pipeline; an uninstallable release reads as a working one right up until
 * someone installs it.
 *
 * @param {import("./workspace-packages.mjs").Package} entry The package to pack.
 * @returns {Promise<string>} Absolute path to the tarball.
 */
const pack = async (entry) => {
  const destination = globalThis.process.env.RUNNER_TEMP ?? tmpdir();
  const output = await run("pnpm", ["pack", "--pack-destination", destination], {
    cwd: entry.directory,
    // `pnpm build` has already built the workspace through turbo in dependency
    // order. Without this, fourteen prepack builds race each other over the
    // same dist/ directories - see scripts/prepack-build.mjs.
    env: { ...globalThis.process.env, PATTERNMODE_SKIP_PREPACK_BUILD: "1" },
  });

  const tarball = output.trim().split("\n").at(-1);
  if (tarball === undefined || tarball === "") {
    throw new Error(`pnpm pack produced no tarball for ${entry.name}.`);
  }

  const manifest = await run("tar", ["-xzOf", tarball, "package/package.json"]);
  if (manifest.includes('"workspace:')) {
    throw new Error(
      `${entry.name}@${entry.version} still contains a workspace: protocol dependency.`,
    );
  }

  return tarball;
};

const packages = inDependencyOrder(await readPublishablePackages());
console.log(`Release order: ${packages.map((entry) => entry.name).join(", ")}\n`);

let published = 0;
let skipped = 0;

for (const entry of packages) {
  const isOnRegistry = await alreadyPublished(entry);

  // A dry run packs even a version the registry already has. Packing is where
  // the workspace: protocol guard lives, and skipping it means a rehearsal of a
  // release with nothing new in it checks nothing at all - it prints fifteen
  // "already published" lines and exits green having packed no tarball. A real
  // run still skips, because re-publishing is what would fail.
  if (isOnRegistry && !isDryRun) {
    console.log(`= ${entry.name}@${entry.version} already on the registry, skipping`);
    skipped += 1;
    continue;
  }

  console.log(`-> packing ${entry.name}@${entry.version}`);
  const tarball = await pack(entry);

  if (isDryRun) {
    const note = isOnRegistry
      ? "already published, packed to check it still packs"
      : "would publish";
    console.log(`   dry run: ${note} ${tarball}`);
    continue;
  }

  // No credential is passed here on purpose: npm exchanges the workflow's
  // OIDC id-token for publish rights, and there is nothing on the runner to
  // pass.
  //
  // `--provenance` is explicit because npm documents trusted publishing as
  // attaching provenance by itself and it does not. Measured as a controlled
  // pair on @howells/lint: same account, same mechanism, the flag is what
  // attaches the attestation. Dropping it loses provenance silently.
  await run("npm", ["publish", tarball, "--access", "public", "--provenance"]);
  console.log(`   published ${entry.name}@${entry.version}`);
  published += 1;
}

console.log(`\n${published} published, ${skipped} already on the registry.`);
