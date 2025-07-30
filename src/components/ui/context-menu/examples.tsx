import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@patternmode/ui";

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
        Copy <span className="ml-auto text-xs text-zinc-500">⌘C</span>
      </ContextMenuItem>
      <ContextMenuItem>
        Paste <span className="ml-auto text-xs text-zinc-500">⌘V</span>
      </ContextMenuItem>
      <ContextMenuItem>
        Delete <span className="ml-auto text-xs text-zinc-500">⌫</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);export const ContextMenuExample = DefaultExample;
