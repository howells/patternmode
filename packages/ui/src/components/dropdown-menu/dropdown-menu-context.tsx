"use client";

import { createContext, useContext } from "react";
import type { Radius } from "../../lib/radius";
import type { ComponentSize } from "../../lib/size";

interface DropdownMenuContextValue {
  /** Border radius for menu items. Defaults to "rounded". */
  itemRadius?: Radius;
  /** Computed CSS class for concentric item radius (derived from container radius + padding). */
  itemRadiusClass: string;
  size: ComponentSize;
}

/**
 * DropdownMenuContext UI component.
 * Import from "@patternmode/ui/components/dropdown-menu".
 */
const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  size: "sm",
  itemRadiusClass: "rounded-md",
});

/**
 * useDropdownMenuContext React hook.
 * Import from "@patternmode/ui/components/dropdown-menu".
 */
function useDropdownMenuContext() {
  return useContext(DropdownMenuContext);
}

export { DropdownMenuContext, useDropdownMenuContext };
