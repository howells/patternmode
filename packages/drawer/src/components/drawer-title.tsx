import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export type DrawerTitleProps = { className?: string } & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

export const DrawerTitle = ({ ref: _ref, className, ...props }: DrawerTitleProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Title> | null> }) => (
  <DrawerPrimitive.Title className={cx("text-lg leading-none tracking-tight", "text-zinc-900 dark:text-zinc-50", className)} ref={_ref} {...props} />
);

DrawerTitle.displayName = "DrawerTitle";

