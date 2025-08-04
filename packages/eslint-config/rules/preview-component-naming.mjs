/**
 * ESLint rule to enforce correct naming convention for preview components
 *
 * Ensures that files named "preview.tsx" export a component that follows
 * the pattern: {ComponentName}Preview
 *
 * For example:
 * - packages/ui/src/components/accordion/preview.tsx should export "AccordionPreview"
 * - packages/ui/src/components/alert-dialog/preview.tsx should export "AlertDialogPreview"
 */

// No imports needed

const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce correct naming convention for preview components",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      incorrectPreviewExport: "Preview file should export '{{expectedName}}' but found '{{actualName}}'",
      missingPreviewExport: "Preview file should export '{{expectedName}}' component",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Only apply to preview.tsx files in components directory
    if (!filename.includes("/components/") || !filename.endsWith("/preview.tsx")) {
      return {};
    }

    // Extract component name from path
    // e.g., "/components/accordion/preview.tsx" -> "accordion"
    const pathParts = filename.split("/");
    const componentDirIndex = pathParts.findIndex(part => part === "components");

    if (componentDirIndex === -1 || componentDirIndex + 1 >= pathParts.length) {
      return {};
    }

    const componentDir = pathParts[componentDirIndex + 1];

    // Convert kebab-case to PascalCase and add "Preview"
    // e.g., "alert-dialog" -> "AlertDialogPreview"
    const expectedExportName = `${componentDir
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")}Preview`;

    let hasCorrectExport = false;
    const foundExports = [];

    return {
      ExportNamedDeclaration(node) {
        if (node.declaration) {
          // Handle: export const AccordionPreview = ...
          if (node.declaration.type === "VariableDeclaration") {
            for (const declarator of node.declaration.declarations) {
              if (declarator.id && declarator.id.name) {
                const exportName = declarator.id.name;
                foundExports.push(exportName);
                if (exportName === expectedExportName) {
                  hasCorrectExport = true;
                }
              }
            }
          }
          // Handle: export function AccordionPreview() { ... }
          else if (node.declaration.type === "FunctionDeclaration" && node.declaration.id) {
            const exportName = node.declaration.id.name;
            foundExports.push(exportName);
            if (exportName === expectedExportName) {
              hasCorrectExport = true;
            }
          }
        }

        // Handle: export { AccordionPreview }
        if (node.specifiers) {
          for (const specifier of node.specifiers) {
            if (specifier.type === "ExportSpecifier") {
              const exportName = specifier.exported.name;
              foundExports.push(exportName);
              if (exportName === expectedExportName) {
                hasCorrectExport = true;
              }
            }
          }
        }
      },

      "Program:exit": function () {
        if (!hasCorrectExport) {
          const incorrectExport = foundExports.find(name => name.endsWith("Preview"));

          if (incorrectExport) {
            context.report({
              node: context.getSourceCode().ast,
              messageId: "incorrectPreviewExport",
              data: {
                expectedName: expectedExportName,
                actualName: incorrectExport,
              },
            });
          }
          else {
            context.report({
              node: context.getSourceCode().ast,
              messageId: "missingPreviewExport",
              data: {
                expectedName: expectedExportName,
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
