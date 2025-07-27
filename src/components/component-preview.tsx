"use client";

import { CodeBlock } from "@/components/ui/code-block/code-block";
import { getDynamicIconByName } from "@/components/ui/icon-select";
import { Loader } from "@/components/ui/loader/loader";
import { VStack } from "@/components/ui/stack";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import dynamic from "next/dynamic";
import React from "react";
import { usePropExplorer } from "./prop-explorer-context";

interface ComponentPreviewProps {
  componentId: string;
  category?: string;
  componentPath?: string;
}

// Map componentId to import path
const getComponentImportPath = (
  componentId: string,
  category?: string,
  componentPath?: string
): string => {
  // Use provided path if available
  if (componentPath) {
    return componentPath;
  }

  // Handle example components - all use the standardized three-file structure
  if (componentId.toLowerCase().endsWith("example")) {
    // Remove "Example" from the original componentId first, then convert to kebab-case
    const baseComponent = componentId.replace(/Example$/, "");
    // Convert PascalCase to kebab-case: AlertDialog -> alert-dialog
    const kebabCase = baseComponent
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    // All examples are in component/preview.tsx
    return `@/components/ui/${kebabCase}/preview`;
  }

  // Convert componentId to kebab-case for directory structure
  const kebabCase = componentId
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  // Try three-file structure first: component/component.tsx
  return `@/components/ui/${kebabCase}/${kebabCase}`;
};

