"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root } from "@radix-ui/react-tabs";
import { useId, useState } from "react";
import type { ComponentSize } from "../../lib/size";
import { TabsContext } from "./tabs-context";

/** Props for the Tabs root component. */
export type TabsProps = React.ComponentProps<typeof Root> & {
  /** Visual style variant. "pill" renders filled tab buttons, "line" renders underlined tabs. */
  variant?: "pill" | "line";
  /** Size of the tab buttons following the design system scale. */
  size?: ComponentSize;
  /** When true, tabs fill container width with equal proportional widths. */
  fullWidth?: boolean;
};

/**
 * Tabbed interface component with animated indicator.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
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
}: TabsProps) {
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
