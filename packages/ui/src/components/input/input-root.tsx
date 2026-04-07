import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";
import { standaloneInputVariants } from "./input-variants";

/** Props for the standalone Input component. */
export type InputProps = WithTestId<
  Omit<React.ComponentProps<"input">, "size">
> &
  VariantProps<typeof standaloneInputVariants> & {
    /** Show error styling (red border and ring). */
    hasError?: boolean;
    /** Force focus ring display (for documentation/testing). */
    focused?: boolean;
  };

/**
 * Simple standalone input field.
 * For inputs with icons, addons, or buttons, use InputGroup.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter text..." />
 * <Input size="lg" radius="full" />
 * <Input hasError placeholder="Invalid input" />
 * ```
 */
export function Input({
  className,
  type,
  testId,
  size,
  radius,
  hasError,
  focused,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={hasError || undefined}
      className={cn(
        standaloneInputVariants({ size, radius }),
        focusInput(),
        hasErrorInput,
        className,
      )}
      data-component="input"
      data-error={hasError || undefined}
      data-focused={focused || undefined}
      data-slot="input"
      data-testid={testId}
      type={type}
      {...props}
    />
  );
}
