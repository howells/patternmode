"use client";

import { Indicator, Item } from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

const radioVariants = cva(
  [
    "peer inline-flex shrink-0 items-center justify-center rounded-full border border-border/80 bg-white shadow-2xs",
    "transition-[background-color,border-color,box-shadow] duration-200 ease-[var(--ease-snappy)]",
    "disabled:cursor-not-allowed disabled:opacity-45",
    "data-[state=checked]:border-accent",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    ...focusRing(),
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        base: "size-5",
        lg: "size-6",
      } satisfies Record<ComponentSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  }
);

export interface RadioProps
  extends ComponentPropsWithoutRef<typeof Item>,
    VariantProps<typeof radioVariants> {}

const Radio = forwardRef<ComponentRef<typeof Item>, RadioProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Item
        className={cn(radioVariants({ className, size }))}
        data-slot="radio"
        ref={ref}
        {...props}
      >
        <Indicator
          className="flex items-center justify-center"
          data-slot="radio-indicator"
        >
          <span className="size-2 rounded-full bg-accent shadow-2xs" />
        </Indicator>
      </Item>
    );
  }
);

Radio.displayName = Item.displayName;

export { Radio };
