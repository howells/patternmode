import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

const GAP_CLASSES = {
  sm: "gap-2",
  base: "gap-4",
  lg: "gap-6",
} as const;

const ALIGN_CLASSES = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  align?: keyof typeof ALIGN_CLASSES;
  direction?: "row" | "column";
  gap?: keyof typeof GAP_CLASSES;
}

function Stack({
  align = "stretch",
  className,
  direction = "column",
  gap = "base",
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        ALIGN_CLASSES[align],
        GAP_CLASSES[gap],
        className
      )}
      data-slot="stack"
      {...props}
    />
  );
}

function HStack(props: Omit<StackProps, "direction">) {
  return <Stack direction="row" {...props} />;
}

function VStack(props: Omit<StackProps, "direction">) {
  return <Stack direction="column" {...props} />;
}

export { HStack, Stack, VStack };
