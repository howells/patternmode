// Tremor Toast [v1.0.0] - Base UI API with Sonner

"use client";

import React from "react";
import { toast as sonnerToast, Toaster } from "sonner";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";

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

type ToastData = {
  [key: string]: unknown;
};

type BaseToastOptions = {
  /**
   * The main title/message of the toast notification.
   */
  title?: string;
  /**
   * Optional description text displayed below the title.
   */
  description?: string;
  /**
   * Visual variant of the toast affecting color scheme.
   * @default "default"
   */
  type?: ToastType;
  /**
   * How long the toast should remain visible in milliseconds.
   * @default 5000
   */
  duration?: number;
  /**
   * Whether the user can manually dismiss the toast.
   * @default true
   */
  dismissible?: boolean;
  /**
   * Optional action button configuration.
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Additional data to associate with the toast.
   */
  data?: ToastData;
};

type ToastPromiseOptions<T = unknown> = {
  /**
   * Message or options to show while the promise is pending.
   */
  loading: string | BaseToastOptions;
  /**
   * Message or options to show when the promise resolves successfully.
   */
  success: string | ((data: T) => string) | ((data: T) => BaseToastOptions);
  /**
   * Message or options to show when the promise rejects.
   */
  error:
    | string
    | ((error: Error) => string)
    | ((error: Error) => BaseToastOptions);
};

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
  children: React.ReactNode;
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
  toastVariants,
  useToast,
  useToastManager,
};
