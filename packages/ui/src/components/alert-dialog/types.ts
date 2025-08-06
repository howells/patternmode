import type { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import type React from "react";

export type AlertDialogProps = React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Root>;

export type AlertDialogTriggerProps = {
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

export type AlertDialogBackdropProps = {
  /**
   * Additional CSS classes.
   * Applied to the backdrop overlay element.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>;

export type AlertDialogContentProps = {
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

export type AlertDialogHeaderProps = {
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

export type AlertDialogFooterProps = {
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

export type AlertDialogTitleProps = {
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

export type AlertDialogDescriptionProps = {
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

export type AlertDialogActionProps = {
  /**
   * Visual style variant for the action button.
   * Use "destructive" for dangerous actions like deleting data.
   */
  variant?: "primary" | "secondary" | "destructive" | "outline" | "outline-dashed" | "ghost" | "inverse-ghost" | "link" | "minimal";
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

export type AlertDialogCancelProps = {
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
