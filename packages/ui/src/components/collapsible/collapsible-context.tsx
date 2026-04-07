import { createContext, useContext } from "react";
/** Collapsible context value type definition */

export interface CollapsibleContextValue {
  /** Whether component is open */
  isOpen: boolean;
  /** Set is open */
  setIsOpen: (open: boolean) => void;
}

/**
 * CollapsibleContext UI component.
 * Import from "@patternmode/ui/components/collapsible".
 */
export const CollapsibleContext = createContext<CollapsibleContextValue | null>(
  null,
);

/**
 * useCollapsibleContext React hook.
 * Import from "@patternmode/ui/components/collapsible".
 */
export function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible components must be used within Collapsible");
  }
  return context;
}
