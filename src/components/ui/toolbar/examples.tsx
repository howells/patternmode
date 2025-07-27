import React from "react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "./toolbar";

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