"use client";

import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./component";

type ContextMenuProps = React.ComponentProps<typeof ContextMenu> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ContextMenuPreview(props: ContextMenuProps) {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger className="p-4 border rounded-lg text-center cursor-pointer">
        Right-click me
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// Preview props for prop explorer
export const contextMenuPreviewProps = [
  {
    name: "open",
    type: "boolean",
    description: "Controls whether the context menu is open (controlled mode).",
    defaultValue: false,
  },
];
