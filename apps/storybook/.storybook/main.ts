import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const rootDir = path.resolve(__dirname, "../../..");

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
    "../../../packages/ui/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
    "../../../packages/ui/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
    "../../../packages/ui/src/compositions/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (viteConfig) => {
    viteConfig.server = viteConfig.server || {};
    viteConfig.server.fs = {
      allow: [...(viteConfig.server?.fs?.allow ?? []), rootDir],
    };

    // Polyfill process.env for Next.js internals some components may reference
    viteConfig.define = {
      ...viteConfig.define,
      "process.env": JSON.stringify({}),
    };

    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe ?? []),
      "react",
      "react-dom",
    ];

    const alias = Array.isArray(viteConfig.resolve.alias)
      ? viteConfig.resolve.alias
      : Object.entries(viteConfig.resolve.alias || {}).map(
          ([find, replacement]) => ({ find, replacement }),
        );
    alias.push(
      {
        find: "@patternmode/tailwind-config",
        replacement: path.resolve(rootDir, "packages/tailwind-config"),
      },
      {
        find: "@patternmode/ui",
        replacement: path.resolve(rootDir, "packages/ui/src"),
      },
      {
        find: "@patternmode/motion",
        replacement: path.resolve(rootDir, "packages/motion/src"),
      },
    );
    viteConfig.resolve.alias = alias;

    return viteConfig;
  },
};

export default config;
