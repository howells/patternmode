"use client";

import type { FieldsetProps } from "./component";
import React from "react";
import { Field, FieldControl, FieldLabel } from "../field/component";
import { Fieldset, FieldsetLegend } from "./component";

export function FieldsetPreview(props: FieldsetProps) {
  return (
    <Fieldset {...props}>
      <FieldsetLegend>Personal Information</FieldsetLegend>
      <div className="space-y-4">
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <FieldControl placeholder="Enter your first name" />
        </Field>
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <FieldControl placeholder="Enter your last name" />
        </Field>
      </div>
    </Fieldset>
  );
}

// Preview props for prop explorer
export const fieldsetPreviewProps = [
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the fieldset and its controls are disabled.",
    defaultValue: false,
  },
  {
    name: "name",
    type: "string",
    description: "Name for the fieldset group used for form organization.",
    defaultValue: "",
  },
];
