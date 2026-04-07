import { cn } from "@patternmode/ui/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

/**
 * CommandGroup groups related command items under a heading.
 * Import from "@patternmode/ui/components/command".
 */
export function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
        className,
      )}
      data-component="command-group"
      data-slot="command-group"
      {...props}
    />
  );
}
