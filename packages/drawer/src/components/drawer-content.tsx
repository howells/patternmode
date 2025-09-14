import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { DrawerOverlay } from "./drawer-overlay";
import { DrawerPortal } from "./drawer-portal";

export type DrawerContentProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

export const DrawerContent = ({ ref: _ref, className, children, ...props }: DrawerContentProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Content> | null> }) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-lg border",
        "bg-white dark:bg-zinc-950",
        "dark:border-zinc-800",
        "shadow-xl",
        className
      )}
      ref={_ref}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-zinc-300 dark:bg-zinc-600" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);

DrawerContent.displayName = "DrawerContent";

