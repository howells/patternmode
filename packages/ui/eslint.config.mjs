import { ui } from "@patternmode/eslint-config";

export default ui().append(
  {
    name: "ignore-markdown-files",
    ignores: ["**/*.md"],
  },
  {
    name: "test-console-override",
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/tests/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-console": "off",
    },
  },
  {
    name: "examples-console-override",
    files: ["**/examples.tsx", "**/preview.tsx"],
    rules: {
      "no-console": "off",
      "no-alert": "off",
    },
  },
  {
    name: "env-process-override",
    files: ["**/lib/env.ts"],
    rules: {
      "node/no-process-env": "off",
    },
  },
  {
    name: "react-hooks-override",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
  {
    name: "type-preference-override",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  {
    name: "component-structure-override",
    files: ["**/src/components/**/*.{ts,tsx}", "**/components/**/*.{ts,tsx}"],
    rules: {
      "component-structure/require-component-files": "off",
    },
  },
  {
    name: "preview-react-refresh-override", 
    files: ["**/preview.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
      "no-console": "off",
      "unused-imports/no-unused-vars": "off",
    },
  },
  {
    name: "registry-override",
    files: ["**/registry.ts"],
    rules: {
      "perfectionist/sort-imports": "off",
      "import/no-duplicates": "off",
    },
  },
  {
    name: "relax-strict-rules",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react/no-array-index-key": "off",
      "react/no-unstable-default-props": "off", 
      "react/no-unstable-context-value": "off",
      "react-hooks-extra/prefer-use-state-lazy-initialization": "off",
      "react/no-children-map": "off",
      "react/no-clone-element": "off",
      "react/no-forward-ref": "off",
      "react-refresh/only-export-components": "off",
      "react-dom/no-missing-button-type": "off",
      "unused-imports/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "style/max-statements-per-line": "error",
      "style/multiline-ternary": "off",
      "import/no-duplicates": "error",
      "ts/no-use-before-define": "off",
    },
  },
);
