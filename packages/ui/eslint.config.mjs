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
    name: "type-preference-override",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
);
