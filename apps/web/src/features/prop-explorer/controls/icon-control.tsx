import React from "react";

import { FieldControl, IconSelect } from "@patternmode/ui";

import type { PropControlProps } from "./types";

export function IconControl({ currentValue, onValueChange }: PropControlProps) {
  return (
    <FieldControl
      render={() => (
        <IconSelect
          value={currentValue != null ? String(currentValue) : ""}
          onValueChange={value => onValueChange(value)}
        />
      )}
    />
  );
}
