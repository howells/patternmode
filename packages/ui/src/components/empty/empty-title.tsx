"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";
import { Heading } from "../heading";
import { useEmptyContext } from "./empty-context";

export interface EmptyTitleProps extends React.ComponentProps<"div"> {
  /** Merge props onto child */
  asChild?: boolean;
}

const SIZE_HEADING = {
  sm: "xs",
  base: "sm",
  lg: "base",
} as const;

/**
 * Title text for an empty state.
 */
export function EmptyTitle({
  className,
  children,
  asChild = false,
  ...props
}: EmptyTitleProps) {
  const { size } = useEmptyContext();
  const headingSize = SIZE_HEADING[size];

  if (asChild) {
    return (
      <Slot
        className={cn(className)}
        data-component="empty-title"
        data-slot="empty-title"
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Heading
      className={cn(className)}
      data-component="empty-title"
      data-slot="empty-title"
      level="3"
      size={headingSize}
      {...props}
    >
      {children}
    </Heading>
  );
}
