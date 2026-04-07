"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Content,
  Portal,
  ScrollDownButton,
  ScrollUpButton,
  Viewport,
} from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";
import type { WithTestId } from "../../lib/types";
import { Icon } from "../icon";
import { SelectContext } from "./select-context";

function SelectScrollUpButton({
  className,
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof ScrollUpButton>>) {
  return (
    <ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      data-component="select-scroll-up-button"
      data-slot="select-scroll-up-button"
      data-testid={testId}
      {...props}
    >
      <Icon icon={ChevronUp} size="xs" />
    </ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof ScrollDownButton>>) {
  return (
    <ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      data-component="select-scroll-down-button"
      data-slot="select-scroll-down-button"
      data-testid={testId}
      {...props}
    >
      <Icon icon={ChevronDown} size="xs" />
    </ScrollDownButton>
  );
}
/** select content area */

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  size = "sm",
  testId,
  ...props
}: WithTestId<
  React.ComponentProps<typeof Content> & {
    size?: ComponentSize;
  }
>) {
  return (
    <Portal>
      <SelectContext.Provider value={{ size }}>
        <Content
          align={align}
          className={cn(
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xs data-[state=closed]:animate-out data-[state=open]:animate-in",
            position === "popper" &&
              "data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
            className,
          )}
          data-component="select-content"
          data-slot="select-content"
          data-testid={testId}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
            )}
          >
            {children}
          </Viewport>
          <SelectScrollDownButton />
        </Content>
      </SelectContext.Provider>
    </Portal>
  );
}

export { SelectContent };
