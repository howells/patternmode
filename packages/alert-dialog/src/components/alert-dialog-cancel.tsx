"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { alertDialogCancelVariants } from "../variants";

/**
 * Cancel button that closes the dialog without performing any action.
 */
export const AlertDialogCancel = ({
  ref,
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Close> | null>;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>) => (
  <BaseAlertDialog.Close
    ref={ref}
    render={
      <Button
        className={cx(
          alertDialogCancelVariants(),
          typeof className === "string" ? className : undefined
        )}
        variant="outline"
      />
    }
    {...props}
  >
    {children}
  </BaseAlertDialog.Close>
);
