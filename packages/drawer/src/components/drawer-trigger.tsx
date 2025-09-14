import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

export const DrawerTrigger = ({ ref: _ref, ...props }: DrawerTriggerProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => (
  <DrawerPrimitive.Trigger {...props} />
);

