"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

export interface SimpleSelectOption {
  /** Display label */
  label: string;
  /** Option value */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface SimpleSelectProps {
  /** Additional classes for the trigger */
  className?: string;
  /** Controlled value */
  defaultValue?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Change handler */
  onValueChange?: (value: string) => void;
  /** Options array */
  options: SimpleSelectOption[];
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Size variant */
  size?: "sm" | "base" | "lg";
  /** Controlled value */
  value?: string;
}

/**
 * Simplified select component — single-component alternative to the compound
 * Select/SelectTrigger/SelectContent/SelectItem pattern.
 *
 * Use when you have a flat list of options and don't need groups, separators,
 * or custom item rendering.
 *
 * @example
 * ```tsx
 * <SimpleSelect
 *   placeholder="Choose a framework"
 *   options={[
 *     { label: "React", value: "react" },
 *     { label: "Vue", value: "vue" },
 *     { label: "Svelte", value: "svelte" },
 *   ]}
 *   onValueChange={(val) => console.log(val)}
 * />
 * ```
 */
export function SimpleSelect({
  className,
  defaultValue,
  disabled,
  onValueChange,
  options,
  placeholder = "Select...",
  size = "base",
  value,
}: SimpleSelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onValueChange}
      value={value}
    >
      <SelectTrigger className={cn(className)} size={size}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            disabled={option.disabled}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
