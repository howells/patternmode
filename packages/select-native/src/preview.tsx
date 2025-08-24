"use client";

import type { Size } from "@patternmode/config/sizes";
import { SelectNative } from "./component";

type SelectNativePreviewProps = { size?: Size; hasError?: boolean; disabled?: boolean };

export function SelectNativePreview({ size, hasError, disabled }: SelectNativePreviewProps) {
  return (
    <div className="p-4">
      <SelectNative size={size} hasError={hasError} disabled={disabled} defaultValue="" className="w-[220px]">
        <option value="" disabled>
          Select an option
        </option>
        <optgroup label="Fruits">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </optgroup>
      </SelectNative>
    </div>
  );
}

export const selectNativePreviewProps = [
  { name: "size", type: "select", options: ["xs", "sm", "base", "lg"], defaultValue: "base" },
  { name: "hasError", type: "boolean", defaultValue: false },
  { name: "disabled", type: "boolean", defaultValue: false },
];

