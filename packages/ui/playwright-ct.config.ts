import * as process from "node:process";
import { defineConfig, devices } from "@playwright/experimental-ct-react";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: ".",
  testMatch: "**/src/components/**/*.playwright.test.{ts,tsx}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
    ctTemplateDir: "playwright",
    ctViteConfig: {
      configFile: "./vite.config.ts",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
