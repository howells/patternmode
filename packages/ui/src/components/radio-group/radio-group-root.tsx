"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root } from "@radix-ui/react-radio-group";
import type * as React from "react";
import { useId } from "react";
import { Label } from "../label";
import { Radio, type RadioProps } from "../radio";

/**
 * Container for a group of radio buttons. Manages single selection state.
 *
 * @param props - The radio group props
 * @param props.value - Controlled selected value. Use with onValueChange.
 * @param props.defaultValue - Uncontrolled default selected value.
 * @param props.onValueChange - Callback when selected value changes.
 * @param props.disabled - Disable all radio buttons in the group. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Radio components.
 * @param props... - All other Radix UI RadioGroup.Root props.
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroupItem value="option1">Option 1</RadioGroupItem>
 *   <RadioGroupItem value="option2">Option 2</RadioGroupItem>
 * </RadioGroup>
 * ```
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn("grid gap-3", className)}
      data-component="radio-group"
      data-slot="radio-group"
      {...props}
    />
  );
}

export type RadioGroupItemProps = RadioProps & {
  /** Label text for the radio option */
  children: React.ReactNode;
};

/**
 * A radio option with an associated label. Combines Radio and Label for convenience.
 *
 * @param props - The radio group item props
 * @param props.value - Unique value for this radio option (required).
 * @param props.children - Label text content.
 * @param props.size - Size using shared ComponentSize scale. Defaults to "sm".
 * @param props.disabled - Disable this radio option. Defaults to false.
 * @param props.className - Additional CSS classes for the radio input.
 * @param props.id - Optional ID. Auto-generated if not provided.
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <RadioGroupItem value="a">Option A</RadioGroupItem>
 *   <RadioGroupItem value="b" disabled>Option B</RadioGroupItem>
 * </RadioGroup>
 * ```
 */
function RadioGroupItem({
  children,
  className,
  id: providedId,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <div
      className="flex items-center gap-2"
      data-component="radio-group-item"
      data-disabled={disabled}
      data-slot="radio-group-item"
    >
      <Radio className={className} disabled={disabled} id={id} {...props} />
      <Label htmlFor={id}>{children}</Label>
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
