"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const CommandItem = forwardRef<
  ComponentRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-[calc(var(--radius-md)-4px)] px-3 py-2 text-body outline-none transition-colors duration-150 ease-[var(--ease-snappy)]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-45",
        "data-[selected=true]:bg-secondary/85 data-[selected=true]:text-foreground",
        className
      )}
      data-slot="command-item"
      ref={ref}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  );
});

CommandItem.displayName = "CommandItem";

export { CommandItem };
