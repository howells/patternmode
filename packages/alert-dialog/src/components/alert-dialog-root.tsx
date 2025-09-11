"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import type React from "react";

/**
 * Root container for alert dialog components that require user confirmation.
 * Manages alert dialog state and provides context to child components.
 */
export const AlertDialogRoot = ({
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Root>) => {
  return (
    <BaseAlertDialog.Root data-testid="alert-dialog" {...props}>
      {children}
    </BaseAlertDialog.Root>
  );
};
