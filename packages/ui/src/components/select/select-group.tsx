"use client";

import { Group } from "@radix-ui/react-select";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

/**
 * SelectGroup UI component.
 * Import from "@patternmode/ui/components/select".
 * Built on Radix UI primitives for accessible behavior.
 */
function SelectGroup({
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof Group>>) {
  return (
    <Group
      data-component="select-group"
      data-slot="select-group"
      data-testid={testId}
      {...props}
    />
  );
}

export { SelectGroup };
