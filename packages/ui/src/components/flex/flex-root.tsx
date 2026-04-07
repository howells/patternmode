import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "../../utils/cn";

const GAP_CLASSES = {
  sm: "gap-2",
  base: "gap-4",
  lg: "gap-6",
} as const;

const DIRECTION_CLASSES = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
} as const;

const JUSTIFY_CLASSES = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

const ALIGN_CLASSES = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

const WRAP_CLASSES = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
} as const;

export interface FlexProps extends ComponentPropsWithoutRef<"div"> {
  align?: keyof typeof ALIGN_CLASSES;
  direction?: keyof typeof DIRECTION_CLASSES;
  gap?: keyof typeof GAP_CLASSES;
  inline?: boolean;
  justify?: keyof typeof JUSTIFY_CLASSES;
  wrap?: keyof typeof WRAP_CLASSES;
}

function Flex({
  align = "stretch",
  className,
  direction = "row",
  gap = "base",
  inline = false,
  justify = "start",
  style,
  wrap = "nowrap",
  ...props
}: FlexProps) {
  return (
    <div
      className={cn(
        inline ? "inline-flex" : "flex",
        DIRECTION_CLASSES[direction],
        JUSTIFY_CLASSES[justify],
        ALIGN_CLASSES[align],
        WRAP_CLASSES[wrap],
        GAP_CLASSES[gap],
        className
      )}
      data-slot="flex"
      style={style as CSSProperties}
      {...props}
    />
  );
}

export { Flex };
