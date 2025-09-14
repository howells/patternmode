import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export type DrawerCloseProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

export const DrawerClose = ({ ref: _ref, ...props }: DrawerCloseProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => (
  <DrawerPrimitive.Close {...props} />
);

