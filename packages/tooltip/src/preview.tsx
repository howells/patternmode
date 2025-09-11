"use client";

import type React from "react";
import { Tooltip } from "./components/tooltip";
import type { TooltipProps } from "./types";

export function TooltipPreview({
  content,
  children,
  ...rest
}: Omit<TooltipProps, "content" | "children"> & {
  content?: string;
  children?: React.ReactNode;
}) {
  return (
    <Tooltip content={content ?? "Tooltip content"} {...rest}>
      {children ?? "Hover me"}
    </Tooltip>
  );
}

// Preview props for prop explorer
export const tooltipPreviewProps = [
  {
    name: "content",
    type: "string",
    description: "Tooltip content text.",
    defaultValue: "Tooltip content",
  },
  {
    name: "side",
    type: "select",
    description: "Preferred side for tooltip placement.",
    options: ["top", "right", "bottom", "left"],
    defaultValue: "top",
  },
  {
    name: "align",
    type: "select",
    description: "Alignment relative to the trigger.",
    options: ["start", "center", "end"],
    defaultValue: "center",
  },
  {
    name: "showArrow",
    type: "boolean",
    description: "Whether to show the arrow.",
    defaultValue: true,
  },
  {
    name: "variant",
    type: "select",
    description: "Visual variant.",
    options: ["default", "inverse"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "delayDuration",
    type: "number",
    description: "Delay before showing tooltip (ms).",
    defaultValue: 150,
  },
  {
    name: "sideOffset",
    type: "number",
    description: "Distance from the trigger (px).",
    defaultValue: 10,
  },
  {
    name: "alignOffset",
    type: "number",
    description: "Offset for alignment positioning (px).",
    defaultValue: 0,
  },
];
