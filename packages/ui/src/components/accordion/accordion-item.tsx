"use client";

import { Item } from "@radix-ui/react-accordion";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const AccordionItem = forwardRef<
  ComponentRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-panel/94 shadow-2xs",
        className
      )}
      data-slot="accordion-item"
      ref={ref}
      {...props}
    />
  );
});

AccordionItem.displayName = Item.displayName;

export { AccordionItem };
