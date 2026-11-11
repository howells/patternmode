import { spawn } from "node:child_process";
import { once } from "node:events";

/**
 * `prepack` for every publishable package: build the package before it is packed.
 *
 * The exception is a release. `scripts/release.mjs` packs every package after
 * `pnpm build` has built the whole workspace through turbo in dependency order,
 * and sets `PATTERNMODE_SKIP_PREPACK_BUILD=1` so each pack reuses that build
 * instead of rebuilding the package outside turbo's dependency order. Absent
 * everywhere else, so an ordinary `pnpm pack` still builds.
 */
if (globalThis.process.env.PATTERNMODE_SKIP_PREPACK_BUILD === "1") {
  console.log("prepack: reusing the workspace build (PATTERNMODE_SKIP_PREPACK_BUILD=1).");
  process.exit(0);
}

const child = spawn("pnpm", ["build"], {
  stdio: "inherit",
});

/** @type {[number | null, NodeJS.Signals | null]} */
const closeEvent = await once(child, "close");
const [exitCode] = closeEvent;

if (exitCode !== 0) {
  process.exitCode = exitCode ?? 1;
}
