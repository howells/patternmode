import { cn } from "@patternmode/ui/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

/**
 * CommandList scrollable container for Command items/groups.
 * Import from "@patternmode/ui/components/command".
 */
export const CommandList = function CommandList({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive.List> | null>;
}) {
  return (
    <CommandPrimitive.List
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
        className,
      )}
      data-component="command-list"
      data-slot="command-list"
      ref={ref}
      {...props}
    />
  );
};
