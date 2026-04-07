import { Input } from "@patternmode/ui/components/input";
import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * SidebarInput UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn("w-full bg-background shadow-none", className)}
      data-component="sidebar-input"
      data-sidebar="input"
      data-slot="sidebar-input"
      {...props}
    />
  );
}
