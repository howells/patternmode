/**
 * TypeScript Rules
 *
 * TypeScript-specific linting rules and preferences.
 * Includes explicit return types, type definitions, and TS-specific overrides.
 */

/**
 * TypeScript-specific rules
 */
export const typescriptRules = {
  // TypeScript preferences
  "ts/no-redeclare": "off",
  "ts/consistent-type-definitions": ["error", "type"],
  "ts/explicit-function-return-type": [
    "error",
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      allowFunctionsWithoutTypeParameters: true,
      allowIIFEs: true,
    },
  ],
  // Prevent usage of 'any' type
  "ts/no-explicit-any": "error",
};

/**
 * Configuration for TypeScript rules
 */
export const typescriptConfig = {
  name: "typescript-rules",
  rules: typescriptRules,
};
