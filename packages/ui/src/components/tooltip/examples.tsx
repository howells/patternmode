"use client";

import { HelpCircle, Info, Settings } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../button";
import { Tooltip } from "./component";

export function DefaultExample() {
  return (
    <Tooltip content="This is a helpful tooltip" children={<Button variant="outline">Hover me</Button>} />
  );
}

export function PositionsExample() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <Tooltip content="Top tooltip" side="top" children={<Button variant="outline">Top</Button>} />
      <Tooltip content="Right tooltip" side="right" children={<Button variant="outline">Right</Button>} />
      <Tooltip content="Bottom tooltip" side="bottom" children={<Button variant="outline">Bottom</Button>} />
      <Tooltip content="Left tooltip" side="left" children={<Button variant="outline">Left</Button>} />
    </div>
  );
}

export function VariantsExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Default tooltip with dark background" variant="default" children={<Button variant="outline">Default</Button>} />
      <Tooltip content="Inverse tooltip with light background" variant="inverse" children={<Button variant="outline">Inverse</Button>} />
    </div>
  );
}

export function SizesExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Small tooltip" size="sm" children={<Button variant="outline">Small</Button>} />
      <Tooltip content="Default size tooltip" size="default" children={<Button variant="outline">Default</Button>} />
      <Tooltip content="Large tooltip with more content space" size="lg" children={<Button variant="outline">Large</Button>} />
    </div>
  );
}

export function ArrowExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Tooltip with arrow" showArrow={true} children={<Button variant="outline">With Arrow</Button>} />
      <Tooltip content="Tooltip without arrow" showArrow={false} children={<Button variant="outline">No Arrow</Button>} />
    </div>
  );
}

export function RichContentExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content={(
          <div className="space-y-2">
            <div className="font-semibold">Rich Content Tooltip</div>
            <div className="text-sm">This tooltip contains multiple elements and formatted text.</div>
          </div>
        )}
        size="lg"
        children={<Button variant="outline">Rich Content</Button>}
      />
      <Tooltip
        content={(
          <div className="flex items-center gap-2">
            <Info size={16} />
            <div>
              <div className="font-semibold">Info Tooltip</div>
              <div className="text-xs opacity-80">Additional context here</div>
            </div>
          </div>
        )}
        variant="inverse"
        children={<Button variant="outline">With Icon</Button>}
      />
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <Tooltip
        content="This tooltip is controlled externally"
        open={open}
        onOpenChange={setOpen}
        children={<Button variant="outline">Controlled Tooltip</Button>}
      />
      <Button
        onClick={() => setOpen(!open)}
        variant="secondary"
      >
        {open ? "Close" : "Open"} Tooltip
      </Button>
    </div>
  );
}

export function DelayExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Fast tooltip (0ms delay)" delayDuration={0} children={<Button variant="outline">No Delay</Button>} />
      <Tooltip content="Default tooltip (150ms delay)" delayDuration={150} children={<Button variant="outline">Default Delay</Button>} />
      <Tooltip content="Slow tooltip (500ms delay)" delayDuration={500} children={<Button variant="outline">Slow Delay</Button>} />
    </div>
  );
}

export function IconButtonsExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Get help and documentation" side="bottom" children={<Button variant="ghost" size="icon"><HelpCircle size={16} /></Button>} />
      <Tooltip content="Important information about this feature" side="bottom" children={<Button variant="ghost" size="icon"><Info size={16} /></Button>} />
      <Tooltip content="This action requires caution" side="bottom" variant="inverse" children={<Button variant="ghost" size="icon"><Settings size={16} /></Button>} />
    </div>
  );
}

export function AlignmentExample() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Bottom Side Alignment</h4>
        <div className="flex gap-4 justify-center">
          <Tooltip content="Start aligned tooltip" side="bottom" align="start" children={<Button variant="outline">Start</Button>} />
          <Tooltip content="Center aligned tooltip" side="bottom" align="center" children={<Button variant="outline">Center</Button>} />
          <Tooltip content="End aligned tooltip" side="bottom" align="end" children={<Button variant="outline">End</Button>} />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Right Side Alignment</h4>
        <div className="flex flex-col gap-4 items-start">
          <Tooltip content="Start aligned tooltip" side="right" align="start" children={<Button variant="outline">Start</Button>} />
          <Tooltip content="Center aligned tooltip" side="right" align="center" children={<Button variant="outline">Center</Button>} />
          <Tooltip content="End aligned tooltip" side="right" align="end" children={<Button variant="outline">End</Button>} />
        </div>
      </div>
    </div>
  );
}
