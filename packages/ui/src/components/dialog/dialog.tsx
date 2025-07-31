// Tremor Dialog [v1.0.0] - Base UI

import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import React from "react";

import { cx, focusRing } from "../../lib/utils";
import { Subheading } from "../subheading/subheading";
import { Text } from "../text/text";

/**
 * A modal dialog component built on Base UI's Dialog primitive.
 *
 * Based on Base UI's Dialog (https://base-ui.com/react/components/dialog),
 * providing accessible modal dialogs with focus management, backdrop interaction,
 * and keyboard navigation. Features Tremor-inspired styling and smooth animations.
 *
 * @component
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open Dialog</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description here.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <DialogClose>Close</DialogClose>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 * @see https://base-ui.com/react/components/dialog - Base UI documentation
 */
const Dialog = BaseDialog.Root;
Dialog.displayName = "Dialog";

/**
 * Trigger element that opens the dialog when activated.
 * Inherits all accessibility features from Base UI including ARIA attributes.
 */
const DialogTrigger = BaseDialog.Trigger;
DialogTrigger.displayName = "DialogTrigger";

/**
 * Close button that dismisses the dialog when activated.
 * Can be placed anywhere within the dialog content.
 */
const DialogClose = BaseDialog.Close;
DialogClose.displayName = "DialogClose";

const DialogPortal = BaseDialog.Portal;

/**
 * Semi-transparent backdrop that appears behind the dialog.
 *
 * Provides visual separation and can be configured to close the dialog when clicked.
 * Features smooth fade-in/fade-out transitions matching Base UI patterns.
 *
 *
 * @component
 * @id dialog
 * @name Dialog
 * @example
 * ```tsx
 * <DialogOverlay />
 * ```
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, forwardedRef) => {
  return (
    <BaseDialog.Backdrop
      ref={forwardedRef}
      className={cx(
        // base
        "fixed inset-0 z-50",
        // background color
        "bg-black/70",
        // transition - match Base UI pattern
        "transition-all duration-150",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";

/**
 * Main dialog content container with built-in portal and overlay.
 *
 * Centers the dialog on screen with responsive sizing and smooth scale/opacity transitions.
 * Automatically includes the backdrop and handles proper layering.
 * Features scrollable content for long dialogs.
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Settings</DialogTitle>
 *   </DialogHeader>
 *   <div>Dialog content here...</div>
 * </DialogContent>
 * ```
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <BaseDialog.Popup
        ref={forwardedRef}
        className={cx(
          // base
          "fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-md border p-6 shadow-lg",
          // border color
          "border-zinc-200 dark:border-zinc-900",
          // background color
          "bg-white dark:bg-[#090E1A]",
          // transition - match Base UI pattern with scale and opacity
          "transition-all duration-150",
          "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
          focusRing,
          className
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

/**
 * Header container for dialog title and description.
 *
 * Provides consistent spacing and layout for the dialog's header content.
 * Use with DialogTitle and optionally DialogDescription.
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Confirm Action</DialogTitle>
 *   <DialogDescription>This action cannot be undone.</DialogDescription>
 * </DialogHeader>
 * ```
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cx("flex flex-col gap-y-1", className)} {...props} />;
};
DialogHeader.displayName = "DialogHeader";

/**
 * Dialog title heading with semantic markup.
 *
 * Provides proper heading structure for screen readers and establishes visual hierarchy.
 * Uses the Subheading component for consistent typography.
 *
 * @example
 * ```tsx
 * <DialogTitle>Delete Account</DialogTitle>
 * ```
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Title>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, forwardedRef) => (
  <BaseDialog.Title
    ref={forwardedRef}
    render={
      <Subheading
        className={cx(
          // text color
          "text-zinc-900 dark:text-zinc-50",
          className
        )}
      />
    }
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

/**
 * Dialog description text that provides additional context.
 *
 * Offers detailed information about the dialog's purpose or required actions.
 * Uses the Text component for consistent typography and supports all text styling.
 *
 * @example
 * ```tsx
 * <DialogDescription>
 *   This action will permanently delete your account and cannot be undone.
 * </DialogDescription>
 * ```
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Description>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, forwardedRef) => {
  return (
    <BaseDialog.Description
      ref={forwardedRef}
      render={<Text className={cx(className)} />}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

/**
 * Footer container for dialog action buttons.
 *
 * Provides responsive layout for dialog actions like cancel, confirm, etc.
 * Stacks buttons vertically on mobile and horizontally on larger screens,
 * with primary actions on the right.
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <DialogClose>Cancel</DialogClose>
 *   <Button variant="destructive">Delete</Button>
 * </DialogFooter>
 * ```
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cx(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
};
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
