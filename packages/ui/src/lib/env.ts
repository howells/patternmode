import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /**
   * Environment variables available on the client (browser).
   */
  clientPrefix: "NEXT_PUBLIC_",
  client: {},

  /**
   * Environment variables available on the server.
   * These are not exposed to the client.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Environment variables available in all environments.
   * These are typically build-time or runtime configuration.
   */
  shared: {},

  /**
   * Runtime environment variables.
   * Destructure all variables from `process.env` here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Skip validation in production builds to avoid errors
   * when environment variables are not available.
   */
  skipValidation: false,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
