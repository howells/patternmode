"use client";

import React from "react";
import { Checkbox } from "./component";

export type CheckboxPreviewProps = { checked?: boolean | "indeterminate"; disabled?: boolean };

export function CheckboxPreview({ checked, disabled }: CheckboxPreviewProps) {
  const [state, setState] = React.useState<boolean | "indeterminate" | undefined>(checked);
  return (
    <div className="p-6">
      <label className="flex items-center gap-2">
        <Checkbox checked={state} disabled={disabled} onCheckedChange={(v: any) => setState(v as any)} />
        <span className="text-sm">{String(state ?? "unchecked")}</span>
      </label>
    </div>
  );
}

export const checkboxPreviewProps = [
  { name: "checked", type: "select", options: [true, false, "indeterminate"], defaultValue: false },
  { name: "disabled", type: "boolean", defaultValue: false },
];

