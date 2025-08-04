"use client";

import React from "react";
import type { Field as BaseField } from "@base-ui-components/react/field";
import { Input } from "../input/component";
import { Field, FieldControl, FieldDescription, FieldLabel } from "./component";

type FieldProps = React.ComponentPropsWithoutRef<typeof BaseField.Root>;

export function FieldExample(props: FieldProps) {
  return (
    <Field {...props}>
      <FieldLabel>Email</FieldLabel>
      <FieldControl>
        <Input type="email" placeholder="Enter your email" />
      </FieldControl>
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  );
}

// Preview props for prop explorer
export const FieldPreviewProps = [
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the field and its controls are disabled.",
    defaultValue: false,
  },
  {
    name: "invalid",
    type: "boolean",
    description: "Whether the field has validation errors.",
    defaultValue: false,
  },
];