// Map kebab-case component names to their actual exported component names
const getExportedComponentName = (componentId: string): string => {
  // Handle kebab-case to PascalCase conversion
  if (componentId.includes("-")) {
    return componentId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // Handle already PascalCase names
  return componentId.charAt(0).toUpperCase() + componentId.slice(1);
};

// Generate JSX code from component props for the Code tab
const generateLiveCode = (
  componentName: string,
  props: Record<string, unknown>
): string => {
  const { children, ...otherProps } = props;

  const propsArray = Object.entries(otherProps)
    .filter(
      ([, value]) => value !== "" && value !== false && value !== undefined
    )
    .map(([key, value]) => {
      if (value === true) return key;
      if (typeof value === "string") return `${key}="${value}"`;
      if (key.includes("Icon") && typeof value === "string")
        return `${key}={${value}Icon}`;
      return `${key}={${JSON.stringify(value)}}`;
    });

  const propsString = propsArray.length > 0 ? " " + propsArray.join(" ") : "";

  if (children && children !== "") {
    return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
  } else {
    return `<${componentName}${propsString} />`;
  }
};

// Extract component name from componentId
const getComponentName = (componentId: string): string => {
  // Remove "Example" suffix if present
  const baseComponent = componentId.replace(/Example$/, "");
  return getExportedComponentName(baseComponent);
};

// Create dynamic component based on componentId and category
const createDynamicComponent = (
  componentId: string,
  category?: string,
  componentPath?: string
) => {
  return dynamic(
    () => {
      const importPath = getComponentImportPath(
        componentId,
        category,
        componentPath
      );
      const exportedName = getExportedComponentName(componentId);

      console.log(
        `Attempting to import component: ${componentId} from ${importPath}`
      );

      return import(importPath)
        .then((mod) => {
          console.log(
            `Successfully imported from three-file structure: ${importPath}`
          );

          // If the component has a PropExplorer config with examples, try to use the first example's render function
          const propConfig =
            mod[`${exportedName.toLowerCase()}PropConfig`] || mod.propConfig;

          // Check if there's an example with a render function
          if (propConfig?.examples?.[0]?.render) {
            return { default: propConfig.examples[0].render };
          }

          // Try to get the named export first, then fall back to default
          const component = mod[exportedName] || mod.default;
          if (!component) {
            console.error(
              `No component found with name ${exportedName} in ${importPath}`
            );
            throw new Error(`Component ${exportedName} not found in module`);
          }
          return { default: component };
        })
        .catch((error) => {
          console.warn(
            `Failed to load from three-file structure (${importPath}):`,
            error.message
          );

          // Try a few different fallback strategies
          const kebabCase = componentId
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase();

          // Strategy 1: Try flat structure in ui folder
          const flatPath = `@/components/ui/${kebabCase}`;
          console.log(`Trying fallback: ${flatPath}`);

          return import(flatPath)
            .then((mod) => {
              console.log(
                `Successfully imported from flat structure: ${flatPath}`
              );
              const component = mod[exportedName] || mod.default;
              if (!component) {
                throw new Error(
                  `Component ${exportedName} not found in ${flatPath}`
                );
              }
              return { default: component };
            })
            .catch((fallbackError) => {
              console.warn(
                `Flat structure fallback also failed (${flatPath}):`,
                fallbackError.message
              );

              // Strategy 2: Try different category paths if category is provided
              if (category && category !== "ui") {
                const categoryPath = `@/components/${category}/${kebabCase}`;
                console.log(`Trying category fallback: ${categoryPath}`);

                return import(categoryPath)
                  .then((mod) => {
                    console.log(
                      `Successfully imported from category structure: ${categoryPath}`
                    );
                    const component = mod[exportedName] || mod.default;
                    if (!component) {
                      throw new Error(
                        `Component ${exportedName} not found in ${categoryPath}`
                      );
                    }
                    return { default: component };
                  })
                  .catch((categoryError) => {
                    console.error(
                      `All import strategies failed for ${componentId}:`,
                      {
                        threeFile: error.message,
                        flat: fallbackError.message,
                        category: categoryError.message,
                      }
                    );

                    // Return a fallback error component
                    return {
                      default: () => (
                        <div className="text-red-500 p-4 border border-red-200 rounded">
                          <p className="font-medium">
                            Component not found: {componentId}
                          </p>
                          <p className="text-xs mt-1">Tried paths:</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• {importPath}</li>
                            <li>• {flatPath}</li>
                            <li>• {categoryPath}</li>
                          </ul>
                        </div>
                      ),
                    };
                  });
              }

              // If no category, just throw the original error
              console.error(
                `All import strategies failed for ${componentId}:`,
                {
                  threeFile: error.message,
                  flat: fallbackError.message,
                }
              );

              return {
                default: () => (
                  <div className="text-red-500 p-4 border border-red-200 rounded">
                    <p className="font-medium">
                      Component not found: {componentId}
                    </p>
                    <p className="text-xs mt-1">Tried paths:</p>
                    <ul className="text-xs mt-1 space-y-1">
                      <li>• {importPath}</li>
                      <li>• {flatPath}</li>
                    </ul>
                  </div>
                ),
              };
            });
        });
    },
    {
      loading: () => (
        <div className="flex items-center justify-center p-8">
          <Loader aria-label={`Loading ${componentId}`} />
        </div>
      ),
      ssr: false,
    }
  ) as React.ComponentType<
    Record<string, unknown> & { children?: React.ReactNode }
  >;
};

export function ComponentPreview({
  componentId,
  category,
  componentPath,
}: ComponentPreviewProps) {
  const { props } = usePropExplorer();

  // Create dynamic component for this specific componentId
  const Component = React.useMemo(
    () => createDynamicComponent(componentId, category, componentPath),
    [componentId, category, componentPath]
  );

  // Create final props for the component
  const componentProps = React.useMemo(() => {
    const finalProps: Record<string, unknown> = { ...props };

    // Generic icon handling - convert string icon names to components
    // Use naming convention: any prop named "icon" or ending with "Icon"
    Object.entries(finalProps).forEach(([key, value]) => {
      const isIconProp = key === "icon" || key.endsWith("Icon");

      if (isIconProp && typeof value === "string" && value.trim() !== "") {
        const iconComponent = getDynamicIconByName(value);
        if (iconComponent) {
          finalProps[key] = iconComponent;
        }
      } else if (isIconProp && value === "") {
        // Remove empty icon props
        delete finalProps[key];
      }
    });

    // Convert string booleans to actual booleans
    Object.entries(finalProps).forEach(([key, value]) => {
      if (value === "true") {
        finalProps[key] = true;
      } else if (value === "false") {
        finalProps[key] = false;
      }
    });

    return finalProps;
  }, [props]);

  // Render the component
  const renderComponent = () => {
    try {
      // Only pass children if it's explicitly set in props, otherwise let the component use its defaults
      if (props.children !== undefined) {
        const childrenContent = String(props.children);
        return <Component {...componentProps}>{childrenContent}</Component>;
      } else {
        return <Component {...componentProps} />;
      }
    } catch (renderError) {
      console.error("Error rendering component:", renderError);
      return <div className="text-red-500">Error rendering {componentId}</div>;
    }
  };

  return (
    <Tabs defaultValue="preview">
      <VStack gap={6}>
        <div>
          <TabsList variant="solid">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview">
          <div className="flex justify-center">{renderComponent()}</div>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock language="tsx">
            {generateLiveCode(getComponentName(componentId), componentProps)}
          </CodeBlock>
        </TabsContent>
      </VStack>
    </Tabs>
  );
}
