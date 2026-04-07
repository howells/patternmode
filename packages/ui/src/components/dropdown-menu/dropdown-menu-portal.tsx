"use client";

import { Portal } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenuPortal UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof Portal>) {
  return (
    <Portal
      data-component="dropdown-menu-portal"
      data-slot="dropdown-menu-portal"
      {...props}
    />
  );
}

export { DropdownMenuPortal };
