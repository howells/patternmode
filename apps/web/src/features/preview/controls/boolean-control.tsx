import { FieldControl } from "@patternmode/field";
import { Switch } from "@patternmode/switch";

import type { PropControlProps } from "./types";

export function BooleanControl({
  currentValue,
  onValueChange,
}: PropControlProps) {
  return (
    <FieldControl
      render={() => (
        <Switch
          checked={currentValue === true}
          onCheckedChange={(checked: boolean) => onValueChange(checked)}
          size="xs"
        />
      )}
    />
  );
}
