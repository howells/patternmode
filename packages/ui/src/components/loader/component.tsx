import type { LoaderProps } from "./types";
import { cx } from "@patternmode/ui/cx";

import { Loader2 } from "lucide-react";
import React from "react";
import { loaderVariants } from "./variants";

/**
 * Spinning loader component for indicating loading states and async operations.
 */
const Loader = ({
  ref: forwardedRef,
  size = "base",
  className,
  "aria-label": ariaLabel,
  label,
  ...props
}: LoaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const finalAriaLabel = ariaLabel || label;

  return (
    <div
      data-testid="loader"
      ref={forwardedRef}
      className={cx("inline-flex items-center justify-center", label && "gap-3", className)}
      {...props}
    >
      <Loader2 className={cx(loaderVariants({ size }))} aria-hidden="true" />
      {label && <span className="text-current">{label}</span>}
      {finalAriaLabel && <span className="sr-only">{finalAriaLabel}</span>}
    </div>
  );
};

Loader.displayName = "Loader";

export { Loader };
