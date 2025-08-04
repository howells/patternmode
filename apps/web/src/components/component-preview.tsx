"use client";

import React from "react";

import {
  ComponentRenderer,
  generateLiveCode,
  getComponentName,
  PreviewTabs,
  useComponentLoader,
  useProcessedProps,
} from "../features/preview";
import { usePropExplorer } from "../features/prop-explorer/prop-explorer-context";

type ComponentPreviewProps = {
  componentId: string;
  category?: string;
  componentPath?: string;
};

export function ComponentPreview({
  componentId,
  category,
  componentPath,
}: ComponentPreviewProps) {
  const { props } = usePropExplorer();

  // Create dynamic component for this specific componentId
  const Component = useComponentLoader({ componentId, category, componentPath });

  // Process props for the component
  const componentProps = useProcessedProps(props);

  // Determine if component should be responsive
  const isResponsive = componentId.toLowerCase().includes("textarea");

  // Generate the preview content
  const previewContent = (
    <ComponentRenderer
      Component={Component}
      componentId={componentId}
      props={props}
      isResponsive={isResponsive}
    />
  );

  // Generate the code content
  const codeContent = generateLiveCode(getComponentName(componentId), componentProps);

  return (
    <PreviewTabs
      previewContent={previewContent}
      codeContent={codeContent}
    />
  );
}
