import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * Root component for a drawer (mobile-friendly slide-up panel). Manages open/closed state.
 * Import from "@patternmode/ui/components/drawer".
 */
export function Drawer(
  props: React.ComponentProps<typeof DrawerPrimitive.Root>,
) {
  return (
    <DrawerPrimitive.Root
      data-component="drawer"
      data-slot="drawer"
      {...props}
    />
  );
}
