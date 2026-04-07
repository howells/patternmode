"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

/**
 * CommandItem composes cmdk's Item with custom styling.
 * Import from "@patternmode/ui/components/command".
 */
export function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      data-component="command-item"
      data-slot="command-item"
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  );
}
