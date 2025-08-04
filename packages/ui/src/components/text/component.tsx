import Link from "next/link";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

const textVariants = tv({
  base: "m-0 text-current leading-relaxed min-w-lg",
  variants: {
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "base": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type TextProps = {
  /**
   * Text size variant controlling font size.
   * Follows a consistent scale from extra small to extra large.
   */
  size?: "2xs" | "xs" | "sm" | "base" | "lg" | "xl";
} & React.ComponentPropsWithoutRef<"p">;

/**
 * Typography component with consistent text styling and semantic meaning.
 */
export const Text = ({ className, size, ...props }: TextProps) => {
  return (
    <p
      data-slot="text"
      data-testid="text"
      {...props}
      className={cx(textVariants({ size }), className)}
    />
  );
};

type TextLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

/**
 * Text link component for navigation within text content.
 */
export const TextLink = ({
  className,
  ...props
}: TextLinkProps) => {
  return (
    <Link
      {...props}
      className={cx(
        className,
        "text-current underline decoration-current/50 data-hover:decoration-current",
      )}
    />
  );
};

type StrongProps = React.ComponentPropsWithoutRef<"strong">;

/**
 * Strong text component for emphasis within text content.
 */
export const Strong = ({
  className,
  ...props
}: StrongProps) => {
  return (
    <strong {...props} className={cx(className, "font-medium text-current")} />
  );
};

type CodeProps = React.ComponentPropsWithoutRef<"code">;

/**
 * Inline code component for displaying code within text content.
 */
export const Code = ({
  className,
  ...props
}: CodeProps) => {
  return (
    <code
      {...props}
      className={cx(
        className,
        "rounded-sm border border-current/10 bg-current/5 px-0.5 text-sm font-medium text-current sm:text-[0.8125rem]",
      )}
    />
  );
};

export type { CodeProps, StrongProps, TextLinkProps, TextProps };
