"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { useInputGroup } from "./input-group-context";

export type InputGroupTextareaProps = Omit<
  React.ComponentProps<"textarea">,
  "size"
> & {
  /** Test ID for testing. */
  testId?: string;
};

/**
 * Textarea element for use inside InputGroup.
 * Inherits disabled state from InputGroup context.
 *
 * @example
 * ```tsx
 * <InputGroup size="base">
 *   <InputGroupTextarea placeholder="Enter message..." />
 *   <InputGroupAddon align="block-end">
 *     <InputGroupButton icon={Send}>Send</InputGroupButton>
 *   </InputGroupAddon>
 * </InputGroup>
 * ```
 */
export function InputGroupTextarea({
  className,
  testId,
  disabled: disabledProp,
  ...props
}: InputGroupTextareaProps) {
  const { disabled: contextDisabled } = useInputGroup();
  const disabled = disabledProp ?? contextDisabled;

  return (
    <textarea
      className={cn(
        "field-sizing-content flex min-h-16 min-w-0 flex-1 resize-none border-0 bg-transparent px-0 py-2 text-base shadow-none outline-none ring-0 selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-0 focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      data-component="input-group-textarea"
      data-slot="input-group-control"
      data-testid={testId}
      disabled={disabled}
      {...props}
    />
  );
}
