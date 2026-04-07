import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

/**
 * CommandEmpty empty-state row for a CommandList.
 * Import from "@patternmode/ui/components/command".
 */
export function CommandEmpty(
  props: React.ComponentProps<typeof CommandPrimitive.Empty>,
) {
  return (
    <CommandPrimitive.Empty
      className="py-6 text-center text-sm"
      data-component="command-empty"
      data-slot="command-empty"
      {...props}
    />
  );
}
