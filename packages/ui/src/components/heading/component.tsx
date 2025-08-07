import type { HeadingElementProps } from "../heading-element/component";
import { cx } from "@patternmode/ui/cx";
import { HeadingElement } from "../heading-element/component";

export type HeadingProps = {
  /**
   * Heading level determining which HTML element to render (h1-h6).
   * Controls semantic hierarchy and visual styling.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Additional CSS classes.
   * Applied alongside default heading styling.
   */
  className?: string;
} & Omit<HeadingElementProps, "level" | "className">;

/**
 * Heading component with hierarchical levels and consistent typography styling.
 */
export const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
  return (
    <HeadingElement
      level={level}
      data-testid="heading"
      className={cx(
        className,
        "m-0 font-semibold text-zinc-950 text-xl/8 dark:text-white",
      )}
      {...props}
    />
  );
};
