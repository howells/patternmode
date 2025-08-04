"use client";

import React from "react";

import { Button, Subheading, Text } from "@patternmode/ui";

import type { PropMetadata } from "../../lib/prop-explorer";

import { ControlFactory, PropField } from "./controls";
import { usePropExplorer } from "./prop-explorer-context";

type PropExplorerConfig = {
  id: string;
  name: string;
  props: PropMetadata[];
};

type PropExplorerContentProps = {
  config?: PropExplorerConfig;
};

export function PropExplorerContent({ config }: PropExplorerContentProps) {
  const { props, updateProp, resetProps } = usePropExplorer();

  // Use props directly from the config (cast to local PropMetadata type)
  const availableProps = (config?.props || []) as PropMetadata[];

  if (!config || availableProps.length === 0) {
    return (
      <div className="space-y-6">
        <Text>No configurable properties available for this component.</Text>
      </div>
    );
  }

  // Check if component supports icons
  const _supportsIcons = availableProps.some(
    (prop: PropMetadata) => prop.name === "icon" || prop.name.endsWith("Icon"),
  );

  // Check if component supports children
  const _supportsChildren = availableProps.some(
    (prop: PropMetadata) => prop.name === "children",
  );

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Subheading level={3}>Props</Subheading>
        <Button onClick={resetProps} variant="ghost">
          Reset
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-4">
        {/* Props */}
        {availableProps
          .filter((prop: PropMetadata) => {
            // Hide className and callback props (starting with 'on')
            return prop.name !== "className" && !prop.name.startsWith("on");
          })
          .map((prop: PropMetadata) => {
            const currentValue = props[prop.name];
            const componentName = config.id || config.name?.toLowerCase();

            return (
              <PropField key={prop.name} prop={prop}>
                <ControlFactory
                  prop={prop}
                  currentValue={currentValue}
                  onValueChange={value => updateProp(prop.name, value)}
                  componentName={componentName}
                />
              </PropField>
            );
          })}
      </div>
    </div>
  );
}
