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
} from "@patternmode/ui";

// Example component for preview system
export const AlertDialogExample = ({
  variant = "default",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  cancelText = "Cancel",
  actionText = "Continue",
  ...props
}: {
  variant?: string;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  [key: string]: unknown;
}) => {
  const isDestructive = variant === "destructive";

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger>
        {isDestructive ? "Delete Account" : "Save Changes"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            variant={isDestructive ? "destructive" : "default"}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
