"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root } from "@radix-ui/react-tabs";
import { useId, useState } from "react";
import type { ComponentSize } from "../../lib/size";
import { TabsContext } from "./tabs-context";

/**
 * Tabs UI component.
 * Import from "@patternmode/ui/components/tabs".
 * Built on Radix UI primitives for accessible behavior.
 */
export function Tabs({
  className,
  variant = "pill",
  size = "base",
  fullWidth = false,
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof Root> & {
  variant?: "pill" | "line";
  size?: ComponentSize;
  /** When true, tabs fill container width with equal proportional widths */
  fullWidth?: boolean;
}) {
  // Unique ID for this Tabs instance (used for indicator layoutId)
  const instanceId = useId();

  // Track active value for animated indicator
  const [activeValue, setActiveValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setActiveValue(newValue);
    onValueChange?.(newValue);
  };

  // For controlled mode, use the value prop
  const currentValue = value ?? activeValue;

  return (
    <TabsContext.Provider
      value={{
        variant,
        size,
        activeValue: currentValue,
        fullWidth,
        instanceId,
      }}
    >
      <Root
        className={cn("flex flex-col gap-2", className)}
        data-component="tabs"
        data-slot="tabs"
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        value={value}
        {...props}
      />
    </TabsContext.Provider>
  );
}
