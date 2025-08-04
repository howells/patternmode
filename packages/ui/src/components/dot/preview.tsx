"use client";

import type { DotProps } from "./component";
import React from "react";
import { Dot } from "./component";

export function DotPreview(props: DotProps) {
  return <Dot {...props} />;
}

// Preview props for prop explorer
export const dotPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "The semantic variant to display. Supports both semantic variants and all Tailwind color names.",
    options: ["default", "success", "warning", "error", "info", "blue", "green", "red", "yellow", "purple", "pink", "indigo"],
    defaultValue: "default",
  },
  {
    name: "label",
    type: "string",
    description: "Optional label to display next to the dot.",
    defaultValue: "",
  },
  {
    name: "animated",
    type: "boolean",
    description: "Whether to show animation for active statuses.",
    defaultValue: false,
  },
  {
    name: "size",
    type: "select",
    description: "Size of the dot. Controls both the dot size and text size when label is provided.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
];
