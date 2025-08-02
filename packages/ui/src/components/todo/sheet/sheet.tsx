"use client";

/**
 * Sheet Components (Desktop Side Panel).
 *
 * A desktop-optimized sheet implementation built on Base UI Dialog.
 * Provides side panel overlays that slide in from the right side of the screen,
 * perfect for detailed forms, settings panels, and navigation menus on desktop.
 *
 * Features:
 * - Base UI Dialog integration for full accessibility
 * - Slides in from the right side of the screen
 * - Semi-transparent backdrop overlay
 * - Smooth slide and fade animations
 * - Focus management and keyboard navigation
 * - Automatic close button in header
 * - Flexible layout with header, body, and footer sections
 * - Dark mode support
 * - Responsive sizing and positioning.
 *
 * Built on Base UI Dialog documentation:
 * https://base-ui.com/react/components/dialog.
 *
 * @example
 * ```tsx
 * // Basic sheet
 * <Sheet>
 *   <SheetTrigger>
 *     <button>Open Settings</button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Settings</SheetTitle>
 *       <SheetDescription>Manage your account settings</SheetDescription>
 *     </SheetHeader>
 *     <SheetBody>
 *       <div className="space-y-4">
 *         <div>Setting 1</div>
 *         <div>Setting 2</div>
 *       </div>
 *     </SheetBody>
 *     <SheetFooter>
 *       <SheetClose>
 *         <button>Cancel</button>
 *       </SheetClose>
 *       <button>Save Changes</button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 *
 * // Controlled sheet
 * const [open, setOpen] = useState(false);
 *
 * <Sheet open={open} onOpenChange={setOpen}>
 *   <SheetTrigger>
 *     <button>Open Form</button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>User Profile</SheetTitle>
 *       <SheetDescription>Update your profile information</SheetDescription>
 *     </SheetHeader>
 *     <SheetBody>
 *       <form className="space-y-4">
 *         <input type="text" placeholder="Name" />
 *         <input type="email" placeholder="Email" />
 *         <textarea placeholder="Bio"></textarea>
 *       </form>
 *     </SheetBody>
 *     <SheetFooter>
 *       <SheetClose>
 *         <button>Cancel</button>
 *       </SheetClose>
 *       <button onClick={() => handleSave()}>Save</button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 *
 * // Navigation sheet
 * <Sheet>
 *   <SheetTrigger>
 *     <button>Menu</button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Navigation</SheetTitle>
 *     </SheetHeader>
 *     <SheetBody>
 *       <nav className="space-y-2">
 *         <a href="/dashboard" className="block p-2 hover:bg-zinc-100">
 *           Dashboard
 *         </a>
 *         <a href="/projects" className="block p-2 hover:bg-zinc-100">
 *           Projects
 *         </a>
 *         <a href="/settings" className="block p-2 hover:bg-zinc-100">
 *           Settings
 *         </a>
 *       </nav>
 *     </SheetBody>
 *   </SheetContent>
 * </Sheet>
 * ```
 */

import { Dialog } from "@base-ui-components/react/dialog";
import { X } from "lucide-react";
import * as React from "react";

import { config } from "../../../lib/config";
import { cx, focusRing, iconUtils } from "../../../lib/utils";

// Inline DismissButton functionality for Sheet
/**
 * Overlay panel component sliding from screen edges for mobile-friendly interfaces.
 *
 * @id sheet
 * @name Sheet
 * @icon PanelLeft
 * @category ui
 * @component
 * @param props - Component properties.
 */
const InlineSheetDismissButton = (
  { ref, onClick, icon: IconComponent = X, iconStrokeWidth = config.getIconStrokeWidth(), size = "base", className, "aria-label": ariaLabel = "Remove" }: {
    "onClick"?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    "icon"?: React.ComponentType<{
      className?: string;
      strokeWidth?: number;
    }>;
    "iconStrokeWidth"?: number;
    "size"?: "sm" | "base" | "lg";
    "className"?: string;
    "aria-label"?: string;
  } & { ref?: React.RefObject<HTMLButtonElement | null> },
) => {
  // Size-based icon sizing
  const iconSizeMap = {
    sm: "xs" as const,
    base: "xs" as const,
    lg: "sm" as const,
  };

  const iconSize = iconSizeMap[size];
  const iconSizeClass = iconUtils.getIconSize(iconSize);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cx(
        // Base button styling
        "flex items-center justify-center rounded-full transition-colors",
        // Size-based dimensions
        size === "sm" && "size-4",
        size === "base" && "size-5",
        size === "lg" && "size-6",
        // Color styling (subtle, context-aware)
        "text-zinc-500 dark:text-zinc-400",
        // Hover states
        "hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
        // Focus states
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
        className,
      )}
      aria-label={ariaLabel}
    >
      <IconComponent
        className={cx(iconSizeClass, "shrink-0")}
        strokeWidth={iconStrokeWidth}
        aria-hidden="true"
      />
    </button>
  );
};

