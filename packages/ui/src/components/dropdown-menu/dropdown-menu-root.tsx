"use client";

import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";

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

function DotIcon() {
  return <span className="size-2 rounded-full bg-current" />;
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const DropdownMenu = Root;
const DropdownMenuTrigger = Trigger;
const DropdownMenuGroup = Group;
const DropdownMenuPortal = Portal;
const DropdownMenuSub = Sub;
const DropdownMenuRadioGroup = RadioGroup;

const baseItemClasses =
  "relative flex cursor-default select-none items-center gap-2 rounded-[calc(var(--radius-md)-4px)] px-2 py-2 text-[0.94rem] outline-none transition-colors duration-150 ease-[var(--ease-snappy)] focus:bg-secondary/80 data-[disabled]:pointer-events-none data-[disabled]:opacity-45";

const DropdownMenuContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 8, ...props }, ref) => {
  return (
    <Portal>
      <Content
        className={cn(
          "z-50 min-w-[14rem] overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-panel/98 p-1 text-panel-foreground shadow-lg backdrop-blur-sm",
          className
        )}
        data-slot="dropdown-menu-content"
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
});

DropdownMenuContent.displayName = Content.displayName;

const DropdownMenuItem = forwardRef<
  ComponentRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => {
  return (
    <Item
      className={cn(baseItemClasses, inset && "pl-8", className)}
      data-slot="dropdown-menu-item"
      ref={ref}
      {...props}
    />
  );
});

DropdownMenuItem.displayName = Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  ComponentRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ children, className, ...props }, ref) => {
  return (
    <CheckboxItem
      className={cn(baseItemClasses, "pl-8", className)}
      data-slot="dropdown-menu-checkbox-item"
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center text-accent">
        <ItemIndicator>
          <CheckIcon />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  );
});

DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  ComponentRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioItem
      className={cn(baseItemClasses, "pl-8", className)}
      data-slot="dropdown-menu-radio-item"
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center text-accent">
        <ItemIndicator>
          <DotIcon />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
});

DropdownMenuRadioItem.displayName = RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  ComponentRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "px-2 py-1.5 text-label text-muted-foreground uppercase",
        inset && "pl-8",
        className
      )}
      data-slot="dropdown-menu-label"
      ref={ref}
      {...props}
    />
  );
});

DropdownMenuLabel.displayName = Label.displayName;

const DropdownMenuSeparator = forwardRef<
  ComponentRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      className={cn("-mx-1 my-1 h-px bg-border/80", className)}
      data-slot="dropdown-menu-separator"
      ref={ref}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = Separator.displayName;

function DropdownMenuShortcut({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-[0.74rem] text-muted-foreground uppercase tracking-[0.12em]",
        className
      )}
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
}

const DropdownMenuSubTrigger = forwardRef<
  ComponentRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & { inset?: boolean }
>(({ className, children, inset, ...props }, ref) => {
  return (
    <SubTrigger
      className={cn(baseItemClasses, inset && "pl-8", className)}
      data-slot="dropdown-menu-sub-trigger"
      ref={ref}
      {...props}
    >
      {children}
      <span className="ml-auto size-4 text-muted-foreground">
        <ChevronRightIcon />
      </span>
    </SubTrigger>
  );
});

DropdownMenuSubTrigger.displayName = SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
  ComponentRef<typeof SubContent>,
  ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => {
  return (
    <SubContent
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-panel/98 p-1 text-panel-foreground shadow-lg backdrop-blur-sm",
        className
      )}
      data-slot="dropdown-menu-sub-content"
      ref={ref}
      {...props}
    />
  );
});

DropdownMenuSubContent.displayName = SubContent.displayName;

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
