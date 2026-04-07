"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Label } from "@radix-ui/react-select";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

/**
 * SelectLabel UI component.
 * Import from "@patternmode/ui/components/select".
 * Built on Radix UI primitives for accessible behavior.
 */
function SelectLabel({
  className,
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof Label>>) {
  return (
    <Label
      className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
      data-component="select-label"
      data-slot="select-label"
      data-testid={testId}
      {...props}
    />
  );
}

export { SelectLabel };
