"use client";

import type React from "react";

import { CheckboxGroup } from "./components/checkbox-group";
import { CheckboxGroupItem } from "./components/checkbox-group-item";

type CheckboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CheckboxGroup
> & {
  label?: string;
  className?: string;
};

export function CheckboxGroupPreview(props: CheckboxGroupProps) {
  return (
    <CheckboxGroup label="Select options" {...props}>
      <CheckboxGroupItem value="option1">
        Receive weekly product updates, feature announcements, and tips
      </CheckboxGroupItem>
      <CheckboxGroupItem value="option2">
        Enable advanced analytics to help improve performance and reliability
      </CheckboxGroupItem>
      <CheckboxGroupItem value="option3">
        Participate in beta programs and early access to experimental features
      </CheckboxGroupItem>
    </CheckboxGroup>
  );
}

// Preview props for prop explorer
export const checkboxGroupPreviewProps = [
  {
    name: "label",
    type: "string",
    description: "Optional label text displayed above the checkbox group.",
    defaultValue: "Select options",
  },
];
