"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Button } from "@patternmode/button";
import type React from "react";

/**
 * Primary action button that closes the dialog and performs the main action.
 */
export const AlertDialogAction = ({
  ref,
  className,
  variant = "primary",
  children,
  ...props
}: {
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Close> | null>;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>) => (
  <BaseAlertDialog.Close
    ref={ref}
    render={
      <Button
        className={typeof className === "string" ? className : undefined}
        variant={variant}
      />
    }
    {...props}
  >
    {children}
  </BaseAlertDialog.Close>
);
