"use client";

import {
  Anchor,
  Arrow,
  Content,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-popover";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const Popover = Root;
const PopoverTrigger = Trigger;
const PopoverAnchor = Anchor;

const PopoverContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ align = "center", className, sideOffset = 8, ...props }, ref) => {
  return (
    <Portal>
      <Content
        align={align}
        className={cn(
          "z-50 w-80 rounded-[var(--radius-xl)] border border-border/80 bg-panel/98 p-4 text-panel-foreground shadow-lg backdrop-blur-sm",
          "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
          className
        )}
        data-slot="popover-content"
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
});

PopoverContent.displayName = Content.displayName;

function PopoverArrow({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Arrow>) {
  return (
    <Arrow
      className={cn("fill-panel/98 stroke-border/80", className)}
      data-slot="popover-arrow"
      height={10}
      width={18}
      {...props}
    />
  );
}

export { Popover, PopoverAnchor, PopoverArrow, PopoverContent, PopoverTrigger };
