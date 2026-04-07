"use client";

import { Trigger } from "@radix-ui/react-collapsible";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ children, className, ...props }, ref) => {
  return (
    <Trigger
      className={cn(
        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground transition-colors hover:bg-secondary/35",
        "[&[data-state=open]>span]:rotate-180",
        ...focusRing(),
        className
      )}
      data-slot="collapsible-trigger"
      ref={ref}
      {...props}
    >
      {children}
      <span className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-snappy)]">
        <ChevronDownIcon />
      </span>
    </Trigger>
  );
});

CollapsibleTrigger.displayName = Trigger.displayName;

export { CollapsibleTrigger };
