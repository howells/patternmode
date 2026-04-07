"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { Stack } from "../stack";
import { useEmptyContext } from "./empty-context";

export interface EmptyHeaderProps extends React.ComponentProps<"div"> {}

const SIZE_GAP = {
  sm: "sm",
  base: "base",
  lg: "lg",
} as const;

/**
 * Header section of an empty state. Contains media, title, and description.
 */
export function EmptyHeader({
  className,
  children,
  ...props
}: EmptyHeaderProps) {
  const { size } = useEmptyContext();
  const gap = SIZE_GAP[size];

  return (
    <Stack
      align="center"
      className={cn(className)}
      data-component="empty-header"
      data-slot="empty-header"
      gap={gap}
      {...props}
    >
      {children}
    </Stack>
  );
}
