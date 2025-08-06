import React from "react";

import { FieldControl } from "@patternmode/ui/components/field";
import { IconSelect } from "@patternmode/ui/components/icon-select";
import { getIconComponent } from "@patternmode/ui/lib/icon-registry";

import type { PropControlProps } from "./types";

export function IconControl({ currentValue, onValueChange }: PropControlProps) {
  // Convert current icon component back to string for display
  const currentStringValue = React.useMemo(() => {
    if (!currentValue) return "";
    if (typeof currentValue === "string") return currentValue;
    // Try to find the icon name by comparing components (fallback)
    return "";
  }, [currentValue]);

  return (
    <FieldControl
      render={() => (
        <IconSelect
          size="xs"
          value={currentStringValue}
          onValueChange={value => {
            // Convert string icon name to actual icon component
            const iconComponent = value ? getIconComponent(value) : null;
            onValueChange(iconComponent);
          }}
        />
      )}
    />
  );
}
