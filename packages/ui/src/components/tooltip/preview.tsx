"use client";

import { Tooltip } from "@patternmode/ui";
import { useState } from "react";

interface TooltipExampleProps {
  content?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  variant?: "default" | "inverse";
  size?: "sm" | "default" | "lg";
  showArrow?: boolean;
  delayDuration?: number;
  sideOffset?: number;
}

export function TooltipExample({
  content = "This is a tooltip",
  side = "top",
  align = "center",
  variant = "default",
  size = "default",
  showArrow = true,
  delayDuration = 150,
  sideOffset = 10,
}: TooltipExampleProps) {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Basic tooltip */}
      <div className="flex justify-center">
        <Tooltip
          content={content}
          side={side}
          align={align}
          variant={variant}
          size={size}
          showArrow={showArrow}
          delayDuration={delayDuration}
          sideOffset={sideOffset}
        >
          <span className="inline-flex">Hover for tooltip</span>
        </Tooltip>
      </div>

      {/* Position examples */}
      <div className="flex justify-center gap-4">
        <Tooltip content="Top tooltip" side="top">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Top</span>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Right</span>
        </Tooltip>
        <Tooltip content="Bottom tooltip" side="bottom">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Bottom</span>
        </Tooltip>
        <Tooltip content="Left tooltip" side="left">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Left</span>
        </Tooltip>
      </div>

      {/* Variant examples */}
      <div className="flex justify-center gap-4">
        <Tooltip content="Default variant" variant="default">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Default</span>
        </Tooltip>
        <Tooltip content="Inverse variant" variant="inverse">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-200 dark:bg-zinc-700 rounded cursor-pointer">Inverse</span>
        </Tooltip>
      </div>

      {/* Size examples */}
      <div className="flex justify-center items-end gap-4">
        <Tooltip content="Small" size="sm">
          <span className="inline-flex px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Small</span>
        </Tooltip>
        <Tooltip content="Default size" size="default">
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Default</span>
        </Tooltip>
        <Tooltip content="Large tooltip with more content" size="lg">
          <span className="inline-flex px-4 py-2 text-base bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Large</span>
        </Tooltip>
      </div>

      {/* Rich content example */}
      <div className="flex justify-center">
        <Tooltip
          content={(
            <div className="space-y-1">
              <div className="font-semibold">Rich Content</div>
              <div className="text-xs opacity-90">
                This tooltip contains multiple elements and formatting
              </div>
            </div>
          )}
        >
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Rich Content</span>
        </Tooltip>
      </div>

      {/* Controlled example */}
      <div className="flex justify-center gap-4">
        <Tooltip
          content="Controlled tooltip state"
          open={controlledOpen}
          onOpenChange={setControlledOpen}
        >
          <span className="inline-flex px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded cursor-pointer">Controlled</span>
        </Tooltip>
        <button
          onClick={() => setControlledOpen(!controlledOpen)}
          className="px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          Toggle:
          {" "}
          {controlledOpen ? "Open" : "Closed"}
        </button>
      </div>
    </div>
  );
}
