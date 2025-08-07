import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { cx } from "@patternmode/ui/cx";
import { ChevronDown, ChevronUp } from "lucide-react";

import * as React from "react";
import { Button } from "../button/component";

/**
 * Root container for collapsible content sections.
 */
const Collapsible = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseCollapsible.Root> & { ref?: React.RefObject<React.ElementRef<typeof BaseCollapsible.Root> | null> }) => (
  <BaseCollapsible.Root
    ref={ref}
    className={cx("w-full max-w-xs", className)}
    data-testid="collapsible"
    {...props}
  />
);
Collapsible.displayName = "Collapsible";

/**
 * Props for the CollapsibleTrigger component.
 */
type CollapsibleTriggerProps = {
  /**
   * Icon to show when collapsible is closed.
   * Custom icon component to display when the collapsible panel is in closed state.
   */
  closedIcon?: React.ComponentType<{ className?: string }>;
  /**
   * Icon to show when collapsible is open.
   * Custom icon component to display when the collapsible panel is in open state.
   */
  openIcon?: React.ComponentType<{ className?: string }>;
  /**
   * Custom padding classes to apply to the container.
   * Override default padding with custom spacing classes for layout customization.
   */
  padding?: string;
} & React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>;

/**
 * Trigger button for the collapsible panel.
 */
const CollapsibleTrigger = ({
  ref,
  className,
  children,
  closedIcon: ClosedIcon = ChevronDown,
  openIcon: OpenIcon = ChevronUp,
  padding,
  ...props
}: CollapsibleTriggerProps & {
  ref?: React.RefObject<React.ElementRef<
    typeof BaseCollapsible.Trigger
  > | null>;
}) => {
  return (
    <div className={cx("flex items-center justify-between w-full", padding)}>
      <div
        className={cx(
          "flex-1 text-left text-sm font-medium transition-colors",
          "text-zinc-900 dark:text-zinc-50",
          "hover:text-zinc-700 dark:hover:text-zinc-300",
          className,
        )}
      >
        {children}
      </div>
      <BaseCollapsible.Trigger
        ref={ref}
        className={cx("group")}
        {...props}
        render={(props, state) => {
          const { ref: triggerRef, ...buttonProps } = props;
          return (
            <Button
              variant="ghost"
              size="icon-xs"
              leftIcon={state.open ? OpenIcon : ClosedIcon}
              render={<button type="button" ref={triggerRef} />}
              {...buttonProps}
            />
          );
        }}
      />
    </div>
  );
};
CollapsibleTrigger.displayName = "CollapsibleTrigger";

/**
 * Collapsible panel content that expands and collapses.
 */
const CollapsibleContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCollapsible.Panel> | null>;
}) => (
  <BaseCollapsible.Panel
    ref={ref}
    className={cx(
      "overflow-hidden transition-all duration-200 ease-out",
      "data-[starting-style]:h-0 data-[ending-style]:h-0",
      "h-[var(--collapsible-panel-height)]",
    )}
    {...props}
  >
    <div
      className={cx(
        // base
        "pt-2 b-2 text-sm",
        // text color
        "text-zinc-700 dark:text-zinc-300",
        className,
      )}
    >
      {children}
    </div>
  </BaseCollapsible.Panel>
);
CollapsibleContent.displayName = "CollapsibleContent";

/**
 * Simple chevron icon for collapsible components.
 */
function ChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { ChevronIcon, Collapsible, CollapsibleContent, CollapsibleTrigger };
