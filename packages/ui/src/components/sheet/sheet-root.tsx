"use client";

import {
  Close,
  Description,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";

const Sheet = Root;
const SheetTrigger = Trigger;
const SheetClose = Close;

function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-wrap items-center justify-end gap-3",
        className
      )}
      {...props}
    />
  );
}

const SheetTitle = forwardRef<
  ComponentRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => {
  return (
    <Title
      className={cn("font-display text-foreground text-title-sm", className)}
      ref={ref}
      {...props}
    />
  );
});

SheetTitle.displayName = Title.displayName;

const SheetDescription = forwardRef<
  ComponentRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => {
  return (
    <Description
      className={cn("text-body text-muted-foreground", className)}
      ref={ref}
      {...props}
    />
  );
});

SheetDescription.displayName = Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
