"use client";

import type { IconComponent } from "@patternmode/icon/types";
import type React from "react";
import { DatePicker } from ".";

type DatePickerProps = React.ComponentProps<typeof DatePicker> & {
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  icon?: IconComponent;
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
  {
    name: "icon",
    type: "icon",
    description:
      "Icon component to display in the trigger. Defaults to Calendar icon.",
    defaultValue: "Calendar",
  },
];
