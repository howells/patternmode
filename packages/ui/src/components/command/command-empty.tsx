"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const CommandEmpty = forwardRef<
  ComponentRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Empty
      className={cn(
        "py-8 text-center text-body text-muted-foreground",
        className
      )}
      data-slot="command-empty"
      ref={ref}
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

export { CommandEmpty };
