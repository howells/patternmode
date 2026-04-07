"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

export interface EmptyActionsProps extends React.ComponentProps<"div"> {}

/**
 * Container for empty state action buttons.
 */
export function EmptyActions({
  className,
  children,
  ...props
}: EmptyActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      data-component="empty-actions"
      data-slot="empty-actions"
      {...props}
    >
      {children}
    </div>
  );
}
