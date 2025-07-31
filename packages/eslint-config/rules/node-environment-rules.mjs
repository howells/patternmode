/**
 * Node.js and Environment Rules
 *
 * Rules for Node.js environments and environment variable handling.
 * Includes process, top-level await, and console logging preferences.
 */

/**
 * Node.js and environment-specific rules
 */
export const nodeEnvironmentRules = {
  // Console logging is allowed for debugging
  "no-console": "off",

  // Node.js and environment rules
  "antfu/no-top-level-await": ["off"],
  "node/prefer-global/process": ["off"],
  "node/no-process-env": ["error"],
};

/**
 * Configuration for Node.js and environment rules
 */
export const nodeEnvironmentConfig = {
  name: "node-environment-rules",
  rules: nodeEnvironmentRules,
};
