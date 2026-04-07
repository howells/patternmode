"use client";

import { Value } from "@radix-ui/react-select";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

/**
 * SelectValue UI component.
 * Import from "@patternmode/ui/components/select".
 * Built on Radix UI primitives for accessible behavior.
 */
function SelectValue({
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof Value>>) {
  return (
    <Value
      data-component="select-value"
      data-slot="select-value"
      data-testid={testId}
      {...props}
    />
  );
}

export { SelectValue };
