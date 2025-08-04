"use client";

import React from "react";

import type { PropMetadata as ConfigPropMetadata } from "@patternmode/ui";

import { ScrollArea } from "@patternmode/ui";

import { ComponentPreview } from "../../components/component-preview";
import { getConfigProps, getDefaultProps } from "./config-utils";
import { PropExplorerProvider } from "./prop-explorer-context";
import { PropExplorerContent } from "./prop-explorer-controls";

type ComponentPropExplorerProps = {
  componentId: string;
  componentName: string;
  category: string;
  inspectorMaxHeight?: string;
};

export function ComponentPropExplorer({
  componentId,
  componentName,
  category,
}: ComponentPropExplorerProps) {
  const [props, setProps] = React.useState<ConfigPropMetadata[]>([]);
  const [defaultProps, setDefaultProps] = React.useState<Record<string, unknown>>({});
  const [isPropsLoading, setIsPropsLoading] = React.useState(true);

  // Load props and default values asynchronously
  React.useEffect(() => {
    async function loadProps() {
      try {
        // Dynamically import the component config
        const configModule = await import(`@patternmode/ui/components/${componentId}/component.config`);
        const config = configModule.componentConfig;

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
  }, [componentId]);

  // Create a minimal config for PropExplorerContent
  const propExplorerConfig = React.useMemo(() => ({
    id: componentId,
    name: componentName,
    props: props.map(prop => ({
      ...prop,
      type: String(prop.type), // Convert unknown to string
    })),
  }), [componentId, componentName, props]);

  return (
    <PropExplorerProvider defaultProps={defaultProps}>
      <div className="flex flex-1 min-h-[400px] relative">
        {/* Main content - Live preview */}
        <div
          className="flex-1 p-6 relative overflow-auto"
          data-testid="component-explorer-preview"
        >
          <ComponentPreview
            componentId={componentName}
            category={category}
          />
        </div>

        {/* Inspector - Visible on lg screens and up */}
        <div className="hidden lg:block">
          <aside
            data-testid="inspector"
            className="border-l min-w-xs bg-zinc-50"
          >
            <ScrollArea className="h-[400px]">
              <div className="px-6 py-6">
                {isPropsLoading
                  ? (
                      <div className="p-4 text-center text-sm text-zinc-500">
                        Loading properties...
                      </div>
                    )
                  : (
                      <PropExplorerContent config={propExplorerConfig} />
                    )}
              </div>
            </ScrollArea>
          </aside>
        </div>
      </div>
    </PropExplorerProvider>
  );
}
