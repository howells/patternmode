import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type CardFooterProps = {
  border?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = ({
  ref,
  className,
  border = false,
  ...props
}: CardFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    className={cx(
      "mt-auto flex items-center rounded-b-lg px-6 pb-4",
      "bg-zinc-50 dark:bg-zinc-900",
      border ? "pt-4" : "pt-4",
      border && "border-zinc-100 border-t dark:border-zinc-800",
      className
    )}
    ref={ref}
    {...props}
  />
);

CardFooter.displayName = "CardFooter";
