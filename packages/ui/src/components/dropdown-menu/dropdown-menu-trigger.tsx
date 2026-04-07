"use client";

import { Trigger } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenuTrigger UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-component="dropdown-menu-trigger"
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export { DropdownMenuTrigger };
