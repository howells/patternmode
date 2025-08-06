import React from "react";

import { FieldControl } from "@patternmode/ui/components/field";
import { Switch } from "@patternmode/ui/components/switch";

import type { PropControlProps } from "./types";

export function BooleanControl({ currentValue, onValueChange }: PropControlProps) {
  return (
    <FieldControl
      render={() => (
        <Switch
          size="xs"
          checked={currentValue === true}
          onCheckedChange={checked => onValueChange(checked)}
        />
      )}
    />
  );
}
