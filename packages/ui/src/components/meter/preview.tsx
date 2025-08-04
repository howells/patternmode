"use client";

import type { MeterProps } from "./component";
import React from "react";

import { Meter } from "./component";

export function MeterPreview(props: MeterProps) {
  return <Meter value={65} label="Progress" showValue={true} {...props} />;
}

// Preview props for prop explorer
export const meterPreviewProps = [
  {
    name: "value",
    type: "number",
    description: "Current numeric value to display within the meter range.",
    defaultValue: 65,
  },
  {
    name: "min",
    type: "number",
    description: "Minimum value for the meter range.",
    defaultValue: 0,
  },
  {
    name: "max",
    type: "number",
    description: "Maximum value for the meter range.",
    defaultValue: 100,
  },
  {
    name: "variant",
    type: "select",
    description: "Color scheme variant for the meter appearance.",
    options: ["default", "neutral", "success", "info", "warning", "error", "critical", "positive", "negative"],
    defaultValue: "default",
  },
  {
    name: "label",
    type: "string",
    description: "Optional descriptive label text displayed above the meter.",
    defaultValue: "Progress",
  },
  {
    name: "showValue",
    type: "boolean",
    description: "Whether to display the formatted value text above the meter.",
    defaultValue: true,
  },
  {
    name: "showAnimation",
    type: "boolean",
    description: "Whether to enable smooth animation transitions when the value changes.",
    defaultValue: true,
  },
];
