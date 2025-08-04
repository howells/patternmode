"use client";

import React from "react";
import { DatePicker } from "./component";

type DatePickerProps = React.ComponentProps<typeof DatePicker> & {
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
};

export function DatePickerPreview(props: DatePickerProps) {
  return <DatePicker placeholder="Select a date" {...props} />;
}

// Preview props for prop explorer
export const datePickerPreviewProps = [
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text displayed when no date is selected.",
    defaultValue: "Select a date",
  },
  {
    name: "hasError",
    type: "boolean",
    description: "Whether to display error styling for validation.",
    defaultValue: false,
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the date picker is disabled.",
    defaultValue: false,
  },
];
