"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root } from "@radix-ui/react-label";
import type * as React from "react";

/**
 * Renders an accessible label element that can be associated with form controls.
 *
 * @param props - The label props
 * @param props.htmlFor - ID of the form control this label is for.
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Label text content.
 * @param props... - All other Radix UI Label.Root props.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Label>Username</Label>
 * ```
 */
function Label({ className, ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className,
      )}
      data-component="label"
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
