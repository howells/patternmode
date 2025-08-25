import { DatePicker } from "@patternmode/date-picker";
import { FieldControl } from "@patternmode/field";
import React from "react";

import type { PropControlProps } from "./types";

export function DateControl({ currentValue, onValueChange }: PropControlProps) {
  return (
    <FieldControl
      render={() => (
        <DatePicker
          size="xs"
          value={currentValue instanceof Date ? currentValue : undefined}
          onValueChange={date => onValueChange(date)}
          placeholder="Select date"
        />
      )}
    />
  );
}
