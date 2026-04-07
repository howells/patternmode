"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
/** sidebar content area */

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      data-component="sidebar-content"
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
}
