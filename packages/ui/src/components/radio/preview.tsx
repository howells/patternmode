"use client";

import type { RadioOptionProps } from "./types";
import React from "react";
import { RadioOption } from "./component";

export function RadioPreview(props: RadioOptionProps) {
  return (
    <div className="flex items-center space-x-2">
      <RadioOption value="option1" label="Radio Option" {...props} />
    </div>
  );
}

// Preview props for prop explorer
export const radioPreviewProps = [
  {
    name: "label",
    type: "string",
    description: "The text label for the radio option.",
    defaultValue: "Radio Option",
  },
  {
    name: "description",
    type: "string",
    description: "Optional description text shown below the label.",
    defaultValue: "",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the radio option is disabled.",
    defaultValue: false,
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting radio button and text sizing.",
    options: ["xs", "sm", "base", "lg"],
    defaultValue: "base",
  },
];
