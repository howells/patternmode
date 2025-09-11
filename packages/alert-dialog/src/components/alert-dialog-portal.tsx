"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import type React from "react";

/**
 * Portal component that renders the alert dialog outside the DOM hierarchy.
 * Useful for rendering dialogs outside their trigger's DOM tree.
 */
export const AlertDialogPortal = ({
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Portal>) => {
  return <BaseAlertDialog.Portal {...props}>{children}</BaseAlertDialog.Portal>;
};
