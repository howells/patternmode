"use client";

import type React from "react";
import { AlertDialogRoot } from "./alert-dialog-root";

/**
 * Alert Dialog component built on Base UI's AlertDialog primitive for displaying critical alerts and confirmation prompts.
 */
export const AlertDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogRoot>) => {
  return <AlertDialogRoot {...props}>{children}</AlertDialogRoot>;
};

AlertDialog.displayName = "AlertDialog";
