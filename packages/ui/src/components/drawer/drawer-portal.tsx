import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * DrawerPortal renders drawer content into a portal.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerPortal(
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>,
) {
  return (
    <DrawerPrimitive.Portal
      data-component="drawer-portal"
      data-slot="drawer-portal"
      {...props}
    />
  );
}
