import { cn } from "@patternmode/ui/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

/**
 * CommandSeparator visually separates groups or items.
 * Import from "@patternmode/ui/components/command".
 */
export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn("-mx-1 h-px bg-border", className)}
      data-component="command-separator"
      data-slot="command-separator"
      {...props}
    />
  );
}
