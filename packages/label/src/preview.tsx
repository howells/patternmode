"use client";

import { Field as BaseField } from "@base-ui-components/react/field";
import { useId } from "react";
import type { LabelProps } from "./component";
import { Label } from "./component";

export function LabelPreview(props: LabelProps) {
  const id = useId();
  return (
    <BaseField.Root>
      <Label htmlFor={id} {...props}>
        {props.children || "Demo Label"}
      </Label>
      <BaseField.Control
        render={({ ref, ...controlProps }) => (
          <input
            {...controlProps}
            className="mt-2 w-full rounded border p-2"
            id={id}
            placeholder="Type here"
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
      />
    </BaseField.Root>
  );
}

export const labelPreviewProps = [
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
