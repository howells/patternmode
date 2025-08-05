"use client";

import type { DividerProps } from "./types";
import React from "react";
import { Divider } from "./component";

export function DividerPreview(props: DividerProps) {
  return <Divider {...props} />;
}

// Preview props for prop explorer
export const dividerPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Optional text content to display in the center of the divider.",
    defaultValue: "",
  },
  {
    name: "orientation",
    type: "select",
    description: "Divider orientation - horizontal spans full width, vertical spans full height.",
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
  },
  {
    name: "spacing",
    type: "select",
    description: "Vertical spacing around the divider (ignored for vertical orientation).",
    options: ["none", "sm", "md", "lg"],
    defaultValue: "md",
  },
];
