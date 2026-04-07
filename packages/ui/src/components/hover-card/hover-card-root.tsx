"use client";

import { Content, Portal, Root, Trigger } from "@radix-ui/react-hover-card";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const HoverCard = Root;
const HoverCardTrigger = Trigger;

const HoverCardContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ align = "center", className, sideOffset = 10, ...props }, ref) => {
  return (
    <Portal>
      <Content
        align={align}
        className={cn(
          "z-50 w-72 rounded-[var(--radius-xl)] border border-border/80 bg-panel/98 p-4 text-panel-foreground shadow-lg backdrop-blur-sm",
          "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
          className
        )}
        data-slot="hover-card-content"
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
});

HoverCardContent.displayName = Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
