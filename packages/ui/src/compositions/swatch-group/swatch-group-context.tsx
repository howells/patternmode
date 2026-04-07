"use client";

import type { LucideIcon } from "lucide-react";
import { createContext, useContext } from "react";

import type { SwatchSize } from "../../lib/size";

interface SwatchGroupContextValue {
  /** Icon to display on selected swatch (e.g., Check). When set, replaces the selection ring. */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Swatch size from shared size system */
  size: SwatchSize;
}

/**
 * Context for SwatchGroup to pass size and display options to children.
 */
export const SwatchGroupContext = createContext<SwatchGroupContextValue>({
  size: "base",
});

/**
 * Hook to access SwatchGroup context.
 */
export const useSwatchGroupContext = () => useContext(SwatchGroupContext);
