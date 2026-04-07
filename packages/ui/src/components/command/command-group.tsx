"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const CommandGroup = forwardRef<
  ComponentRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden p-1 text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-label [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      data-slot="command-group"
      ref={ref}
      {...props}
    />
  );
});

CommandGroup.displayName = "CommandGroup";

export { CommandGroup };
