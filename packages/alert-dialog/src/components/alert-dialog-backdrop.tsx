"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { alertDialogBackdropVariants } from "../variants";

/**
 * Semi-transparent backdrop that appears behind the alert dialog.
 */
export const AlertDialogBackdrop = ({
  ref,
  className,
  ...props
}: {
  className?: string;
  ref?: React.RefObject<React.ElementRef<
    typeof BaseAlertDialog.Backdrop
  > | null>;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>) => (
  <BaseAlertDialog.Backdrop
    className={cx(alertDialogBackdropVariants(), className)}
    ref={ref}
    {...props}
  />
);
