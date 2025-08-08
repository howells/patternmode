import type { CodeProps, StrongProps, TextLinkProps, TextProps } from "./types";

import { cx } from "../../utils/cx";
import { textVariants } from "./variants";

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

/**
 * Text link component for navigation within text content.
 */
export const TextLink = ({ className, ...props }: TextLinkProps) => (
  <a
    {...props}
    className={cx(
      className,
      "text-current underline decoration-current/50 data-hover:decoration-current",
    )}
  />
);

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
        "rounded-sm px-2.5 border border-current/10 bg-current/5 text-sm font-medium text-current sm:text-[0.8125rem]",
      )}
    />
  );
};
