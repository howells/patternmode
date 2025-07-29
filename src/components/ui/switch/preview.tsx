"use client";

import { useState } from "react";
import { Switch } from "@patternmode/ui";

interface SwitchExampleProps {
  size?: "default" | "small";
  disabled?: boolean;
  label?: string;
  checked?: boolean;
  [key: string]: unknown;
}

export function SwitchExample({
  size = "default",
  disabled = false,
  label,
  checked: controlledChecked,
  ...props
}: SwitchExampleProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  // Use controlled value if provided, otherwise use internal state
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  // Always allow the switch to be toggled - update internal state for demo purposes
  const handleChange = (checked: boolean) => {
    setInternalChecked(checked);
  };

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={handleChange}
      size={size}
      disabled={disabled}
      label={label}
      {...props}
    />
  );
}
