"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root as SeparatorRoot } from "@radix-ui/react-separator";
import type { ComponentProps } from "react";

const VARIANT_CLASSES = {
  default: "bg-border",
  muted: "bg-gray-200",
  accent: "bg-gray-300",
  strong: "bg-gray-400",
} as const;

type SeparatorVariant = keyof typeof VARIANT_CLASSES;

interface SeparatorProps extends ComponentProps<typeof SeparatorRoot> {
  /** Visual weight of the separator line. */
  variant?: SeparatorVariant;
}

/**
 * Visual separator line for dividing content sections.
 *
 * @param props - The separator props
 * @param props.orientation - Separator orientation. Options: "horizontal" (default), "vertical".
 * @param props.variant - Visual weight. Options: "default", "muted", "accent", "strong". Defaults to "default".
 * @param props.decorative - Whether separator is decorative (hidden from screen readers). Defaults to true.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * ```tsx
 * <Separator orientation="horizontal" />
 * <Separator orientation="vertical" variant="accent" className="h-6" />
 * ```
 */
function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorRoot
      className={cn(
        "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        VARIANT_CLASSES[variant],
        className,
      )}
      data-component="separator"
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export type { SeparatorVariant };
export { Separator };
