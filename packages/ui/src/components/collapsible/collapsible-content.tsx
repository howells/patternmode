"use client";

import { Content } from "@radix-ui/react-collapsible";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const CollapsibleContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ children, className, ...props }, ref) => {
  return (
    <Content
      className={cn(
        "overflow-hidden text-body text-muted-foreground",
        className
      )}
      data-slot="collapsible-content"
      ref={ref}
      {...props}
    >
      <div className="px-5 pb-5">{children}</div>
    </Content>
  );
});

CollapsibleContent.displayName = Content.displayName;

export { CollapsibleContent };
