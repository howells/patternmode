import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * DrawerClose closes the drawer when triggered.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerClose(
  props: React.ComponentProps<typeof DrawerPrimitive.Close>,
) {
  return (
    <DrawerPrimitive.Close
      data-component="drawer-close"
      data-slot="drawer-close"
      {...props}
    />
  );
}
