"use client";

import { Sub } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenuSub UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuSub({ ...props }: React.ComponentProps<typeof Sub>) {
  return (
    <Sub
      data-component="dropdown-menu-sub"
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}

export { DropdownMenuSub };
