import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type CardHeaderProps = {
  border?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = ({
  ref,
  className,
  border = true,
  ...props
}: CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    className={cx(
      "flex flex-col space-y-1.5 p-6",
      border && "border-zinc-950/5 border-b dark:border-zinc-800",
      className
    )}
    ref={ref}
    {...props}
  />
);

CardHeader.displayName = "CardHeader";
