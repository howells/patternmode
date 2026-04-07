"use client";

import type { InputHTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { useInputGroup } from "./input-group-context";

function InputGroupInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const { disabled } = useInputGroup();

  return (
    <input
      className={cn(
        "min-w-0 flex-1 bg-transparent px-3.5 text-body text-foreground outline-none placeholder:text-muted-foreground/90",
        "selection:bg-accent selection:text-accent-foreground",
        className
      )}
      data-slot="input-group-control"
      disabled={disabled || props.disabled}
      {...props}
    />
  );
}

export { InputGroupInput };
