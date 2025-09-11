"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Subheading } from "@patternmode/subheading";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Title heading for the alert dialog.
 */
export const AlertDialogTitle = ({
  ref,
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Title> | null>;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>) => (
  <BaseAlertDialog.Title
    className={cx(className)}
    ref={ref}
    render={typeof children === "string" ? <Subheading level={3} /> : undefined}
    {...props}
  >
    {children}
  </BaseAlertDialog.Title>
);
