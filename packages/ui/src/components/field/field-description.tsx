"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";
import { useFieldContext } from "./field-context";

function FieldDescription({
  className,
  id,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  const context = useFieldContext();

  return (
    <p
      className={cn("text-body text-muted-foreground", className)}
      data-slot="field-description"
      id={id ?? context?.descriptionId}
      {...props}
    />
  );
}

export { FieldDescription };
