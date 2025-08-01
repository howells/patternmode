"use client";

import { getComponentConfig } from "@patternmode/ui/component-registry";
import { Plus, Settings, X } from "lucide-react";
import React, { useMemo, useState } from "react";

import { Button, Card, getDynamicIconByName, Icon } from "@patternmode/ui";

import { PropExplorerProvider } from "../../features/prop-explorer/prop-explorer-context";
import { PropsEditorPopover } from "./props-editor-popover";

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
  cellIndex,
  cellData,
  onAddComponent,
  onUpdateProps,
  onRemoveComponent,
}: EditableCellProps) {
  const [showPropsEditor, setShowPropsEditor] = useState(false);

  // Create dynamic component based on componentId
  const DynamicComponent = useMemo(() => {
    if (!cellData) { return null; }

    const config = getComponentConfig(cellData.componentId);
    if (!config) { return null; }

    // Simple placeholder component to fix broken dynamic imports
    return () => (
      <div className="p-4 border border-amber-200 rounded bg-amber-50 text-amber-600 text-sm">
        Dynamic component loading temporarily disabled:
        {" "}
        {cellData.componentId}
      </div>
    );
  }, [cellData]);

  // Process props to handle icon conversion
  const processedProps = useMemo(() => {
    if (!cellData) { return {}; }

    const finalProps: Record<string, unknown> = { ...cellData.props };

    // Generic icon handling - convert string icon names to components
    Object.entries(finalProps).forEach(([key, value]) => {
      const isIconProp = key === "icon" || key.endsWith("Icon");

      if (isIconProp && typeof value === "string" && value.trim() !== "") {
        const iconComponent = getDynamicIconByName(value);
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

  // Render component if one is assigned to this cell
  const renderComponent = () => {
    if (!cellData || !DynamicComponent) { return null; }

    try {
      // Create a wrapper component that handles prop spreading safely
      const ComponentWrapper = ({
        props,
      }: {
        props: Record<string, unknown>;
      }) => {
        const { children, ...otherProps } = props;

        if (children !== undefined) {
          return React.createElement(
            DynamicComponent,
            otherProps,
            String(children),
          );
        }

        return React.createElement(DynamicComponent, otherProps);
      };

      return (
        <div className="w-full">
          <PropExplorerProvider defaultProps={cellData.props}>
            <ComponentWrapper props={processedProps} />
          </PropExplorerProvider>
        </div>
      );
    }
    catch (error) {
      console.error("Error rendering component:", error);
      return (
        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded text-sm">
          <div className="text-red-700 dark:text-red-400">
            Error rendering component
          </div>
        </div>
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
