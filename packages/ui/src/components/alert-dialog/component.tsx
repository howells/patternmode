import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import * as React from "react";

import { cx } from "../../lib/utils";
import { Button } from "../button/component";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";

/**
 * Root container for alert dialog components that require user confirmation.
 */
const AlertDialog = ({ ref, ...props }: React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Root> & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Root> | null> }) => (
  <BaseAlertDialog.Root
    ref={ref}
    data-testid="alert-dialog"
    {...props}
  />
);
AlertDialog.displayName = "AlertDialog";

type AlertDialogTriggerProps = {
  /**
   * Additional CSS classes.
   * Applied to the trigger button element.
   */
  className?: string;
  /**
   * Content to display in the trigger button.
   * Usually text describing the action that will open the dialog.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger>;

/**
 * Button that triggers the alert dialog to open.
 */
const AlertDialogTrigger = ({ ref, className, children, ...props }: AlertDialogTriggerProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Trigger> | null> }) => (
  <BaseAlertDialog.Trigger
    ref={ref}
    className={cx(
      !props.render && [
        "inline-flex h-10 items-center justify-center rounded-md border  bg-white px-4 py-2 text-sm font-medium transition-colors",
        "hover:bg-zinc-50 hover:text-zinc-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
      ],
      className,
    )}
    {...props}
  >
    {children}
  </BaseAlertDialog.Trigger>
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogPortal = BaseAlertDialog.Portal;

type AlertDialogBackdropProps = {
  /**
   * Additional CSS classes.
   * Applied to the backdrop overlay element.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>;

/**
 * Semi-transparent backdrop that appears behind the alert dialog.
 */
const AlertDialogBackdrop = ({ ref, className, ...props }: AlertDialogBackdropProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Backdrop> | null> }) => (
  <BaseAlertDialog.Backdrop
    ref={ref}
    className={cx(
      "fixed inset-0 z-50 bg-black/50 transition-all duration-150",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "dark:bg-black/70",
      className,
    )}
    {...props}
  />
);
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

type AlertDialogContentProps = {
  /**
   * Additional CSS classes.
   * Applied to the main dialog content container.
   */
  className?: string;
  /**
   * Content to display in the dialog.
   * Usually includes header, body, and footer sections.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>;

/**
 * Main content container for the alert dialog.
 */
const AlertDialogContent = ({ ref, className, ...props }: AlertDialogContentProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Popup> | null> }) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <BaseAlertDialog.Popup
      ref={ref}
      className={cx(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border  bg-white p-6 shadow-lg duration-200 rounded-lg",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);
AlertDialogContent.displayName = "AlertDialogContent";

type AlertDialogHeaderProps = {
  /**
   * Additional CSS classes.
   * Applied to the header container element.
   */
  className?: string;
  /**
   * Content to display in the header.
   * Usually includes title and description components.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Header container for the alert dialog title and description.
 */
const AlertDialogHeader = ({ ref, className, ...props }: AlertDialogHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

type AlertDialogFooterProps = {
  /**
   * Additional CSS classes.
   * Applied to the footer container element.
   */
  className?: string;
  /**
   * Content to display in the footer.
   * Usually includes cancel and action buttons.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Footer container for alert dialog action buttons.
 */
const AlertDialogFooter = ({ ref, className, ...props }: AlertDialogFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

type AlertDialogTitleProps = {
  /**
   * Additional CSS classes.
   * Applied to the title element.
   */
  className?: string;
  /**
   * Title text or content.
   * Provides semantic heading for screen readers.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>;

/**
 * Title heading for the alert dialog.
 */
const AlertDialogTitle = ({ ref, className, children, ...props }: AlertDialogTitleProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Title> | null> }) => (
  <BaseAlertDialog.Title
    ref={ref}
    className={cx(className)}
    render={typeof children === "string" ? <Subheading level={3} /> : undefined}
    {...props}
  >
    {children}
  </BaseAlertDialog.Title>
);
AlertDialogTitle.displayName = "AlertDialogTitle";

type AlertDialogDescriptionProps = {
  /**
   * Additional CSS classes.
   * Applied to the description element.
   */
  className?: string;
  /**
   * Description text or content.
   * Provides additional context about the dialog action.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>;

/**
 * Description text that provides additional context for the alert dialog.
 */
const AlertDialogDescription = ({ ref, className, children, ...props }: AlertDialogDescriptionProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Description> | null> }) => (
  <BaseAlertDialog.Description
    ref={ref}
    className={cx(className)}
    render={typeof children === "string" ? <Text /> : undefined}
    {...props}
  >
    {children}
  </BaseAlertDialog.Description>
);
AlertDialogDescription.displayName = "AlertDialogDescription";

type AlertDialogActionProps = {
  /**
   * Visual style variant for the action button.
   * Use "destructive" for dangerous actions like deleting data.
   */
  variant?: "default" | "destructive";
  /**
   * Additional CSS classes.
   * Applied to the action button element.
   */
  className?: string;
  /**
   * Content to display in the action button.
   * Usually text describing the action being confirmed.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>;

/**
 * Primary action button that closes the dialog and performs the main action.
 */
const AlertDialogAction = ({ ref, className, variant = "default", ...props }: AlertDialogActionProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Close> | null> }) => (
  <BaseAlertDialog.Close
    ref={ref}
    render={(
      <Button
        variant={variant}
        className={typeof className === "string" ? className : undefined}
      />
    )}
    {...props}
  />
);
AlertDialogAction.displayName = "AlertDialogAction";

type AlertDialogCancelProps = {
  /**
   * Additional CSS classes.
   * Applied to the cancel button element.
   */
  className?: string;
  /**
   * Content to display in the cancel button.
   * Usually "Cancel" or similar dismissive text.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>;

/**
 * Cancel button that closes the dialog without performing any action.
 */
const AlertDialogCancel = ({ ref, className, ...props }: AlertDialogCancelProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Close> | null> }) => (
  <BaseAlertDialog.Close
    ref={ref}
    render={(
      <Button
        variant="outline"
        className={cx(
          "mt-2 sm:mt-0",
          typeof className === "string" ? className : undefined,
        )}
      />
    )}
    {...props}
  />
);
AlertDialogCancel.displayName = "AlertDialogCancel";

/**
 * Modal dialog component for critical alerts and confirmation prompts.
 */
export {
  AlertDialog,
  AlertDialogAction,
  type AlertDialogActionProps,
  AlertDialogBackdrop,
  type AlertDialogBackdropProps,
  AlertDialogCancel,
  type AlertDialogCancelProps,
  AlertDialogContent,
  type AlertDialogContentProps,
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
  AlertDialogFooter,
  type AlertDialogFooterProps,
  AlertDialogHeader,
  type AlertDialogHeaderProps,
  AlertDialogPortal,
  AlertDialogTitle,
  type AlertDialogTitleProps,
  AlertDialogTrigger,
  type AlertDialogTriggerProps,
};
