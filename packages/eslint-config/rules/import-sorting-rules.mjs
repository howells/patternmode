/**
 * Import Sorting Rules
 *
 * Rules for import organization and sorting.
 * Uses perfectionist plugin for consistent import/export ordering.
 */

/**
 * Import sorting and organization rules
 */
export const importSortingRules = {
  // Import sorting and organization (re-enabled with root dependencies)
  "perfectionist/sort-imports": [
    "error",
    {
      tsconfigRootDir: ".",
    },
  ],
  "perfectionist/sort-exports": "off",
};

/**
 * Configuration for import sorting rules
 */
export const importSortingConfig = {
  name: "import-sorting-rules",
  rules: importSortingRules,
};
