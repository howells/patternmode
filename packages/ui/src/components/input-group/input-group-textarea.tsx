"use client";

import type { TextareaHTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { useInputGroup } from "./input-group-context";

function InputGroupTextarea({
  className,
  rows = 4,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { disabled } = useInputGroup();

  return (
    <textarea
      className={cn(
        "min-h-28 min-w-0 flex-1 resize-y bg-transparent px-3.5 py-3 text-body text-foreground outline-none placeholder:text-muted-foreground/90",
        "selection:bg-accent selection:text-accent-foreground",
        className
      )}
      data-slot="input-group-control"
      disabled={disabled || props.disabled}
      rows={rows}
      {...props}
    />
  );
}

export { InputGroupTextarea };
