"use client";

import { Callout } from "@patternmode/callout";
import { CodeBlock } from "@patternmode/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/tabs";
import React from "react";
import { getPreviewComponent } from "@/registry/components";

import { usePreview } from "./preview-context";

type PreviewDisplayProps = {
  componentId: string;
  category?: string;
  componentPath?: string;
};

/**
 * Convert componentId to proper component name
 */
const getComponentName = (componentId: string): string => {
  return componentId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

/**
 * Process component props, handling boolean conversion and cleanup
 */
const useProcessedProps = (props: Record<string, unknown>) => {
  return React.useMemo(() => {
    const finalProps: Record<string, unknown> = { ...props };

    // Clean up empty string values for icon props
    for (const [key, value] of Object.entries(finalProps)) {
      const isIconProp = key === "icon" || key.endsWith("Icon");

      if (isIconProp && value === "") {
        delete finalProps[key];
      }
    }

    // Convert string booleans to actual booleans
    for (const [key, value] of Object.entries(finalProps)) {
      if (value === "true") {
        finalProps[key] = true;
      } else if (value === "false") {
        finalProps[key] = false;
      }
    }

    return finalProps;
  }, [props]);
};

/**
 * Generate JSX code from component props for the Code tab
 */
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

  // List of void elements that cannot have children
  const voidElements = new Set([
    "input",
    "img",
    "br",
    "hr",
    "area",
    "base",
    "col",
    "embed",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  // Check if the component is a void element
  const isVoidElement = voidElements.has(componentName.toLowerCase());

  // For void elements, always use self-closing syntax
  if (isVoidElement || !children || children === "") {
    return `<${componentName}${propsString} />`;
  }
  return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
};

/**
 * Create dynamic component with proper error handling using React.lazy
 */
const createDynamicComponent = (componentId: string, _category?: string) => {
  return React.lazy(async () => {
    try {
      const PreviewComponent = await getPreviewComponent(componentId);

      if (PreviewComponent) {
        return { default: PreviewComponent as React.ComponentType<any> };
      }

      // Fallback component for unsupported components
      const FallbackComponent = function FallbackComponent() {
        return (
          <div className="rounded border bg-zinc-50 p-4 text-zinc-500 dark:bg-zinc-900">
            <p className="font-medium">{componentId} preview</p>
            <p className="mt-1 text-xs">Preview component not found</p>
          </div>
        );
      };

      return { default: FallbackComponent };
    } catch (_error) {
      // Error fallback component
      const ErrorComponent = function ErrorComponent() {
        return (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-red-500 dark:border-red-800 dark:bg-red-900/20">
            <p className="font-medium">Error loading preview</p>
            <p className="mt-1 text-xs">
              Failed to load
              {componentId} preview component
            </p>
          </div>
        );
      };

      return { default: ErrorComponent };
    }
  });
};

export function PreviewDisplay({
  componentId,
  category,
  componentPath: _componentPath,
}: PreviewDisplayProps) {
  const { props } = usePreview();

  // Process props for the component at the top level to avoid conditional hook calls
  const processedProps = useProcessedProps(props);

  // Create dynamic component - must be called before any conditional returns
  const Component = React.useMemo(
    () => createDynamicComponent(componentId, category),
    [componentId, category]
  );

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full">
        <Tabs defaultValue="preview">
          <TabsList variant="solid">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-6 flex justify-center" value="preview">
            <div className="flex items-center justify-center p-8 text-zinc-500">
              Loading preview...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Render component with error handling
  const renderComponent = () => {
    try {
      const ComponentWithProps = Component as React.ComponentType<
        Record<string, unknown> & { children?: React.ReactNode }
      >;

      // List of void elements that cannot have children
      const voidElements = new Set([
        "input",
        "img",
        "br",
        "hr",
        "area",
        "base",
        "col",
        "embed",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ]);

      // Check if the component is a void element by checking the component name
      const isVoidElement = voidElements.has(componentId.toLowerCase());

      // For void elements, never pass children
      const componentElement =
        props.children !== undefined && !isVoidElement ? (
          <ComponentWithProps {...processedProps}>
            {String(props.children)}
          </ComponentWithProps>
        ) : (
          <ComponentWithProps {...processedProps} />
        );

      return (
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center gap-2 text-zinc-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
                Loading preview...
              </div>
            </div>
          }
        >
          {componentElement}
        </React.Suspense>
      );
    } catch (_renderError) {
      return (
        <Callout title="Error rendering component" variant="error">
          Failed to render {componentId}
        </Callout>
      );
    }
  };

  // Generate code content
  const codeContent = generateLiveCode(
    getComponentName(componentId),
    processedProps
  );

  return (
    <div className="w-full">
      <Tabs defaultValue="preview">
        <TabsList variant="solid">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent
          className="mt-6 flex justify-center"
          data-testid="component-preview"
          value="preview"
        >
          {renderComponent()}
        </TabsContent>

        <TabsContent className="mt-6" value="code">
          <CodeBlock language="tsx">{codeContent}</CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  );
}
