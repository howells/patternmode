"use client";

import { NumberField } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  NumberFieldExample = ({
    label = "Quantity",
    placeholder = "Enter number...",
    defaultValue,
    min,
    max,
    step = 1,
    disabled = false,
    showSteppers = true,
    showScrubArea = true,
    fullWidth = false,
    ...props
  }: {
    label?: string;
    placeholder?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    showSteppers?: boolean;
    showScrubArea?: boolean;
    fullWidth?: boolean;
    [key: string]: unknown;
  }) => {
    return (
      <div className={fullWidth ? "w-full" : "w-fit"}>
        <NumberField
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          showSteppers={showSteppers}
          showScrubArea={showScrubArea}
          fullWidth={fullWidth}
          {...props}
        />
      </div>
    );
  };
