import { cva } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { focusInput } from "../../utils/focus-input";

const textareaVariants = cva([
  "flex min-h-28 w-full rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-input px-3.5 py-3",
  "text-body text-foreground shadow-2xs placeholder:text-muted-foreground/90",
  "disabled:cursor-not-allowed disabled:bg-muted/70 disabled:opacity-60",
]);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  focused?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, focused, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants(),
          focusInput(),
          "selection:bg-accent selection:text-accent-foreground",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/15",
          className
        )}
        data-focused={focused || undefined}
        data-slot="textarea"
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
