import { cx } from "@patternmode/utils/cx";
import type {
  CodeProps,
  StrongProps,
  TextLinkProps,
  TextProps,
} from "../types";
import { textVariants } from "../variants";

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

export const TextLink = ({ className, ...props }: TextLinkProps) => (
  <a
    href={props.href ?? "#"}
    {...props}
    className={cx(
      className,
      "text-current underline decoration-current/50 data-hover:decoration-current"
    )}
  />
);

export const Strong = ({ className, ...props }: StrongProps) => {
  return (
    <strong {...props} className={cx(className, "font-medium text-current")} />
  );
};

export const Code = ({ className, ...props }: CodeProps) => {
  return (
    <code
      {...props}
      className={cx(
        className,
        "rounded-sm border border-current/10 bg-current/5 px-2.5 font-medium text-current"
      )}
    />
  );
};
