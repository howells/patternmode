"use client";

import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator } from "./component";

export const DefaultExample = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarButton>Bold</ToolbarButton>
      <ToolbarButton>Italic</ToolbarButton>
      <ToolbarButton>Underline</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink href="#">Link</ToolbarLink>
    </ToolbarGroup>
    <ToolbarInput placeholder="Search..." />
  </Toolbar>
);

export const TextFormattingExample = DefaultExample;
export const WithInputExample = DefaultExample;
export const VariantsExample = DefaultExample;
export const SizesExample = DefaultExample;
export const VerticalExample = DefaultExample;
export const DisabledExample = DefaultExample;
