"use client";

import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./component";

export function ContextMenuExample() {
  return (
    <ContextMenu>
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
