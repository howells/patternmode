/**
 * JSDoc Component Rules
 *
 * Enforces JSDoc documentation standards for React components.
 * Includes requirements for specific tags and proper formatting.
 */

/**
 * JSDoc rules specifically for React components
 */
export const jsdocComponentRules = {
  // Require JSDoc for React component const declarations
  "jsdoc/require-jsdoc": [
    "error",
    {
      require: {
        FunctionDeclaration: false,
        FunctionExpression: false,
        ArrowFunctionExpression: false,
        ClassDeclaration: false,
        ClassExpression: false,
        MethodDefinition: false,
      },
      contexts: [
        // Target const declarations that look like React components (starting with capital letter)
        "VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/]",
      ],
    },
  ],

  // Require description for components
  "jsdoc/require-description": "error",

  // Require specific tags for components
  "jsdoc/require-param": "off", // Don't require @param for every prop
  "jsdoc/require-returns": "off", // Don't require @returns for components

  // Ensure JSDoc comments are valid
  "jsdoc/check-alignment": "error",
  "jsdoc/check-syntax": "error",
  "jsdoc/check-tag-names": [
    "error",
    {
      definedTags: [
        "id",
        "name",
        "component",
        "example",
        "see",
        "since",
        "deprecated",
        "version",
      ], // Allow custom component tags
    },
  ],

  // Ensure proper JSDoc formatting
  "jsdoc/require-asterisk-prefix": "error",
  "jsdoc/multiline-blocks": [
    "error",
    {
      noZeroLineText: false,
      noFinalLineText: true,
      noSingleLineBlocks: true,
    },
  ],

  // Prevent empty JSDoc blocks and require meaningful content
  "jsdoc/require-description-complete-sentence": "warn",
  "jsdoc/no-blank-blocks": "error",
  "jsdoc/no-multi-asterisks": ["error", { allowWhitespace: true }],

  // Prevent duplicate JSDoc blocks (this will catch multiple /** */ blocks before same declaration)
  "jsdoc/no-bad-blocks": "error",
};

/**
 * Configuration for JSDoc component rules
 */
export const jsdocComponentConfig = {
  name: "jsdoc-component-rules",
  files: ["**/src/components/**/*.tsx", "**/components/**/*.tsx"],
  rules: jsdocComponentRules,
};
