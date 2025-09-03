"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./component";

export function AlertDialogPreview(
  props: React.ComponentProps<typeof AlertDialog>
) {
  // Use controlled mode to avoid uncontrolled state changes
  const [internalOpen, setInternalOpen] = React.useState(false);

  // If open is provided in props, use it (controlled from parent)
  // Otherwise use internal state (controlled from this component)
  const isControlledFromParent = props.open !== undefined;
  const open = isControlledFromParent ? props.open : internalOpen;
  const onOpenChange = isControlledFromParent
    ? props.onOpenChange
    : setInternalOpen;

  // Remove open/defaultOpen/onOpenChange from props to avoid conflicts
  const { open: _, defaultOpen: __, onOpenChange: ___, ...restProps } = props;

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open} {...restProps}>
      <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Preview props for prop explorer
export const alertDialogPreviewProps = [
  {
    name: "open",
    type: "boolean",
    description: "Controls whether the alert dialog is open (controlled mode).",
    defaultValue: false,
  },
];
