import { cx } from "@patternmode/utils/cx";
import type { LoaderProps } from "../types";
import { loaderVariants } from "../variants";

const Loader = ({ className, size = "base", label }: LoaderProps) => {
  const classes = loaderVariants({ size });
  return (
    <output
      aria-live="polite"
      className={cx(classes, className)}
      data-testid="loader"
    >
      <span className="sr-only">{label ?? "Loading"}</span>
    </output>
  );
};

Loader.displayName = "Loader";

export { Loader };
