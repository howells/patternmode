/**
 * General JSDoc Rules
 *
 * JSDoc rules for general exported functions, classes, and types.
 * These are different from component-specific JSDoc rules.
 */

/**
 * General JSDoc rules for exported functions, classes, and types
 */
export const jsdocGeneralRules = {
  // General JSDoc rules for exported functions, classes, and types - but don't auto-fix to prevent empty blocks
  "jsdoc/require-jsdoc": [
    "warn",
    {
      require: {
        FunctionDeclaration: true,
        FunctionExpression: false,
        ArrowFunctionExpression: false,
        ClassDeclaration: true,
        ClassExpression: false,
        MethodDefinition: false,
      },
      contexts: [
        "ExportNamedDeclaration[declaration.type='FunctionDeclaration']",
        "ExportNamedDeclaration[declaration.type='ClassDeclaration']",
        "ExportNamedDeclaration[declaration.type='TSTypeAliasDeclaration']",
        "ExportNamedDeclaration[declaration.type='TSInterfaceDeclaration']",
        "ExportDefaultDeclaration[declaration.type='FunctionDeclaration']",
        "ExportDefaultDeclaration[declaration.type='ClassDeclaration']",
      ],
      // Disable auto-fix to prevent empty JSDoc blocks
      fixable: "never",
    },
  ],

  // Require brief descriptions (not all parameters/returns) - but don't auto-fix
  "jsdoc/require-description": ["warn", { fixable: false }],

  // Ensure JSDoc comments are valid when present
  "jsdoc/check-alignment": "error",
  "jsdoc/check-syntax": "error",
  "jsdoc/check-tag-names": [
    "error",
    {
      definedTags: ["id", "name", "component"], // Allow custom tags
    },
  ],

  // Prevent empty JSDoc blocks
  "jsdoc/no-blank-blocks": "error",
  "jsdoc/empty-tags": "error",
};

/**
 * Configuration for general JSDoc rules
 */
export const jsdocGeneralConfig = {
  name: "jsdoc-general-rules",
  rules: jsdocGeneralRules,
};
