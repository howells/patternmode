"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Card, CardContent } from "../card";
import { Center } from "../center";
import { EmptyProvider, type EmptySize } from "./empty-context";

const emptyVariants = cva("", {
  variants: {
    size: {
      sm: "",
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export interface EmptyProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof emptyVariants> {
  /** Layout variant */
  layout?: "centered" | "card" | "card-dashed";
  /** Minimum height for centered layout */
  minHeight?: string;
}

/**
 * Empty state root container.
 *
 * @example
 * ```tsx
 * <Empty layout="centered" size="base">
 *   <EmptyHeader>
 *     <EmptyMedia>
 *       <Search />
 *     </EmptyMedia>
 *     <EmptyTitle>No results found</EmptyTitle>
 *     <EmptyDescription>Try adjusting your search.</EmptyDescription>
 *   </EmptyHeader>
 *   <EmptyActions>
 *     <Button>Clear search</Button>
 *   </EmptyActions>
 * </Empty>
 * ```
 */
export function Empty({
  children,
  className,
  layout = "centered",
  size = "base",
  minHeight = "min-h-[50vh]",
  ...props
}: EmptyProps) {
  const resolvedSize: EmptySize = size ?? "base";

  const content = <EmptyProvider size={resolvedSize}>{children}</EmptyProvider>;

  if (layout === "card" || layout === "card-dashed") {
    const paddingMap = { sm: "py-6", lg: "py-12" } as const;
    const padding =
      paddingMap[resolvedSize as keyof typeof paddingMap] ?? "py-8";

    return (
      <Card
        border={layout === "card-dashed" ? "dashed" : undefined}
        className={cn(padding, className)}
        data-component="empty"
        data-slot="empty"
        {...props}
      >
        <CardContent>
          <Center>{content}</Center>
        </CardContent>
      </Card>
    );
  }

  return (
    <Center
      className={cn("w-full", minHeight, className)}
      data-component="empty"
      data-slot="empty"
      {...props}
    >
      {content}
    </Center>
  );
}
