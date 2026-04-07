import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * SidebarInset UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "relative flex w-full flex-1 flex-col overflow-visible",
        className,
      )}
      data-component="sidebar-inset"
      data-slot="sidebar-inset"
      {...props}
    />
  );
}
