"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

type ExpandButtonIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const expandButtonVariants = cva(
  cn(
    "group inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-input text-foreground shadow-xs ring-offset-background transition-colors hover:bg-[color-mix(in_srgb,var(--color-foreground)_2%,transparent)] disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  {
    variants: {
      size: {
        "2xs": "size-3.5 rounded-sm [&_svg]:size-2.5",
        xs: "size-4 rounded-sm [&_svg]:size-2.5",
        sm: "size-4.5 [&_svg]:size-3",
        base: "size-5 [&_svg]:size-3.5",
        lg: "size-5.5 [&_svg]:size-4",
        xl: "size-6 [&_svg]:size-4.5",
        "2xl": "size-7 [&_svg]:size-5",
        "3xl": "size-8 [&_svg]:size-6",
      } satisfies Record<ComponentSize, string>,
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type ExpandButtonProps = Omit<
  React.ComponentProps<"button">,
  "children"
> &
  VariantProps<typeof expandButtonVariants> & {
    expanded?: boolean;
    expandedIcon?: ExpandButtonIcon;
    collapsedIcon?: ExpandButtonIcon;
  };

function ExpandButton({
  className,
  expanded = false,
  expandedIcon: ExpandedIcon = Minus,
  collapsedIcon: CollapsedIcon = Plus,
  size,
  type = "button",
  ...props
}: ExpandButtonProps) {
  const Icon = expanded ? ExpandedIcon : CollapsedIcon;

  return (
    <button
      aria-expanded={expanded}
      className={cn(expandButtonVariants({ size }), className)}
      type={type}
      {...props}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

export { ExpandButton };
