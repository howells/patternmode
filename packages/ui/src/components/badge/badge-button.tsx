import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import type * as React from "react";
import { Children } from "react";
import { isDevelopmentBrowser } from "../../lib/is-development-browser";

const badgeButtonVariants = cva(
  "-me-0.5 inline-flex cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 leading-none opacity-60 transition-opacity hover:opacity-100 [&>svg]:opacity-100!",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

/**
 * BadgeButton UI component.
 * Import from "@patternmode/ui/components/badge".
 * Uses variant-based styling via class-variance-authority.
 */
export function BadgeButton({
  className,
  variant,
  asChild = false,
  icon = <X />,
  children,
  ...props
}: BadgeButtonProps) {
  const Comp = asChild ? SlotPrimitive.Slot : "button";
  const hasChildren = Children.count(children) > 0;

  if (
    isDevelopmentBrowser() &&
    !hasChildren &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "BadgeButton: Icon-only button is missing `aria-label` or `aria-labelledby`.",
    );
  }

  return (
    <Comp
      className={cn(badgeButtonVariants({ variant, className }))}
      data-slot="badge-button"
      type={asChild ? undefined : "button"}
      {...props}
    >
      {hasChildren ? children : icon}
    </Comp>
  );
}
