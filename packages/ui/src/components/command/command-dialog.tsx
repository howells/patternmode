"use client";

import type { ComponentProps } from "react";

import { cn } from "../../utils/cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Command } from "./command-root";

export interface CommandDialogProps extends ComponentProps<typeof Dialog> {
  className?: string;
  commandClassName?: string;
  description?: string;
  title?: string;
}

function CommandDialog({
  children,
  className,
  commandClassName,
  description = "Search shared primitives, stories, and review surfaces.",
  title = "Command palette",
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className={cn("overflow-hidden p-0", className)}>
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command className={commandClassName}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

export { CommandDialog };
