import { FieldControl } from "@patternmode/ui/components/field";
import { NumberField } from "@patternmode/ui/components/number-field";
import { defaultConfig as uiConfig } from "@patternmode/ui/config/default-config";
import React from "react";

import type { PropControlProps } from "./types";

export function NumberControl({ prop, currentValue, onValueChange }: PropControlProps) {
  // Handle default values that are function calls (like config.getIconStrokeWidth())
  let numericDefaultValue: number | undefined;
  if (prop.defaultValue === "config.getIconStrokeWidth()") {
    numericDefaultValue = uiConfig.components.iconStrokeWidth;
  }
  else if (typeof prop.defaultValue === "number") {
    numericDefaultValue = prop.defaultValue;
  }
  else if (typeof prop.defaultValue === "string" && !Number.isNaN(Number(prop.defaultValue))) {
    numericDefaultValue = Number(prop.defaultValue);
  }

  // Convert currentValue to number safely, avoiding NaN
  let numericValue: number | undefined;
  if (currentValue != null) {
    const converted = Number(currentValue);
    if (!Number.isNaN(converted)) {
      numericValue = converted;
    }
  }

  // Use either the valid numeric value or the default value
  const finalValue = numericValue != null ? numericValue : numericDefaultValue;

  return (
    <FieldControl
      render={() => (
        <NumberField
          size="xs"
          value={finalValue}
          onValueChange={value => onValueChange(value)}
          placeholder={numericDefaultValue != null ? String(numericDefaultValue) : ""}
          min={prop.min}
          max={prop.max}
          fullWidth
        />
      )}
    />
  );
}
