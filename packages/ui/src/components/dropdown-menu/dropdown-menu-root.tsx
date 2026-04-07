"use client";

import { Root } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenu UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenu({ ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root data-component="dropdown-menu" data-slot="dropdown-menu" {...props} />
  );
}

export { DropdownMenu };
