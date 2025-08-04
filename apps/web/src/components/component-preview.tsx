"use client";

import dynamic from "next/dynamic";
import React from "react";

import {
  Callout,
  CodeBlock,
  getDynamicIconByName,
  Loader,
  ScrollArea,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui";

import { usePropExplorer } from "../features/prop-explorer/prop-explorer-context";

// Component that centers components horizontally
const GridAlignedContainer: React.FC<{
  children: React.ReactNode;
  isResponsive?: boolean;
}> = ({
  children,
  isResponsive = false,
}) => {
  if (isResponsive) {
    // For responsive components, provide full width and center them
    return (
      <div className="w-full flex justify-center">
        {children}
      </div>
    );
  }

  // For all other components, just center them horizontally
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
};

type ComponentPreviewProps = {
  componentId: string;
  category?: string;
  componentPath?: string;
};

// Map componentId to import path
const getComponentImportPath = (
  componentId: string,
  category?: string,
  componentPath?: string,
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
    return `@patternmode/ui/components/${kebabCase}/preview`;
  }

  // Convert componentId to kebab-case for directory structure
  const _kebabCase = componentId
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  // Try three-file structure first: component/component.tsx
  return "@patternmode/ui";
};

// Map kebab-case component names to their actual exported component names
const getExportedComponentName = (componentId: string): string => {
  // Handle kebab-case to PascalCase conversion
  if (componentId.includes("-")) {
    return componentId
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // Handle already PascalCase names
  return componentId.charAt(0).toUpperCase() + componentId.slice(1);
};

// Generate JSX code from component props for the Code tab
const generateLiveCode = (
  componentName: string,
  props: Record<string, unknown>,
): string => {
  const { children, ...otherProps } = props;

  const propsArray = Object.entries(otherProps)
    .filter(
      ([, value]) => value !== "" && value !== false && value !== undefined,
    )
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }
      if (typeof value === "string") {
        return `${key}="${value}"`;
      }
      if (key.includes("Icon") && typeof value === "string") {
        return `${key}={${value}Icon}`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    });

  const propsString = propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";

  if (children && children !== "") {
    return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
  }
  else {
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
  componentPath?: string,
) => {
  // For preview components, convert component name to ExampleComponent format
  // e.g., "accordion" -> "AccordionExample"
  const previewComponentId = componentId.toLowerCase().endsWith("example")
    ? componentId
    : `${getExportedComponentName(componentId)}Example`;

  return dynamic(
    async () => {
      const importPath = getComponentImportPath(
        previewComponentId,
        category,
        componentPath,
      );
      const exportedName = getExportedComponentName(previewComponentId);

      console.log(
        `Attempting to import component: ${previewComponentId} from ${importPath}`,
      );

      try {
        // Try the main import path first
        const mod = await import(importPath);
        console.log(
          `Successfully imported from three-file structure: ${importPath}`,
        );

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
          console.log(`Trying fallback: ${flatPath}`);

          const mod = await import(flatPath);
          console.log(
            `Successfully imported from flat structure: ${flatPath}`,
          );

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
              console.log(`Trying category fallback: ${categoryPath}`);

              const mod = await import(categoryPath);
              console.log(
                `Successfully imported from category structure: ${categoryPath}`,
              );

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

export function ComponentPreview({
  componentId,
  category,
  componentPath,
}: ComponentPreviewProps) {
  const { props } = usePropExplorer();

  // Create dynamic component for this specific componentId
  const Component = React.useMemo(
    () => createDynamicComponent(componentId, category, componentPath),
    [componentId, category, componentPath],
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
      }
      else if (isIconProp && value === "") {
        // Remove empty icon props
        delete finalProps[key];
      }
    });

    // Convert string booleans to actual booleans
    Object.entries(finalProps).forEach(([key, value]) => {
      if (value === "true") {
        finalProps[key] = true;
      }
      else if (value === "false") {
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
      }
      else {
        return <Component {...componentProps} />;
      }
    }
    catch (renderError) {
      console.error("Error rendering component:", renderError);
      return (
        <Callout variant="error" title="Error rendering component">
          Failed to render
          {" "}
          {componentId}
        </Callout>
      );
    }
  };

  return (
    <Tabs defaultValue="preview">
      <Stack>
        {/* Tabs aligned to left with padding instead of absolute positioning */}
        <div className="flex justify-start">
          <TabsList variant="solid">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" data-testid="component-preview">
          <Stack data-testid="preview-container">
            <GridAlignedContainer isResponsive={componentId.toLowerCase().includes("textarea")}>
              {renderComponent()}
            </GridAlignedContainer>
          </Stack>
        </TabsContent>
        <TabsContent value="code">
          <Stack>
            <CodeBlock language="tsx">
              {generateLiveCode(getComponentName(componentId), componentProps)}
            </CodeBlock>
          </Stack>
        </TabsContent>
      </Stack>
    </Tabs>
  );
}
