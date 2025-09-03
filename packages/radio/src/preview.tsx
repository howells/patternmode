"use client";

import { RadioGroup, RadioOption } from "./component";

export type RadioPreviewProps = { defaultValue?: string; disabled?: boolean };

export function RadioPreview({
  defaultValue = "a",
  disabled = false,
}: RadioPreviewProps) {
  return (
    <div className="p-4">
      <RadioGroup defaultValue={defaultValue}>
        <div className="space-y-2">
          <RadioOption disabled={disabled} label="Option A" value="a" />
          <RadioOption disabled={disabled} label="Option B" value="b" />
        </div>
      </RadioGroup>
    </div>
  );
}

export const radioPreviewProps = [
  { name: "defaultValue", type: "string", defaultValue: "a" },
  { name: "disabled", type: "boolean", defaultValue: false },
];
