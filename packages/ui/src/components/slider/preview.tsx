"use client";

import { Slider } from "@patternmode/ui";
import React, { useState } from "react";

interface SliderExampleProps {
  showValue?: boolean;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[] | string;
  [key: string]: unknown;
}

export function SliderExample({
  showValue = false,
  orientation = "horizontal",
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  ...props
}: SliderExampleProps) {
  // Parse defaultValue if it's a string (from prop explorer)
  const parsedDefaultValue = React.useMemo(() => {
    if (typeof defaultValue === "string") {
      try {
        return JSON.parse(defaultValue);
      }
      catch {
        return [50];
      }
    }
    return defaultValue || [50];
  }, [defaultValue]);

  const [internalValue, setInternalValue] = useState(parsedDefaultValue);

  // Use controlled value if provided, otherwise use internal state
  const currentValue
    = controlledValue !== undefined ? controlledValue : internalValue;

  // Always allow the slider to be moved - update internal state for demo purposes
  const handleChange = (value: number | readonly number[]) => {
    const valueArray = Array.isArray(value) ? value : [value];
    setInternalValue(valueArray);
  };

  if (orientation === "vertical") {
    return (
      <div className="h-64 w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Slider
            value={currentValue}
            onValueChange={handleChange}
            min={min}
            max={max}
            step={step}
            showValue={showValue}
            disabled={disabled}
            orientation={orientation}
            style={{ height: "192px" }}
            {...props}
          />
        </div>
      </div>
    );
  }

  return (
    <Slider
      value={currentValue}
      onValueChange={handleChange}
      min={min}
      max={max}
      step={step}
      showValue={showValue}
      disabled={disabled}
      orientation={orientation}
      {...props}
    />
  );
}
