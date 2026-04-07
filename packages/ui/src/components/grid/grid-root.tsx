import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "../../utils/cn";

const GAP_CLASSES = {
  sm: "gap-2",
  base: "gap-4",
  lg: "gap-6",
} as const;

export interface GridProps extends ComponentPropsWithoutRef<"div"> {
  columns?: number;
  gap?: keyof typeof GAP_CLASSES;
}

export interface GridColProps extends ComponentPropsWithoutRef<"div"> {
  span?: number;
  start?: number;
}

function Grid({
  className,
  columns = 12,
  gap = "base",
  style,
  ...props
}: GridProps) {
  return (
    <div
      className={cn("grid", GAP_CLASSES[gap], className)}
      data-slot="grid"
      style={
        {
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}

function GridCol({
  className,
  span = 12,
  start,
  style,
  ...props
}: GridColProps) {
  return (
    <div
      className={cn(className)}
      data-slot="grid-col"
      style={
        {
          gridColumn: start
            ? `${start} / span ${span}`
            : `span ${span} / span ${span}`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}

export { Grid, GridCol };
