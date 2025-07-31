import antfu from "@antfu/eslint-config";
import jsdocPlugin from "eslint-plugin-jsdoc";
import turboPlugin from "eslint-plugin-turbo";
// Component-specific rules (UI package)
import { jsdocComponentConfig } from "./rules/jsdoc-component-rules.mjs";
import { reactComponentPatternConfig } from "./rules/react-component-patterns.mjs";

// General rules (all packages)
import { importSortingConfig } from "./rules/import-sorting-rules.mjs";
import { jsdocGeneralConfig } from "./rules/jsdoc-general-rules.mjs";
import { nodeEnvironmentConfig } from "./rules/node-environment-rules.mjs";
import { turboConfig } from "./rules/turbo-rules.mjs";
import { typescriptConfig } from "./rules/typescript-rules.mjs";

export const base = () =>
  antfu({
    typescript: true,
    formatters: true,
    lessOpinionated: true,
  })
    .append({
      name: "base-plugins",
      plugins: {
        turbo: turboPlugin,
        jsdoc: jsdocPlugin,
      },
    })
    .append(turboConfig)
    .append(typescriptConfig)
    .append(nodeEnvironmentConfig)
    .append(importSortingConfig)
    .append(jsdocGeneralConfig);

// UI-specific configuration for React components
export const ui = () =>
  antfu({
    typescript: true,
    react: true,
    formatters: true,
    lessOpinionated: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  })
    .append(jsdocComponentConfig)
    .append(reactComponentPatternConfig);

export const nextjs = () =>
  antfu({
    typescript: true,
    nextjs: true,
    formatters: true,
    lessOpinionated: true,
  })
    .append({
      name: "nextjs-plugins",
      plugins: {
        turbo: turboPlugin,
        jsdoc: jsdocPlugin,
      },
    })
    .append(turboConfig)
    .append(typescriptConfig)
    .append(nodeEnvironmentConfig)
    .append(importSortingConfig)
    .append(jsdocGeneralConfig);

export const react = () =>
  antfu({
    typescript: true,
    react: true,
    formatters: true,
    lessOpinionated: true,
  });
