"use client";

import React from "react";

import type { ComponentConfig, PropMetadata as ConfigPropMetadata } from "@patternmode/ui";

import { Inspector, InspectorBody } from "@patternmode/ui";

import { ComponentPreview } from "../../components/component-preview";
import { getConfigProps, getDefaultProps, getPrimaryComponent } from "./config-utils";
import { PropExplorerProvider } from "./prop-explorer-context";
import { PropExplorerContent } from "./prop-explorer-controls";

type ComponentPropExplorerProps = {
  config: ComponentConfig;
  category: string;
  component: string;
  inspectorMaxHeight?: string;
};

export function ComponentPropExplorer({
  config,
  category,
  component: _component,
  inspectorMaxHeight = "max-h-[400px] lg:max-h-[500px]",
}: ComponentPropExplorerProps) {
  const [props, setProps] = React.useState<ConfigPropMetadata[]>([]);
  const [defaultProps, setDefaultProps] = React.useState<Record<string, unknown>>({});
  const [isPropsLoading, setIsPropsLoading] = React.useState(true);

  // Get the primary component name
  const primaryComponentName = getPrimaryComponent(config);

  // Load props and default values asynchronously
  React.useEffect(() => {
    async function loadProps() {
      try {
        const [configProps, configDefaultProps] = await Promise.all([
          getConfigProps(config),
          getDefaultProps(config),
        ]);
        setProps(configProps as ConfigPropMetadata[]);
        setDefaultProps(configDefaultProps);
      }
      catch (error) {
        console.error("Failed to load props:", error);
        setProps([]);
        setDefaultProps({});
      }
      finally {
        setIsPropsLoading(false);
      }
    }

    loadProps();
  }, [config]);

  // Create a serializable version of the config with loaded props
  const serializableConfig = React.useMemo((): ComponentConfig => ({
    ...config,
    props,
    examples:
      config.examples?.map((example: (typeof config.examples)[number]) => ({
        ...example,
        // Remove render function to avoid serialization issues
        render: undefined,
      })) || [],
  }), [config, props]);

  return (
    <PropExplorerProvider defaultProps={defaultProps}>
      <div className="flex flex-1">
        {/* Main content - Live preview */}
        <div
          className="flex-1 p-6 relative overflow-auto"
          data-testid="component-explorer-preview"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='13' cy='1' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='1' cy='13' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='13' cy='13' r='0.5' fill='%23d1d5db'/%3E%3Ccircle cx='1' cy='25' r='1.5' fill='%238b8b8b'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
            backgroundPosition: "24px 24px",
            boxShadow: "inset 0 0 0 24px white",
          }}
        >
          <ComponentPreview
            componentId={primaryComponentName}
            category={category}
            componentPath={`@patternmode/ui/components/${config.id}/preview`}
          />
        </div>

        {/* Inspector - Visible on lg screens and up */}
        <div className={`hidden lg:block ${inspectorMaxHeight}`}>
          <Inspector>
            <InspectorBody>
              {isPropsLoading
                ? (
                    <div className="p-4 text-center text-sm text-zinc-500">
                      Loading properties...
                    </div>
                  )
                : (
                    <PropExplorerContent config={serializableConfig} />
                  )}
            </InspectorBody>
          </Inspector>
        </div>
      </div>
    </PropExplorerProvider>
  );
}
