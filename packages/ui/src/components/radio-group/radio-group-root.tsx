"use client";

import { Root } from "@radix-ui/react-radio-group";
import { type ComponentPropsWithoutRef, type ReactNode, useId } from "react";

import { cn } from "../../utils/cn";
import { Label } from "../label";
import { Radio, type RadioProps } from "../radio";

export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof Root> {}

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <Root
      className={cn("grid gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

export interface RadioGroupItemProps extends RadioProps {
  children: ReactNode;
  description?: ReactNode;
}

function RadioGroupItem({
  children,
  className,
  description,
  disabled,
  id,
  ...props
}: RadioGroupItemProps) {
  const generatedId = useId();
  const resolvedId = id ?? generatedId;

  return (
    <label
      className={cn(
        "flex items-start gap-3 rounded-[calc(var(--radius-lg)-4px)] border border-transparent px-3 py-2 transition-colors",
        "has-[[data-state=checked]]:border-accent/25 has-[[data-state=checked]]:bg-accent/5",
        disabled && "cursor-not-allowed opacity-55"
      )}
      htmlFor={resolvedId}
    >
      <Radio
        className={className}
        disabled={disabled}
        id={resolvedId}
        {...props}
      />
      <div className="grid gap-1">
        <Label className="text-foreground" htmlFor={resolvedId}>
          {children}
        </Label>
        {description ? (
          <p className="text-body text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </label>
  );
}

export { RadioGroup, RadioGroupItem };
