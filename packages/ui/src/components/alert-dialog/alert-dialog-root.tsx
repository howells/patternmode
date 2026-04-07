"use client";

import {
  Action,
  Cancel,
  Description,
  Overlay,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-alert-dialog";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";
import { Button } from "../button";

const AlertDialog = Root;
const AlertDialogTrigger = Trigger;

const AlertDialogOverlay = forwardRef<
  ComponentRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Overlay
      className={cn(
        "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

AlertDialogOverlay.displayName = Overlay.displayName;

function AlertDialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function AlertDialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-3", className)}
      {...props}
    />
  );
}

const AlertDialogTitle = forwardRef<
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

AlertDialogTitle.displayName = Title.displayName;

const AlertDialogDescription = forwardRef<
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

AlertDialogDescription.displayName = Description.displayName;

function AlertDialogAction({
  children,
  className,
  variant = "destructive",
  ...props
}: Omit<ComponentProps<typeof Button>, "asChild">) {
  return (
    <Action asChild>
      <Button className={className} variant={variant} {...props}>
        {children}
      </Button>
    </Action>
  );
}

function AlertDialogCancel({
  children,
  className,
  variant = "ghost",
  ...props
}: Omit<ComponentProps<typeof Button>, "asChild">) {
  return (
    <Cancel asChild>
      <Button className={className} variant={variant} {...props}>
        {children}
      </Button>
    </Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
};
