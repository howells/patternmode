"use client";

import { Indicator, Root } from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.5 6.4 11.4 12.5 5.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const checkboxVariants = cva(
  [
    "group peer inline-flex shrink-0 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] border border-border/80 bg-white text-transparent shadow-2xs",
    "transition-[background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-snappy)]",
    "disabled:cursor-not-allowed disabled:opacity-45",
    "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
    "data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent data-[state=indeterminate]:text-accent-foreground",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    ...focusRing(),
  ],
  {
    variants: {
      size: {
        sm: "size-4 [&_[data-slot=checkbox-indicator]]:size-2.5",
        base: "size-5 [&_[data-slot=checkbox-indicator]]:size-3",
        lg: "size-6 [&_[data-slot=checkbox-indicator]]:size-3.5",
      } satisfies Record<ComponentSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  }
);

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean;
}

const Checkbox = forwardRef<ComponentRef<typeof Root>, CheckboxProps>(
  ({ checked, className, indeterminate, size, ...props }, ref) => {
    const resolvedChecked = indeterminate ? "indeterminate" : checked;

    return (
      <Root
        checked={resolvedChecked}
        className={cn(checkboxVariants({ className, size }))}
        data-slot="checkbox"
        ref={ref}
        {...props}
      >
        <Indicator
          className="flex items-center justify-center"
          data-slot="checkbox-indicator"
        >
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </Indicator>
      </Root>
    );
  }
);

Checkbox.displayName = Root.displayName;

export { Checkbox };
