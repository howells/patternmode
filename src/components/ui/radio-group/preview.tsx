"use client";

import { useState } from "react";
import { RadioOption } from "@patternmode/ui";
import { RadioGroup } from "@patternmode/ui";

interface RadioGroupExampleProps {
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  [key: string]: unknown;
}

export function RadioGroupExample({
  orientation = "vertical",
  size = "md",
  disabled = false,
  value: controlledValue,
  defaultValue,
  name,
  required,
  ...props
}: RadioGroupExampleProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "option2");

  // Use controlled value if provided, otherwise use internal state
  const currentValue =
    controlledValue !== undefined ? controlledValue : internalValue;
  const handleChange =
    controlledValue !== undefined
      ? () => {} // No-op for controlled mode
      : (value: unknown) => setInternalValue(value as string);

  return (
    <RadioGroup
      value={currentValue}
      onValueChange={handleChange}
      orientation={orientation}
      size={size}
      disabled={disabled}
      name={name}
      required={required}
      {...props}
    >
      <RadioOption
        value="option1"
        label="Option 1"
        size={size}
        disabled={disabled}
      />
      <RadioOption
        value="option2"
        label="Option 2"
        size={size}
        disabled={disabled}
      />
      <RadioOption
        value="option3"
        label="Option 3"
        size={size}
        disabled={disabled}
      />
    </RadioGroup>
  );
}
