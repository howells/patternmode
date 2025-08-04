"use client";

import type { SeparatorProps } from "./component";
import React from "react";
import { Separator } from "./component";

export function SeparatorPreview(props: SeparatorProps) {
  return <Separator {...props} />;
}

// Preview props for prop explorer
export const separatorPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Optional text content to display in the center of the separator.",
    defaultValue: "",
  },
  {
    name: "orientation",
    type: "select",
    description: "Direction of the separator line.",
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant affecting color intensity.",
    options: ["default", "subtle", "strong"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Thickness/size of the separator line.",
    options: ["sm", "md", "lg"],
    defaultValue: "md",
  },
  {
    name: "spacing",
    type: "select",
    description: "Spacing around the separator when used with text labels.",
    options: ["none", "sm", "md", "lg"],
    defaultValue: "md",
  },
];
