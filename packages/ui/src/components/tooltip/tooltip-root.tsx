"use client";

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

function TooltipProvider({
  delayDuration = 120,
  ...props
}: ComponentPropsWithoutRef<typeof Provider>) {
  return (
    <Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  delayDuration,
  ...props
}: ComponentPropsWithoutRef<typeof Root> & { delayDuration?: number }) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger(props: ComponentPropsWithoutRef<typeof Trigger>) {
  return <Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof Content>) {
  return (
    <Portal>
      <Content
        className={cn(
          "z-50 max-w-xs rounded-[calc(var(--radius-lg)-2px)] bg-foreground px-3 py-2 text-[0.82rem] text-background leading-relaxed shadow-md",
          "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
          className
        )}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        <Arrow className="fill-foreground" height={8} width={12} />
      </Content>
    </Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
