import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { indicatorVariants, listItemVariants, listVariants } from "./variants";

export type TextListProps = {
  as?: React.ElementType;
  unstyled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof listVariants> & React.ComponentPropsWithoutRef<"ul">;

export type TextListItemProps = {
  unstyled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof listItemVariants> & React.LiHTMLAttributes<HTMLLIElement>;

export type TextListIndicatorProps = {
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof indicatorVariants>;

