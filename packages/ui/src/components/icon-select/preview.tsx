"use client";

import { IconSelect } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  IconSelectExample = ({
    placeholder = "Select an icon...",
    value,
    onValueChange,
    iconStrokeWidth,
    ...props
  }: {
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    iconStrokeWidth?: number;
    [key: string]: unknown;
  }) => {
    const [localValue, setLocalValue] = React.useState(value || "");

    const handleValueChange = React.useCallback((newValue: string) => {
      setLocalValue(newValue);
      onValueChange?.(newValue);
    }, [onValueChange]);

    return (
      <div className="w-64">
        <IconSelect
          placeholder={placeholder}
          value={localValue}
          onValueChange={handleValueChange}
          iconStrokeWidth={iconStrokeWidth}
          {...props}
        />
      </div>
    );
  };

// Default export for the preview system
export function Example() {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Icon Select</h3>
        <IconSelectExample
          placeholder="Choose an icon..."
          value={value}
          onValueChange={setValue}
        />
      </div>

      {value && (
        <div className="text-sm text-zinc-600">
          <strong>Selected:</strong>
          {" "}
          {value}
        </div>
      )}
    </div>
  );
}
