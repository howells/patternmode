// Tremor Drawer [v1.0.0] - Vaul

/**
 * Drawer Components.
 *
 * A collection of components for creating slide-out drawers and bottom sheets.
 * Built on Vaul (https://vaul.emilkowal.ski/), providing smooth animations
 * and touch-friendly interactions for mobile and desktop.
 *
 * Features:
 * - Bottom-up sliding drawer
 * - Touch-friendly drag interactions
 * - Accessible with proper ARIA attributes
 * - Backdrop overlay with dismiss functionality
 * - Keyboard navigation support
 * - Smooth animations and gestures.
 *
 * @example
 * ```tsx
 * // Basic drawer
 * <Drawer>
 *   <DrawerTrigger asChild>
 *     <Button>Open Drawer</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Drawer Title</DrawerTitle>
 *       <DrawerDescription>Drawer description text</DrawerDescription>
 *     </DrawerHeader>
 *     <div className="p-4">
 *       <p>Drawer content goes here.</p>
 *     </div>
 *     <DrawerFooter>
 *       <Button>Confirm</Button>
 *       <DrawerClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 *
 * // Settings drawer
 * <Drawer>
 *   <DrawerTrigger asChild>
 *     <Button variant="ghost">Settings</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Settings</DrawerTitle>
 *       <DrawerDescription>
 *         Manage your account settings and preferences.
 *       </DrawerDescription>
 *     </DrawerHeader>
 *     <div className="p-4 space-y-4">
 *       <div className="space-y-2">
 *         <Label>Theme</Label>
 *         <Select>
 *           <SelectOption value="light">Light</SelectOption>
 *           <SelectOption value="dark">Dark</SelectOption>
 *         </Select>
 *       </div>
 *       <div className="space-y-2">
 *         <Label>Language</Label>
 *         <Select>
 *           <SelectOption value="en">English</SelectOption>
 *           <SelectOption value="es">Spanish</SelectOption>
 *         </Select>
 *       </div>
 *     </div>
 *     <DrawerFooter>
 *       <Button>Save Changes</Button>
 *       <DrawerClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 *
 * // Form drawer
 * <Drawer>
 *   <DrawerTrigger asChild>
 *     <Button>Add Item</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Add New Item</DrawerTitle>
 *       <DrawerDescription>
 *         Fill out the form below to add a new item.
 *       </DrawerDescription>
 *     </DrawerHeader>
 *     <form className="p-4 space-y-4">
 *       <div className="space-y-2">
 *         <Label htmlFor="name">Name</Label>
 *         <Input id="name" placeholder="Item name" />
 *       </div>
 *       <div className="space-y-2">
 *         <Label htmlFor="description">Description</Label>
 *         <Textarea id="description" placeholder="Item description" />
 *       </div>
 *     </form>
 *     <DrawerFooter>
 *       <Button type="submit">Add Item</Button>
 *       <DrawerClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */

"use client";

import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cx } from "../../lib/utils";

/**
 * Root drawer component.
 *
 * Based on Vaul Drawer (https://vaul.emilkowal.ski/), creates the drawer context
 * and manages the overall drawer state. Provides foundation for all drawer functionality.
 */
const Drawer = DrawerPrimitive.Root;

/**
 * Drawer trigger component.
 *
 * Button or element that opens the drawer when clicked or activated.
 * Should be used with asChild prop to wrap existing buttons.
 */
const DrawerTrigger = DrawerPrimitive.Trigger;

/**
 * Drawer portal component.
 *
 * Moves drawer content to a different DOM location for proper layering
 * and z-index management. Usually handled automatically by DrawerContent.
 */
const DrawerPortal = DrawerPrimitive.Portal;

/**
 * Drawer close component.
 *
 * Button or element that closes the drawer when clicked or activated.
 * Can be used anywhere within drawer content to provide close functionality.
 */
const DrawerClose = DrawerPrimitive.Close;

/**
 * Drawer overlay component.
 *
 * Semi-transparent backdrop that appears behind the drawer content.
 * Clicking the overlay closes the drawer. Provides visual separation
 * between drawer and underlying content.
 *
 * @component
 * @param className - Additional CSS classes.
 *
 * @id drawer
 * @name Drawer
 */
const DrawerOverlay = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Overlay> | null> }) => (
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

/**
 * Main drawer content component.
 *
 * Container for drawer content with slide-up animation and drag handle.
 * Automatically includes overlay and provides structure for drawer layout.
 * Features rounded top corners and a drag handle for touch interactions.
 *
 * @param className - Additional CSS classes.
 * @param children - Drawer content elements.
 */
const DrawerContent = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Content> | null> }) => (
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
          "border-zinc-200 dark:border-zinc-800",
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

/**
 * Drawer header component.
 *
 * Header section for drawer content containing title and description.
 * Provides consistent spacing and layout for drawer headers with
 * responsive text alignment.
 *
 * @param className - Additional CSS classes.
 *
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Settings</DrawerTitle>
 *   <DrawerDescription>Manage your preferences</DrawerDescription>
 * </DrawerHeader>
 * ```
 */
const DrawerHeader = ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
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

/**
 * Drawer footer component.
 *
 * Footer section for drawer content typically containing action buttons.
 * Automatically positions at bottom with consistent spacing and layout
 * for button groups.
 *
 * @param className - Additional CSS classes.
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button>Save</Button>
 *   <DrawerClose asChild>
 *     <Button variant="outline">Cancel</Button>
 *   </DrawerClose>
 * </DrawerFooter>
 * ```
 */
const DrawerFooter = ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
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

/**
 * Drawer title component.
 *
 * Primary heading for drawer content with proper semantic markup
 * and accessibility attributes. Provides consistent typography
 * and theming for drawer titles.
 *
 * @param className - Additional CSS classes.
 *
 * @example
 * ```tsx
 * <DrawerTitle>Account Settings</DrawerTitle>
 * <DrawerTitle>Confirm Action</DrawerTitle>
 * ```
 */
const DrawerTitle = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Title> | null> }) => (
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

/**
 * Drawer description component.
 *
 * Supporting text for drawer content with proper semantic markup
 * and accessibility attributes. Provides additional context or
 * instructions for the drawer content.
 *
 * @param className - Additional CSS classes.
 *
 * @example
 * ```tsx
 * <DrawerDescription>
 *   Choose your preferred settings below.
 * </DrawerDescription>
 * <DrawerDescription>
 *   This action cannot be undone.
 * </DrawerDescription>
 * ```
 */
const DrawerDescription = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & { ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Description> | null> }) => (
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
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
    DrawerTrigger
};
