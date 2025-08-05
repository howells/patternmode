"use client";

import type { CheckboxProps } from "./types";
import React from "react";
import { Checkbox } from "./component";

export function CheckboxPreview(props: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox {...props} />
      <label className="text-sm font-medium leading-none">
        {props.children || "I agree to the terms and conditions"}
      </label>
    </div>
  );
}

// Preview props for prop explorer
export const checkboxPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Label text for the checkbox.",
    defaultValue: "I agree to the terms and conditions",
  },
  {
    name: "checked",
    type: "select",
    description: "Checked state of the checkbox.",
    options: [
      { label: "Unchecked", value: false },
      { label: "Checked", value: true },
      { label: "Indeterminate", value: "indeterminate" },
    ],
    defaultValue: false,
  },
  {
    name: "defaultChecked",
    type: "boolean",
    description: "Whether the checkbox is initially checked.",
    defaultValue: false,
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the checkbox is disabled.",
    defaultValue: false,
  },
  {
    name: "required",
    type: "boolean",
    description: "Whether the checkbox is required.",
    defaultValue: false,
  },
];
