"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { useInputGroup } from "./input-group-context";
import { inputGroupControlVariants } from "./input-group-variants";

export type InputGroupInputProps = Omit<
  React.ComponentProps<"input">,
  "size"
> & {
  /** Test ID for testing. */
  testId?: string;
};

/**
 * Input element for use inside InputGroup.
 * Inherits size from InputGroup context.
 *
 * @example
 * ```tsx
 * <InputGroup size="base">
 *   <InputGroupInput placeholder="Enter text..." />
 * </InputGroup>
 * ```
 */
export function InputGroupInput({
  className,
  type = "text",
  testId,
  disabled: disabledProp,
  ...props
}: InputGroupInputProps) {
  const { size, disabled: contextDisabled } = useInputGroup();
  const disabled = disabledProp ?? contextDisabled;

  return (
    <input
      className={cn(inputGroupControlVariants({ size }), className)}
      data-component="input-group-input"
      data-slot="input-group-control"
      data-testid={testId}
      disabled={disabled}
      type={type}
      {...props}
    />
  );
}
