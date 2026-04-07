"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

import type { SwatchSize } from "../../lib/size";
import { SwatchSelectorContext } from "./swatch-selector-context";

export type SwatchSelectorProps = ComponentProps<"div"> & {
  /** Current value */
  value?: string;
  /** Value change handler */
  onValueChange?: (value: string) => void;
  /** Swatch size */
  size?: SwatchSize;
};

/**
 * SwatchSelector UI component.
 * Import from "@patternmode/ui/compositions/swatch-selector".
 */
export function SwatchSelector({
  value,
  onValueChange,
  size = "base",
  className,
  children,
  ...props
}: SwatchSelectorProps) {
  return (
    <SwatchSelectorContext.Provider value={{ value, onValueChange, size }}>
      <div
        className={cn("flex items-center gap-2", className)}
        data-component="swatch-selector"
        data-slot="swatch-selector"
        {...props}
      >
        {children}
      </div>
    </SwatchSelectorContext.Provider>
  );
}
