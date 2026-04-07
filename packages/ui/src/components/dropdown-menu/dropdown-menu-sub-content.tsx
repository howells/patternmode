"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { SubContent } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";
import { MENU_CONTAINER_CLASSES } from "../../lib/menu-content";
import type { ComponentSize } from "../../lib/size";
import {
  DropdownMenuContext,
  useDropdownMenuContext,
} from "./dropdown-menu-context";

/**
 * DropdownMenuSubContent UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuSubContent({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SubContent> & {
  size?: ComponentSize;
}) {
  const parentContext = useDropdownMenuContext();
  const effectiveSize = size ?? parentContext.size;

  return (
    <DropdownMenuContext.Provider
      value={{
        size: effectiveSize,
        itemRadiusClass: parentContext.itemRadiusClass,
      }}
    >
      <SubContent
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden border bg-popover text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
          // Tailwind v4 animate-out uses animation-fill-mode: none by default.
          // Without forwards, the element snaps back to visible after the exit
          // animation completes, causing SubContent to remain visible inside
          // force-mounted parents (e.g. BloomDropdownContent).
          "data-[state=closed]:[animation-fill-mode:forwards]",
          MENU_CONTAINER_CLASSES.default,
          className,
        )}
        data-component="dropdown-menu-sub-content"
        data-slot="dropdown-menu-sub-content"
        {...props}
      >
        {children}
      </SubContent>
    </DropdownMenuContext.Provider>
  );
}

export { DropdownMenuSubContent };
