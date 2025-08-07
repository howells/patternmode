import { DatePicker } from "@patternmode/ui/components/date-picker";
import { FieldControl } from "@patternmode/ui/components/field";
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
