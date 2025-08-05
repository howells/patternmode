"use client";

import type { SelectNativeProps } from "./types";
import React from "react";
import { SelectNative } from "./component";

export function SelectNativePreview(props: SelectNativeProps) {
  return (
    <SelectNative {...props}>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </SelectNative>
  );
}

// Preview props for prop explorer
export const selectNativePreviewProps = [
  {
    name: "hasError",
    type: "boolean",
    description: "Whether to display error styling for form validation.",
    defaultValue: false,
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the select is disabled.",
    defaultValue: false,
  },
];
