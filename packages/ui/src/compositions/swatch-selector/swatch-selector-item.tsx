"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@patternmode/ui/components/tooltip";
import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

import type { SwatchSize } from "../../lib/size";
import { focusRing } from "../../utils/focus-ring";
import { Swatch } from "../swatch";
import { useSwatchSelector } from "./swatch-selector-context";

type SwatchSelectorItemProps = Omit<ComponentProps<"button">, "children"> & {
  /** Unique value for this swatch */
  value: string;
  /**
   * CSS color value (hex, rgb, hsl, etc.).
   * If provided along with children, children render on top.
   */
  color?: string;
  /**
   * Accessible label for screen readers.
   */
  "aria-label"?: string;
  /**
   * Custom content rendered inside the swatch (e.g., images).
   */
  children?: React.ReactNode;
  /**
   * Override size for this specific swatch.
   */
  size?: SwatchSize;
  /** Whether this option is unavailable (out of stock) */
  unavailable?: boolean;
};

/**
 * Individual swatch item within a SwatchSelector.
 * Button-based single-select behavior with tooltip for unavailable items.
 *
 * @example
 * ```tsx
 * <SwatchSelector value={selected} onValueChange={setSelected}>
 *   <SwatchSelectorItem color="#ff0000" value="c1" aria-label="Red" />
 *   <SwatchSelectorItem color="#00ff00" value="c2" aria-label="Green" />
 * </SwatchSelector>
 * ```
 */
export function SwatchSelectorItem({
  value,
  color,
  children,
  size: sizeOverride,
  unavailable = false,
  className,
  ...props
}: SwatchSelectorItemProps) {
  const { value: selectedValue, onValueChange, size } = useSwatchSelector();
  const resolvedSize = sizeOverride ?? size;
  const isSelected = selectedValue === value;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const button = (
    <button
      aria-label={props["aria-label"] ?? `Select ${value}`}
      aria-pressed={isSelected}
      className={cn(
        // Focus styles only - visual handled by Swatch
        "cursor-pointer rounded-full",
        focusRing,
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-component="swatch-selector-item"
      data-slot="swatch-selector-item"
      onClick={handleClick}
      type="button"
      {...props}
    >
      <Swatch
        color={color}
        selected={isSelected}
        size={resolvedSize}
        unavailable={unavailable}
      >
        {children}
      </Swatch>
    </button>
  );

  if (unavailable) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>Out of stock</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
