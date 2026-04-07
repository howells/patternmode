"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root as RadioGroupRoot } from "@radix-ui/react-radio-group";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { ComponentSize } from "../../lib/size";
import { RadioCardContext } from "./radio-card-context";

export interface RadioCardGroupProps
  extends Omit<React.ComponentProps<typeof RadioGroupRoot>, "asChild"> {
  /** Icon to display instead of the indicator */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Position of the indicator/icon */
  indicatorSide?: "start" | "end";
  layout?: "grid" | "inline";
  /** Only show icon when item is selected (for selection indicators like Check) */
  showIconOnlyWhenSelected?: boolean;
  showIndicator?: boolean;
  size?: ComponentSize;
}

/**
 * RadioCardGroup UI component.
 * Import from "@patternmode/ui/compositions/radio-card".
 * Built on Radix UI primitives for accessible behavior.
 */
export function RadioCardGroup({
  className,
  showIndicator = true,
  size = "base",
  layout = "grid",
  indicatorSide = "start",
  icon,
  showIconOnlyWhenSelected,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  required,
  ...props
}: RadioCardGroupProps) {
  // Track internal value for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? "",
  );

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value === undefined ? internalValue : value;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <RadioCardContext.Provider
      value={{
        showIndicator,
        size,
        value: currentValue,
        name,
        disabled,
        required,
        onValueChange: handleValueChange,
        indicatorSide,
        icon,
        showIconOnlyWhenSelected,
      }}
    >
      <RadioGroupRoot
        className={cn(
          layout === "inline" ? "flex flex-wrap gap-1.5" : "grid gap-3",
          className,
        )}
        data-component="radio-card-group"
        data-slot="radio-card-group"
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onValueChange={handleValueChange}
        required={required}
        value={value}
        {...props}
      />
    </RadioCardContext.Provider>
  );
}
