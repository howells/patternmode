"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Description text that provides additional context for the alert dialog.
 */
export const AlertDialogDescription = ({
  ref,
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<React.ElementRef<
    typeof BaseAlertDialog.Description
  > | null>;
} & React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>) => (
  <BaseAlertDialog.Description
    className={cx(className)}
    ref={ref}
    render={typeof children === "string" ? <Text /> : undefined}
    {...props}
  >
    {children}
  </BaseAlertDialog.Description>
);
