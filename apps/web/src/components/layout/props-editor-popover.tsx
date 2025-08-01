"use client";

import { getComponentConfig } from "@patternmode/ui/component-registry";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@patternmode/ui";

import { PropExplorerProvider, usePropExplorer } from "../../features/prop-explorer/prop-explorer-context";
import { PropExplorerContent } from "../../features/prop-explorer/prop-explorer-controls";

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

type PropsEditorPopoverProps = {
  isOpen: boolean;
  onOpenChangeAction: (open: boolean) => void;
  cellData: CellData;
  onUpdatePropsAction: (props: Record<string, unknown>) => void;
  trigger: React.ReactElement;
};

export function PropsEditorPopover({
  isOpen,
  onOpenChangeAction,
  cellData,
  onUpdatePropsAction,
  trigger,
}: PropsEditorPopoverProps) {
  const config = getComponentConfig(cellData.componentId);

  if (!config) {
    return null;
  }

  const handlePropsUpdate = (newProps: Record<string, unknown>) => {
    onUpdatePropsAction(newProps);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChangeAction}>
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
            <h3 className="font-semibold text-sm">
              {config.name}
              {" "}
              Props
            </h3>
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
  onUpdate,
}: {
  onUpdate: (props: Record<string, unknown>) => void;
}) {
  const { props } = usePropExplorer();

  // Use useEffect to detect prop changes and update parent
  React.useEffect(() => {
    onUpdate(props);
  }, [props, onUpdate]);

  return null;
}

// Re-export the hook for convenience
export { usePropExplorer } from "../../features/prop-explorer/prop-explorer-context";
