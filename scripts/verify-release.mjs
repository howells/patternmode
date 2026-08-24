import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as sleep } from "node:timers/promises";

import { z } from "zod";

import { REPO_ROOT, readPublishablePackages } from "./workspace-packages.mjs";

/**
 * What `npm view <spec> dependencies --json` serves back.
 *
 * Anything that is not an object of string ranges is not a dependency map, and
 * there is nothing in it that could carry a leaked workspace protocol.
 */
const dependencySchema = z.record(z.string(), z.string());

/**
 * Read every published package back off the registry and prove it is
 * installable.
 *
 * The release guards against a leaked `workspace:` protocol before it publishes.
 * This is the step that proves the guard worked, because the failure it protects
 * against is silent: a package whose dependency reads `workspace:*` installs
 * fine from the repo, packs without complaint, publishes without error, and only
 * fails for the first stranger who runs `npm install`. Checking the tarball is
 * checking our own work; checking the registry is checking the result.
 */

/** How many times the read path may lag a fresh publish before we call it a failure. */
const ATTEMPTS = 6;
const WAIT_MS = 10_000;

/**
 * Run a command and return its stdout, throwing on a non-zero exit.
 *
 * @param {string} command The executable.
 * @param {string[]} args Its arguments.
 * @returns {Promise<string>} Everything the command wrote to stdout.
 */
const run = async (command, args) => {
  const child = spawn(command, args, {
    cwd: REPO_ROOT,
    stdio: ["ignore", "pipe", "ignore"],
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
 * The dependency ranges the registry is serving for one published version.
 *
 * @param {string} raw `npm view <spec> dependencies --json` output.
 * @returns {[string, string][]} Dependency names paired with their ranges.
 */
const dependencyRanges = (raw) => {
  const trimmed = raw.trim();
  // `npm view` prints nothing when a package declares no dependencies, which is
  // a pass rather than something to parse.
  if (trimmed === "") {
    return [];
  }

  /** @type {unknown} */
  const parsed = JSON.parse(trimmed);

  const dependencies = dependencySchema.safeParse(parsed);
  return dependencies.success ? Object.entries(dependencies.data) : [];
};

const packages = await readPublishablePackages();
/** @type {string[]} */
const failures = [];

for (const entry of packages) {
  const specifier = `${entry.name}@${entry.version}`;
  /** @type {string | null} */
  let raw = null;

  // A fresh publish takes a moment to reach the read path, so a miss here means
  // "not yet", not "not published". Retry before believing it.
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      raw = await run("npm", ["view", specifier, "dependencies", "--json"]);
      break;
    } catch {
      if (attempt === ATTEMPTS) {
        break;
      }
      console.log(`   registry has not caught up on ${specifier} (attempt ${attempt}), waiting`);
      await sleep(WAIT_MS);
    }
  }

  if (raw === null) {
    failures.push(`${specifier} is not readable from the registry`);
    continue;
  }

  const unresolved = dependencyRanges(raw).filter(([, range]) => range.startsWith("workspace:"));
  if (unresolved.length > 0) {
    failures.push(
      `${specifier} published unresolved workspace ranges: ${unresolved
        .map(([name]) => name)
        .join(", ")}`,
    );
    continue;
  }

  console.log(`ok ${specifier}`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`::error::${failure}`);
  }
  process.exitCode = 1;
}
