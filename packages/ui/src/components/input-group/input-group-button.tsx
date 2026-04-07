"use client";

import type { ButtonHTMLAttributes } from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { useInputGroup } from "./input-group-context";

const sizeClasses: Record<ComponentSize, string> = {
  sm: "px-3 text-[0.82rem]",
  base: "px-3.5 text-[0.9rem]",
  lg: "px-4 text-[0.96rem]",
};

function InputGroupButton({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { disabled, size } = useInputGroup();

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border-border/70 border-l bg-white/85 font-medium text-foreground transition-colors duration-200 ease-[var(--ease-snappy)]",
        "hover:bg-white disabled:pointer-events-none disabled:opacity-45",
        sizeClasses[size],
        className
      )}
      data-slot="input-group-button"
      disabled={disabled || props.disabled}
      type={type}
      {...props}
    />
  );
}

export { InputGroupButton };
