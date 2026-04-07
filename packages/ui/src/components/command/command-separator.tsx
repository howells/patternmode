"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const CommandSeparator = forwardRef<
  ComponentRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border/80", className)}
      data-slot="command-separator"
      ref={ref}
      {...props}
    />
  );
});

CommandSeparator.displayName = "CommandSeparator";

export { CommandSeparator };
