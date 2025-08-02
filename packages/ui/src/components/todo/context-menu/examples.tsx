"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@patternmode/ui";

import React from "react";

// Default context menu
export const DefaultExample = () => (
  <ContextMenu>
    <ContextMenuTrigger className="p-8 border rounded-lg text-center">
      Right-click me
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Paste</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

// With shortcuts
export const WithShortcutsExample = () => (
  <ContextMenu>
    <ContextMenuTrigger className="p-8 border rounded-lg text-center">
      Right-click for shortcuts
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        Copy
        {" "}
        <span className="ml-auto text-xs text-zinc-500">⌘C</span>
      </ContextMenuItem>
      <ContextMenuItem>
        Paste
        {" "}
        <span className="ml-auto text-xs text-zinc-500">⌘V</span>
      </ContextMenuItem>
      <ContextMenuItem>
        Delete
        {" "}
        <span className="ml-auto text-xs text-zinc-500">⌫</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
); export const ContextMenuExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithShortcutsExample",
    title: "With Shortcuts",
    description: "With Shortcuts example",
    component: WithShortcutsExample,
  },
  {
    id: "ContextMenuExample",
    title: "Context Menu",
    description: "Context Menu example",
    component: ContextMenuExample,
  },
];
