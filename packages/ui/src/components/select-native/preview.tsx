"use client";

import { SelectNative } from "@patternmode/ui";
import { useState } from "react";

interface SelectNativeExampleProps {
  hasError?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  size?: number;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
}

export function SelectNativeExample({
  hasError = false,
  disabled = false,
  multiple = false,
  size,
  value: controlledValue,
  defaultValue,
  required = false,
  name,
  placeholder = "Choose an option",
}: SelectNativeExampleProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  // Use controlled value if provided, otherwise use internal state
  const currentValue
    = controlledValue !== undefined ? controlledValue : internalValue;

  // Always allow the select to change - update internal state for demo purposes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalValue(e.target.value);
  };

  return (
    <SelectNative
      value={currentValue}
      onChange={handleChange}
      hasError={hasError}
      disabled={disabled}
      multiple={multiple}
      size={size}
      required={required}
      name={name}
    >
      <option value="">{placeholder}</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <optgroup label="Advanced Options">
        <option value="advanced1">Advanced Option 1</option>
        <option value="advanced2">Advanced Option 2</option>
      </optgroup>
    </SelectNative>
  );
}
