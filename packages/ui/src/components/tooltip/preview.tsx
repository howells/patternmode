"use client";

import type { TooltipProps } from "./component";
import React from "react";
import { Button } from "../button/component";
import { Tooltip } from "./component";

export function TooltipExample(props: TooltipProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <Tooltip content={props.content || "This is a tooltip"} {...props}>
        <Button variant="outline">
          Hover me
        </Button>
      </Tooltip>
    </div>
  );
}

// Preview props for prop explorer
export const TooltipPreviewProps = [
  {
    name: "content",
    type: "string",
    description: "Content to display in the tooltip popup.",
    defaultValue: "This is a tooltip",
  },
  {
    name: "side",
    type: "select",
    description: "Preferred side for tooltip placement relative to the trigger.",
    options: ["top", "bottom", "left", "right"],
    defaultValue: "top",
  },
  {
    name: "align",
    type: "select",
    description: "Alignment relative to the trigger element.",
    options: ["start", "center", "end"],
    defaultValue: "center",
  },
  {
    name: "sideOffset",
    type: "number",
    description: "Distance from the trigger element in pixels.",
    defaultValue: 10,
  },
  {
    name: "alignOffset",
    type: "number",
    description: "Offset for alignment positioning in pixels.",
    defaultValue: 0,
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant of the tooltip.",
    options: ["default", "inverse"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting padding and text size.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "showArrow",
    type: "boolean",
    description: "Whether to show the pointing arrow.",
    defaultValue: true,
  },
];
