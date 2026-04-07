"use client";

import type { HTMLAttributes } from "react";
import { useMemo } from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { InputGroupContext } from "./input-group-context";

const sizeClasses: Record<ComponentSize, string> = {
  sm: "min-h-10",
  base: "min-h-11",
  lg: "min-h-12",
};

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  hasError?: boolean;
  size?: ComponentSize;
}

function InputGroup({
  children,
  className,
  disabled = false,
  hasError = false,
  size = "base",
  ...props
}: InputGroupProps) {
  const contextValue = useMemo(
    () => ({ disabled, hasError, size }),
    [disabled, hasError, size]
  );

  return (
    <InputGroupContext.Provider value={contextValue}>
      <div
        aria-invalid={hasError || undefined}
        className={cn(
          "flex w-full items-stretch overflow-hidden rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-input shadow-2xs",
          "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-4 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/15",
          hasError && "border-destructive ring-4 ring-destructive/15",
          disabled && "cursor-not-allowed opacity-55",
          sizeClasses[size],
          className
        )}
        data-size={size}
        data-slot="input-group"
        {...props}
      >
        {children}
      </div>
    </InputGroupContext.Provider>
  );
}

export { InputGroup };
