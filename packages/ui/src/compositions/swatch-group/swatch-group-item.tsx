"use client";

import { Item } from "@radix-ui/react-radio-group";
import type React from "react";

import { type SwatchSize, swatchSizeMap } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";
import { Swatch } from "../swatch";
import { useSwatchGroupContext } from "./swatch-group-context";

type SwatchGroupItemProps = Omit<
  React.ComponentProps<typeof Item>,
  "children"
> & {
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
};

/**
 * Individual swatch item within a SwatchGroup.
 * Composes the visual `Swatch` primitive with Radix RadioGroup.Item
 * for accessible single-select behavior.
 *
 * @example
 * ```tsx
 * <SwatchGroup defaultValue="c1" icon={Check}>
 *   <SwatchGroupItem color="#ff0000" value="c1" aria-label="Red" />
 *   <SwatchGroupItem color="#00ff00" value="c2" aria-label="Green" />
 * </SwatchGroup>
 * ```
 */
export function SwatchGroupItem({
  className,
  color,
  children,
  size: sizeOverride,
  ...props
}: SwatchGroupItemProps) {
  const { size, icon } = useSwatchGroupContext();
  const resolvedSize = sizeOverride ?? size;

  return (
    <Item
      className={cn(
        // Base layout — same dimensions as inner Swatch
        "relative inline-flex shrink-0 items-center justify-center rounded-full",
        swatchSizeMap[resolvedSize],

        // Focus styles
        focusRing,

        // Interaction states
        "transition-shadow hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50",

        // Selection ring via pseudo-elements (only when not using icon indicator)
        !icon && [
          // Inner ring (creates gap between color and outer ring)
          "before:pointer-events-none before:absolute before:inset-[-2px] before:rounded-full",
          "before:border before:border-background",
          "before:opacity-0 before:transition-opacity before:duration-150",
          "data-[state=checked]:before:opacity-100",

          // Outer ring (visible selection indicator)
          "after:pointer-events-none after:absolute after:inset-[-5px] after:rounded-full",
          "after:border after:border-gray-400",
          "after:opacity-0 after:transition-opacity after:duration-150",
          "data-[state=checked]:after:opacity-100",
        ],

        // Hide swatch icon when unchecked (Radix manages data-state)
        icon && "data-[state=unchecked]:[&_[data-slot=swatch-icon]]:hidden",

        className,
      )}
      data-component="swatch-group-item"
      data-slot="swatch-group-item"
      {...props}
    >
      <Swatch
        color={color}
        icon={icon}
        selected={!!icon}
        showRing={false}
        size={resolvedSize}
      >
        {children}
      </Swatch>
    </Item>
  );
}
