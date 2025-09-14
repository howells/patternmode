"use client";

import type { Field as BaseField } from "@base-ui-components/react/field";
import type React from "react";
import { Field, FieldControl, FieldDescription, FieldLabel } from ".";

type FieldProps = React.ComponentPropsWithoutRef<typeof BaseField.Root>;

export function FieldPreview(props: FieldProps) {
  return (
    <Field {...props}>
      <FieldLabel>Email</FieldLabel>
      <FieldControl
        render={({ ref, className, ...controlProps }) => (
          <input
            {...controlProps}
            className={
              // simple, neutral input styling for the preview
              "w-full rounded-md border px-3 py-2 text-sm outline-hidden" +
              "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50" +
              "border-zinc-300 focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-800"
            }
            placeholder="Enter your email"
            ref={ref as React.Ref<HTMLInputElement>}
            type="email"
          />
        )}
      />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  );
}

// Preview props for prop explorer
export const fieldPreviewProps = [
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
