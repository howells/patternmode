import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { ChevronDown, ChevronUp } from "lucide-react";
import type * as React from "react";

/**
 * Button trigger for toggling collapsible content visibility.
 */
type CollapsibleTriggerProps = {
  closedIcon?: React.ComponentType<{ className?: string }>;
  openIcon?: React.ComponentType<{ className?: string }>;
  padding?: string;
} & React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> & {
    ref?: React.RefObject<React.ElementRef<
      typeof BaseCollapsible.Trigger
    > | null>;
  };

export const CollapsibleTrigger = ({
  ref,
  className,
  children,
  closedIcon: ClosedIcon = ChevronDown,
  openIcon: OpenIcon = ChevronUp,
  padding,
  ...props
}: CollapsibleTriggerProps) => {
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
        render={(triggerProps, toggleState) => {
          const { ref: triggerRef, ...buttonProps } = triggerProps;
          return (
            <Button
              leftIcon={toggleState.open ? OpenIcon : ClosedIcon}
              render={(btnProps) => (
                <button
                  type="button"
                  {...btnProps}
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
