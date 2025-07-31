import type { HeadingElementProps } from "../heading-element/heading-element";
import { cx } from "../../lib/utils";
import { HeadingElement } from "../heading-element/heading-element";

export type SubheadingProps = HeadingElementProps;

/**
 * Subheading.
 *
 * @component
 * @id subheading
 * @name Subheading
 * @example
 * ```tsx
 * <Subheading>Section subtitle</Subheading>
 * ```
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
        "m-0 text-sm font-semibold text-current sm:text-sm",
      )}
      {...props}
    />
  );
}
