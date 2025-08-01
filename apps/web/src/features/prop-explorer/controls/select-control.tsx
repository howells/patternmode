import React from "react";

import { FieldControl, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/ui";

import type { PropControlProps } from "./types";

// Helper function to get string options from a prop
function getStringOptions(prop: PropControlProps["prop"]): string[] {
  if (!prop.options) {
    return [];
  }
  if (typeof prop.options[0] === "string") {
    return prop.options as string[];
  }
  // If it's VariantOption[], extract the value property
  return (prop.options as { value: string }[]).map(opt => opt.value);
}

export function SelectControl({ prop, currentValue, onValueChange }: PropControlProps) {
  if (prop.type !== "select" || !prop.options) {
    return null;
  }

  const options = getStringOptions(prop);

  return (
    <FieldControl
      render={() => (
        <Select
          value={currentValue != null ? String(currentValue) : ""}
          onValueChange={value => onValueChange(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
