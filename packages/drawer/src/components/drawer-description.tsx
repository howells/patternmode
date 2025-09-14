import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export type DrawerDescriptionProps = { className?: string } & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>;

export const DrawerDescription = ({ ref: _ref, className, ...props }: DrawerDescriptionProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Description> | null> }) => (
  <DrawerPrimitive.Description className={cx("text-sm", "text-zinc-500 dark:text-zinc-400", className)} ref={_ref} {...props} />
);

DrawerDescription.displayName = "DrawerDescription";

