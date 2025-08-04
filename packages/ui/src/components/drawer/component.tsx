/**
 * Drawer Components.
 *
 * A collection of components for creating slide-out drawers and bottom sheets.
 * Built on Vaul, providing smooth animations and touch-friendly interactions.
 */

"use client";

import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cx } from "../../lib/utils";

/**
 * Root drawer component.
 */
const Drawer = ({ ref, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Root> | null> }) => (
  <DrawerPrimitive.Root {...props} data-testid="drawer" />
);
Drawer.displayName = "Drawer";

/**
 * Drawer trigger component.
 */
const DrawerTrigger = DrawerPrimitive.Trigger;

/**
 * Drawer portal component.
 */
const DrawerPortal = DrawerPrimitive.Portal;

/**
 * Drawer close component.
 */
const DrawerClose = DrawerPrimitive.Close;

type DrawerOverlayProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

/**
 * Drawer overlay component.
 */
const DrawerOverlay = ({ ref, className, ...props }: DrawerOverlayProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Overlay> | null> }) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cx(
      // base
      "fixed inset-0 z-50",
      // background
      "bg-black/50 dark:bg-black/80",
      className,
    )}
    {...props}
  />
);
DrawerOverlay.displayName = "DrawerOverlay";

type DrawerContentProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Drawer content elements.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

/**
 * Main drawer content component.
 */
const DrawerContent = ({ ref, className, children, ...props }: DrawerContentProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Content> | null> }) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cx(
        // base
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-lg border",
        // background
        "bg-white dark:bg-zinc-950",
        // border
        " dark:border-zinc-800",
        // shadow
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

type DrawerHeaderProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Drawer header component.
 */
const DrawerHeader = ({
  className,
  ...props
}: DrawerHeaderProps) => (
  <div
    className={cx(
      // base
      "grid gap-1.5 p-4 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

type DrawerFooterProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Drawer footer component.
 */
const DrawerFooter = ({
  className,
  ...props
}: DrawerFooterProps) => (
  <div
    className={cx(
      // base
      "mt-auto flex flex-col gap-2 p-4",
      className,
    )}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

type DrawerTitleProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

/**
 * Drawer title component.
 */
const DrawerTitle = ({ ref, className, ...props }: DrawerTitleProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Title> | null> }) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cx(
      // base
      "text-lg font-semibold leading-none tracking-tight",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      className,
    )}
    {...props}
  />
);
DrawerTitle.displayName = "DrawerTitle";

type DrawerDescriptionProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>;

/**
 * Drawer description component.
 */
const DrawerDescription = ({ ref, className, ...props }: DrawerDescriptionProps & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Description> | null> }) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cx(
      // base
      "text-sm",
      // text color
      "text-zinc-500 dark:text-zinc-400",
      className,
    )}
    {...props}
  />
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
};
