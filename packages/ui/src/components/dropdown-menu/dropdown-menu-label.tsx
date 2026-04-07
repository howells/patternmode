"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Label } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";
import { useDropdownMenuContext } from "./dropdown-menu-context";

const LABEL_SIZE_CLASSES: Record<ComponentSize, string> = {
  "2xs": "px-2 pt-1 pb-1 text-xs",
  xs: "px-2.5 pt-1.5 pb-1.5 text-xs",
  sm: "px-2.5 pt-1.5 pb-2 text-xs",
  base: "px-3 pt-2 pb-1.5 text-xs",
  lg: "px-3.5 pt-2.5 pb-2 text-xs",
  xl: "px-4 pt-3 pb-2.5 text-sm",
  "2xl": "px-5 pt-3.5 pb-2.5 text-sm",
  "3xl": "px-5 pt-4 pb-3 text-base",
};

const SIZE_TO_INSET: Record<ComponentSize, string> = {
  "2xs": "pl-5",
  xs: "pl-6",
  sm: "pl-8",
  base: "pl-9",
  lg: "pl-10",
  xl: "pl-11",
  "2xl": "pl-12",
  "3xl": "pl-14",
};

/**
 * DropdownMenuLabel UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Label> & {
  inset?: boolean;
}) {
  const { size } = useDropdownMenuContext();

  return (
    <Label
      className={cn(
        "font-normal text-muted-foreground",
        LABEL_SIZE_CLASSES[size],
        inset && SIZE_TO_INSET[size],
        className,
      )}
      data-component="dropdown-menu-label"
      data-inset={inset}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}

export { DropdownMenuLabel };
