import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { loadDotenv } from "@howells/envy/dotenv";

import { envSchema } from "./release-env/schema.mjs";

const isDryRun = process.argv.includes("--dry-run");

loadDotenv([".env", ".env.local"], {
  skipMissing: true,
});

const processEnv = globalThis.process.env;
const env = envSchema.parseServer(processEnv);

if (isDryRun) {
  console.log("Validated publish environment: NPM_TOKEN");
  process.exit(0);
}

const tempDirectory = await mkdtemp(path.join(tmpdir(), "patternmode-npm-"));
const npmConfigPath = path.join(tempDirectory, ".npmrc");

try {
  await writeFile(
    npmConfigPath,
    `//registry.npmjs.org/:_authToken=${env.NPM_TOKEN}\nregistry=https://registry.npmjs.org/\n`,
    {
      mode: 0o600,
    },
  );

  const child = spawn("pnpm", ["changeset", "publish"], {
    env: {
      ...processEnv,
      NPM_CONFIG_USERCONFIG: npmConfigPath,
    },
    stdio: "inherit",
  });

  /** @type {[number | null, NodeJS.Signals | null]} */
  const closeEvent = await once(child, "close");
  const [exitCode] = closeEvent;

  if (exitCode !== 0) {
    process.exitCode = exitCode ?? 1;
  }
} finally {
  await rm(tempDirectory, {
    force: true,
    recursive: true,
  });
}
