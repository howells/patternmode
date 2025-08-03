"use client";

import React from "react";
import { Toast, useToast } from "./component";

export function ToastExample() {
  const toast = useToast();

  const showToast = () => {
    toast.success("Toast Title", "This is a toast notification message.");
  };

  return (
    <Toast.Provider>
      <button onClick={showToast} className="px-4 py-2 bg-blue-500 text-white rounded">
        Show Toast
      </button>
    </Toast.Provider>
  );
}
