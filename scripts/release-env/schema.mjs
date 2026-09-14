import { defineEnv } from "@howells/envy";
import { z } from "zod";

/**
 * The handover between `scripts/release.mjs` and `scripts/prepack-build.mjs`.
 *
 * Set to `"1"` once the release has built every package through turbo in
 * dependency order, which tells each package's `prepack` to reuse that build
 * rather than start its own. Absent everywhere else, so an ordinary `pnpm pack`
 * still builds.
 *
 * There is deliberately no npm credential in this file. `scripts/release.mjs`
 * passes none either; npm reads the logged-in user or an `NPM_TOKEN` already in
 * the environment. If you find yourself adding one back, the release has gone
 * wrong somewhere upstream.
 */
export const prepackEnvSchema = defineEnv({
  server: {
    PATTERNMODE_SKIP_PREPACK_BUILD: z.string().optional(),
  },
});
