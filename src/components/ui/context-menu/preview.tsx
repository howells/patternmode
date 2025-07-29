"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@patternmode/ui";

interface ContextMenuExampleProps {
  disabled?: boolean;
}

export function ContextMenuExample({
  disabled = false,
}: ContextMenuExampleProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Context Menu</h3>
        <ContextMenu>
          <ContextMenuTrigger 
            className="p-8 border rounded-lg text-center bg-zinc-50 dark:bg-zinc-900"
            
          >
            Right-click me
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Keyboard Shortcuts</h3>
        <ContextMenu>
          <ContextMenuTrigger 
            className="p-8 border rounded-lg text-center bg-zinc-50 dark:bg-zinc-900"
            
          >
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
      </div>
    </div>
  );
}