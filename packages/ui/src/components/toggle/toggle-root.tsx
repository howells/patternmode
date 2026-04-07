"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root } from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { Children } from "react";
import type { ComponentSize } from "../../lib/size";
import { Icon } from "../icon";

/** Toggle sizes — subset of the shared ComponentSize scale. */
export type ToggleSize = Extract<ComponentSize, "sm" | "base" | "lg">;

/**
 * toggleVariants variant class helper for Toggle.
 * Import from "@patternmode/ui/components/toggle".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 */
const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border border-border bg-white font-medium text-foreground text-sm shadow-xs outline-none transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "data-[state=on]:bg-gray-100",
        secondary: "data-[state=on]:bg-background",
      },
      size: {
        sm: "h-8 gap-2 px-3 [&_svg:not([class*='size-'])]:size-4",
        base: "h-9 gap-2 px-3 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 gap-2 px-3 [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-full",
      },
    },
    compoundVariants: [
      { size: "sm", class: "data-[icon-only]:size-8 data-[icon-only]:p-0" },
      {
        size: "base",
        class: "data-[icon-only]:size-9 data-[icon-only]:p-0",
      },
      { size: "lg", class: "data-[icon-only]:size-10 data-[icon-only]:p-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "base",
      shape: "square",
    },
  },
);

/**
 * Toggle button that switches between on/off states.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <Toggle icon={Bold} aria-label="Toggle bold" />
 * <Toggle pressed={isBold} onPressedChange={setIsBold}>Bold</Toggle>
 * ```
 */
function Toggle({
  className,
  variant,
  size,
  shape,
  icon,
  iconPlacement = "start",
  children,
  ...props
}: React.ComponentProps<typeof Root> &
  VariantProps<typeof toggleVariants> & {
    /** Icon component (LucideIcon or custom SVG component). */
    icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    /** Position of the icon relative to the label text. */
    iconPlacement?: "start" | "end";
  }) {
  const hasChildren = Children.count(children) > 0;
  const isIconOnly = icon && !hasChildren;

  // Icon element - let CSS handle sizing via [&_svg]:size-4
  const iconElement = icon ? <Icon icon={icon} /> : null;

  const renderContent = () => {
    // Icon-only toggle
    if (isIconOnly) {
      return iconElement;
    }

    // Labeled toggle with icon
    if (icon && hasChildren) {
      if (iconPlacement === "start") {
        return (
          <>
            {iconElement}
            {children}
          </>
        );
      }
      return (
        <>
          {children}
          {iconElement}
        </>
      );
    }

    return children;
  };

  return (
    <Root
      className={cn(toggleVariants({ variant, size, shape, className }))}
      data-component="toggle"
      data-icon-only={isIconOnly ? "true" : undefined}
      data-slot="toggle"
      {...props}
    >
      {renderContent()}
    </Root>
  );
}

export { Toggle, toggleVariants };
