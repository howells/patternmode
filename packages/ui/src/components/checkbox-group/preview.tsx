"use client";

import React from "react";

import { CheckboxGroup, CheckboxGroupItem } from "./component";

type CheckboxGroupProps = React.ComponentPropsWithoutRef<typeof CheckboxGroup> & {
  label?: string;
  className?: string;
};

export function CheckboxGroupPreview(props: CheckboxGroupProps) {
  return (
    <CheckboxGroup label="Select options" {...props}>
      <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
      <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
      <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
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
