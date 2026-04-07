"use client";

import { Content } from "@radix-ui/react-accordion";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const AccordionContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => {
  return (
    <Content
      className={cn(
        "overflow-hidden text-body text-muted-foreground",
        className
      )}
      data-slot="accordion-content"
      ref={ref}
      {...props}
    >
      <div className="px-5 pb-5">{children}</div>
    </Content>
  );
});

AccordionContent.displayName = Content.displayName;

export { AccordionContent };
