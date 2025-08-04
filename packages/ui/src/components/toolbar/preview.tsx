"use client";

import type { ToolbarProps } from "./component";
import React from "react";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "./component";

export function ToolbarExample(props: ToolbarProps) {
  return (
    <Toolbar {...props}>
      <ToolbarButton>Bold</ToolbarButton>
      <ToolbarButton>Italic</ToolbarButton>
      <ToolbarButton>Underline</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton>Link</ToolbarButton>
      <ToolbarButton>Image</ToolbarButton>
    </Toolbar>
  );
}

// Preview props for prop explorer
export const ToolbarPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Visual variant of the toolbar.",
    options: ["default", "bordered", "floating"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting padding and button dimensions.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
];
