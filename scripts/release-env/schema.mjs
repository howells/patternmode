import { defineEnv } from "@howells/envy";
import { z } from "zod";

export const envSchema = defineEnv({
  server: {
    NPM_TOKEN: z
      .string()
      .min(1, "Set NPM_TOKEN before publishing packages.")
      .regex(/^npm_[A-Za-z0-9_-]+$/u, "NPM_TOKEN must look like an npm token."),
  },
});

/**
 * The handover between `scripts/publish-packages.mjs` and
 * `scripts/prepack-build.mjs`.
 *
 * Set to `"1"` once the publish script has built every package through turbo in
 * dependency order, which tells each package's `prepack` to reuse that build
 * rather than start its own. Absent everywhere else, so an ordinary `pnpm pack`
 * still builds.
 */
export const prepackEnvSchema = defineEnv({
  server: {
    PATTERNMODE_SKIP_PREPACK_BUILD: z.string().optional(),
  },
});
