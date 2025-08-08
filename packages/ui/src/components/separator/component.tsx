import type { SeparatorProps } from "./types";
import { Separator as BaseSeparator } from "@base-ui-components/react/separator";

import React from "react";
import { cx } from "../../utils/cx";
import { separatorContainerVariants, separatorVariants } from "./variants";

/**
 * A visual separator component built on Base UI's Separator primitive for content division.
 */
const Separator = (
  { ref, className, orientation = "horizontal", variant, size, children, spacing, ...props }: SeparatorProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSeparator> | null> },
) => {
  // If children are provided, render as a container with text label
  if (children) {
    return (
      <div
        className={cx(
          separatorContainerVariants({ orientation, spacing }),
          className,
        )}
      >
        <BaseSeparator
          ref={ref}
          orientation={orientation}
          className={cx(separatorVariants({ orientation, variant, size }))}
          {...props}
        />
        <div className="whitespace-nowrap text-inherit">{children}</div>
        <BaseSeparator
          orientation={orientation}
          className={cx(separatorVariants({ orientation, variant, size }))}
        />
      </div>
    );
  }

  // Default separator without text
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={cx(
        separatorVariants({ orientation, variant, size }),
        className,
      )}
      data-testid="separator"
      {...props}
    />
  );
};

Separator.displayName = "Separator";

export { Separator };
