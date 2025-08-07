"use client";

import type { PropMetadata } from "@patternmode/ui/lib/component-config-types";
import { PREVIEW_PROPS_REGISTRY, PREVIEW_REGISTRY } from "@patternmode/ui/components/registry";
import { Button } from "@patternmode/ui/components/button";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@patternmode/ui/components/sheet";
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
  const propsMetadataArray = PREVIEW_PROPS_REGISTRY[componentId] as PropMetadata[] | undefined;
  const PreviewComponent = PREVIEW_REGISTRY[componentId];

  if (!PreviewComponent) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Preview not available for {componentId}
      </div>
    );
  }

  // Convert array to object keyed by prop name
  const propsMetadata = React.useMemo(() => {
    if (!propsMetadataArray || propsMetadataArray.length === 0) {
      return undefined;
    }
    
    const metadataObj: Record<string, PropMetadata> = {};
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

  const config = propsMetadata ? {
    componentName,
    props: propsMetadata,
  } : undefined;

  // State for desktop prop inspector visibility
  const [showPropsDesktop, setShowPropsDesktop] = React.useState(true);

  return (
    <PreviewProvider defaultProps={defaultProps}>
      <div className="relative flex gap-4">
        {/* Main Preview Area */}
        <div className="flex-1 min-w-0">
          <PreviewDisplay 
            componentId={componentId} 
            category={category}
            componentPath={`@patternmode/ui/components/${componentId}`}
          />
        </div>

        {/* Desktop Prop Controls - Toggleable Right Sidebar */}
        {config && (
          <>
            {/* Desktop Sidebar */}
            <div className={`hidden lg:block relative transition-all duration-300 ${
              showPropsDesktop ? 'w-[320px]' : 'w-12'
            }`}>
              {/* Toggle Button */}
              <Button
                variant="outline"
                size="icon-sm"
                className="absolute -left-10 top-4 z-10"
                onClick={() => setShowPropsDesktop(!showPropsDesktop)}
              >
                <Settings2 className={`h-4 w-4 transition-transform ${showPropsDesktop ? 'rotate-90' : ''}`} />
              </Button>
              
              {/* Sidebar Content */}
              <div className={`border rounded-lg bg-card overflow-hidden ${
                showPropsDesktop ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } transition-opacity duration-300`}>
                <ScrollArea className="h-[500px]">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Component Props</h3>
                    <PreviewControls config={config} />
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Mobile Overlay */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger 
                  className="fixed bottom-6 right-6 z-40 shadow-lg inline-flex items-center justify-center h-10 w-10 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 bg-white dark:bg-zinc-950 hover:bg-zinc-50 hover:border-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-zinc-700 transition-colors"
                >
                  <Settings2 className="h-4 w-4" />
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] p-0">
                  <SheetHeader className="px-6 pt-6 pb-4 border-b">
                    <SheetTitle>Component Props</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100%-80px)]">
                    <div className="p-6">
                      <PreviewControls config={config} />
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </PreviewProvider>
  );
}