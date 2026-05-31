import { defineEnv } from "@howells/envy";
import { z } from "zod";

export const envSchema = defineEnv({
  server: {
    NPM_TOKEN: z
      .string()
      .min(1, "Set NPM_TOKEN before publishing packages.")
      .regex(/^npm_[A-Za-z0-9_-]+$/, "NPM_TOKEN must look like an npm token."),
  },
});
