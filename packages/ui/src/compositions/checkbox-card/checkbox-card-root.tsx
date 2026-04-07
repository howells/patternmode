"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { CheckboxCardContext } from "./checkbox-card-context";

export interface CheckboxCardGroupProps extends React.ComponentProps<"div"> {
  /** Controlled checked values */
  checkedValues?: string[];
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Icon to display instead of the indicator */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Position of the indicator/icon */
  indicatorSide?: "start" | "end";
  /** Name for form submission */
  name?: string;
  /** Callback when an item changes */
  onCheckedChange?: (value: string, checked: boolean) => void;
  /** Whether the group is required */
  required?: boolean;
  showIndicator?: boolean;
  size?: ComponentSize;
}

/**
 * CheckboxCardGroup UI component.
 * Import from "@patternmode/ui/compositions/checkbox-card".
 */
export function CheckboxCardGroup({
  className,
  checkedValues,
  showIndicator = true,
  size = "base",
  indicatorSide = "start",
  icon,
  disabled,
  name,
  onCheckedChange,
  required,
  ...props
}: CheckboxCardGroupProps) {
  return (
    <CheckboxCardContext.Provider
      value={{
        showIndicator,
        size,
        indicatorSide,
        icon,
        disabled,
        name,
        onCheckedChange,
        required,
        value: checkedValues,
      }}
    >
      <div
        className={cn("grid gap-3", className)}
        data-component="checkbox-card-group"
        data-slot="checkbox-card-group"
        {...props}
      />
    </CheckboxCardContext.Provider>
  );
}
