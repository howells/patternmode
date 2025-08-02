"use client";

import { Toast, useToast } from "@patternmode/ui";

import React from "react";

type ToastExampleProps = {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
};

export function ToastExample({
  variant = "info",
  title = "Toast Notification",
  description = "This is a toast message example",
}: ToastExampleProps) {
  const toast = useToast();

  const handleShowToast = () => {
    switch (variant) {
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
      default:
        toast.info(title, description);
        break;
    }
  };

  return (
    <Toast.Provider>
      <button
        onClick={handleShowToast}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show {variant} Toast
      </button>
    </Toast.Provider>
  );
}
