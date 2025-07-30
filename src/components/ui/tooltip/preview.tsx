"use client";

import { Button } from "@patternmode/ui";
import { useState } from "react";
import { Tooltip } from "@patternmode/ui";

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
          <Button>Hover for tooltip</Button>
        </Tooltip>
      </div>

      {/* Position examples */}
      <div className="flex justify-center gap-4">
        <Tooltip content="Top tooltip" side="top">
          <Button size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button size="sm">Right</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" side="bottom">
          <Button size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" side="left">
          <Button size="sm">Left</Button>
        </Tooltip>
      </div>

      {/* Variant examples */}
      <div className="flex justify-center gap-4">
        <Tooltip content="Default variant" variant="default">
          <Button>Default</Button>
        </Tooltip>
        <Tooltip content="Inverse variant" variant="inverse">
          <Button variant="secondary">Inverse</Button>
        </Tooltip>
      </div>

      {/* Size examples */}
      <div className="flex justify-center items-end gap-4">
        <Tooltip content="Small" size="sm">
          <Button size="sm">Small</Button>
        </Tooltip>
        <Tooltip content="Default size" size="default">
          <Button>Default</Button>
        </Tooltip>
        <Tooltip content="Large tooltip with more content" size="lg">
          <Button size="default">Large</Button>
        </Tooltip>
      </div>

      {/* Rich content example */}
      <div className="flex justify-center">
        <Tooltip
          content={
            <div className="space-y-1">
              <div className="font-semibold">Rich Content</div>
              <div className="text-xs opacity-90">
                This tooltip contains multiple elements and formatting
              </div>
            </div>
          }
        >
          <Button>Rich Content</Button>
        </Tooltip>
      </div>

      {/* Controlled example */}
      <div className="flex justify-center gap-4">
        <Tooltip
          content="Controlled tooltip state"
          open={controlledOpen}
          onOpenChange={setControlledOpen}
        >
          <Button>Controlled</Button>
        </Tooltip>
        <Button
          onClick={() => setControlledOpen(!controlledOpen)}
          variant="outline"
          size="sm"
        >
          Toggle: {controlledOpen ? "Open" : "Closed"}
        </Button>
      </div>
    </div>
  );
}
