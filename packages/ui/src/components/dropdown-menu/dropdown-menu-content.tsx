"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Content, Portal } from "@radix-ui/react-dropdown-menu";
import type * as React from "react";
import {
  MENU_CONTAINER_CLASSES,
  MENU_ITEM_RADIUS,
} from "../../lib/menu-content";
import type { Radius } from "../../lib/radius";
import type { ComponentSize } from "../../lib/size";
import { DropdownMenuContext } from "./dropdown-menu-context";

/**
 * DropdownMenuContent UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  size = "sm",
  itemRadius,
  children,
  ...props
}: React.ComponentProps<typeof Content> & {
  size?: ComponentSize;
  /** Border radius for menu items. When "full", items become pill-shaped. */
  itemRadius?: Radius;
}) {
  const itemRadiusMap = {
    full: MENU_ITEM_RADIUS.full,
    square: MENU_ITEM_RADIUS.square,
  } as const;
  const itemRadiusClass =
    itemRadiusMap[itemRadius as keyof typeof itemRadiusMap] ??
    MENU_ITEM_RADIUS.default;

  return (
    <Portal>
      <DropdownMenuContext.Provider
        value={{ size, itemRadius, itemRadiusClass }}
      >
        <Content
          className={cn(
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden border bg-popover text-popover-foreground shadow-xs data-[state=closed]:animate-out data-[state=open]:animate-in",
            // Adjust container rounding and padding based on item radius
            itemRadius === "full"
              ? MENU_CONTAINER_CLASSES.full
              : MENU_CONTAINER_CLASSES.default,
            className,
          )}
          data-component="dropdown-menu-content"
          data-slot="dropdown-menu-content"
          sideOffset={sideOffset}
          {...props}
        >
          {children}
        </Content>
      </DropdownMenuContext.Provider>
    </Portal>
  );
}

export { DropdownMenuContent };
