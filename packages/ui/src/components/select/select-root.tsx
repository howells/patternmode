"use client";

import { Root } from "@radix-ui/react-select";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

/**
 * Select UI component.
 * Import from "@patternmode/ui/components/select".
 * Built on Radix UI primitives for accessible behavior.
 */
function Select({
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof Root>>) {
  return (
    <Root
      data-component="select"
      data-slot="select"
      data-testid={testId}
      {...props}
    />
  );
}

export { Select };
