"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";
import { toast as sonnerToast, Toaster } from "sonner";
import type { BaseToastOptions, Position, ToastPromiseOptions } from "../types";
import { toastVariants } from "../variants";

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
  children?: React.ReactNode;
  limit?: number;
  timeout?: number;
  toastManager?: ToastManager;
  position?: Position;
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
};

class ToastManager {
  private readonly toasts = new Map<string, StoredToast>();

  add(options: BaseToastOptions): string {
    const id = Math.random().toString(36).substring(2, 15);
    const { title, description, type = "default", duration, dismissible = true, action, data } = options;

    const toastOptions: SonnerToastOptions = {
      id,
      duration: duration ?? 5000,
      dismissible,
      className: cx(toastVariants({ variant: type })),
      description,
      action: action ? { label: action.label, onClick: action.onClick } : undefined,
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

  async promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> {
    const loadingOptions =
      typeof options.loading === "string" ? { title: options.loading } : options.loading;
    const id = this.add({ ...loadingOptions, type: "info", dismissible: false });
    try {
      const data = await promise;
      this.close(id);
      const successOptions =
        typeof options.success === "function"
          ? options.success(data)
          : typeof options.success === "string"
            ? { title: options.success }
            : options.success;
      const finalOptions = typeof successOptions === "string" ? { title: successOptions } : successOptions;
      this.add({ ...finalOptions, type: "success" });
      return data;
    } catch (error) {
      this.close(id);
      const errorOptions =
        typeof options.error === "function"
          ? options.error(error instanceof Error ? error : new Error(String(error)))
          : typeof options.error === "string"
            ? { title: options.error }
            : options.error;
      const finalOptions = typeof errorOptions === "string" ? { title: errorOptions } : errorOptions;
      this.add({ ...finalOptions, type: "error" });
      throw error;
    }
  }

  getToasts(): StoredToast[] {
    return Array.from(this.toasts.values());
  }
}

const globalToastManager = new ToastManager();
const ToastManagerContext = React.createContext<ToastManager>(globalToastManager);

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
        closeButton={closeButton}
        data-testid="toast"
        expand={expand}
        position={position}
        richColors={richColors}
        toastOptions={{ duration: timeout, className: cx(toastVariants()) }}
        visibleToasts={limit}
      />
    </ToastManagerContext>
  );
};

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

const useToast = () => {
  const manager = useToastManager();
  return {
    toast: (options: BaseToastOptions) => manager.add(options),
    success: (title: string, description?: string) => manager.add({ title, description, type: "success" }),
    error: (title: string, description?: string) => manager.add({ title, description, type: "error" }),
    warning: (title: string, description?: string) => manager.add({ title, description, type: "warning" }),
    info: (title: string, description?: string) => manager.add({ title, description, type: "info" }),
    promise: manager.promise.bind(manager),
    dismiss: manager.close.bind(manager),
    dismissAll: manager.closeAll.bind(manager),
  };
};

const Toast = { Provider: ToastProvider, useToastManager };

export { Toast, ToastManager, ToastProvider, useToast, useToastManager };
export type { StoredToast };
