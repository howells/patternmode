"use client";

import { Group } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenuGroup UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof Group>) {
  return (
    <Group
      data-component="dropdown-menu-group"
      data-slot="dropdown-menu-group"
      {...props}
    />
  );
}

export { DropdownMenuGroup };
