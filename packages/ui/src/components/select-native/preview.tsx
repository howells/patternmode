"use client";

import type { Size } from "../../lib/component-config-types";
import React from "react";
import { sizes } from "../../lib/component-config-types";
import { SelectNative } from "./component";

type SelectNativePreviewProps = {
  size?: Size;
  hasError?: boolean;
  disabled?: boolean;
};

export function SelectNativePreview(props: SelectNativePreviewProps) {
  const { size, hasError, disabled } = props;
  return (
    <SelectNative size={size} hasError={hasError} disabled={disabled}>
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
    name: "size",
    type: "select",
    description: "Size variant of the select input.",
    defaultValue: "base",
    options: sizes,
  },
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
