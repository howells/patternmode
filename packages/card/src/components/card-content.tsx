import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type CardContentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const CardContent = ({
  ref,
  className,
  ...props
}: CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div className={cx("p-6 text-sm", className)} ref={ref} {...props} />
);

CardContent.displayName = "CardContent";
