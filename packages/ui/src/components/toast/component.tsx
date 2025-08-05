// Tremor Toast [v1.0.0] - Base UI API with Sonner

"use client";

import type { BaseToastOptions, Position, ToastData, ToastPromiseOptions, ToastType } from "./types";
import React from "react";

import { toast as sonnerToast, Toaster } from "sonner";
import { cx } from "../../lib/utils";
import { toastVariants } from "./variants";

type SonnerToastOptions = {
  id: string;
  duration: number;
  dismissible: boolean;
  className: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

type StoredToast = {
  id: string;
} & BaseToastOptions;

type ToastProviderProps = {
  /**
   * React children to render within the provider context.
   */
  children?: React.ReactNode;
  /**
   * Maximum number of toasts visible at once.
   * @default 3
   */
  limit?: number;
  /**
   * Default duration for toasts in milliseconds.
   * @default 5000
   */
  timeout?: number;
  /**
   * Custom toast manager instance.
   */
  toastManager?: ToastManager;
  /**
   * Position where toasts should appear on screen.
   * @default "top-right"
   */
  position?: Position;
  /**
   * Whether toasts should expand to show more content.
   * @default false
   */
  expand?: boolean;
  /**
   * Whether to use rich colors for different toast types.
   * @default true
   */
  richColors?: boolean;
  /**
   * Whether to show close buttons on toasts.
   * @default true
   */
  closeButton?: boolean;
};

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
    const loadingOptions
      = typeof options.loading === "string"
        ? { title: options.loading }
        : options.loading;

    const id = this.add({ ...loadingOptions, type: "default" });

    return promise
      .then((data) => {
        this.close(id);
        const successOptions
          = typeof options.success === "function"
            ? options.success(data)
            : typeof options.success === "string"
              ? { title: options.success }
              : options.success;

        const finalOptions
          = typeof successOptions === "string"
            ? { title: successOptions }
            : successOptions;

        this.add({ ...finalOptions, type: "success" });
        return data;
      })
      .catch((error) => {
        this.close(id);
        const errorOptions
          = typeof options.error === "function"
            ? options.error(error)
            : typeof options.error === "string"
              ? { title: options.error }
              : options.error;

        const finalOptions
          = typeof errorOptions === "string"
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
const ToastManagerContext
  = React.createContext<ToastManager>(globalToastManager);

/**
 * Provider component for the toast notification system.
 */
const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  limit = 3,
  timeout = 5000,
  toastManager = globalToastManager,
  position = "top-right" as Position,
  expand = false,
  richColors = true,
  closeButton = true,
}) => {
  return (
    <ToastManagerContext value={toastManager}>
      {children}
      <Toaster
        data-testid="toast"
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
    </ToastManagerContext>
  );
};

/**
 * Hook to access the toast manager with full control over toast lifecycle.
 */
const useToastManager = () => {
  const manager = React.use(ToastManagerContext);
  return {
    add: manager.add.bind(manager),
    update: manager.update.bind(manager),
    close: manager.close.bind(manager),
    closeAll: manager.closeAll.bind(manager),
    promise: manager.promise.bind(manager),
    toasts: manager.getToasts(),
  };
};

/**
 * Convenience hook for simple toast creation with helper methods.
 */
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

/**
 * Toast notification system with multiple variants and Promise support.
 */
const Toast = {
  Provider: ToastProvider,
  useToastManager,
};

// Additional exports for convenience
export {
  type BaseToastOptions,
  type StoredToast,
  Toast,
  type ToastData,
  ToastManager,
  type ToastPromiseOptions,
  ToastProvider,
  type ToastProviderProps,
  type ToastType,
  useToast,
  useToastManager,
};
