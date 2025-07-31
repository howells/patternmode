// Alert Dialog Component [v1.0.0]

import { Button } from "../button/button";
import { Subheading } from "../subheading/subheading";
import { Text } from "../text/text";
import { cx } from "../../lib/utils";
import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import * as React from "react";

/**
 * A dialog that requires user response to proceed, built on Base UI's AlertDialog primitive.
 *
 * Based on Base UI's AlertDialog (https://base-ui.com/react/components/alert-dialog),
 * providing accessible modal dialogs for critical user confirmations and actions.
 * Features Tremor-inspired styling with proper focus management and keyboard navigation.
 *
 * @component
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone. This will permanently delete your account.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 *
 * @see https://base-ui.com/react/components/alert-dialog - Base UI documentation
 */
const AlertDialog = BaseAlertDialog.Root;

/**
 * Trigger button that opens the alert dialog.
 *
 * Supports Base UI's render prop pattern to avoid nested button issues.
 * Can be used with existing Button components or render as default styled button.
 *
 *
 * @id alert-dialog
 * @name Alert Dialog
 * @example
 * ```tsx
 * // Default styled trigger
 * <AlertDialogTrigger>Delete Item</AlertDialogTrigger>
 *
 * // With render prop to use existing Button
 * <AlertDialogTrigger render={<Button variant="destructive" />}>
 *   Delete Account
 * </AlertDialogTrigger>
 * ```
 */
const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseAlertDialog.Trigger
    ref={ref}
    className={cx(
      !props.render && [
        "inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-colors",
        "hover:bg-zinc-50 hover:text-zinc-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
      ],
      className
    )}
    {...props}
  >
    {children}
  </BaseAlertDialog.Trigger>
));
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogPortal = BaseAlertDialog.Portal;

/**
 * Semi-transparent backdrop that appears behind the alert dialog.
 *
 * Provides visual separation between the dialog and the rest of the page.
 * Clicking the backdrop typically does not close an alert dialog (unlike regular dialogs).
 *
 * @example
 * ```tsx
 * <AlertDialogBackdrop />
 * ```
 */
const AlertDialogBackdrop = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Backdrop
    ref={ref}
    className={cx(
      "fixed inset-0 z-50 bg-black/50 transition-all duration-150",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "dark:bg-black/70",
      className
    )}
    {...props}
  />
));
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

/**
 * Main content container for the alert dialog.
 *
 * Contains the dialog's title, description, and action buttons.
 * Automatically includes the portal and backdrop for proper layering.
 * Features smooth scale and opacity transitions for open/close animations.
 *
 * @example
 * ```tsx
 * <AlertDialogContent>
 *   <AlertDialogHeader>
 *     <AlertDialogTitle>Confirm Action</AlertDialogTitle>
 *     <AlertDialogDescription>Are you sure?</AlertDialogDescription>
 *   </AlertDialogHeader>
 *   <AlertDialogFooter>
 *     <AlertDialogCancel>Cancel</AlertDialogCancel>
 *     <AlertDialogAction>Confirm</AlertDialogAction>
 *   </AlertDialogFooter>
 * </AlertDialogContent>
 * ```
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <BaseAlertDialog.Popup
      ref={ref}
      className={cx(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 rounded-lg",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

/**
 * Header container for the alert dialog title and description.
 *
 * Provides consistent spacing and alignment for the dialog's header content.
 * Uses center alignment on mobile and left alignment on larger screens.
 *
 * @example
 * ```tsx
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Delete Account</AlertDialogTitle>
 *   <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 * </AlertDialogHeader>
 * ```
 */
const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
));
AlertDialogHeader.displayName = "AlertDialogHeader";

/**
 * Footer container for alert dialog action buttons.
 *
 * Arranges cancel and action buttons with responsive layout.
 * On mobile, buttons stack vertically with action button on top.
 * On larger screens, buttons are arranged horizontally with action button on right.
 *
 * @example
 * ```tsx
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
 * </AlertDialogFooter>
 * ```
 */
const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
));
AlertDialogFooter.displayName = "AlertDialogFooter";

/**
 * Title heading for the alert dialog.
 *
 * Provides semantic heading markup for screen readers and proper visual hierarchy.
 * Uses prominent typography to clearly communicate the dialog's purpose.
 *
 * @example
 * ```tsx
 * <AlertDialogTitle>Delete Account</AlertDialogTitle>
 * ```
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>
>(({ className, children, ...props }, ref) => (
  <BaseAlertDialog.Title ref={ref} className={cx(className)} {...props}>
    {typeof children === "string" ? (
      <Subheading level={3}>{children}</Subheading>
    ) : (
      children
    )}
  </BaseAlertDialog.Title>
));
AlertDialogTitle.displayName = "AlertDialogTitle";

/**
 * Description text that provides additional context for the alert dialog.
 *
 * Offers detailed information about the action or confirmation being requested.
 * Uses muted text color to establish proper visual hierarchy with the title.
 *
 * @example
 * ```tsx
 * <AlertDialogDescription>
 *   This action cannot be undone. This will permanently delete your account
 *   and remove your data from our servers.
 * </AlertDialogDescription>
 * ```
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Description>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>
>(({ className, children, ...props }, ref) => (
  <BaseAlertDialog.Description ref={ref} className={cx(className)} {...props}>
    {typeof children === "string" ? <Text>{children}</Text> : children}
  </BaseAlertDialog.Description>
));
AlertDialogDescription.displayName = "AlertDialogDescription";

/**
 * Primary action button that closes the dialog and performs the main action.
 *
 * Supports "default" and "destructive" variants for different action types.
 * When clicked, closes the dialog and typically performs the confirmed action.
 * Use "destructive" variant for dangerous actions like deleting data.
 *
 * @param variant - Visual style variant ("default" | "destructive")
 *
 * @example
 * ```tsx
 * <AlertDialogAction>Continue</AlertDialogAction>
 * <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
 * ```
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Close>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close> & {
    variant?: "default" | "destructive";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <BaseAlertDialog.Close
    ref={ref}
    render={
      <Button
        variant={variant}
        className={typeof className === "string" ? className : undefined}
      />
    }
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

/**
 * Cancel button that closes the dialog without performing any action.
 *
 * Provides users a way to exit the dialog without proceeding with the main action.
 * Styled as a secondary button with outline appearance to de-emphasize it
 * compared to the primary action button.
 *
 * @example
 * ```tsx
 * <AlertDialogCancel>Cancel</AlertDialogCancel>
 * ```
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Close>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Close
    ref={ref}
    render={
      <Button
        variant="outline"
        className={cx(
          "mt-2 sm:mt-0",
          typeof className === "string" ? className : undefined
        )}
      />
    }
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBackdrop,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
