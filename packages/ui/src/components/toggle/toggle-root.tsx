"use client";

import { Root } from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

export type ToggleSize = Extract<ComponentSize, "sm" | "base" | "lg">;

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-white/88",
    "font-medium text-foreground shadow-2xs transition-all duration-200 ease-[var(--ease-snappy)]",
    "hover:-translate-y-0.5 hover:bg-white data-[state=on]:border-accent/25 data-[state=on]:bg-accent/10 data-[state=on]:text-foreground",
    "disabled:pointer-events-none disabled:opacity-45",
    ...focusRing(),
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-[0.85rem]",
        base: "h-10 px-3.5 text-[0.92rem]",
        lg: "h-11 px-4 text-[0.98rem]",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);

export interface ToggleProps
  extends ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = forwardRef<ComponentRef<typeof Root>, ToggleProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Root
        className={cn(toggleVariants({ className, size }))}
        data-slot="toggle"
        ref={ref}
        {...props}
      />
    );
  }
);

Toggle.displayName = Root.displayName;

export { Toggle };
