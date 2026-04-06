"use client";

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";
import { Button } from "../button";

const Dialog = Root;
const DialogTrigger = Trigger;
const DialogClose = Close;

function DialogOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

const DialogContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => {
  return (
    <Portal>
      <DialogOverlay />
      <Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-4",
          "rounded-[var(--radius-xl)] border border-border/80 bg-panel p-6 shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Content>
    </Portal>
  );
});

DialogContent.displayName = Content.displayName;

function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-3", className)}
      {...props}
    />
  );
}

const DialogTitle = forwardRef<
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

DialogTitle.displayName = Title.displayName;

const DialogDescription = forwardRef<
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

DialogDescription.displayName = Description.displayName;

function DialogAction({
  asChild,
  className,
  variant = "default",
  ...props
}: ComponentProps<typeof Button> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : Button;
  return <Comp className={className} variant={variant} {...props} />;
}

export {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
