import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export type DrawerOverlayProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

export const DrawerOverlay = ({ ref: _ref, className, ...props }: DrawerOverlayProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Overlay> | null> }) => (
  <DrawerPrimitive.Overlay className={cx("fixed inset-0 z-50", "bg-black/50 dark:bg-black/80", className)} ref={_ref} {...props} />
);

DrawerOverlay.displayName = "DrawerOverlay";

