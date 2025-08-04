"use client";

import React from "react";

import { Callout, getDynamicIconByName } from "@patternmode/ui";

type ComponentRendererProps = {
  Component: React.ComponentType<Record<string, unknown> & { children?: React.ReactNode }>;
  componentId: string;
  props: Record<string, unknown>;
};

/**
 * Hook that processes component props, handling icon conversion and boolean conversion
 */
export const useProcessedProps = (props: Record<string, unknown>) => {
  return React.useMemo(() => {
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
};

/**
 * Component that renders a loaded component with proper error handling and prop processing
 */
export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  Component,
  componentId,
  props,
}) => {
  const processedProps = useProcessedProps(props);

  const renderComponent = () => {
    try {
      // Only pass children if it's explicitly set in props, otherwise let the component use its defaults
      if (props.children !== undefined) {
        const childrenContent = String(props.children);
        return <Component {...processedProps}>{childrenContent}</Component>;
      }
      else {
        return <Component {...processedProps} />;
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

  return renderComponent();
};
