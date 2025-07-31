"use client";

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@patternmode/ui";

export function ToolbarExample() {
  return (
    <Toolbar>
      <ToolbarButton>New File</ToolbarButton>
      <ToolbarButton>Open</ToolbarButton>
      <ToolbarButton>Save</ToolbarButton>

      <ToolbarSeparator />

      <ToolbarButton>Cut</ToolbarButton>
      <ToolbarButton>Copy</ToolbarButton>
      <ToolbarButton>Paste</ToolbarButton>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarButton value="left">Left</ToolbarButton>
        <ToolbarButton value="center">Center</ToolbarButton>
        <ToolbarButton value="right">Right</ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarButton value="bold">B</ToolbarButton>
        <ToolbarButton value="italic">I</ToolbarButton>
        <ToolbarButton value="underline">U</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
