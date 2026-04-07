"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const CommandList = forwardRef<
  ComponentRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.List
      className={cn(
        "max-h-[20rem] overflow-y-auto overflow-x-hidden p-2",
        className
      )}
      data-slot="command-list"
      ref={ref}
      {...props}
    />
  );
});

CommandList.displayName = "CommandList";

export { CommandList };
