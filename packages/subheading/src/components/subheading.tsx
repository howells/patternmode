import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type HeadingElementProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

const HeadingElement = ({
  level = 1,
  className,
  ...props
}: HeadingElementProps) => {
  const Element: `h${typeof level}` = `h${level}`;
  return (
    <Element
      {...props}
      className={cx(className)}
      data-testid="heading-element"
    />
  );
};

export type SubheadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
} & Omit<HeadingElementProps, "level" | "className">;

export const Subheading = ({
  className,
  level = 2,
  ...props
}: SubheadingProps) => {
  return (
    <HeadingElement
      className={cx(className, "m-0 font-medium text-current text-sm")}
      data-testid="subheading"
      level={level}
      {...props}
    />
  );
};
