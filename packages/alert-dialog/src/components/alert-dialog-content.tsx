"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { alertDialogContentVariants } from "../variants";
import { AlertDialogBackdrop } from "./alert-dialog-backdrop";
import { AlertDialogPortal } from "./alert-dialog-portal";

/**
 * Main content container for the alert dialog.
 * Includes the backdrop and portal rendering.
 */
export const AlertDialogContent = ({
  ref,
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Popup> | null>;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <BaseAlertDialog.Popup
      className={cx(alertDialogContentVariants(), className)}
      ref={ref}
      {...props}
    >
      {children}
    </BaseAlertDialog.Popup>
  </AlertDialogPortal>
);
