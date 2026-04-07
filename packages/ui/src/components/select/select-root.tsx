"use client";

import { Root } from "@radix-ui/react-select";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

/**
 * Root component for a dropdown select. Manages open/closed state and value selection.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <Select onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Choose..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">Option A</SelectItem>
 *     <SelectItem value="b">Option B</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
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
