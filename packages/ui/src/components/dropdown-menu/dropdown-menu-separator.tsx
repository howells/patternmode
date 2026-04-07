"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Separator } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenuSeparator UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      data-component="dropdown-menu-separator"
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

export { DropdownMenuSeparator };
