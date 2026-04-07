"use client";

import { type ReactNode, useId } from "react";

import { cn } from "../../utils/cn";
import { Checkbox, type CheckboxProps } from "../checkbox";
import { Label } from "../label";

export type CheckboxFieldProps = Omit<CheckboxProps, "size"> & {
  checkboxClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  label: ReactNode;
  labelClassName?: string;
  size?: "sm" | "base";
};

function CheckboxField({
  checkboxClassName,
  className,
  description,
  descriptionClassName,
  disabled,
  id: providedId,
  label,
  labelClassName,
  size = "sm",
  ...checkboxProps
}: CheckboxFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Checkbox
        aria-describedby={descriptionId}
        className={checkboxClassName}
        disabled={disabled}
        id={id}
        size={size}
        {...checkboxProps}
      />
      <div className="grid gap-1 leading-none">
        <Label
          className={cn(
            "cursor-pointer font-medium leading-none",
            disabled && "cursor-not-allowed opacity-60",
            labelClassName
          )}
          htmlFor={id}
        >
          {label}
        </Label>
        {description ? (
          <p
            className={cn(
              "text-body text-muted-foreground",
              descriptionClassName
            )}
            id={descriptionId}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export { CheckboxField };
