"use client";

import { Root, Thumb } from "@radix-ui/react-switch";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

const Switch = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return (
    <Root
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent",
        "bg-secondary shadow-2xs transition-colors duration-200 ease-[var(--ease-snappy)]",
        "data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary",
        ...focusRing(),
        className
      )}
      ref={ref}
      {...props}
    >
      <Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow-xs ring-0 transition-transform duration-200 ease-[var(--ease-snappy)]",
          "translate-x-1 data-[state=checked]:translate-x-6"
        )}
      />
    </Root>
  );
});

Switch.displayName = Root.displayName;

export { Switch };
