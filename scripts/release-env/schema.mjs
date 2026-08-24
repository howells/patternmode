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
 * There is deliberately no npm credential in this file. Publishing is Trusted
 * Publishing over OIDC from `.github/workflows/release.yml`, so the token this
 * schema used to validate does not exist any more - not here, not in Actions
 * secrets, not on a laptop. If you find yourself adding one back, the release
 * has gone wrong somewhere upstream.
 */
export const prepackEnvSchema = defineEnv({
  server: {
    PATTERNMODE_SKIP_PREPACK_BUILD: z.string().optional(),
  },
});
