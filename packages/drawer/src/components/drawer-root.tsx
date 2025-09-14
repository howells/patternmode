"use client";

/**
 * Drawer Components (based on UI Drawer implementation).
 */

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = ({
  ref: _ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Root> | null>;
}) => (
  <DrawerPrimitive.Root {...props} data-testid="drawer">
    {props.children}
  </DrawerPrimitive.Root>
);
Drawer.displayName = "Drawer";
export { Drawer };
