"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { useInputGroup } from "./input-group-context";
import type {
  InputGroupAddonAlign,
  InputGroupAddonVariant,
} from "./input-group-types";
import { inputGroupAddonMutedVariants } from "./input-group-variants";

export type InputGroupAddonProps = React.ComponentProps<"div"> & {
  /** Alignment of the addon within the input group. */
  align?: InputGroupAddonAlign;
  /** Visual variant of the addon. */
  variant?: InputGroupAddonVariant;
};

/**
 * Addon element for InputGroup.
 * Used for text labels, currency symbols, or icons.
 *
 * @example
 * ```tsx
 * <InputGroup size="base">
 *   <InputGroupAddon variant="muted">$</InputGroupAddon>
 *   <InputGroupInput placeholder="0.00" />
 *   <InputGroupAddon align="inline-end" variant="muted">USD</InputGroupAddon>
 * </InputGroup>
 * ```
 */
export function InputGroupAddon({
  className,
  align = "inline-start",
  variant = "default",
  children,
  ...props
}: InputGroupAddonProps) {
  const { size } = useInputGroup();

  if (variant === "muted") {
    return (
      <div
        className={cn(
          inputGroupAddonMutedVariants({ size, align }),
          // Height adjustments for muted variant
          align === "inline-start" && "h-full",
          align === "inline-end" && "h-full",
          className,
        )}
        data-component="input-group-addon"
        data-slot="input-group-addon"
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center text-muted-foreground",
        // Position-based styling for default variant
        align === "inline-start" && "order-first",
        align === "inline-end" && "order-last",
        align === "block-start" && "self-start",
        align === "block-end" && "self-end",
        className,
      )}
      data-component="input-group-addon"
      data-slot="input-group-addon"
      {...props}
    >
      {children}
    </div>
  );
}
