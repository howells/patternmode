"use client";

import type { LabelProps } from "./component";
import { Label } from "./component";

export function LabelPreview(props: LabelProps) {
  return (
    <div>
      <Label htmlFor="demo-input" {...props}>
        {props.children || "Demo Label"}
      </Label>
      <input id="demo-input" className="mt-2 w-full rounded border p-2" />
    </div>
  );
}

export const labelPreviewProps = [
  { name: "children", type: "string", description: "Label text content.", defaultValue: "Demo Label" },
  { name: "disabled", type: "boolean", description: "Whether the label should appear disabled.", defaultValue: false },
  { name: "htmlFor", type: "string", description: "ID of the form control this label is associated with.", defaultValue: "demo-input" },
  { name: "className", type: "string", description: "Additional CSS classes for custom styling.", defaultValue: "" }
];

