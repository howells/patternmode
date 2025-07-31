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
  // General JSDoc rules for exported functions, classes, and types
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
    },
  ],

  // Require brief descriptions (not all parameters/returns)
  "jsdoc/require-description": "warn",

  // Ensure JSDoc comments are valid when present
  "jsdoc/check-alignment": "error",
  "jsdoc/check-syntax": "error",
  "jsdoc/check-tag-names": [
    "error",
    {
      definedTags: ["id", "name", "component"], // Allow custom tags
    },
  ],
};

/**
 * Configuration for general JSDoc rules
 */
export const jsdocGeneralConfig = {
  name: "jsdoc-general-rules",
  rules: jsdocGeneralRules,
};
