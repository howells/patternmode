import { Separator } from "@patternmode/ui/components/separator";
import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

/**
 * buttonGroupVariants variant class helper for ButtonGroup.
 * Import from "@patternmode/ui/components/button-group".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 */
const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      variant: {
        /**
         * Default "joined" behavior - relies on each child for borders/background,
         * and simply removes overlapping borders + inner radii.
         */
        joined: "",
        /**
         * Segmented "pill" group - the container provides border/background/shadow,
         * and items are visually separated via `divide-*`.
         */
        segmented:
          "isolate overflow-hidden border border-border bg-card shadow-xs [&>[data-slot=button-group-text]]:border-0 [&>[data-slot=button-group-text]]:shadow-none [&>[data-slot=select-trigger]]:border-0 [&>[data-slot=select-trigger]]:shadow-none",
      },
      orientation: {
        horizontal:
          "flex-row [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
      },
      radius: {
        rounded: "",
        square: "",
        full: "",
      },
      dividers: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Dividers based on orientation (when dividers: true)
      // Uses border-l/border-t on children with explicit color to override ghost button's border-transparent
      {
        dividers: true,
        orientation: "horizontal",
        class:
          "[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-l-border",
      },
      {
        dividers: true,
        orientation: "vertical",
        class:
          "[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-t-border",
      },
      // Segmented variant uses dividers instead of border overrides.
      {
        variant: "segmented",
        orientation: "horizontal",
        class:
          "[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-l-border",
      },
      {
        variant: "segmented",
        orientation: "vertical",
        class:
          "[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-t-border",
      },
      // Remove borders from buttons when dividers are disabled (segmented without dividers)
      {
        variant: "segmented",
        dividers: false,
        class:
          "[&>[data-slot=button]]:border-0 [&>[data-slot=button]]:shadow-none",
      },
      // Remove overlapping borders when dividers are disabled (joined variant behavior)
      {
        dividers: false,
        orientation: "horizontal",
        class: "[&>[data-slot=button]]:border-0",
      },
      {
        dividers: false,
        orientation: "vertical",
        class: "[&>[data-slot=button]]:border-0",
      },

      // Optional radius overrides (applies to non-separator items)
      {
        radius: "rounded",
        orientation: "horizontal",
        class:
          "[&>*:not([data-slot=button-group-separator]):first-child]:rounded-s-md [&>*:not([data-slot=button-group-separator]):last-child]:rounded-e-md [&>*:not([data-slot=button-group-separator])]:rounded-none",
      },
      {
        radius: "rounded",
        orientation: "vertical",
        class:
          "[&>*:not([data-slot=button-group-separator]):first-child]:rounded-t-md [&>*:not([data-slot=button-group-separator]):last-child]:rounded-b-md [&>*:not([data-slot=button-group-separator])]:rounded-none",
      },
      {
        radius: "rounded",
        orientation: "horizontal",
        class:
          "[&>*:not([data-slot=button-group-separator]):first-child]:rounded-s-full [&>*:not([data-slot=button-group-separator]):last-child]:rounded-e-full [&>*:not([data-slot=button-group-separator])]:rounded-none",
      },
      {
        radius: "rounded",
        orientation: "vertical",
        class:
          "[&>*:not([data-slot=button-group-separator]):first-child]:rounded-t-full [&>*:not([data-slot=button-group-separator]):last-child]:rounded-b-full [&>*:not([data-slot=button-group-separator])]:rounded-none",
      },
      {
        radius: "square",
        class: "[&>*:not([data-slot=button-group-separator])]:rounded-none",
      },

      // When segmented, also apply the chosen radius to the container.
      { variant: "segmented", radius: "rounded", class: "rounded-md" },
      { variant: "segmented", radius: "rounded", class: "rounded-full" },
      { variant: "segmented", radius: "square", class: "rounded-none" },
    ],
    defaultVariants: {
      variant: "joined",
      orientation: "horizontal",
      radius: "rounded",
    },
  },
);

/**
 * ButtonGroup UI component.
 * Import from "@patternmode/ui/components/button-group".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 */
function ButtonGroup({
  className,
  variant = "joined",
  orientation = "horizontal",
  radius = "full",
  dividers,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  // Default dividers to true for segmented variant, false otherwise
  const dividersValue =
    dividers === undefined ? variant === "segmented" : dividers;

  return (
    <div
      className={cn(
        buttonGroupVariants({
          orientation,
          radius,
          variant,
          dividers: dividersValue,
        }),
        className,
      )}
      data-component="button-group"
      data-orientation={orientation}
      data-slot="button-group"
      data-variant={variant}
      {...props}
    />
  );
}

/**
 * ButtonGroupText UI component.
 * Import from "@patternmode/ui/components/button-group".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 */
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className,
      )}
      data-component="button-group-text"
      data-slot="button-group-text"
      {...props}
    />
  );
}

/**
 * ButtonGroupSeparator UI component.
 * Import from "@patternmode/ui/components/button-group".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn(
        "!m-0 relative self-stretch bg-input data-[orientation=vertical]:h-auto",
        className,
      )}
      data-component="button-group-separator"
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
