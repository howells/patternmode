"use client";

import { Button } from "@patternmode/button";
import { Callout } from "@patternmode/callout";
import { Card } from "@patternmode/card";
import { Icon } from "@patternmode/icon";
import { getComponentConfig } from "@patternmode/catalog";
import { Stack } from "@patternmode/stack";
import { Plus, Settings, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

import { PreviewProvider } from "../../features/preview/preview-context";
import { PropsEditorPopover } from "./props-editor-popover";

// Dynamic icon loader using next/dynamic
function getDynamicIcon(iconName: string) {
  if (!iconName || typeof iconName !== "string") {
    return null;
  }

  try {
    return dynamic(() => import("lucide-react").then(mod => ({
      default: mod[iconName as keyof typeof mod] as React.ComponentType<{ className?: string; strokeWidth?: number }>,
    })), {
      loading: () => null,
      ssr: false,
    });
  }
  catch {
    return null;
  }
}

type CellData = {
  componentId: string;
  props: Record<string, unknown>;
  position?: {
    colSpan?: number;
    rowSpan?: number;
    colStart?: number;
    rowStart?: number;
  };
};

type EditableCellProps = {
  cellIndex: number;
  cellData?: CellData;
  onAddComponent: () => void;
  onUpdateProps: (props: Record<string, unknown>) => void;
  onRemoveComponent: () => void;
};

export function EditableCell({
  cellData,
  onAddComponent,
  onUpdateProps,
  onRemoveComponent,
}: EditableCellProps) {
  const [showPropsEditor, setShowPropsEditor] = useState(false);

  // Create dynamic component based on componentId
  const DynamicComponent = useMemo(() => {
    if (!cellData) {
      return null;
    }

    const config = getComponentConfig(cellData.componentId);
    if (!config) {
      return null;
    }

    // Simple placeholder component to fix broken dynamic imports
    return () => (
      <Callout
        variant="warning"
        title="Dynamic component loading temporarily disabled"
      >
        {cellData.componentId}
      </Callout>
    );
  }, [cellData]);

  // Process props to handle icon conversion
  const processedProps = useMemo(() => {
    if (!cellData) {
      return {};
    }

    const finalProps: Record<string, unknown> = { ...cellData.props };

    // Generic icon handling - convert string icon names to components
    Object.entries(finalProps).forEach(([key, value]) => {
      const isIconProp = key === "icon" || key.endsWith("Icon");

      if (isIconProp && typeof value === "string" && value.trim() !== "") {
        const iconComponent = getDynamicIcon(value);
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
  }, [cellData]);

  // Component wrapper that handles prop spreading safely for void elements
  const ComponentWrapper = useMemo(() => {
    if (!cellData || !DynamicComponent) {
      return null;
    }

    return ({
      props,
    }: {
      props: Record<string, unknown>;
    }) => {
      const { children, ...otherProps } = props;

      // List of void elements that cannot have children
      const voidElements = new Set([
        'input', 'img', 'br', 'hr', 'area', 'base', 'col', 'embed',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
      ]);

      // Check if the component is a void element by checking the component name
      // This is a heuristic since we're dealing with dynamic components
      const componentName = cellData?.componentId?.toLowerCase();
      const isVoidElement = componentName && voidElements.has(componentName);

      // For void elements, never pass children
      if (isVoidElement) {
        return React.createElement(DynamicComponent, otherProps);
      }

      // For non-void elements, pass children if they exist
      if (children !== undefined) {
        return React.createElement(
          DynamicComponent,
          otherProps,
          String(children),
        );
      }

      return React.createElement(DynamicComponent, otherProps);
    };
  }, [cellData, DynamicComponent]);

  // Render component if one is assigned to this cell
  const renderComponent = () => {
    if (!cellData || !DynamicComponent || !ComponentWrapper) {
      return null;
    }

    try {
      return (
        <Stack className="w-full">
          <PreviewProvider defaultProps={cellData.props}>
            <ComponentWrapper props={processedProps} />
          </PreviewProvider>
        </Stack>
      );
    }
    catch (error) {
      console.error("Error rendering component:", error);
      return (
        <Callout variant="error" title="Error rendering component">
          Failed to render component
        </Callout>
      );
    }
  };

  if (cellData) {
    // Cell has a component
    return (
      <div className="group relative min-h-[80px] w-full">
        <div className="h-full w-full">{renderComponent()}</div>

        {/* Controls overlay */}
        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <PropsEditorPopover
            isOpen={showPropsEditor}
            onOpenChangeAction={setShowPropsEditor}
            cellData={cellData}
            onUpdatePropsAction={onUpdateProps}
            trigger={(
              <Button
                size="icon-sm"
                variant="secondary"
                rounded
                onClick={() => setShowPropsEditor(true)}
                leftIcon={Settings}
              >
              </Button>
            )}
          />
          <Button
            size="icon-sm"
            variant="destructive"
            rounded
            onClick={onRemoveComponent}
            leftIcon={X}
          >
          </Button>
        </div>
      </div>
    );
  }

  // Empty cell
  return (
    <Card
      variant="dashed"
      className="min-h-[80px] w-full flex items-center justify-center group cursor-pointer"
      onClick={onAddComponent}
    >
      <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400">
        <Icon
          icon={Plus}
          size="xl"
          className="group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
        />
        <span className="text-sm font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          Add Component
        </span>
      </div>
    </Card>
  );
}