/**
 * Overlay panel component sliding from screen edges for mobile-friendly interfaces.
 *
 * @id sheet
 * @name Sheet
 * @icon PanelLeft
 * @category ui
 * @component
 * @param props - Component properties.
 */
const Sheet = (props: React.ComponentPropsWithoutRef<typeof Dialog.Root>) => {
  return <Dialog.Root {...props} />;
};
Sheet.displayName = "Sheet";

/**
 * Sheet trigger component that opens the sheet when activated.
 *
 * Interactive element that opens the sheet panel. Can be any clickable
 * element like a button, link, or custom component with proper event handling.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Trigger props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetTrigger>
 *   <button className="px-4 py-2 bg-blue-500 text-white rounded">
 *     Open Panel
 *   </button>
 * </SheetTrigger>
 *
 * <SheetTrigger render={<Button />}>
 *   Custom trigger
 * </SheetTrigger>
 * ```
 */
const SheetTrigger = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Trigger> & { ref?: React.RefObject<React.ElementRef<typeof Dialog.Trigger> | null> }) => {
  return <Dialog.Trigger ref={ref} className={cx(className)} {...props} />;
};
SheetTrigger.displayName = "Sheet.Trigger";

/**
 * Sheet close component for dismissing the sheet.
 *
 * Interactive element that closes the sheet when activated. Automatically
 * handles focus return to the trigger element upon closure.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Close props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetClose>
 *   <button className="px-3 py-1 border rounded">Cancel</button>
 * </SheetClose>
 *
 * <SheetClose render={<Button />}>
 *   Done
 * </SheetClose>
 * ```
 */
const SheetClose = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Close> & { ref?: React.RefObject<React.ElementRef<typeof Dialog.Close> | null> }) => {
  return <Dialog.Close ref={ref} className={cx(className)} {...props} />;
};
SheetClose.displayName = "Sheet.Close";

/**
 * Portal component for rendering sheet content outside normal DOM flow.
 *
 * Ensures sheet content is rendered at the document root to avoid z-index
 * conflicts and enable proper layering. Used internally by SheetContent.
 *
 * @component
 * @example
 * ```tsx
 * // Used internally by SheetContent
 * <SheetPortal>
 *   <SheetOverlay />
 *   <Dialog.Popup>Sheet content</Dialog.Popup>
 * </SheetPortal>
 * ```
 */
const SheetPortal = Dialog.Portal;

/**
 * Overlay/backdrop component that appears behind the sheet.
 *
 * Semi-transparent backdrop that covers the entire viewport when the sheet
 * is open. Provides visual focus and can close the sheet when clicked.
 * Features smooth fade animations.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Backdrop props.
 *
 * @component
 * @example
 * ```tsx
 * // Used internally by SheetContent
 * <SheetOverlay />
 *
 * // Custom overlay styling
 * <SheetOverlay className="bg-blue-500/20" />
 * ```
 */
const SheetOverlay = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Backdrop> & { ref?: React.RefObject<React.ElementRef<typeof Dialog.Backdrop> | null> }) => {
  return (
    <Dialog.Backdrop
      ref={forwardedRef}
      className={cx(
        // base
        "fixed inset-0 z-50 overflow-y-auto",
        // background color
        "bg-black/30",
        // transition
        "data-[closed]:animate-hide data-[open]:animate-dialog-overlay-show",
        className,
      )}
      {...props}
      style={{
        animationDuration: "400ms",
        animationFillMode: "backwards",
      }}
    />
  );
};

SheetOverlay.displayName = "SheetOverlay";

/**
 * Main sheet content container with positioning and animations.
 *
 * Primary container for sheet content that slides in from the right side
 * of the screen. Includes backdrop overlay, smooth animations, responsive
 * sizing, and proper focus management.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Popup props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetContent>
 *   <SheetHeader>
 *     <SheetTitle>Sheet Title</SheetTitle>
 *   </SheetHeader>
 *   <SheetBody>
 *     Sheet content here
 *   </SheetBody>
 * </SheetContent>
 *
 * // Custom width
 * <SheetContent className="sm:max-w-xl">
 *   Wider sheet content
 * </SheetContent>
 * ```
 */
const SheetContent = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Popup> & { ref?: React.RefObject<React.ElementRef<typeof Dialog.Popup> | null> }) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Popup
        ref={forwardedRef}
        className={cx(
          // base
          "fixed inset-y-2 z-50 mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-lg focus:outline-hidden max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg sm:p-6",
          // border color
          "border-zinc-200 dark:border-zinc-900",
          // background color
          "bg-white dark:bg-[#090E1A]",
          // transition
          "data-[closed]:animate-sheet-slide-right-and-fade data-[open]:animate-sheet-slide-left-and-fade",
          focusRing,
          className,
        )}
        {...props}
      />
    </SheetPortal>
  );
};

