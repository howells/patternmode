import { cx } from "@patternmode/utils/cx";
import { Loader2 } from "lucide-react";
import type React from "react";
import type { LoaderProps } from "./types";
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
      className={cx(
        "inline-flex items-center justify-center",
        label && "gap-3",
        className
      )}
      data-testid="loader"
      ref={forwardedRef}
      {...props}
    >
      <Loader2 aria-hidden="true" className={cx(loaderVariants({ size }))} />
      {label && <span className="text-current">{label}</span>}
      {finalAriaLabel && <span className="sr-only">{finalAriaLabel}</span>}
    </div>
  );
};

Loader.displayName = "Loader";

export { Loader };
