"use client";

import dynamic from "next/dynamic";
import React from "react";

import {
  Breadcrumbs,
  Button,
  Callout,
  CodeBlock,
  FieldArrayExample,
  getDynamicIconByName,
  Loader,
  ScrollArea,
  SparkAreaChart,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui";

import { usePropExplorer } from "../features/prop-explorer/prop-explorer-context";

// Component that dynamically calculates grid-aligned positioning
const GridAlignedContainer: React.FC<{
  children: React.ReactNode;
  isResponsive?: boolean;
}> = ({
  children,
  isResponsive = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const componentRef = React.useRef<HTMLDivElement>(null);
  const [gridOffset, setGridOffset] = React.useState(0);

  React.useEffect(() => {
    const calculateGridOffset = () => {
      if (containerRef.current && componentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const componentWidth = componentRef.current.offsetWidth;
        const gridSize = 24; // 24px grid size

        // Check if component should be grid-aligned (not too wide)
        const shouldGridAlign = componentWidth <= containerWidth - 96; // Allow some margin

        if (shouldGridAlign) {
          // Calculate how far we need to shift to align with grid
          // The component will be centered by flexbox, then we adjust by small amounts to snap to grid
          const centerPosition = (containerWidth - componentWidth) / 2;
          const gridStartOffset = 24; // First visible grid line

          // Find the nearest grid line to the center position
          const nearestGridLine = Math.round((centerPosition - gridStartOffset) / gridSize) * gridSize + gridStartOffset;

          // Calculate the offset needed to move from center to grid line
          const offset = nearestGridLine - centerPosition;

          // Clamp the offset to reasonable bounds to prevent extreme shifts
          const clampedOffset = Math.max(-48, Math.min(48, offset));

          setGridOffset(clampedOffset);
        }
        else {
          setGridOffset(0); // No grid alignment for wide components
        }
      }
    };

    // Initial calculation with a small delay to allow component to render
    const timeoutId = setTimeout(calculateGridOffset, 100);

    // Use ResizeObserver to watch for component size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateGridOffset();
    });

    if (componentRef.current) {
      resizeObserver.observe(componentRef.current);
    }

    window.addEventListener("resize", calculateGridOffset);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateGridOffset);
    };
  }, []);

  if (isResponsive) {
    // For responsive components, provide full width and center them
    return (
      <div
        ref={containerRef}
        className="flex justify-center items-start"
        style={{
          minHeight: "400px",
          paddingTop: "72px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px",
        }}
      >
        <div ref={componentRef} className="w-full flex justify-center">
          {children}
        </div>
      </div>
    );
  }

  // For all other components, use flexbox centering with grid offset
  return (
    <div
      ref={containerRef}
      className="flex justify-center items-start"
      style={{
        minHeight: "400px",
        paddingTop: "72px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "24px",
      }}
    >
      <div
        ref={componentRef}
        style={{
          transform: `translateX(${gridOffset}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
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

// Static component mapping
const componentMap: Record<string, React.ComponentType<unknown>> = {
  "button": Button,
  "breadcrumbs": Breadcrumbs,
  "spark-chart": SparkAreaChart, // Use SparkAreaChart as default spark chart
  "FieldArray": FieldArrayExample,
  "Field Array": FieldArrayExample, // Handle the space-separated version
};

// Create dynamic component based on componentId and category
const createDynamicComponent = (
  componentId: string,
  category?: string,
  componentPath?: string,
) => {
  // Use static mapping for known components
  if (componentMap[componentId]) {
    // Return a simple wrapper component that accepts and forwards props
    return (props: Record<string, unknown>) => {
      const Component = componentMap[componentId];
      return React.createElement(Component, props);
    };
  }

  // For preview components, convert component name to ExampleComponent format
  // e.g., "accordion" -> "AccordionExample"
  const previewComponentId = componentId.toLowerCase().endsWith("example")
    ? componentId
    : `${getExportedComponentName(componentId)}Example`;

  return dynamic(
    () => {
      const importPath = getComponentImportPath(
        previewComponentId,
        category,
        componentPath,
      );
      const exportedName = getExportedComponentName(previewComponentId);

      console.log(
        `Attempting to import component: ${previewComponentId} from ${importPath}`,
      );

      return import(importPath)
        .then((mod) => {
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
        })
        .catch((error) => {
          console.warn(
            `Failed to load from three-file structure (${importPath}):`,
            error.message,
          );

          // Try a few different fallback strategies
          const kebabCase = componentId
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase();

          // Strategy 1: Try flat structure in ui folder
          const flatPath = "@patternmode/ui";
          console.log(`Trying fallback: ${flatPath}`);

          return import(flatPath)
            .then((mod) => {
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
            })
            .catch((fallbackError) => {
              console.warn(
                `Flat structure fallback also failed (${flatPath}):`,
                fallbackError.message,
              );

              // Strategy 2: Try different category paths if category is provided
              if (category && category !== "ui") {
                const categoryPath = `@/components/${category}/${kebabCase}`;
                console.log(`Trying category fallback: ${categoryPath}`);

                return import(categoryPath)
                  .then((mod) => {
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
                  })
                  .catch((categoryError) => {
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
                        <div className="text-zinc-500 p-4 border border-zinc-200 rounded bg-zinc-50 dark:bg-zinc-900">
                          <p className="font-medium">
                            {componentId}
                            {" "}
                            preview
                          </p>
                          <p className="text-xs mt-1">Interactive preview coming soon</p>
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
                },
              );

              return {
                default: () => (
                  <div className="text-zinc-500 p-4 border border-zinc-200 rounded bg-zinc-50 dark:bg-zinc-900">
                    <p className="font-medium">
                      {componentId}
                      {" "}
                      preview
                    </p>
                    <p className="text-xs mt-1">Interactive preview coming soon</p>
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
        <TabsList variant="solid">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

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
