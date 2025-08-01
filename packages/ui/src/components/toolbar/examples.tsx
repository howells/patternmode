"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@patternmode/ui";

import React from "react";

export function ToolbarExample() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>Cut</ToolbarButton>
        <ToolbarButton>Copy</ToolbarButton>
        <ToolbarButton>Paste</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "ToolbarExample",
    title: "Toolbar",
    description: "Toolbar example",
    component: ToolbarExample,
  },
];
