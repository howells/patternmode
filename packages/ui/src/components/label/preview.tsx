"use client";

import type { LabelProps } from "./component";
import React from "react";
import { Field } from "../field/component";
import { Label } from "./component";

export function LabelExample(props: LabelProps) {
  return (
    <Field>
      <Label htmlFor="demo-input" {...props}>
        {props.children || "Demo Label"}
      </Label>
    </Field>
  );
}

// Preview props for prop explorer
export const LabelPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Label text content.",
    defaultValue: "Demo Label",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the label should appear disabled.",
    defaultValue: false,
  },
  {
    name: "htmlFor",
    type: "string",
    description: "ID of the form control this label is associated with.",
    defaultValue: "demo-input",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for custom styling.",
    defaultValue: "",
  },
];
