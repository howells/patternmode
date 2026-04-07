"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";
import { FieldProvider } from "./field-context";

const FIELD_ORIENTATION_CLASSES = {
  vertical: "flex-col",
  horizontal: "flex-row items-start gap-6",
} as const;

export interface FieldProps extends ComponentPropsWithoutRef<"fieldset"> {
  orientation?: keyof typeof FIELD_ORIENTATION_CLASSES;
}

function Field({
  children,
  className,
  id,
  orientation = "vertical",
  ...props
}: FieldProps) {
  return (
    <FieldProvider id={id}>
      <fieldset
        className={cn(
          "flex w-full min-w-0 gap-2",
          FIELD_ORIENTATION_CLASSES[orientation],
          className
        )}
        data-orientation={orientation}
        data-slot="field"
        style={{ margin: 0, minWidth: 0, padding: 0 }}
        {...props}
      >
        {children}
      </fieldset>
    </FieldProvider>
  );
}

export { Field };
