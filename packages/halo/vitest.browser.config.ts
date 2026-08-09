import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

/**
 * Browser tests, run by `pnpm test:browser`.
 *
 * `*.browser.tsx` deliberately does not match vitest's default `*.test.*`
 * include, so `pnpm test` never tries to run these under jsdom, and the
 * package `tsconfig.json` excludes them so they never reach `dist`.
 */
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
      provider: playwright(),
    },
    include: ["src/**/*.browser.tsx"],
  },
});
