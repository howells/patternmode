import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

interface TextareaProps extends WithTestId<React.ComponentProps<"textarea">> {
  /** Show error styling */
  hasError?: boolean;
}

/**
 * Renders a textarea element for multi-line text input.
 *
 * @param props - The textarea props
 * @param props.className - Additional CSS classes to apply.
 * @param props.testId - Test ID for testing purposes.
 * @param props.hasError - Show error styling.
 * @param props... - All other standard HTML textarea element props (e.g., value, onChange, placeholder, rows, disabled, etc.).
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter description…" rows={4} />
 * <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
 * <Textarea hasError placeholder="Invalid input" />
 * ```
 */
function Textarea({ className, testId, hasError, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={hasError || undefined}
      className={cn(
        "field-sizing-content flex min-h-16 w-full rounded-lg border-0 bg-input px-3 py-2 text-base shadow-borders-base outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        focusInput(),
        hasErrorInput,
        className,
      )}
      data-component="textarea"
      data-error={hasError || undefined}
      data-slot="textarea"
      data-testid={testId}
      {...props}
    />
  );
}

export { Textarea };
