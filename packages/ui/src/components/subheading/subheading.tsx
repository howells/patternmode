import { cx } from "../../lib/utils";
import { HeadingElement, type HeadingElementProps } from "../heading-element/heading-element";

export type SubheadingProps = HeadingElementProps;

/**
 * Subheading
 *
 * @id subheading
 * @name Subheading
 */
export function Subheading({
  className,
  level = 2,
  ...props
}: SubheadingProps) {
  return (
    <HeadingElement
      level={level}
      className={cx(
        className,
        "m-0 text-sm font-semibold text-current sm:text-sm"
      )}
      {...props}
    />
  );
}
