import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * Button that opens the drawer when clicked.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerTrigger(
  props: React.ComponentProps<typeof DrawerPrimitive.Trigger>,
) {
  return (
    <DrawerPrimitive.Trigger
      data-component="drawer-trigger"
      data-slot="drawer-trigger"
      {...props}
    />
  );
}
