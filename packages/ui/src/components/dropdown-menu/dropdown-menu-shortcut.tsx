"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";
import { useDropdownMenuContext } from "./dropdown-menu-context";

const SHORTCUT_SIZE_CLASSES: Record<ComponentSize, string> = {
  "2xs": "text-[10px]",
  xs: "text-[10px]",
  sm: "text-xs",
  base: "text-xs",
  lg: "text-sm",
  xl: "text-sm",
  "2xl": "text-base",
  "3xl": "text-base",
};

/**
 * DropdownMenuShortcut UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { size } = useDropdownMenuContext();

  return (
    <span
      className={cn(
        "ml-auto text-muted-foreground tracking-widest",
        SHORTCUT_SIZE_CLASSES[size],
        className,
      )}
      data-component="dropdown-menu-shortcut"
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
}

export { DropdownMenuShortcut };
