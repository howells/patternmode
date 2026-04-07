"use client";

import { createContext, useContext } from "react";
import type { ComponentSize } from "../../lib/size";

/** Tabs context value type definition */
export interface TabsContextValue {
  /** Currently active tab value */
  activeValue?: string;
  /** Whether tabs should fill container width with equal widths */
  fullWidth?: boolean;
  /** Unique ID for this Tabs instance (used for indicator layoutId) */
  instanceId?: string;
  /** Component size */
  size?: ComponentSize;
  /** Visual style variant: pill or line */
  variant: "pill" | "line";
}

/**
 * TabsContext UI component.
 * Import from "@patternmode/ui/components/tabs".
 */
export const TabsContext = createContext<TabsContextValue>({
  variant: "pill",
  size: "base",
  fullWidth: false,
});

/**
 * useTabsContext React hook.
 * Import from "@patternmode/ui/components/tabs".
 */
export const useTabsContext = () => useContext(TabsContext);
