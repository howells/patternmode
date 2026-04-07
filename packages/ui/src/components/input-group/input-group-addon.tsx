"use client";

import type { HTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { useInputGroup } from "./input-group-context";

function InputGroupAddon({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { disabled } = useInputGroup();

  return (
    <span
      className={cn(
        "inline-flex items-center border-border/70 border-r bg-secondary/65 px-3 text-body text-muted-foreground",
        disabled && "opacity-70",
        className
      )}
      data-slot="input-group-addon"
      {...props}
    />
  );
}

export { InputGroupAddon };
