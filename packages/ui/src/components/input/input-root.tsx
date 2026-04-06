import type { VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { focusInput } from "../../utils/focus-input";
import { inputVariants } from "./input-variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  focused?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, focused, size, type = "text", ...props }, ref) => {
    return (
      <input
        className={cn(
          inputVariants({ size }),
          focusInput(),
          "selection:bg-accent selection:text-accent-foreground",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/15",
          className
        )}
        data-focused={focused || undefined}
        data-slot="input"
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
