import React from "react";

import { FieldControl } from "@patternmode/ui/components/field";
import { IconSelect } from "@patternmode/ui/components/icon-select";

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
