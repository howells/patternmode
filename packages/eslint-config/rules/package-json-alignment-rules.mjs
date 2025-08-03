/**
 * Package.json alignment rules for monorepo consistency
 * Ensures no duplicate dependencies across workspace packages
 */

export const packageJsonAlignmentRules = {
  // Validate JSON files for package.json specific rules
  files: ["**/package.json"],
  rules: {
    // Ensure package.json files are properly formatted
    "jsonc/sort-keys": [
      "error",
      [
        {
          pathPattern: "^$",
          order: [
            "name",
            "version",
            "private",
            "description",
            "author",
            "license",
            "keywords",
            "sideEffects",
            "exports",
            "main",
            "module",
            "types",
            "scripts",
            "peerDependencies",
            "peerDependenciesMeta",
            "dependencies",
            "devDependencies",
            "publishConfig",
          ],
        },
        {
          pathPattern: "^(dependencies|devDependencies|peerDependencies)$",
          order: { type: "asc" },
        },
      ],
    ],
  },
};