SheetContent.displayName = "SheetContent";

/**
 * Sheet header component with title, description, and close button.
 *
 * Header section that typically contains the sheet title and description,
 * along with an automatic close button. Features bottom border separation
 * and responsive layout.
 *
 * @param children - Header content (title, description, other elements).
 * @param className - Additional CSS classes for content area.
 * @param props - Additional HTML div props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>User Settings</SheetTitle>
 *   <SheetDescription>Manage your account preferences</SheetDescription>
 * </SheetHeader>
 *
 * <SheetHeader className="text-center">
 *   <SheetTitle>Confirmation</SheetTitle>
 *   <SheetDescription>This action cannot be undone</SheetDescription>
 * </SheetHeader>
 * ```
 */
const SheetHeader = ({ ref, children, className, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={ref}
      className="flex items-start justify-between gap-x-4 border-b border-zinc-200 pb-4 dark:border-zinc-900"
      {...props}
    >
      <div className={cx("mt-1 flex flex-col gap-y-1", className)}>
        {children}
      </div>
      <Dialog.Close
        render={(
          <InlineSheetDismissButton
            size="lg"
            aria-label="Close sheet"
            className="mt-1 shrink-0"
          />
        )}
      />
    </div>
  );
};

SheetHeader.displayName = "Sheet.Header";

/**
 * Sheet title component for the main heading.
 *
 * Semantic heading element that provides the primary title for the sheet
 * content. Essential for accessibility and screen reader support.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Title props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetTitle>Account Settings</SheetTitle>
 *
 * <SheetTitle className="text-lg text-blue-600">
 *   Custom Styled Title
 * </SheetTitle>
 * ```
 */
const SheetTitle = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title> & { ref?: React.RefObject<React.ElementRef<typeof Dialog.Title> | null> }) => (
  <Dialog.Title
    ref={forwardedRef}
    className={cx(
      // base
      "text-base font-semibold",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      className,
    )}
    {...props}
  />
);

SheetTitle.displayName = "SheetTitle";

/**
 * Sheet body component for the main scrollable content area.
 *
 * Flexible container that holds the primary sheet content with automatic
 * vertical scrolling when content exceeds the available space.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetBody>
 *   <form className="space-y-4">
 *     <input type="text" placeholder="Name" />
 *     <input type="email" placeholder="Email" />
 *   </form>
 * </SheetBody>
 *
 * <SheetBody className="p-0">
 *   <nav className="space-y-1">
 *     <a href="/dashboard">Dashboard</a>
 *     <a href="/settings">Settings</a>
 *   </nav>
 * </SheetBody>
 * ```
 */
const SheetBody = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return <div ref={ref} className={cx("flex-1 py-4", className)} {...props} />;
};
SheetBody.displayName = "Sheet.Body";

/**
 * Sheet description component for explanatory text.
 *
 * Provides additional context and information about the sheet's purpose
 * or content. Features muted styling to create visual hierarchy with the title.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Description props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetDescription>
 *   Update your profile information and account settings
 * </SheetDescription>
 *
 * <SheetDescription className="text-red-500">
 *   Warning: This action cannot be undone
 * </SheetDescription>
 * ```
 */
const SheetDescription = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Description> & { ref?: React.RefObject<React.ElementRef<typeof Dialog.Description> | null> }) => {
  return (
    <Dialog.Description
      ref={forwardedRef}
      className={cx("text-zinc-500 dark:text-zinc-500", className)}
      {...props}
    />
  );
};

SheetDescription.displayName = "SheetDescription";

/**
 * Sheet footer component for action buttons and controls.
 *
 * Footer section typically containing action buttons like Save, Cancel, etc.
 * Features top border separation and responsive layout that stacks on mobile
 * and displays horizontally on desktop.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div props.
 *
 * @component
 * @example
 * ```tsx
 * <SheetFooter>
 *   <SheetClose>
 *     <button className="px-4 py-2 border rounded">Cancel</button>
 *   </SheetClose>
 *   <button className="px-4 py-2 bg-blue-500 text-white rounded">
 *     Save Changes
 *   </button>
 * </SheetFooter>
 *
 * <SheetFooter className="justify-center">
 *   <button>Single Action</button>
 * </SheetFooter>
 * ```
 */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cx(
        "flex flex-col-reverse border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end sm:space-x-2 dark:border-zinc-900",
        className,
      )}
      {...props}
    />
  );
};

SheetFooter.displayName = "SheetFooter";

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
