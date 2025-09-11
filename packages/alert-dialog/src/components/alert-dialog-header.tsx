"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { alertDialogHeaderVariants } from "../variants";

/**
 * Header container for the alert dialog title and description.
 */
export const AlertDialogHeader = ({
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
    className={cx(alertDialogHeaderVariants(), className)}
    ref={ref}
    {...props}
  >
    {children}
  </div>
);
