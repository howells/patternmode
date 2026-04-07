import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * DrawerDescription renders supporting text for the drawer.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-component="drawer-description"
      data-slot="drawer-description"
      {...props}
    />
  );
}
