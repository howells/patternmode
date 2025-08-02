"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Button, Tooltip } from "@patternmode/ui";

import React, { useState } from "react";

export function TooltipExample() {
  return (
    <Tooltip content="This is a tooltip">
      <span>Hover me</span>
    </Tooltip>
  );
}

export function PositionsExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Top tooltip" side="top">
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Top</span>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Right</span>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Bottom</span>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Left</span>
      </Tooltip>
    </div>
  );
}

export function VariantsExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Default tooltip" variant="default">
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Default</span>
      </Tooltip>
      <Tooltip content="Default tooltip" variant="default">
        <span className="px-3 py-2 bg-gray-200 rounded cursor-pointer">Default</span>
      </Tooltip>
      <Tooltip content="Inverse tooltip" variant="inverse">
        <span className="px-3 py-2 bg-gray-50 border rounded cursor-pointer">Inverse</span>
      </Tooltip>
    </div>
  );
}

export function SizesExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Small tooltip" size="sm">
        <span className="px-2 py-1 text-sm bg-gray-100 rounded cursor-pointer">Small</span>
      </Tooltip>
      <Tooltip content="Default size tooltip" size="default">
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Default</span>
      </Tooltip>
    </div>
  );
}

export function NoArrowExample() {
  return (
    <Tooltip content="Tooltip without arrow" showArrow={false}>
      <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">No Arrow</span>
    </Tooltip>
  );
}

export function RichContentExample() {
  return (
    <Tooltip
      content={(
        <div className="space-y-1">
          <div className="font-semibold">Rich Content</div>
          <div className="text-xs opacity-90">
            This tooltip contains multiple elements
          </div>
        </div>
      )}
    >
      <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Rich Content</span>
    </Tooltip>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-x-4">
      <Tooltip
        content="Controlled tooltip"
        open={open}
        onOpenChange={setOpen}
      >
        <span className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Controlled Tooltip</span>
      </Tooltip>
      <Button onClick={() => setOpen(!open)}>
        Toggle:
        {" "}
        {open ? "Open" : "Closed"}
      </Button>
    </div>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "TooltipExample",
    title: "Tooltip",
    description: "Tooltip example",
    component: TooltipExample,
  },
  {
    id: "PositionsExample",
    title: "Positions",
    description: "Positions example",
    component: PositionsExample,
  },
  {
    id: "VariantsExample",
    title: "Variants",
    description: "Variants example",
    component: VariantsExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "NoArrowExample",
    title: "No Arrow",
    description: "No Arrow example",
    component: NoArrowExample,
  },
  {
    id: "RichContentExample",
    title: "Rich Content",
    description: "Rich Content example",
    component: RichContentExample,
  },
  {
    id: "ControlledExample",
    title: "Controlled",
    description: "Controlled example",
    component: ControlledExample,
  },
];
