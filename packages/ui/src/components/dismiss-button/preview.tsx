"use client";

import type { DismissButtonProps } from "./types";
import React from "react";
import { DismissButton } from "./component";

export function DismissButtonPreview(props: DismissButtonProps) {
  return <DismissButton onClick={() => {}} {...props} />;
}

// Preview props for prop explorer
export const dismissButtonPreviewProps = [
  {
    name: "size",
    type: "select",
    description: "Size of the dismiss button.",
    options: ["sm", "base", "lg"],
    defaultValue: "base",
  },
  {
    name: "aria-label",
    type: "string",
    description: "Accessible label for the button.",
    defaultValue: "Remove",
  },
  {
    name: "iconStrokeWidth",
    type: "number",
    description: "Icon stroke width.",
    defaultValue: 2,
  },
];
