import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

const GAP_CLASSES = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-2.5",
  base: "gap-4",
  lg: "gap-6",
} as const;

type GroupGap = keyof typeof GAP_CLASSES;

const ALIGN_CLASSES = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

const JUSTIFY_CLASSES = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  align?: keyof typeof ALIGN_CLASSES;
  gap?: GroupGap;
  justify?: keyof typeof JUSTIFY_CLASSES;
  wrap?: boolean;
}

const Group = forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      align = "center",
      className,
      gap = "base",
      justify = "start",
      wrap = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex",
          ALIGN_CLASSES[align],
          GAP_CLASSES[gap],
          JUSTIFY_CLASSES[justify],
          wrap ? "flex-wrap" : "flex-nowrap",
          className
        )}
        data-slot="group"
        ref={ref}
        {...props}
      />
    );
  }
);

Group.displayName = "Group";

export { Group };
