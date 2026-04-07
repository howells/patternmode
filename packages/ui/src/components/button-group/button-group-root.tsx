import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";
import { Separator } from "../separator";

const buttonGroupVariants = cva("flex w-fit items-stretch", {
  variants: {
    orientation: {
      horizontal:
        "flex-row [&>*:not(:first-child):not([data-slot=button-group-separator])]:rounded-l-none [&>*:not(:last-child):not([data-slot=button-group-separator])]:rounded-r-none",
      vertical:
        "flex-col [&>*:not(:first-child):not([data-slot=button-group-separator])]:rounded-t-none [&>*:not(:last-child):not([data-slot=button-group-separator])]:rounded-b-none",
    },
    variant: {
      joined: "",
      segmented:
        "overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-panel shadow-2xs [&>[data-slot=button]]:border-0 [&>[data-slot=button]]:shadow-none",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "joined",
  },
});

export interface ButtonGroupProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
  className,
  orientation,
  variant,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ className, orientation, variant }))}
      data-orientation={orientation}
      data-slot="button-group"
      {...props}
    />
  );
}

function ButtonGroupText({
  asChild = false,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "inline-flex items-center rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-secondary/60 px-3 text-body text-muted-foreground shadow-2xs",
        className
      )}
      data-slot="button-group-text"
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ComponentPropsWithoutRef<typeof Separator>) {
  return (
    <Separator
      className={cn(
        "self-stretch bg-border/80 data-[orientation=vertical]:h-auto",
        className
      )}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
