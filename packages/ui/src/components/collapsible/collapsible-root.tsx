"use client";

import { Root } from "@radix-ui/react-collapsible";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

function Collapsible({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Root>) {
  return (
    <Root
      className={cn(
        "rounded-[var(--radius-xl)] border border-border/80 bg-panel/94 shadow-2xs",
        className
      )}
      data-slot="collapsible"
      {...props}
    />
  );
}

export { Collapsible };
