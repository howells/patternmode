"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { createContext, useContext, useEffect } from "react";
import type { ComponentSize } from "../../lib/size";
import { useDocumentListContext } from "./document-list-context";

const ITEM_SIZE_STYLES: Record<ComponentSize, string> = {
  "2xs": "gap-1.5 px-2 py-1.5",
  xs: "gap-2 px-3 py-2",
  sm: "gap-2.5 px-4 py-3",
  base: "gap-4 p-4",
  lg: "gap-5 p-5",
  xl: "gap-6 p-6",
  "2xl": "gap-7 p-7",
  "3xl": "gap-8 p-8",
};

/** Item-level context to pass value down to checkbox */
interface DocumentListItemContextValue {
  value: string | undefined;
}

const DocumentListItemContext =
  createContext<DocumentListItemContextValue | null>(null);

/**
 * useDocumentListItemContext React hook.
 * Import from "@patternmode/ui/compositions/document-list".
 * Built on Radix UI primitives for accessible behavior.
 */
export function useDocumentListItemContext(): DocumentListItemContextValue | null {
  return useContext(DocumentListItemContext);
}

export interface DocumentListItemProps extends React.ComponentProps<"li"> {
  asChild?: boolean;
  /** Value for selection tracking (required when selectable is enabled on parent) */
  value?: string;
}

/**
 * DocumentListItem UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 * Built on Radix UI primitives for accessible behavior.
 */
export function DocumentListItem({
  className,
  asChild = false,
  value,
  ...props
}: DocumentListItemProps) {
  const {
    size = "base",
    registerItem,
    unregisterItem,
  } = useDocumentListContext();
  const Comp = asChild ? Slot : "li";

  // Register/unregister item for toggleAll support
  useEffect(() => {
    if (value) {
      registerItem(value);
      return () => unregisterItem(value);
    }
    return;
  }, [value, registerItem, unregisterItem]);

  return (
    <DocumentListItemContext.Provider value={{ value }}>
      <Comp
        className={cn(
          "group/item flex items-center border-0 border-border border-b text-sm transition-colors duration-100 last:border-b-0",
          "group-data-[variant=divided]/document-list:rounded-none group-data-[variant=divided]/document-list:border-0 group-data-[variant=divided]/document-list:bg-transparent",
          "group-data-[variant=separated]/document-list:rounded-xl group-data-[variant=separated]/document-list:border group-data-[variant=separated]/document-list:border-border group-data-[variant=separated]/document-list:bg-card",
          ITEM_SIZE_STYLES[size],
          className,
        )}
        data-component="document-list-item"
        data-slot="document-list-item"
        data-value={value}
        {...props}
      />
    </DocumentListItemContext.Provider>
  );
}
