import { spawn } from "node:child_process";
import { once } from "node:events";
import { tmpdir } from "node:os";

import { REPO_ROOT, inDependencyOrder, readPublishablePackages } from "./workspace-packages.mjs";

/**
 * Publish every workspace package the registry does not already have.
 *
 * Authentication is Trusted Publishing: GitHub Actions proves this repo's
 * identity over OIDC and npm mints a short-lived token for the one publish.
 * There is no npm token in this repo, in Actions secrets, or on a laptop, and
 * no 2FA prompt to answer. That is the whole reason this script exists rather
 * than `changeset publish`: changesets shells out to `pnpm publish`, and pnpm
 * has no OIDC support, so it cannot do Trusted Publishing at all.
 *
 * **pnpm packs, npm publishes, and the split is not incidental.** Ten of these
 * packages depend on another through the `workspace:*` protocol. Only pnpm
 * rewrites that to a real version number when it packs; `npm pack` ships the
 * literal string and the release is uninstallable. So each package is packed by
 * pnpm, which gets the dependencies right, and the tarball is handed to npm,
 * which gets the authentication right.
 *
 * Versioning stays with changesets and stays local: `pnpm version-packages`,
 * review, commit, then run this from the Release workflow.
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
    // The workflow has already built the workspace through turbo in dependency
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
  if (await alreadyPublished(entry)) {
    console.log(`= ${entry.name}@${entry.version} already on the registry, skipping`);
    skipped += 1;
    continue;
  }

  console.log(`-> packing ${entry.name}@${entry.version}`);
  const tarball = await pack(entry);

  if (isDryRun) {
    console.log(`   dry run: would publish ${tarball}`);
    continue;
  }

  // No credential is passed here on purpose. npm reads the workflow's OIDC
  // identity out of the Actions environment and mints its own short-lived
  // token; anything this script supplied would be a secret that did not need
  // to exist.
  await run("npm", ["publish", tarball, "--access", "public"]);
  console.log(`   published ${entry.name}@${entry.version}`);
  published += 1;
}

console.log(`\n${published} published, ${skipped} already on the registry.`);
