"use client";

import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusInput } from "../../utils/focus-input";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.5 6.4 11.4 12.5 5.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

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

const SELECT_TRIGGER_SIZES: Record<ComponentSize, string> = {
  sm: "h-10 px-3 text-[0.9rem]",
  base: "h-11 px-4 text-[0.95rem]",
  lg: "h-12 px-4.5 text-[1rem]",
};

const Select = Root;
const SelectGroup = Group;
const SelectValue = Value;

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof Trigger> {
  size?: ComponentSize;
}

const SelectTrigger = forwardRef<
  ComponentRef<typeof Trigger>,
  SelectTriggerProps
>(({ className, children, size = "base", ...props }, ref) => {
  return (
    <Trigger
      className={cn(
        "inline-flex w-full items-center justify-between gap-3 rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-white shadow-2xs",
        "text-left text-foreground data-[placeholder]:text-muted-foreground",
        SELECT_TRIGGER_SIZES[size],
        focusInput(),
        className
      )}
      data-size={size}
      data-slot="select-trigger"
      ref={ref}
      {...props}
    >
      {children}
      <Icon asChild>
        <span className="size-4 text-muted-foreground">
          <ChevronDownIcon />
        </span>
      </Icon>
    </Trigger>
  );
});

SelectTrigger.displayName = Trigger.displayName;

const SelectContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  return (
    <Portal>
      <Content
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-panel/98 text-panel-foreground shadow-lg backdrop-blur-sm",
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          position === "popper" &&
            "data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        data-slot="select-content"
        position={position}
        ref={ref}
        {...props}
      >
        <Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </Viewport>
      </Content>
    </Portal>
  );
});

SelectContent.displayName = Content.displayName;

const SelectLabel = forwardRef<
  ComponentRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "px-2 py-1.5 text-label text-muted-foreground uppercase",
        className
      )}
      data-slot="select-label"
      ref={ref}
      {...props}
    />
  );
});

SelectLabel.displayName = Label.displayName;

const SelectItem = forwardRef<
  ComponentRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => {
  return (
    <Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-[calc(var(--radius-md)-4px)] py-2 pr-8 pl-2 text-[0.95rem] outline-none",
        "text-foreground transition-colors duration-150 ease-[var(--ease-snappy)]",
        "focus:bg-secondary/80 data-[disabled]:pointer-events-none data-[state=checked]:bg-accent/8 data-[disabled]:opacity-45",
        className
      )}
      data-slot="select-item"
      ref={ref}
      {...props}
    >
      <span className="absolute right-2 flex size-4 items-center justify-center text-accent">
        <ItemIndicator>
          <CheckIcon />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  );
});

SelectItem.displayName = Item.displayName;

const SelectSeparator = forwardRef<
  ComponentRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      className={cn("-mx-1 my-1 h-px bg-border/80", className)}
      data-slot="select-separator"
      ref={ref}
      {...props}
    />
  );
});

SelectSeparator.displayName = Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
