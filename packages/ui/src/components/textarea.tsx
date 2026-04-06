import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "../lib/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-28 w-full rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-input px-3.5 py-3",
          "text-body text-foreground shadow-2xs transition-[border-color,box-shadow,background-color] duration-200 ease-[var(--ease-snappy)]",
          "placeholder:text-muted-foreground/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15",
          "focus-visible:border-ring disabled:cursor-not-allowed disabled:bg-muted/70 disabled:opacity-60",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/15",
          className
        )}
        data-slot="textarea"
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
