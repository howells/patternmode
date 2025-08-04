import React from "react";

import { FieldControl } from "@patternmode/ui/components/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/ui/components/select";

import type { PropControlProps } from "./types";

// Helper function to get string options from a prop
function getStringOptions(prop: PropControlProps["prop"]): string[] {
  if (!prop.options) {
    return [];
  }
  
  // Type guard to check if it's a string array
  const isStringArray = (arr: any[]): arr is string[] => {
    return arr.length > 0 && typeof arr[0] === "string";
  };
  
  if (isStringArray(prop.options)) {
    return prop.options;
  }
  
  // Handle object array with value property
  return prop.options.map(opt => {
    if (typeof opt === "object" && opt !== null && "value" in opt) {
      return opt.value;
    }
    return String(opt);
  });
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
