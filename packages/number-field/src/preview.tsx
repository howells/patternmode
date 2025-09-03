"use client";

import React from "react";
import { NumberField } from "./component";

export type NumberFieldPreviewProps = {
  defaultValue?: number;
  disabled?: boolean;
  showSteppers?: boolean;
};

export function NumberFieldPreview({
  defaultValue = 0,
  disabled = false,
  showSteppers = true,
}: NumberFieldPreviewProps) {
  const [value, setValue] = React.useState<number>(defaultValue);
  return (
    <NumberField
      disabled={disabled}
      label="Amount"
      onValueChange={(v: number | null) => setValue(v ?? 0)}
      showScrubArea
      showSteppers={showSteppers}
      value={value}
    />
  );
}

export const numberFieldPreviewProps = [
  { name: "defaultValue", type: "number", defaultValue: 0 },
  { name: "disabled", type: "boolean", defaultValue: false },
  { name: "showSteppers", type: "boolean", defaultValue: true },
];
