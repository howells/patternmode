import React from "react";

import { DatePicker } from "@patternmode/ui/components/date-picker";
import { FieldControl } from "@patternmode/ui/components/field";

import type { PropControlProps } from "./types";

export function DateControl({ currentValue, onValueChange }: PropControlProps) {
  return (
    <FieldControl
      render={() => (
        <DatePicker
          value={currentValue instanceof Date ? currentValue : undefined}
          onChange={date => onValueChange(date)}
          placeholder="Select date"
        />
      )}
    />
  );
}
