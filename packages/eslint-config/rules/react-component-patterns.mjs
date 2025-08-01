/**
 * Rules to enforce React component patterns and restrictions
 */

export const reactComponentPatternRules = {
  // Keep basic syntax restrictions
  "no-restricted-syntax": [
    "error",
    "TSEnumDeclaration[const=true]",
    "TSExportAssignment",
  ],
};

export const reactComponentPatternConfig = {
  name: "react-component-patterns",
  ignores: ["**/examples.tsx", "**/examples/**/*.tsx"],
  rules: reactComponentPatternRules,
};
