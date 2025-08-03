"use client";

import { AlertTriangle, HelpCircle, Info } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../button/component";
import { Tooltip } from "./component";

export function DefaultExample() {
  return (
    <Tooltip content="This is a helpful tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  );
}

export function PositionsExample() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
    </div>
  );
}

export function VariantsExample() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Default tooltip with dark background" variant="default">
        <Button variant="outline">Default</Button>
      </Tooltip>
      <Tooltip content="Inverse tooltip with light background" variant="inverse">
        <Button variant="outline">Inverse</Button>
      </Tooltip>
    </div>
  );
}

export function SizesExample() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Small tooltip" size="sm">
        <Button variant="outline" size="sm">Small</Button>
      </Tooltip>
      <Tooltip content="Default size tooltip" size="default">
        <Button variant="outline">Default</Button>
      </Tooltip>
      <Tooltip content="Large tooltip with more content space" size="lg">
        <Button variant="outline" size="lg">Large</Button>
      </Tooltip>
    </div>
  );
}

export function NoArrowExample() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Tooltip with arrow" showArrow={true}>
        <Button variant="outline">With Arrow</Button>
      </Tooltip>
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <Button variant="outline">No Arrow</Button>
      </Tooltip>
    </div>
  );
}

export function RichContentExample() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip
        content={(
          <div className="space-y-1">
            <div className="font-semibold">Rich Content Tooltip</div>
            <div className="text-xs opacity-90">
              This tooltip contains multiple elements with formatting
            </div>
            <div className="text-xs opacity-75">
              • Feature A
            </div>
            <div className="text-xs opacity-75">
              • Feature B
            </div>
          </div>
        )}
        size="lg"
      >
        <Button variant="outline">
          <Info className="h-4 w-4 mr-2" />
          Rich Content
        </Button>
      </Tooltip>

      <Tooltip
        content={(
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Warning message</span>
          </div>
        )}
        variant="inverse"
      >
        <Button variant="outline">
          <AlertTriangle className="h-4 w-4 mr-2" />
          With Icon
        </Button>
      </Tooltip>
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <Tooltip
        content="This tooltip is controlled externally"
        open={open}
        onOpenChange={setOpen}
      >
        <Button variant="outline">Controlled Tooltip</Button>
      </Tooltip>
      <Button onClick={() => setOpen(!open)} variant="secondary">
        Toggle: {open ? "Open" : "Closed"}
      </Button>
    </div>
  );
}

export function DelayExample() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Fast tooltip (0ms delay)" delayDuration={0}>
        <Button variant="outline" size="sm">No Delay</Button>
      </Tooltip>
      <Tooltip content="Default tooltip (150ms delay)" delayDuration={150}>
        <Button variant="outline" size="sm">Default Delay</Button>
      </Tooltip>
      <Tooltip content="Slow tooltip (500ms delay)" delayDuration={500}>
        <Button variant="outline" size="sm">Slow Delay</Button>
      </Tooltip>
    </div>
  );
}

export function IconTooltipExample() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Get help and documentation" side="bottom">
        <button className="p-2 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <HelpCircle className="h-4 w-4 text-zinc-500" />
        </button>
      </Tooltip>

      <Tooltip content="Important information about this feature" side="bottom">
        <button className="p-2 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <Info className="h-4 w-4 text-blue-500" />
        </button>
      </Tooltip>

      <Tooltip content="This action requires caution" side="bottom" variant="inverse">
        <button className="p-2 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </button>
      </Tooltip>
    </div>
  );
}

export function AlignmentExample() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Bottom Side with Different Alignments
        </h4>
        <div className="flex gap-4 justify-center">
          <Tooltip content="Start aligned tooltip" side="bottom" align="start">
            <Button variant="outline" size="sm">Start</Button>
          </Tooltip>
          <Tooltip content="Center aligned tooltip" side="bottom" align="center">
            <Button variant="outline" size="sm">Center</Button>
          </Tooltip>
          <Tooltip content="End aligned tooltip" side="bottom" align="end">
            <Button variant="outline" size="sm">End</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Right Side with Different Alignments
        </h4>
        <div className="flex flex-col gap-4 items-start">
          <Tooltip content="Start aligned tooltip" side="right" align="start">
            <Button variant="outline" size="sm">Start</Button>
          </Tooltip>
          <Tooltip content="Center aligned tooltip" side="right" align="center">
            <Button variant="outline" size="sm">Center</Button>
          </Tooltip>
          <Tooltip content="End aligned tooltip" side="right" align="end">
            <Button variant="outline" size="sm">End</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
