"use client";

import React from "react";
import { Switch } from "./component";

export type SwitchPreviewProps = { checked?: boolean; disabled?: boolean };

export function SwitchPreview({
  checked = false,
  disabled = false,
}: SwitchPreviewProps) {
  const [on, setOn] = React.useState(checked);
  return (
    <div className="p-6">
      <Switch checked={on} disabled={disabled} onChange={setOn} />
    </div>
  );
}

export const switchPreviewProps = [
  { name: "checked", type: "boolean", defaultValue: false },
  { name: "disabled", type: "boolean", defaultValue: false },
];
