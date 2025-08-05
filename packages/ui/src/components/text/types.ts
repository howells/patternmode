import type Link from "next/link";

/**
 * Text size variant controlling font size.
 * Follows a consistent scale from extra small to extra large.
 */
export type TextSize = "2xs" | "xs" | "sm" | "base" | "lg" | "xl";

export type TextProps = {
  /**
   * Text size variant controlling font size.
   * Follows a consistent scale from extra small to extra large.
   */
  size?: TextSize;
} & React.ComponentPropsWithoutRef<"p">;

export type TextLinkProps = React.ComponentPropsWithoutRef<typeof Link>;
export type StrongProps = React.ComponentPropsWithoutRef<"strong">;
export type CodeProps = React.ComponentPropsWithoutRef<"code">;
