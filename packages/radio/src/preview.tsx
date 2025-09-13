"use client";

import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

export type RadioPreviewProps = { defaultValue?: string; disabled?: boolean };

export function RadioPreview({
  defaultValue = "a",
  disabled = false,
}: RadioPreviewProps) {
  return (
    <div className="p-4">
      <BaseRadioGroup defaultValue={defaultValue}>
        <div className="space-y-2">
          <BaseRadio.Root disabled={disabled} nativeButton value="a">
            Option A
          </BaseRadio.Root>
          <BaseRadio.Root disabled={disabled} nativeButton value="b">
            Option B
          </BaseRadio.Root>
        </div>
      </BaseRadioGroup>
    </div>
  );
}

export const radioPreviewProps = [
  { name: "defaultValue", type: "string", defaultValue: "a" },
  { name: "disabled", type: "boolean", defaultValue: false },
];
