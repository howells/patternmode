"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@patternmode/ui";

interface ContextMenuExampleProps {
  disabled?: boolean;
}

export function ContextMenuExample({
  disabled = false,
}: ContextMenuExampleProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        className="p-8 border rounded-lg text-center bg-zinc-50 dark:bg-zinc-900 cursor-pointer"
      >
        Right-click me
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem disabled={disabled}>Copy</ContextMenuItem>
        <ContextMenuItem disabled={disabled}>Paste</ContextMenuItem>
        <ContextMenuItem disabled={disabled}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}