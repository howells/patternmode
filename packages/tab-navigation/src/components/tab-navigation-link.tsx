import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";

export type TabNavigationLinkProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenu.Link
> & {
  /**
   * Whether the link should be disabled and non-interactive.
   * Disabled links are visually dimmed and cannot be clicked.
   */
  disabled?: boolean;
} & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenu.Link> | null>;
};

/**
 * Individual tab navigation link with active state and hover effects.
 */
export const TabNavigationLink = ({
  ref: forwardedRef,
  disabled,
  className,
  children,
  ...props
}: TabNavigationLinkProps) => (
  <NavigationMenu.Item aria-disabled={disabled} className="flex">
    <NavigationMenu.Link
      aria-disabled={disabled}
      className={cx(
        "group relative flex shrink-0 select-none items-center justify-center",
        disabled ? "pointer-events-none" : ""
      )}
      ref={forwardedRef}
      {...props}
    >
      <span
        className={cx(
          // base
          "-mb-px flex items-center justify-center whitespace-nowrap border-transparent border-b-2 px-3 pb-2 font-medium text-sm transition-all",
          // text color
          "text-zinc-500 dark:text-zinc-500",
          // hover
          "group-hover:text-zinc-700 dark:group-hover:text-zinc-400",
          // border hover
          "group-hover: dark:group-hover:border-zinc-400",
          // selected
          "group-data-active:border-zinc-500 group-data-active:text-zinc-500",
          "dark:group-data-active:border-zinc-500 dark:group-data-active:text-zinc-500",
          // disabled
          disabled
            ? "pointer-events-none text-zinc-300 dark:text-zinc-700"
            : "",
          focusRing,
          className
        )}
      >
        {children}
      </span>
    </NavigationMenu.Link>
  </NavigationMenu.Item>
);

TabNavigationLink.displayName = "TabNavigationLink";
