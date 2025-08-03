"use client";

import type { NumberFieldProps } from "./component";
import React from "react";
import { NumberField } from "./component";

export function NumberFieldExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="Enter quantity" defaultValue={5} min={0} max={100} {...props} />;
}

// Preview props for prop explorer
export const NumberFieldPreviewProps = [
  {
    name: "label",
    type: "string",
    description: "Optional label text for the field.",
    defaultValue: "Quantity",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text for the input element.",
    defaultValue: "Enter quantity",
  },
  {
    name: "defaultValue",
    type: "number",
    description: "Default value for the number field.",
    defaultValue: 5,
  },
  {
    name: "min",
    type: "number",
    description: "Minimum allowed value.",
    defaultValue: 0,
  },
  {
    name: "max",
    type: "number",
    description: "Maximum allowed value.",
    defaultValue: 100,
  },
  {
    name: "showScrubArea",
    type: "boolean",
    description: "Whether to show the interactive scrub area on the label.",
    defaultValue: true,
  },
  {
    name: "showSteppers",
    type: "boolean",
    description: "Whether to show increment/decrement buttons.",
    defaultValue: true,
  },
  {
    name: "fullWidth",
    type: "boolean",
    description: "Whether the field should take full width of its container.",
    defaultValue: false,
  },
];
