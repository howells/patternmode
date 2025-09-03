"use client";

import { Button } from "@patternmode/button";
import { HelpCircle, Info, Settings } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "./component";

export function DefaultExample() {
  return (
    <Tooltip
      content="This is a helpful tooltip"
      render={<Button variant="outline" />}
    >
      Hover me
    </Tooltip>
  );
}

export function PositionsExample() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Tooltip
        content="Top tooltip"
        render={<Button variant="outline" />}
        side="top"
      >
        Top
      </Tooltip>
      <Tooltip
        content="Right tooltip"
        render={<Button variant="outline" />}
        side="right"
      >
        Right
      </Tooltip>
      <Tooltip
        content="Bottom tooltip"
        render={<Button variant="outline" />}
        side="bottom"
      >
        Bottom
      </Tooltip>
      <Tooltip
        content="Left tooltip"
        render={<Button variant="outline" />}
        side="left"
      >
        Left
      </Tooltip>
    </div>
  );
}

export function VariantsExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content="Default tooltip with dark background"
        render={<Button variant="outline" />}
        variant="default"
      >
        Default
      </Tooltip>
      <Tooltip
        content="Inverse tooltip with light background"
        render={<Button variant="outline" />}
        variant="inverse"
      >
        Inverse
      </Tooltip>
    </div>
  );
}

export function SizesExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content="Small tooltip"
        render={<Button variant="outline" />}
        size="sm"
      >
        Small
      </Tooltip>
      <Tooltip
        content="Default size tooltip"
        render={<Button variant="outline" />}
        size="default"
      >
        Default
      </Tooltip>
      <Tooltip
        content="Large tooltip with more content space"
        render={<Button variant="outline" />}
        size="lg"
      >
        Large
      </Tooltip>
    </div>
  );
}

export function ArrowExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content="Tooltip with arrow"
        render={<Button variant="outline" />}
        showArrow
      >
        With Arrow
      </Tooltip>
      <Tooltip
        content="Tooltip without arrow"
        render={<Button variant="outline" />}
        showArrow={false}
      >
        No Arrow
      </Tooltip>
    </div>
  );
}

export function RichContentExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content={
          <div className="space-y-2">
            <div className="">Rich Content Tooltip</div>
            <div className="text-sm">
              This tooltip contains multiple elements and formatted text.
            </div>
          </div>
        }
        render={<Button variant="outline" />}
        size="lg"
      >
        Rich Content
      </Tooltip>
      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <Info size={16} />
            <div>
              <div className="">Info Tooltip</div>
              <div className="text-xs opacity-80">Additional context here</div>
            </div>
          </div>
        }
        render={<Button variant="outline" />}
        variant="inverse"
      >
        With Icon
      </Tooltip>
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <Tooltip
        content="This tooltip is controlled externally"
        onOpenChange={setOpen}
        open={open}
        render={<Button variant="outline" />}
      >
        Controlled Tooltip
      </Tooltip>
      <Button onClick={() => setOpen(!open)} variant="secondary">
        {open ? "Close" : "Open"} Tooltip
      </Button>
    </div>
  );
}

export function DelayExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content="Fast tooltip (0ms delay)"
        delayDuration={0}
        render={<Button variant="outline" />}
      >
        No Delay
      </Tooltip>
      <Tooltip
        content="Default tooltip (150ms delay)"
        delayDuration={150}
        render={<Button variant="outline" />}
      >
        Default Delay
      </Tooltip>
      <Tooltip
        content="Slow tooltip (500ms delay)"
        delayDuration={500}
        render={<Button variant="outline" />}
      >
        Slow Delay
      </Tooltip>
    </div>
  );
}

export function IconButtonsExample() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content="Get help and documentation"
        render={<Button size="icon" variant="ghost" />}
        side="bottom"
      >
        <HelpCircle size={16} />
      </Tooltip>
      <Tooltip
        content="Important information about this feature"
        render={<Button size="icon" variant="ghost" />}
        side="bottom"
      >
        <Info size={16} />
      </Tooltip>
      <Tooltip
        content="This action requires caution"
        render={<Button size="icon" variant="ghost" />}
        side="bottom"
        variant="inverse"
      >
        <Settings size={16} />
      </Tooltip>
    </div>
  );
}

export function AlignmentExample() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 font-medium text-sm">Bottom Side Alignment</h4>
        <div className="flex justify-center gap-4">
          <Tooltip
            align="start"
            content="Start aligned tooltip"
            render={<Button variant="outline" />}
            side="bottom"
          >
            Start
          </Tooltip>
          <Tooltip
            align="center"
            content="Center aligned tooltip"
            render={<Button variant="outline" />}
            side="bottom"
          >
            Center
          </Tooltip>
          <Tooltip
            align="end"
            content="End aligned tooltip"
            render={<Button variant="outline" />}
            side="bottom"
          >
            End
          </Tooltip>
        </div>
      </div>
      <div>
        <h4 className="mb-4 font-medium text-sm">Right Side Alignment</h4>
        <div className="flex flex-col items-start gap-4">
          <Tooltip
            align="start"
            content="Start aligned tooltip"
            render={<Button variant="outline" />}
            side="right"
          >
            Start
          </Tooltip>
          <Tooltip
            align="center"
            content="Center aligned tooltip"
            render={<Button variant="outline" />}
            side="right"
          >
            Center
          </Tooltip>
          <Tooltip
            align="end"
            content="End aligned tooltip"
            render={<Button variant="outline" />}
            side="right"
          >
            End
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
