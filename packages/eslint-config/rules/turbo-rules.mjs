/**
 * Turborepo Rules
 *
 * Rules specific to Turborepo monorepo environments.
 * Includes environment variable validation and turbo-specific linting.
 */

/**
 * Turborepo-specific rules
 */
export const turboRules = {
  // Turborepo environment variable validation
  "turbo/no-undeclared-env-vars": [
    "error",
    {
      allowList: [
        "^NEXT_PUBLIC_.*", // Allow Next.js public variables
        "^NODE_ENV$", // Common environment variable
        "^PORT$", // Common development variable
        "^CI$", // Common CI environment variable
      ],
    },
  ],
};

/**
 * Configuration for Turborepo rules
 * Note: Plugins are resolved in the main config
 */
export const turboConfig = {
  name: "turbo/rules",
  rules: turboRules,
};
