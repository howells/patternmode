// Tremor Toast [v1.0.0] - Base UI API with Sonner

"use client";

import { cx } from "../../lib/utils";
import React from "react";
import { toast as sonnerToast, Toaster } from "sonner";
import { tv, type VariantProps } from "tailwind-variants";

// Toast variants for consistent styling
const toastVariants = tv({
  base: [
    // base
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
    // background
    "bg-white dark:bg-zinc-950",
    // border
    "border-zinc-200 dark:border-zinc-800",
  ],
  variants: {
    variant: {
      default: "border-zinc-200 dark:border-zinc-800",
      success:
        "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-50",
      error:
        "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50",
      warning:
        "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-50",
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Toast types
type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastData {
  [key: string]: unknown;
}

interface BaseToastOptions {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  data?: ToastData;
}

interface ToastPromiseOptions<T = unknown> {
  loading: string | BaseToastOptions;
  success: string | ((data: T) => string) | ((data: T) => BaseToastOptions);
  error:
    | string
    | ((error: Error) => string)
    | ((error: Error) => BaseToastOptions);
}

interface SonnerToastOptions {
  id: string;
  duration: number;
  dismissible: boolean;
  className: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface StoredToast extends BaseToastOptions {
  id: string;
}

// Toast Manager class that mimics Base UI's useToastManager API
class ToastManager {
  private toasts = new Map<string, StoredToast>();

  add(options: BaseToastOptions): string {
    const id = Math.random().toString(36).substring(2, 15);
    const {
      title,
      description,
      type = "default",
      duration,
      dismissible = true,
      action,
      data,
    } = options;

    const toastOptions: SonnerToastOptions = {
      id,
      duration: duration ?? 5000,
      dismissible,
      className: cx(toastVariants({ variant: type })),
      description,
      action: action
        ? {
            label: action.label,
            onClick: action.onClick,
          }
        : undefined,
    };

    this.toasts.set(id, { ...options, id, data });

    switch (type) {
      case "success":
        sonnerToast.success(title, toastOptions);
        break;
      case "error":
        sonnerToast.error(title, toastOptions);
        break;
      case "warning":
        sonnerToast.warning(title, toastOptions);
        break;
      case "info":
        sonnerToast.info(title, toastOptions);
        break;
      default:
        sonnerToast(title, toastOptions);
    }

    return id;
  }

  update(id: string, options: Partial<BaseToastOptions>): void {
    const existingToast = this.toasts.get(id);
    if (existingToast) {
      const updatedToast = { ...existingToast, ...options };
      this.toasts.set(id, updatedToast);
      // Note: Sonner doesn't have direct update API, so we close and recreate
      sonnerToast.dismiss(id);
      this.add(updatedToast);
    }
  }

  close(id: string): void {
    sonnerToast.dismiss(id);
    this.toasts.delete(id);
  }

  closeAll(): void {
    sonnerToast.dismiss();
    this.toasts.clear();
  }

  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> {
    const loadingOptions =
      typeof options.loading === "string"
        ? { title: options.loading }
        : options.loading;

    const id = this.add({ ...loadingOptions, type: "default" });

    return promise
      .then((data) => {
        this.close(id);
        const successOptions =
          typeof options.success === "function"
            ? options.success(data)
            : typeof options.success === "string"
            ? { title: options.success }
            : options.success;

        const finalOptions =
          typeof successOptions === "string"
            ? { title: successOptions }
            : successOptions;

        this.add({ ...finalOptions, type: "success" });
        return data;
      })
      .catch((error) => {
        this.close(id);
        const errorOptions =
          typeof options.error === "function"
            ? options.error(error)
            : typeof options.error === "string"
            ? { title: options.error }
            : options.error;

        const finalOptions =
          typeof errorOptions === "string"
            ? { title: errorOptions }
            : errorOptions;

        this.add({ ...finalOptions, type: "error" });
        throw error;
      });
  }

  getToasts(): StoredToast[] {
    return Array.from(this.toasts.values());
  }
}

// Global toast manager instance
const globalToastManager = new ToastManager();

// Context for toast manager
const ToastManagerContext =
  React.createContext<ToastManager>(globalToastManager);

// Provider component that mimics Base UI's Toast.Provider
interface ToastProviderProps {
  children: React.ReactNode;
  limit?: number;
  timeout?: number;
  toastManager?: ToastManager;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
}

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  limit = 3,
  timeout = 5000,
  toastManager = globalToastManager,
  position = "top-right",
  expand = false,
  richColors = true,
  closeButton = true,
}) => {
  return (
    <ToastManagerContext.Provider value={toastManager}>
      {children}
      <Toaster
        position={position}
        toastOptions={{
          duration: timeout,
          className: cx(toastVariants()),
        }}
        visibleToasts={limit}
        expand={expand}
        richColors={richColors}
        closeButton={closeButton}
      />
    </ToastManagerContext.Provider>
  );
};

// Hook to access toast manager (mimics Base UI's useToastManager)
const useToastManager = () => {
  const manager = React.useContext(ToastManagerContext);
  return {
    add: manager.add.bind(manager),
    update: manager.update.bind(manager),
    close: manager.close.bind(manager),
    closeAll: manager.closeAll.bind(manager),
    promise: manager.promise.bind(manager),
    toasts: manager.getToasts(),
  };
};

// Convenience hook for simple toast creation
const useToast = () => {
  const manager = useToastManager();

  return {
    toast: (options: BaseToastOptions) => manager.add(options),
    success: (title: string, description?: string) =>
      manager.add({ title, description, type: "success" }),
    error: (title: string, description?: string) =>
      manager.add({ title, description, type: "error" }),
    warning: (title: string, description?: string) =>
      manager.add({ title, description, type: "warning" }),
    info: (title: string, description?: string) =>
      manager.add({ title, description, type: "info" }),
    promise: manager.promise.bind(manager),
    dismiss: manager.close.bind(manager),
    dismissAll: manager.closeAll.bind(manager),
  };
};

// Base UI-style component exports (for API compatibility)
const Toast = {
  Provider: ToastProvider,
  useToastManager,
};

// Additional exports for convenience
export {
  Toast,
  ToastManager,
  ToastProvider,
  toastVariants,
  useToast,
  useToastManager,
};

export type {
  BaseToastOptions,
  StoredToast,
  ToastData,
  ToastPromiseOptions,
  ToastType,
};
