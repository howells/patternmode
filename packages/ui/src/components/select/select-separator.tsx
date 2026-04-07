"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Separator } from "@radix-ui/react-select";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

/**
 * SelectSeparator UI component.
 * Import from "@patternmode/ui/components/select".
 * Built on Radix UI primitives for accessible behavior.
 */
function SelectSeparator({
  className,
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof Separator>>) {
  return (
    <Separator
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      data-component="select-separator"
      data-slot="select-separator"
      data-testid={testId}
      {...props}
    />
  );
}

export { SelectSeparator };
