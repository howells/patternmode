"use client";

import { PropExplorerProvider } from "@/components/prop-explorer-context";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card/card";
import { getDynamicIconByName } from "@/components/ui/icon-select";
import { Icon } from "@/components/ui/icon/icon";
import { getComponentConfig } from "@/lib/component-registry";
import { Plus, Settings, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { PropsEditorPopover } from "./props-editor-popover";

interface CellData {
  componentId: string;
  props: Record<string, unknown>;
  position?: {
    colSpan?: number;
    rowSpan?: number;
    colStart?: number;
    rowStart?: number;
  };
}

interface EditableCellProps {
  cellIndex: number;
  cellData?: CellData;
  onAddComponent: () => void;
  onUpdateProps: (props: Record<string, unknown>) => void;
  onRemoveComponent: () => void;
}

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
    if (!cellData) return null;

    const config = getComponentConfig(cellData.componentId);
    if (!config) return null;

    return dynamic(
      () => {
        // Convert PascalCase to kebab-case: AlertDialog -> alert-dialog
        const kebabCase = cellData.componentId
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .toLowerCase();

        // Try to import the actual component (not the preview)
        const importPath = `@/components/ui/${kebabCase}/${kebabCase}`;

        return import(importPath)
          .then((mod) => {
            // Convert kebab-case to PascalCase for the exported component name
            const exportedName = cellData.componentId
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join('');
            const component = mod[exportedName] || mod.default;

            if (!component) {
              throw new Error(`Component ${exportedName} not found in module`);
            }
            return { default: component };
          })
          .catch((error) => {
            console.error(
              `Failed to load component ${cellData.componentId}:`,
              error
            );
            return {
              default: () => (
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded text-sm">
                  <div className="text-red-700 dark:text-red-400">
                    Error loading {cellData.componentId}
                  </div>
                </div>
              ),
            };
          });
      },
      {
        loading: () => (
          <div className="p-2 text-sm text-zinc-500">
            Loading {cellData.componentId}...
          </div>
        ),
        ssr: false,
      }
    );
  }, [cellData]);

  // Process props to handle icon conversion
  const processedProps = useMemo(() => {
    if (!cellData) return {};

    const finalProps: Record<string, unknown> = { ...cellData.props };

    // Generic icon handling - convert string icon names to components
    Object.entries(finalProps).forEach(([key, value]) => {
      const isIconProp = key === "icon" || key.endsWith("Icon");

      if (isIconProp && typeof value === "string" && value.trim() !== "") {
        const iconComponent = getDynamicIconByName(value);
        if (iconComponent) {
          finalProps[key] = iconComponent;
        }
      } else if (isIconProp && value === "") {
        // Remove empty icon props
        delete finalProps[key];
      }
    });

    // Convert string booleans to actual booleans
    Object.entries(finalProps).forEach(([key, value]) => {
      if (value === "true") {
        finalProps[key] = true;
      } else if (value === "false") {
        finalProps[key] = false;
      }
    });

    return finalProps;
  }, [cellData]);

  // Render component if one is assigned to this cell
  const renderComponent = () => {
    if (!cellData || !DynamicComponent) return null;

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
            String(children)
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
    } catch (error) {
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
            onOpenChange={setShowPropsEditor}
            cellData={cellData}
            onUpdateProps={onUpdateProps}
            trigger={
              <Button
                size="icon-sm"
                variant="secondary"
                rounded
                onClick={() => setShowPropsEditor(true)}
                leftIcon={Settings}
              ></Button>
            }
          />
          <Button
            size="icon-sm"
            variant="destructive"
            rounded
            onClick={onRemoveComponent}
            leftIcon={X}
          ></Button>
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
