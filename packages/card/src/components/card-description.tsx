import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type CardDescriptionProps = {
  className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = ({
  ref,
  className,
  ...props
}: CardDescriptionProps & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}) => (
  <p
    className={cx("text-sm text-zinc-500 dark:text-zinc-400", className)}
    ref={ref}
    {...props}
  />
);

CardDescription.displayName = "CardDescription";
