"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ComponentSize } from "../../lib/size";

export interface DocumentListContextValue {
  /** All items are selected */
  allSelected: boolean;
  /** Clear all selections */
  clearSelection: () => void;
  /** Check if a value is selected */
  isSelected: (itemValue: string) => boolean;
  /** Callback when selection changes */
  onValueChange?: (value: string[]) => void;
  /** Register an item value (for toggleAll support) */
  registerItem: (itemValue: string) => void;
  /** Whether selection is enabled */
  selectable: boolean;
  /** Size scale for items */
  size: ComponentSize;
  /** Some (but not all) items are selected */
  someSelected: boolean;
  /** Toggle all items (requires items to be registered) */
  toggleAll: () => void;
  /** Toggle selection for a value */
  toggleItem: (itemValue: string) => void;
  /** Unregister an item value */
  unregisterItem: (itemValue: string) => void;
  /** Currently selected values (controlled) */
  value: string[];
}

const DocumentListContext = createContext<DocumentListContextValue | null>(
  null,
);

export interface DocumentListProviderProps {
  children: React.ReactNode;
  /** Default selection value (uncontrolled) */
  defaultValue?: string[];
  /** Callback when selection changes */
  onValueChange?: (value: string[]) => void;
  selectable?: boolean;
  size?: ComponentSize;
  /** Controlled selection value */
  value?: string[];
}

/**
 * DocumentListProvider UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListProvider({
  children,
  size = "base",
  selectable = false,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
}: DocumentListProviderProps) {
  // Track registered item values for toggleAll
  const [registeredItems, setRegisteredItems] = useState<Set<string>>(
    new Set(),
  );

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

  // Determine if we're in controlled mode
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const updateValue = useCallback(
    (newValue: string[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  const isSelected = useCallback(
    (itemValue: string) => value.includes(itemValue),
    [value],
  );

  const toggleItem = useCallback(
    (itemValue: string) => {
      if (!selectable) {
        return;
      }

      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      updateValue(newValue);
    },
    [selectable, value, updateValue],
  );

  const clearSelection = useCallback(() => {
    updateValue([]);
  }, [updateValue]);

  const toggleAll = useCallback(() => {
    if (!selectable) {
      return;
    }

    const allItems = Array.from(registeredItems);
    if (value.length === allItems.length) {
      updateValue([]);
    } else {
      updateValue(allItems);
    }
  }, [selectable, registeredItems, value.length, updateValue]);

  const registerItem = useCallback((itemValue: string) => {
    setRegisteredItems((prev) => {
      const next = new Set(prev);
      next.add(itemValue);
      return next;
    });
  }, []);

  const unregisterItem = useCallback((itemValue: string) => {
    setRegisteredItems((prev) => {
      const next = new Set(prev);
      next.delete(itemValue);
      return next;
    });
  }, []);

  const allSelected =
    selectable &&
    registeredItems.size > 0 &&
    value.length === registeredItems.size;
  const someSelected =
    selectable && value.length > 0 && value.length < registeredItems.size;

  const contextValue = useMemo<DocumentListContextValue>(
    () => ({
      size,
      selectable,
      value,
      onValueChange,
      isSelected,
      toggleItem,
      toggleAll,
      clearSelection,
      allSelected,
      someSelected,
      registerItem,
      unregisterItem,
    }),
    [
      size,
      selectable,
      value,
      onValueChange,
      isSelected,
      toggleItem,
      toggleAll,
      clearSelection,
      allSelected,
      someSelected,
      registerItem,
      unregisterItem,
    ],
  );

  return (
    <DocumentListContext.Provider value={contextValue}>
      {children}
    </DocumentListContext.Provider>
  );
}

/**
 * useDocumentListContext React hook.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function useDocumentListContext(): DocumentListContextValue {
  const ctx = useContext(DocumentListContext);
  if (!ctx) {
    throw new Error(
      "useDocumentListContext must be used within DocumentListProvider",
    );
  }
  return ctx;
}

/** Optional hook that returns null if outside provider (for optional checkbox support) */
export function useDocumentListContextOptional(): DocumentListContextValue | null {
  return useContext(DocumentListContext);
}
