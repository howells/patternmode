"use client";

import type { PreviewProps as UiPreviewProp } from "@patternmode/config/preview-props-type";

import { Button } from "@patternmode/button";
import { PREVIEW_PROPS_REGISTRY, PREVIEW_REGISTRY } from "@/registry/components";
import { ScrollArea } from "@patternmode/scroll-area";
import { HStack } from "@patternmode/stack";
import { cx } from "@patternmode/utils/cx";
import { Settings2 } from "lucide-react";
import React from "react";

import { PreviewProvider } from "./preview-context";
import { PreviewControls } from "./preview-controls";
import { PreviewDisplay } from "./preview-render";

type PreviewProps = {
  componentId: string;
  componentName: string;
  category: string;
};

export function Preview({ componentId, componentName, category }: PreviewProps) {
  // Get the preview component props metadata (it's an array, not an object)
  const propsMetadataArray = PREVIEW_PROPS_REGISTRY[componentId] as UiPreviewProp[] | undefined;
  const PreviewComponent = PREVIEW_REGISTRY[componentId];

  if (!PreviewComponent) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Preview not available for
        {" "}
        {componentId}
      </div>
    );
  }

  // Convert array to object keyed by prop name
  const propsMetadata = React.useMemo(() => {
    if (!propsMetadataArray || propsMetadataArray.length === 0) {
      return undefined;
    }

    const metadataObj: Record<string, UiPreviewProp> = {};
    propsMetadataArray.forEach((prop) => {
      metadataObj[prop.name] = prop;
    });
    return metadataObj;
  }, [propsMetadataArray]);

  // Extract default props from metadata
  const defaultProps = React.useMemo(() => {
    if (!propsMetadata) {
      return {};
    }

    const defaults: Record<string, unknown> = {};
    Object.entries(propsMetadata).forEach(([key, metadata]) => {
      if (metadata.defaultValue !== undefined) {
        defaults[key] = metadata.defaultValue;
      }
    });
    return defaults;
  }, [propsMetadata]);

  const config = propsMetadata
    ? {
        componentName,
        props: propsMetadata,
      }
    : undefined;

  // State for desktop prop inspector visibility
  const [showPropsDesktop, setShowPropsDesktop] = React.useState(true);

  return (
    <PreviewProvider defaultProps={defaultProps}>
      <HStack gap={0}>
        {/* Main Preview Area */}
        <div className="flex-1 min-w-0 p-6">
          <PreviewDisplay
            componentId={componentId}
            category={category}
            componentPath={`@patternmode/${componentId}`}
          />
        </div>

        {/* Desktop Prop Controls - Toggleable Right Sidebar */}
        {config && (
          <div className="relative">
            {/* Toggle Button */}
            <Button
              variant="secondary"
              size="icon-sm"
              className="absolute right-4 top-4 z-50"
              onClick={() => setShowPropsDesktop(!showPropsDesktop)}
              icon={Settings2}
            >
            </Button>

            {/* Desktop Sidebar */}
            <div className={cx("hidden lg:block relative transition-all border-l duration-300 w-96", {
              "translate-x-0": showPropsDesktop,
              "translate-x-full": !showPropsDesktop,
            })}
            >

              {/* Sidebar Content */}
              <div className={cx("overflow-hidden transition-opacity duration-300", {
                "opacity-100": showPropsDesktop,
                "opacity-0 pointer-events-none": !showPropsDesktop,
              })}
              >
                <ScrollArea className="h-[500px]">
                  <div className="p-6">
                    <PreviewControls config={config} />
                  </div>
                </ScrollArea>
              </div>
            </div>

          </div>
        )}
      </HStack>
    </PreviewProvider>
  );
}
