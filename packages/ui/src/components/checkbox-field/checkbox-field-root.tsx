"use client";

import {
  Checkbox,
  type CheckboxProps,
} from "@patternmode/ui/components/checkbox";
import { Label } from "@patternmode/ui/components/label";
import { Text } from "@patternmode/ui/components/text";
import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { useId } from "react";
import type { ComponentSize } from "../../lib/size";

export type CheckboxFieldProps = Omit<CheckboxProps, "size"> & {
  label: React.ReactNode;
  description?: React.ReactNode;
  size?: Extract<ComponentSize, "xs" | "sm">;
  checkboxClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
};

export function CheckboxField({
  label,
  description,
  className,
  checkboxClassName,
  labelClassName,
  descriptionClassName,
  id: idProp,
  size = "xs",
  disabled,
  "aria-describedby": ariaDescribedByProp,
  ...checkboxProps
}: CheckboxFieldProps) {
  const generatedId = useId();
  const checkboxId = idProp ?? generatedId;
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  const ariaDescribedBy = [ariaDescribedByProp, descriptionId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Checkbox
        aria-describedby={ariaDescribedBy || undefined}
        className={checkboxClassName}
        disabled={disabled}
        id={checkboxId}
        size={size}
        {...checkboxProps}
      />
      <div className="grid gap-1 leading-none">
        <Label
          className={cn(
            "cursor-pointer font-medium leading-none",
            disabled ? "cursor-not-allowed opacity-60" : null,
            labelClassName,
          )}
          htmlFor={checkboxId}
        >
          {label}
        </Label>
        {description ? (
          <Text
            className={descriptionClassName}
            id={descriptionId}
            size="sm"
            variant="muted"
          >
            {description}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
