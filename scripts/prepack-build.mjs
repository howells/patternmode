import { spawn } from "node:child_process";
import { once } from "node:events";

import { prepackEnvSchema } from "./release-env/schema.mjs";

/**
 * `prepack` for every publishable package.
 *
 * Normally it is just `pnpm build`. The exception is a release: `changeset
 * publish` runs up to ten `pnpm publish` processes concurrently, so ten
 * `prepack` builds race each other with no topological order between them.
 * `tsdown` builds with `clean: true`, so a package's `dist/` is emptied and
 * `index.mjs` rewritten within milliseconds while `tsc --emitDeclarationOnly`
 * takes seconds to put the `.d.ts` files back. A dependent package compiling in
 * that window resolves its workspace dependency to JavaScript with no types and
 * silently infers them from the bundle — which surfaces as a type error in the
 * dependent's own source, not as a missing module, so it reads like a real
 * build fault in a package that builds clean on its own.
 *
 * `scripts/publish-packages.mjs` therefore builds the whole workspace through
 * turbo first, in dependency order, and sets the skip variable so the
 * concurrent `prepack` builds do not undo it.
 */
const env = prepackEnvSchema.parseServer(globalThis.process.env);

if (env.PATTERNMODE_SKIP_PREPACK_BUILD === "1") {
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
