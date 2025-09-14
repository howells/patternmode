import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

/**
 * Root container for collapsible content sections.
 */
export const Collapsible = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCollapsible.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCollapsible.Root> | null>;
}) => (
  <BaseCollapsible.Root
    className={cx("w-full max-w-xs", className)}
    data-testid="collapsible"
    ref={ref}
    {...props}
  />
);

Collapsible.displayName = "Collapsible";
