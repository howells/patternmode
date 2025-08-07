"use client";

import { PREVIEW_REGISTRY } from "@patternmode/ui/components/registry";
import React from "react";

type PreviewProps = {
  componentId: string;
  componentName: string;
  category: string;
};

export function Preview({ componentId }: PreviewProps) {
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

  return (
    <div className="p-6 border rounded-lg bg-card">
      <div className="flex items-center justify-center min-h-[200px]">
        <PreviewComponent />
      </div>
    </div>
  );
}