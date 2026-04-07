"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";
import { Text } from "../text";
import { useEmptyContext } from "./empty-context";

export interface EmptyDescriptionProps extends React.ComponentProps<"div"> {
  /** Merge props onto child */
  asChild?: boolean;
}

const SIZE_TEXT = {
  sm: "xs",
  base: "sm",
  lg: "sm",
} as const;

/**
 * Description text for an empty state.
 */
export function EmptyDescription({
  className,
  children,
  asChild = false,
  ...props
}: EmptyDescriptionProps) {
  const { size } = useEmptyContext();
  const textSize = SIZE_TEXT[size];

  if (asChild) {
    return (
      <Slot
        className={cn("max-w-sm text-center", className)}
        data-component="empty-description"
        data-slot="empty-description"
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Text
      className={cn("max-w-sm text-center", className)}
      data-component="empty-description"
      data-slot="empty-description"
      size={textSize}
      variant="muted"
      {...props}
    >
      {children}
    </Text>
  );
}
