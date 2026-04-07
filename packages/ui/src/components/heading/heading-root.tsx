import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

const HEADING_SIZE_CLASSES = {
  sm: "text-title-sm",
  base: "text-title",
  lg: "text-title-lg",
} as const;

export interface HeadingProps
  extends Omit<ComponentPropsWithoutRef<"h2">, "size"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: keyof typeof HEADING_SIZE_CLASSES;
}

function Heading({
  className,
  level = 2,
  size = "base",
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(
        "text-balance font-display font-semibold text-foreground",
        HEADING_SIZE_CLASSES[size],
        className
      )}
      data-level={level}
      data-slot="heading"
      {...props}
    />
  );
}

export { Heading };
