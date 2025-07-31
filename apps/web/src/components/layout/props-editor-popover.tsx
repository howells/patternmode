"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@patternmode/ui";
import React from "react";
import { getComponentConfig } from "../../../../../packages/ui/src/component-registry";
import { PropExplorerProvider, usePropExplorer } from "../prop-explorer-context";
import { PropExplorerContent } from "../prop-explorer-controls";

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

interface PropsEditorPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cellData: CellData;
  onUpdateProps: (props: Record<string, unknown>) => void;
  trigger: React.ReactElement;
}

export function PropsEditorPopover({
  isOpen,
  onOpenChange,
  cellData,
  onUpdateProps,
  trigger,
}: PropsEditorPopoverProps) {
  const config = getComponentConfig(cellData.componentId);

  if (!config) {
    return null;
  }

  const handlePropsUpdate = (newProps: Record<string, unknown>) => {
    onUpdateProps(newProps);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        side="left"
        align="start"
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="border-b border-zinc-200 dark:border-zinc-700 pb-3">
            <h3 className="font-semibold text-sm">{config.name} Props</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Configure the component properties
            </p>
          </div>

          <PropExplorerProvider
            defaultProps={cellData.props}
            key={cellData.componentId}
          >
            <PropExplorerContent config={config} />
            <PropsUpdater onUpdate={handlePropsUpdate} />
          </PropExplorerProvider>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Helper component to watch for prop changes and update parent
function PropsUpdater({
  onUpdate
}: {
  onUpdate: (props: Record<string, unknown>) => void
}) {
  const { props } = usePropExplorer();

  // Use useEffect to detect prop changes and update parent
  React.useEffect(() => {
    onUpdate(props);
  }, [props, onUpdate]);

  return null;
}

// Re-export the hook for convenience
export { usePropExplorer } from "../prop-explorer-context";
