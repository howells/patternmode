"use client";

import React from "react";

import type { PropMetadata as ConfigPropMetadata } from "@patternmode/ui/lib/component-config-types";

import { getConfigProps, getDefaultProps } from "./config-utils";
import { PreviewProvider } from "./preview-context";
import { PreviewControls } from "./preview-controls";
import { PreviewDisplay } from "./preview-render";

type PreviewProps = {
  componentId: string;
  componentName: string;
  category: string;
  inspectorMaxHeight?: string;
};

export function Preview({
  componentId,
  componentName,
  category,
}: PreviewProps) {
  const [props, setProps] = React.useState<ConfigPropMetadata[]>([]);
  const [defaultProps, setDefaultProps] = React.useState<Record<string, unknown>>({});
  const [isPropsLoading, setIsPropsLoading] = React.useState(true);

  // Load props and default values with static registry
  React.useEffect(() => {
    async function loadProps() {
      try {
        // Get config from registry
        const { getComponentConfig } = await import("@patternmode/ui/components/registry");
        const config = getComponentConfig(componentId);

        if (!config) {
          throw new Error(`Component config not found for: ${componentId}`);
        }

        // Use async functions with await
        const configProps = await getConfigProps(config);
        const configDefaultProps = await getDefaultProps(config);

        setProps(configProps);
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

  // Create a minimal config for PreviewControls
  const previewConfig = React.useMemo(() => {
    // Convert props array to Record<string, PropMetadata>
    const propsRecord: Record<string, ConfigPropMetadata> = {};
    props.forEach((prop) => {
      propsRecord[prop.name] = prop;
    });

    return {
      componentName,
      props: propsRecord,
    };
  }, [componentName, props]);

  return (
    <PreviewProvider defaultProps={defaultProps}>
      <div className="flex flex-1 min-h-[400px] relative">
        {/* Main content - Live preview */}
        <div
          className="flex-1 p-6 relative overflow-auto"
          data-testid="component-explorer-preview"
        >
          <PreviewDisplay
            componentId={componentId}
            category={category}
          />
        </div>

        {/* Inspector - Visible on lg screens and up */}
        <div className="hidden lg:block">
          <aside
            data-testid="inspector"
            className="border-l min-w-xs bg-zinc-50"
          >
            <div className="px-6 py-6">
              {isPropsLoading
                ? (
                    <div className="p-4 text-center text-sm text-zinc-500">
                      Loading properties...
                    </div>
                  )
                : (
                    <PreviewControls config={previewConfig} />
                  )}
            </div>
          </aside>
        </div>
      </div>
    </PreviewProvider>
  );
}
