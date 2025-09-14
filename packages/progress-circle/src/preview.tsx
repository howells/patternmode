"use client";

import { ProgressCircle } from ".";
import type { ProgressCircleProps } from "./types";

// Show a sensible, visible default in previews
export function ProgressCirclePreview({
  value = 66,
  max = 100,
  size = "md",
  showValue = true,
  label = "Progress",
  ...rest
}: ProgressCircleProps) {
  return (
    <ProgressCircle
      label={label}
      max={max}
      showValue={showValue}
      size={size}
      value={value}
      {...rest}
    />
  );
}

// Preview props for prop explorer
export const progressCirclePreviewProps = [
  {
    name: "value",
    type: "number",
    description:
      "Current progress value (0 to max). Set to null for indeterminate/loading state.",
    defaultValue: 75,
  },
  {
    name: "max",
    type: "number",
    description: "Maximum value for progress calculation.",
    defaultValue: 100,
  },
  {
    name: "variant",
    type: "select",
    description: "Visual color scheme for the progress circle.",
    options: ["default", "neutral", "warning", "error", "success"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Predefined size variant for the progress circle.",
    options: ["xs", "sm", "md", "lg", "xl"],
    defaultValue: "md",
  },
  {
    name: "radius",
    type: "number",
    description:
      "Circle radius in pixels. Overrides size variant when specified.",
    defaultValue: 32,
  },
  {
    name: "strokeWidth",
    type: "number",
    description: "Stroke width of the progress circle in pixels.",
    defaultValue: 6,
  },
  {
    name: "label",
    type: "string",
    description: "Label text to display below or alongside the progress value.",
    defaultValue: "",
  },
  {
    name: "showValue",
    type: "boolean",
    description: "Whether to show the current progress value as text.",
    defaultValue: false,
  },
  {
    name: "showAnimation",
    type: "boolean",
    description: "Whether to enable smooth progress animation.",
    defaultValue: true,
  },
];
