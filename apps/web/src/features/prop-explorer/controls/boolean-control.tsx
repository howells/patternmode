import React from "react";

import { FieldControl, Switch } from "@patternmode/ui";

import type { PropControlProps } from "./types";

export function BooleanControl({ currentValue, onValueChange }: PropControlProps) {
  return (
    <FieldControl
      render={() => (
        <Switch
          checked={currentValue === true}
          onCheckedChange={checked => onValueChange(checked)}
        />
      )}
    />
  );
}
