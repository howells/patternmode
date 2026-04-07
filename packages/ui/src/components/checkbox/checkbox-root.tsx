"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

// Define the variants for the Checkbox using cva.
const checkboxVariants = cva(
  cn(
    "group peer shrink-0 rounded-md border border-border bg-input shadow-xs ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
    focusRing,
    "aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20",
    "[[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20",
    "data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
  ),
  {
    variants: {
      size: {
        "2xs": "size-3.5 rounded-sm [&_svg]:size-2.5",
        xs: "size-4 rounded-sm [&_svg]:size-2.5",
        sm: "size-4.5 [&_svg]:size-3",
        base: "size-5 [&_svg]:size-3.5",
        lg: "size-5.5 [&_svg]:size-4",
        xl: "size-6 [&_svg]:size-4.5",
        "2xl": "size-7 [&_svg]:size-5",
        "3xl": "size-8 [&_svg]:size-6",
      } satisfies Record<ComponentSize, string>,
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type CheckboxProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof checkboxVariants> & {
    /**
     * When true, displays an indeterminate state (dash icon).
     * This is syntactic sugar for checked="indeterminate".
     */
    indeterminate?: boolean;
  };

/**
 * Renders a checkbox input with support for checked, unchecked, and indeterminate states.
 *
 * @param props - The checkbox props
 * @param props.size - Checkbox size using shared ComponentSize scale. Defaults to "sm".
 * @param props.checked - Controlled checked state. Use with onCheckedChange.
 * @param props.indeterminate - Show indeterminate state. Overrides checked when true.
 * @param props.defaultChecked - Uncontrolled default checked state.
 * @param props.onCheckedChange - Callback when checked state changes.
 * @param props.disabled - Disable the checkbox. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other Radix UI Checkbox.Root props.
 *
 * @example
 * ```tsx
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 * <Checkbox defaultChecked size="lg" />
 * <Checkbox indeterminate />
 * ```
 */
function Checkbox({
  className,
  size,
  checked,
  indeterminate,
  ...props
}: CheckboxProps) {
  // When indeterminate is true, use "indeterminate" as the checked value
  const checkedValue = indeterminate ? "indeterminate" : checked;

  return (
    <CheckboxPrimitive.Root
      checked={checkedValue}
      className={cn(checkboxVariants({ size }), className)}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="group-data-[state=indeterminate]:hidden" />
        <Minus className="hidden group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
