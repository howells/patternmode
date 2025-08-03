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
