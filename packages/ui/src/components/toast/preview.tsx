"use client";

import React from "react";
import { Button } from "../button";
import { useToast } from "./component";

type ToastPreviewProps = {
  title?: string;
  description?: string;
  type?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  dismissible?: boolean;
};

export function ToastPreview(props: ToastPreviewProps) {
  const toast = useToast();

  const showToast = () => {
    const { title = "Notification", description = "This is a toast notification.", type = "default" } = props;

    switch (type) {
      case "success":
        toast.success(title, description);
        break;
      case "error":
        toast.error(title, description);
        break;
      case "warning":
        toast.warning(title, description);
        break;
      case "info":
        toast.info(title, description);
        break;
      default:
        toast.toast({ title, description });
        break;
    }
  };

  return (
    <Button onClick={showToast}>
      Show Toast
    </Button>
  );
}

// Preview props for prop explorer
export const toastPreviewProps = [
  {
    name: "title",
    type: "string",
    description: "The main title/message of the toast notification.",
    defaultValue: "Notification",
  },
  {
    name: "description",
    type: "string",
    description: "Optional description text displayed below the title.",
    defaultValue: "This is a toast notification.",
  },
  {
    name: "type",
    type: "select",
    description: "Visual variant of the toast affecting color scheme.",
    options: ["default", "success", "error", "warning", "info"],
    defaultValue: "default",
  },
  {
    name: "duration",
    type: "number",
    description: "How long the toast should remain visible in milliseconds.",
    defaultValue: 5000,
  },
  {
    name: "dismissible",
    type: "boolean",
    description: "Whether the user can manually dismiss the toast.",
    defaultValue: true,
  },
];
