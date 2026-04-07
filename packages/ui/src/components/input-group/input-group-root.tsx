"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useMemo } from "react";
import type { Radius } from "../../lib/radius";
import { InputGroupContext } from "./input-group-context";
import type { InputGroupSize } from "./input-group-types";
import { inputGroupVariants } from "./input-group-variants";

export type InputGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants> & {
    /** Size of the input group and its children. */
    size?: InputGroupSize;
    /** Border radius style. */
    radius?: Radius;
    /** Show error styling. */
    hasError?: boolean;
    /** Disable the input group and its children. */
    disabled?: boolean;
  };

/**
 * Composition container for inputs with addons, icons, and buttons.
 * Import from "@patternmode/ui/components/input-group".
 *
 * @example
 * ```tsx
 * <InputGroup size="base">
 *   <InputGroupIcon icon={Search} />
 *   <InputGroupInput placeholder="Search..." />
 *   <InputGroupButton icon={X} onClick={clear} />
 * </InputGroup>
 * ```
 */
export function InputGroup({
  className,
  size = "base",
  radius = "rounded",
  hasError = false,
  disabled = false,
  children,
  ...props
}: InputGroupProps) {
  const contextValue = useMemo(
    () => ({ size, radius, disabled, hasError }),
    [size, radius, disabled, hasError],
  );

  return (
    <InputGroupContext.Provider value={contextValue}>
      <div
        aria-invalid={hasError || undefined}
        className={cn(
          inputGroupVariants({ size, radius }),
          // Clip addon backgrounds to border radius
          "overflow-hidden",
          // Focus ring when any input-group-control inside is focused
          "has-[[data-slot=input-group-control]:focus-visible]:ring-2",
          "has-[[data-slot=input-group-control]:focus-visible]:ring-gray-400/50",
          "has-[[data-slot=input-group-control]:focus-visible]:border-border",
          // Error styling
          hasError && [
            "ring-[3px]",
            "border-destructive",
            "ring-destructive/20",
            "dark:ring-destructive/40",
          ],
          // Disabled styling
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        data-component="input-group"
        data-slot="input-group"
        {...props}
      >
        {children}
      </div>
    </InputGroupContext.Provider>
  );
}
