import antfu from "@antfu/eslint-config";
import turboPlugin from "eslint-plugin-turbo";

// Component-specific rules (UI package)
import { componentMetadataConfig } from "./rules/component-metadata-rules.mjs";
import { componentStructureConfig } from "./rules/component-structure-rules.mjs";
// General rules (all packages)
import { importSortingConfig } from "./rules/import-sorting-rules.mjs";
import { jsdocComponentConfig } from "./rules/jsdoc-component-rules.mjs";
import { jsdocGeneralConfig } from "./rules/jsdoc-general-rules.mjs";
import { nodeEnvironmentConfig } from "./rules/node-environment-rules.mjs";
import previewComponentNamingRule from "./rules/preview-component-naming.mjs";
import { reactComponentPatternConfig } from "./rules/react-component-patterns.mjs";
import { turboConfig } from "./rules/turbo-rules.mjs";
import { typescriptConfig } from "./rules/typescript-rules.mjs";

export const base = () =>
  antfu({
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    lessOpinionated: true,
  })
    .append({
      name: "base-plugins",
      plugins: {
        turbo: turboPlugin,
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
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    lessOpinionated: true,
  })
    .append(jsdocComponentConfig)
    .append(componentMetadataConfig)
    .append(componentStructureConfig)
    .append(reactComponentPatternConfig)
    .append({
      name: "preview-component-naming",
      plugins: {
        "preview-naming": { rules: { "correct-preview-export": previewComponentNamingRule } },
      },
      rules: {
        "preview-naming/correct-preview-export": "error",
      },
    })
    .append({
      name: "formatting-overrides",
      rules: {
        // Disable conflicting JSX rules
        "@stylistic/jsx-one-expression-per-line": "off",
        "@stylistic/jsx-newline": "off",
        "@stylistic/jsx-child-element-spacing": "off",
      },
    });

export const nextjs = () =>
  antfu({
    typescript: true,
    nextjs: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    lessOpinionated: true,
  })
    .append({
      name: "nextjs-plugins",
      plugins: {
        turbo: turboPlugin,
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
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    lessOpinionated: true,
  });
