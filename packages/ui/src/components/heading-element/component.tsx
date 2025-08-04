import { cx } from "../../lib/utils";

export type HeadingElementProps = {
  /**
   * Heading level determining which HTML element to render (h1-h6).
   * Controls semantic hierarchy and accessibility structure.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Additional CSS classes.
   * Applied to the heading element for custom styling.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

/**
 * Semantic heading element component with proper HTML heading structure.
 */
export const HeadingElement = ({
  level = 1,
  className,
  ...props
}: HeadingElementProps) => {
  const Element: `h${typeof level}` = `h${level}`;

  return <Element {...props} data-testid="heading-element" className={cx(className)} />;
};
