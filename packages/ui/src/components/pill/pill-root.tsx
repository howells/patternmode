import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { pillVariants } from "./pill-variants";

export interface PillProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pillVariants> {
  /** Render element. @default "span" */
  as?: React.ElementType;
  disabled?: boolean;
}

/**
 * Pill — internal base component for pill-shaped UI elements.
 *
 * This is a noop: it applies shared variant styling and renders children.
 * Not intended for direct use in application code.
 * Use Badge (presentational) or Tag (interactive) instead.
 */
export function Pill({
  as: Element = "span",
  className,
  variant,
  size,
  appearance,
  radius,
  disabled,
  children,
  ...props
}: PillProps) {
  return (
    <Element
      className={cn(
        pillVariants({
          variant,
          size,
          appearance,
          radius,
          disabled: disabled || undefined,
        }),
        className,
      )}
      data-appearance={appearance ?? "solid"}
      data-radius={radius ?? "full"}
      data-size={size ?? "base"}
      data-variant={variant ?? "default"}
      {...props}
    >
      {children}
    </Element>
  );
}
