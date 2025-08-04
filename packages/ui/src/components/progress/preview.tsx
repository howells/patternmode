"use client";

import type { ProgressBarProps } from "./component";
import React from "react";
import { ProgressBar } from "./component";

export function ProgressExample(props: ProgressBarProps) {
  return <ProgressBar value={75} showValue={true} {...props} />;
}

// Preview props for prop explorer
export const ProgressPreviewProps = [
  {
    name: "value",
    type: "number",
    description: "The current progress value (0-100).",
    defaultValue: 75,
  },
  {
    name: "showValue",
    type: "boolean",
    description: "Whether to display the progress percentage.",
    defaultValue: true,
  },
  {
    name: "label",
    type: "string",
    description: "Accessible label for the progress bar.",
    defaultValue: "",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant for different states.",
    options: ["default", "success", "warning", "error"],
    defaultValue: "default",
  },
];
