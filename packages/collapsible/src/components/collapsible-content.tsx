import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

/**
 * Collapsible panel content that expands and collapses.
 */
export const CollapsibleContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCollapsible.Panel> | null>;
}) => (
  <BaseCollapsible.Panel
    className={cx(
      "overflow-hidden transition-all duration-200 ease-out",
      "data-[ending-style]:h-0 data-[starting-style]:h-0",
      "h-[var(--collapsible-panel-height)]"
    )}
    ref={ref}
    {...props}
  >
    <div
      className={cx(
        "b-2 pt-2 text-sm",
        "text-zinc-700 dark:text-zinc-300",
        className
      )}
    >
      {children}
    </div>
  </BaseCollapsible.Panel>
);

CollapsibleContent.displayName = "CollapsibleContent";
