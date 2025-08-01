import React from "react";

import { DatePicker, FieldControl } from "@patternmode/ui";

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
