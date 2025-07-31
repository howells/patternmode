"use client";

import type { ComponentConfig } from "@patternmode/ui";
import type { PropMetadata } from "../lib/prop-explorer";

import { Inspector, InspectorBody } from "@patternmode/ui";
import React from "react";
import { ComponentPreview } from "./component-preview";
import { PropExplorerProvider } from "./prop-explorer-context";
import { PropExplorerContent } from "./prop-explorer-controls";

interface ComponentPropExplorerProps {
  config: ComponentConfig;
  category: string;
  component: string;
  inspectorMaxHeight?: string;
}

export function ComponentPropExplorer({
  config,
  category,
  component,
  inspectorMaxHeight = "max-h-[400px] lg:max-h-[500px]",
}: ComponentPropExplorerProps) {
  // Extract default values from props if available
  const getDefaultProps = () => {
    if (!config.props) {
      return {};
    }

    const defaultProps: Record<string, unknown> = {};

    // Extract default values from props
    config.props.forEach((prop: PropMetadata) => {
      if (prop.defaultValue !== undefined) {
        defaultProps[prop.name] = prop.defaultValue;
      }
    });

    // Add default children if the component supports it
    const childrenProp = config.props.find(
      (prop: PropMetadata) => prop.name === "children"
    );
    if (childrenProp && childrenProp.defaultValue !== undefined) {
      defaultProps.children = childrenProp.defaultValue;
    } else if (childrenProp) {
      // Fallback to component name if no defaultValue is specified
      defaultProps.children = config.name;
    }

    return defaultProps;
  };

  // Create a serializable version of the config without render functions
  const serializableConfig = {
    ...config,
    examples:
      config.examples?.map((example: (typeof config.examples)[number]) => ({
        ...example,
        // Remove render function to avoid serialization issues
        render: undefined,
      })) || [],
  };

  return (
    <PropExplorerProvider defaultProps={getDefaultProps()}>
      <div className="flex flex-1">
        {/* Main content - Live preview */}
        <div
          className="flex-1 p-6 relative"
          data-testid="component-explorer-preview"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='13' cy='1' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='1' cy='13' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='13' cy='13' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='1' cy='25' r='1.5' fill='%238b8b8b'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
            backgroundPosition: "24px 24px",
            boxShadow: "inset 0 0 0 24px white",
          }}
        >
          <ComponentPreview
            componentId={config.componentId || component}
            category={category}
          />
        </div>

        {/* Inspector - Always visible */}
        <div className={inspectorMaxHeight}>
          <Inspector>
            <InspectorBody>
              <PropExplorerContent config={serializableConfig} />
            </InspectorBody>
          </Inspector>
        </div>
      </div>
    </PropExplorerProvider>
  );
}
