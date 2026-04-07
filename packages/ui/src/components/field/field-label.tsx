import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";
import { Label } from "../label";
import { useFieldContext } from "./field-context";

function FieldLabel({
  className,
  htmlFor,
  ...props
}: ComponentPropsWithoutRef<typeof Label>) {
  const context = useFieldContext();

  return (
    <Label
      className={cn("w-fit", className)}
      htmlFor={htmlFor ?? context?.fieldId}
      {...props}
    />
  );
}

export { FieldLabel };
