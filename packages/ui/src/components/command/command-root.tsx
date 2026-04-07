"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const Command = forwardRef<
  ComponentRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-panel/98 text-foreground shadow-2xs",
        className
      )}
      data-slot="command"
      ref={ref}
      {...props}
    />
  );
});

Command.displayName = "Command";

export { Command };
