"use client";

import { createContext, useContext } from "react";

import type { SwatchSize } from "../../lib/size";

export interface SwatchSelectorContextValue {
  /** Value change handler */
  onValueChange?: (value: string) => void;
  /** Swatch size */
  size: SwatchSize;
  /** Current selected value */
  value?: string;
}

/**
 * Context for SwatchSelector to pass value and size to children.
 */
export const SwatchSelectorContext =
  createContext<SwatchSelectorContextValue | null>(null);

/**
 * Hook to access SwatchSelector context.
 * @throws Error if used outside of SwatchSelector
 */
export function useSwatchSelector(): SwatchSelectorContextValue {
  const context = useContext(SwatchSelectorContext);
  if (!context) {
    throw new Error("useSwatchSelector must be used within a SwatchSelector");
  }
  return context;
}
