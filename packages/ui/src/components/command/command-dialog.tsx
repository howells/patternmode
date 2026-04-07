import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@patternmode/ui/components/dialog";
import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { Command } from "./command-root";

export type CommandDialogProps = React.ComponentProps<typeof Dialog> & {
  /** Accessible title for the dialog (visually hidden by default). */
  title?: string;
  /** Accessible description for the dialog (visually hidden by default). */
  description?: string;
  /** Extra class names applied to the `DialogContent` wrapper. */
  className?: string;
  /** Whether to show the dialog close button. */
  showCloseButton?: boolean;
  /** When `false`, disables cmdk's built-in filtering. */
  shouldFilter?: boolean;
  /** Extra props applied to the rendered dialog content element. */
  contentProps?: Omit<React.ComponentProps<typeof DialogContent>, "children"> &
    React.HTMLAttributes<HTMLDivElement> & {
      "data-testid"?: string;
    };
};

/**
 * CommandDialog wraps `Command` in a dialog, with screen-reader-only title and
 * description for accessibility.
 *
 * Import from "@patternmode/ui/components/command".
 */
export function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run…",
  children,
  className,
  showCloseButton = true,
  shouldFilter = true,
  contentProps,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
        {...contentProps}
      >
        <Command
          className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          shouldFilter={shouldFilter}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}
