import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/** Sidebar header section — a simple container with consistent height */
export function SidebarHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative flex h-header items-center px-4", className)}
      data-component="sidebar-header"
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    >
      {children}
    </div>
  );
}
