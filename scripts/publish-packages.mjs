import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadDotenv } from "@howells/envy/dotenv";

import { envSchema } from "./release-env/schema.mjs";

const isDryRun = process.argv.includes("--dry-run");

loadDotenv([".env", ".env.local"], {
  skipMissing: true,
});

const env = envSchema.parseServer(process.env);

if (isDryRun) {
  console.log("Validated publish environment: NPM_TOKEN");
  process.exit(0);
}

const tempDirectory = await mkdtemp(join(tmpdir(), "patternmode-npm-"));
const npmConfigPath = join(tempDirectory, ".npmrc");

try {
  await writeFile(
    npmConfigPath,
    `//registry.npmjs.org/:_authToken=${env.NPM_TOKEN}\nregistry=https://registry.npmjs.org/\n`,
    {
      mode: 0o600,
    }
  );

  const exitCode = await new Promise((resolve) => {
    const child = spawn("pnpm", ["changeset", "publish"], {
      env: {
        ...process.env,
        NPM_CONFIG_USERCONFIG: npmConfigPath,
      },
      stdio: "inherit",
    });

    child.on("close", resolve);
  });

  if (exitCode !== 0) {
    process.exitCode = exitCode ?? 1;
  }
} finally {
  await rm(tempDirectory, {
    force: true,
    recursive: true,
  });
}
