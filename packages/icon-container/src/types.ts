import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { iconContainerVariants } from "./variants";

export type IconContainerProps = {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  size?: "sm" | "base" | "lg" | "xl";
  variant?: VariantProps<typeof iconContainerVariants>["variant"];
  color?: string;
  iconSize?: "xs" | "sm" | "base" | "lg" | "xl" | number;
  centered?: boolean;
  className?: string;
  iconClassName?: string;
} & React.ComponentPropsWithoutRef<"div">;

