import { ui } from "@patternmode/eslint-config";

export default ui().append(
  {
    name: "test-console-override",
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/tests/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-console": "off",
    },
  },
  {
    name: "examples-console-override",
    files: ["**/examples.tsx"],
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
    },
  },
);
