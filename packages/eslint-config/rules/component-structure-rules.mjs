/**
 * Component Structure Rules
 *
 * Custom ESLint rules to enforce consistent component folder structure.
 * Ensures all component directories contain required files.
 */

import fs from "node:fs";
import path from "node:path";

/**
 * Custom rule to require specific files in component directories
 */
const requireComponentFiles = {
  meta: {
    type: "problem",
    docs: {
      description: "require specific files in component directories",
      category: "Best Practices",
    },
    fixable: null,
    schema: [],
    messages: {
      missingFile: "Component directory '{{componentName}}' is missing required file: {{fileName}}",
      invalidDirectory: "Component file '{{fileName}}' should be in a component directory",
    },
  },
  create(context) {
    // Canonical structure for textarea and accordion components
    const requiredFiles = [
      "component.tsx",
      "component.config.ts",
      "examples.tsx",
      "index.tsx",
      "preview.tsx",
    ];

    /**
     * Check if a directory is a component directory that should be checked
     */
    function isComponentDirectory(dirPath) {
      const dirName = path.basename(dirPath);
      // All component directories should be kebab-case and not start with underscore
      // Exclude the 'todo' directory from structure checks
      return /^[a-z]+(?:-[a-z]+)*$/.test(dirName) && !dirName.startsWith("_") && dirName !== "todo";
    }

    /**
     * Get all component directories in the components folder
     */
    function getComponentDirectories(componentsPath) {
      if (!fs.existsSync(componentsPath)) {
        return [];
      }

      const entries = fs.readdirSync(componentsPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory() && isComponentDirectory(path.join(componentsPath, entry.name)))
        .map(entry => path.join(componentsPath, entry.name));
    }

    /**
     * Check if required files exist in component directory
     */
    function checkComponentDirectory(componentDir) {
      const componentName = path.basename(componentDir);
      const missingFiles = [];

      // Check required files
      for (const fileName of requiredFiles) {
        const filePath = path.join(componentDir, fileName);
        if (!fs.existsSync(filePath)) {
          missingFiles.push(fileName);
        }
      }

      // For canonical components, we already check component.tsx in requiredFiles
      // No additional check needed since it's enforced above

      return { componentName, missingFiles };
    }

    return {
      Program(node) {
        const filename = context.getFilename();

        // Only check files in components directories
        if (!filename.includes("/components/")) {
          return;
        }

        // Find the components root directory
        const pathParts = filename.split("/");
        const componentsIndex = pathParts.findIndex(part => part === "components");
        if (componentsIndex === -1) {
          return;
        }

        const componentsPath = pathParts.slice(0, componentsIndex + 1).join("/");
        const componentDirectories = getComponentDirectories(componentsPath);

        // Check each component directory
        for (const componentDir of componentDirectories) {
          const { componentName, missingFiles } = checkComponentDirectory(componentDir);

          for (const missingFile of missingFiles) {
            // Report the error on the Program node of any file in components
            context.report({
              node,
              messageId: "missingFile",
              data: {
                componentName,
                fileName: missingFile,
              },
            });
          }
        }
      },
    };
  },
};

/**
 * Custom rules for component structure
 */
export const componentStructureRules = {
  "require-component-files": requireComponentFiles,
};

/**
 * Configuration for component structure rules
 */
export const componentStructureConfig = {
  name: "component-structure-rules",
  files: ["**/src/components/**/*.{ts,tsx}", "**/components/**/*.{ts,tsx}"],
  plugins: {
    "component-structure": {
      rules: componentStructureRules,
    },
  },
  rules: {
    "component-structure/require-component-files": "error",
  },
};
