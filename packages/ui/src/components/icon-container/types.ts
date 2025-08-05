import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { GlobalSemanticVariant, TailwindColor } from "../../lib/variants";
import type { iconContainerVariants } from "./variants";

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
