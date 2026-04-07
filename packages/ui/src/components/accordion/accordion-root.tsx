"use client";

import { Root } from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

function Accordion({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Root>) {
  return (
    <Root
      className={cn("grid gap-3", className)}
      data-slot="accordion"
      {...props}
    />
  );
}

export { Accordion };
