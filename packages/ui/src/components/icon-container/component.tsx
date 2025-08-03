import type { VariantProps } from "tailwind-variants";

import type { GlobalSemanticVariant, TailwindColor } from "../../lib/variants";
import React from "react";

import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
import {
  getColorClasses,
} from "../../lib/variants";
import { Icon } from "../icon/component";

const iconContainerVariants = tv({
  base: "rounded-lg flex items-center justify-center shrink-0",
  variants: {
    size: {
      sm: "w-8 h-8",
      base: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    },
    variant: {
      default: "bg-blue-100 dark:bg-blue-900/20",
      neutral: "bg-zinc-100 dark:bg-zinc-900/20",
      success: "bg-emerald-100 dark:bg-emerald-900/20",
      info: "bg-sky-100 dark:bg-sky-900/20",
      warning: "bg-amber-100 dark:bg-amber-900/20",
      error: "bg-red-100 dark:bg-red-900/20",
      critical: "bg-rose-100 dark:bg-rose-900/20",
      positive: "bg-teal-100 dark:bg-teal-900/20",
      negative: "bg-rose-100 dark:bg-rose-900/20",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "neutral",
  },
});


/**
 * Container component for icons with consistent padding and background styling.
 */
export function IconContainer({
  icon,
  size,
  variant,
  color,
  iconSize = "base",
  centered = false,
  className,
  iconClassName,
  ...props
}: IconContainerProps) {
  // Get color classes if custom color is provided
  const colorClasses = color ? getColorClasses(color) : null;

  return (
    <div
      className={cx(
        iconContainerVariants({ size, variant }),
        colorClasses && colorClasses.bgMuted,
        centered && "mx-auto",
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        size={iconSize}
        className={cx(colorClasses && colorClasses.textLight, iconClassName)}
      />
    </div>
  );
}

export type IconContainerProps = {
  /**
   * The Lucide icon component to render.
   * Should be a Lucide React icon component that accepts className and strokeWidth props.
   */
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon size within the container.
   * Controls the size of the icon itself, independent of container size.
   */
  iconSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * Whether to center the container horizontally.
   * Adds margin auto for horizontal centering when true.
   */
  centered?: boolean;
  /**
   * Additional CSS classes for the container.
   * Applied to the outer container element.
   */
  className?: string;
  /**
   * Additional CSS classes for the icon.
   * Applied directly to the icon component.
   */
  iconClassName?: string;
  /**
   * Custom color variant (overrides variant prop).
   * When provided, uses custom color system instead of predefined variants.
   */
  color?: GlobalSemanticVariant | TailwindColor;
} & VariantProps<typeof iconContainerVariants> & React.ComponentPropsWithoutRef<"div">;

export type { VariantProps as IconContainerVariantProps } from "tailwind-variants";
export { iconContainerVariants };
