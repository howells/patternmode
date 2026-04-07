"use client";

import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

/**
 * DropdownMenuRadioGroup UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup
      data-component="dropdown-menu-radio-group"
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

export { DropdownMenuRadioGroup };
