import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * DrawerTitle renders the heading for the drawer.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-medium text-foreground", className)}
      data-component="drawer-title"
      data-slot="drawer-title"
      {...props}
    />
  );
}
