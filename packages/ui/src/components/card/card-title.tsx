import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

interface CardTitleProps extends React.ComponentProps<"div"> {
  /** Merge props onto child */
  asChild?: boolean;
}

/**
 * CardTitle UI component.
 * Import from "@patternmode/ui/components/card".
 * Built on Radix UI primitives for accessible behavior.
 */
function CardTitle({ className, asChild = false, ...props }: CardTitleProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn("trim-both font-medium text-sm leading-none", className)}
      data-component="card-title"
      data-slot="card-title"
      {...props}
    />
  );
}

export { CardTitle };
