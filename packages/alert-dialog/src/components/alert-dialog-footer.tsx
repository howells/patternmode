"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { alertDialogFooterVariants } from "../variants";

/**
 * Footer container for alert dialog action buttons.
 */
export const AlertDialogFooter = ({
  ref,
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
} & React.ComponentPropsWithoutRef<"div">) => (
  <div
    className={cx(alertDialogFooterVariants(), className)}
    ref={ref}
    {...props}
  >
    {children}
  </div>
);
