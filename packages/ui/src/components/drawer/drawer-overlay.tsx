import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * DrawerOverlay renders the scrim behind the drawer.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      data-component="drawer-overlay"
      data-slot="drawer-overlay"
      {...props}
    />
  );
}
