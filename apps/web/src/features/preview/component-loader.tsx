"use client";

import dynamic from "next/dynamic";
import React from "react";

import { Loader } from "@patternmode/ui";

import { getComponentImportPath, getExportedComponentName } from "./component-import-utils";

type ComponentLoaderProps = {
  componentId: string;
  category?: string;
  componentPath?: string;
};

/**
 * Create dynamic component based on componentId and category
 */
export const createDynamicComponent = (
  componentId: string,
  category?: string,
  componentPath?: string,
) => {
  // For preview components, convert component name to ExampleComponent format
  // e.g., "accordion" -> "AccordionExample"
  const previewComponentId = componentId.toLowerCase().endsWith("example")
    ? componentId
    : `${getExportedComponentName(componentId)}Example`;

  return dynamic(
    async () => {
            console.log(`Debug: Creating dynamic component for componentId: ${componentId}, previewComponentId: ${previewComponentId}`);

      const importPath = getComponentImportPath(
        previewComponentId,
        category,
        componentPath,
      );
      const exportedName = getExportedComponentName(previewComponentId);

            console.log(`Debug: Importing ${previewComponentId} from "${importPath}", looking for "${exportedName}"`);
      console.log(`Debug: Import path type: ${typeof importPath}, length: ${importPath?.length}`);

      if (!importPath || importPath === 'unknown' || typeof importPath !== 'string') {
        throw new Error(`Invalid import path: ${importPath} (type: ${typeof importPath})`);
      }

      try {
        // Try the main import path first
        console.log(`Debug: About to import from: ${importPath}`);

        // Special handling for preview components - use template literal directly like config-utils
        if (previewComponentId.endsWith('Example')) {
          const baseComponent = previewComponentId.replace(/Example$/, "");
          const kebabCase = baseComponent.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
          console.log(`Debug: Using direct template literal import for ${kebabCase}`);
          const mod = await import(`../../../../../packages/ui/src/components/${kebabCase}/preview.tsx`);
          console.log(`Debug: Direct import successful, available exports:`, Object.keys(mod));

          const component = mod[exportedName] || mod.default;
          if (!component) {
            console.error(`No component found with name ${exportedName} in direct import`);
            throw new Error(`Component ${exportedName} not found in module`);
          }
          return { default: component };
        }

        const mod = await import(importPath);
        console.log(`Debug: Import successful, available exports:`, Object.keys(mod));

        // If the component has a PropExplorer config with examples, try to use the first example's render function
        const propConfig
          = mod[`${exportedName.toLowerCase()}PropConfig`] || mod.propConfig;

        // Check if there's an example with a render function
        if (propConfig?.examples?.[0]?.render) {
          return { default: propConfig.examples[0].render };
        }

        // Try to get the named export first, then fall back to default
        const component = mod[exportedName] || mod.default;
        if (!component) {
          console.error(
            `No component found with name ${exportedName} in ${importPath}`,
          );
          throw new Error(`Component ${exportedName} not found in module`);
        }
        return { default: component };
      }
      catch (error) {
        console.warn(
          `Failed to load from three-file structure (${importPath}):`,
          error.message,
        );

        // Try fallback strategies
        const kebabCase = componentId
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .toLowerCase();

        try {
          // Strategy 1: Try flat structure in ui folder
          const flatPath = "@patternmode/ui";
          const mod = await import(flatPath);

          const component = mod[exportedName] || mod.default;
          if (!component) {
            throw new Error(
              `Component ${exportedName} not found in ${flatPath}`,
            );
          }
          return { default: component };
        }
        catch (fallbackError) {
          console.warn(
            `Flat structure fallback also failed (@patternmode/ui):`,
            fallbackError.message,
          );

          // Strategy 2: Try different category paths if category is provided
          if (category && category !== "ui") {
            try {
              const categoryPath = `@/components/${category}/${kebabCase}`;
              const mod = await import(categoryPath);

              const component = mod[exportedName] || mod.default;
              if (!component) {
                throw new Error(
                  `Component ${exportedName} not found in ${categoryPath}`,
                );
              }
              return { default: component };
            }
            catch (categoryError) {
              console.error(
                `All import strategies failed for ${componentId}:`,
                {
                  threeFile: error.message,
                  flat: fallbackError.message,
                  category: categoryError.message,
                },
              );

              // Return a fallback error component
              return {
                default: () => (
                  <div className="text-zinc-500 p-4 border  rounded bg-zinc-50 dark:bg-zinc-900">
                    <p className="font-medium">
                      {componentId}
                      {" "}
                      preview
                    </p>
                    <p className="text-xs mt-1">Interactive preview coming soon</p>
                  </div>
                ),
              };
            }
          }

          return {
            default: () => (
              <div className="text-zinc-500 p-4 border rounded bg-zinc-50 dark:bg-zinc-900">
                <p className="font-medium">
                  {componentId}
                  {" "}
                  preview
                </p>
                <p className="text-xs mt-1">Interactive preview coming soon</p>
              </div>
            ),
          };
        }
      }
    },
    {
      loading: () => (
        <div className="flex items-center justify-center p-8">
          <Loader aria-label={`Loading ${componentId}`} />
        </div>
      ),
      ssr: false,
    },
  ) as React.ComponentType<
    Record<string, unknown> & { children?: React.ReactNode }
  >;
};

/**
 * Hook that creates and memoizes a dynamic component
 */
export const useComponentLoader = ({ componentId, category, componentPath }: ComponentLoaderProps) => {
  return React.useMemo(
    () => createDynamicComponent(componentId, category, componentPath),
    [componentId, category, componentPath],
  );
};
