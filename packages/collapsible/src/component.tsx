import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { ChevronDown, ChevronUp } from "lucide-react";
import type * as React from "react";

/**
 * Root container for collapsible content sections.
 */
const Collapsible = ({
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
    <div className={cx("flex w-full items-center justify-between", padding)}>
      <div
        className={cx(
          "flex-1 text-left font-medium text-sm transition-colors",
          "text-zinc-900 dark:text-zinc-50",
          "hover:text-zinc-700 dark:hover:text-zinc-300",
          className
        )}
      >
        {children}
      </div>
      <BaseCollapsible.Trigger
        className={cx("group")}
        ref={ref}
        {...props}
        render={(props, toggleState) => {
          const { ref: triggerRef, ...buttonProps } = props;
          return (
            <Button
              leftIcon={toggleState.open ? OpenIcon : ClosedIcon}
              render={(props) => (
                <button
                  type="button"
                  {...props}
                  ref={triggerRef as React.Ref<HTMLButtonElement>}
                />
              )}
              size="icon-xs"
              variant="ghost"
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
        // base
        "b-2 pt-2 text-sm",
        // text color
        "text-zinc-700 dark:text-zinc-300",
        className
      )}
    >
      {children}
    </div>
  </BaseCollapsible.Panel>
);
CollapsibleContent.displayName = "CollapsibleContent";

// Re-export Lucide ChevronDown icon for convenience
const ChevronIcon = ChevronDown;

export { Collapsible, CollapsibleContent, CollapsibleTrigger, ChevronIcon };
