import { cn } from "@patternmode/ui/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

/**
 * Command provides the root container for `cmdk` and applies the base styles.
 * Import from "@patternmode/ui/components/command".
 */
export function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground",
        className,
      )}
      data-component="command"
      data-slot="command"
      {...props}
    />
  );
}
