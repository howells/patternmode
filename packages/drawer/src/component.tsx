"use client";

/**
 * Drawer Components (based on UI Drawer implementation).
 */

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = ({ ref: _ref, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Root> | null> }) => (
  <DrawerPrimitive.Root {...props} data-testid="drawer">{props.children}</DrawerPrimitive.Root>
);
Drawer.displayName = "Drawer";

type DrawerTriggerProps = React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean };
const DrawerTrigger = ({ ref: _ref, ...props }: DrawerTriggerProps & { ref?: React.RefObject<any> }) => (
  <DrawerPrimitive.Trigger {...props} />
);
const DrawerPortal = DrawerPrimitive.Portal;
type DrawerCloseProps = React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean };
const DrawerClose = ({ ref: _ref, ...props }: DrawerCloseProps & { ref?: React.RefObject<any> }) => (
  <DrawerPrimitive.Close {...props} />
);

type DrawerOverlayProps = { className?: string } & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;
const DrawerOverlay = ({ ref: _ref, className, ...props }: DrawerOverlayProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Overlay> | null> }) => (
  <DrawerPrimitive.Overlay ref={_ref} className={cx("fixed inset-0 z-50", "bg-black/50 dark:bg-black/80", className)} {...props} />
);
DrawerOverlay.displayName = "DrawerOverlay";

type DrawerContentProps = { className?: string; children?: React.ReactNode } & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;
const DrawerContent = ({ ref: _ref, className, children, ...props }: DrawerContentProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Content> | null> }) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={_ref}
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-lg border",
        "bg-white dark:bg-zinc-950",
        " dark:border-zinc-800",
        "shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-zinc-300 dark:bg-zinc-600" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

type DrawerHeaderProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;
const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div className={cx("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

type DrawerFooterProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;
const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div className={cx("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

type DrawerTitleProps = { className?: string } & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;
const DrawerTitle = ({ ref: _ref, className, ...props }: DrawerTitleProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Title> | null> }) => (
  <DrawerPrimitive.Title ref={_ref} className={cx("text-lg font-semibold leading-none tracking-tight", "text-zinc-900 dark:text-zinc-50", className)} {...props} />
);
DrawerTitle.displayName = "DrawerTitle";

type DrawerDescriptionProps = { className?: string } & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>;
const DrawerDescription = ({ ref: _ref, className, ...props }: DrawerDescriptionProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Description> | null> }) => (
  <DrawerPrimitive.Description ref={_ref} className={cx("text-sm", "text-zinc-500 dark:text-zinc-400", className)} {...props} />
);
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  type DrawerContentProps,
  DrawerDescription,
  type DrawerDescriptionProps,
  DrawerFooter,
  type DrawerFooterProps,
  DrawerHeader,
  type DrawerHeaderProps,
  DrawerOverlay,
  type DrawerOverlayProps,
  DrawerPortal,
  DrawerTitle,
  type DrawerTitleProps,
  DrawerTrigger,
  type DrawerTriggerProps,
  type DrawerCloseProps,
};
