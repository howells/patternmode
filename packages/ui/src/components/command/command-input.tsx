"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m10.5 10.5 3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const CommandInput = forwardRef<
  ComponentRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  return (
    <div
      className="flex items-center gap-3 border-border/80 border-b px-4"
      data-slot="command-input-wrapper"
    >
      <span className="size-4 text-muted-foreground">
        <SearchIcon />
      </span>
      <CommandPrimitive.Input
        className={cn(
          "flex h-12 w-full bg-transparent text-body text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        data-slot="command-input"
        ref={ref}
        {...props}
      />
    </div>
  );
});

CommandInput.displayName = "CommandInput";

export { CommandInput };
