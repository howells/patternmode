// Collapsible Component [v1.0.0] - Tremor Style

import { cx, focusRing } from "@/lib/utils";
import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "../button";

/**
 * Root collapsible component built on Base UI's Collapsible primitive.
 *
 * Based on Base UI's Collapsible (https://base-ui.com/react/components/collapsible),
 * providing accessible expandable/collapsible panels with smooth animations.
 * Perfect for FAQ sections, navigation menus, and content organization.
 *
 * @see https://base-ui.com/react/components/collapsible - Base UI documentation
 */
const Collapsible = BaseCollapsible.Root;

/**
 * Props for the CollapsibleTrigger component.
 *
 * @interface CollapsibleTriggerProps
 * @extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>
 */
interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> {
  /** Icon to show when collapsible is closed */
  closedIcon?: React.ComponentType<{ className?: string }>;
  /** Icon to show when collapsible is open */
  openIcon?: React.ComponentType<{ className?: string }>;
  /** If true, renders as just the toggle button without full-width trigger */
  asToggleButton?: boolean;
  /** Custom href for when the heading should be a link */
  href?: string;
  /** Custom padding classes to apply to the container */
  padding?: string;
}

/**
 * Trigger button for the collapsible panel.
 *
 * Based on Base UI's Collapsible.Trigger, providing an accessible button
 * that toggles the visibility of the collapsible content. Features animated
 * icon transitions and proper hover/focus states.
 *
 * @param closedIcon - Icon component to show when closed (defaults to ChevronsUpDown)
 * @param openIcon - Icon component to show when open (defaults to ChevronsDownUp)
 * @param asToggleButton - If true, renders as just the toggle button
 * @param href - If provided, makes the heading portion a link
 *
 * @example
 * ```tsx
 * // Traditional full-width trigger
 * <CollapsibleTrigger>
 *   Click to expand
 * </CollapsibleTrigger>
 *
 * // Separate heading and toggle button
 * <div className="flex items-center justify-between">
 *   <a href="/components" className="flex-1">UI Components</a>
 *   <CollapsibleTrigger asToggleButton />
 * </div>
 *
 * // Heading with link and separate toggle
 * <CollapsibleTrigger href="/components">
 *   UI Components
 * </CollapsibleTrigger>
 * ```
 *
 * @see https://base-ui.com/react/components/collapsible - Base UI documentation
 */
const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof BaseCollapsible.Trigger>,
  CollapsibleTriggerProps
>(
  (
    {
      className,
      children,
      closedIcon: ClosedIcon = ChevronDown,
      openIcon: OpenIcon = ChevronUp,
      asToggleButton = false,
      href,
      padding,
      ...props
    },
    ref
  ) => {
    // If asToggleButton is true, render just the icon button
    if (asToggleButton) {
      return (
        <BaseCollapsible.Trigger
          ref={ref}
          className={cx("group", className)}
          {...props}
          render={(props, state) => (
            <Button
              variant="ghost"
              size="icon-sm"
              leftIcon={state.open ? OpenIcon : ClosedIcon}
              {...props}
            />
          )}
        />
      );
    }

    // If href is provided, render heading as link with separate toggle button
    if (href && children) {
      return (
        <div
          className={cx("flex items-center justify-between py-2 px-4", padding)}
        >
          <Link
            href={href}
            className={cx(
              "flex-1 text-left text-sm font-medium transition-colors",
              "text-zinc-900 dark:text-zinc-50",
              "hover:text-zinc-700 dark:hover:text-zinc-300",
              focusRing
            )}
          >
            {children}
          </Link>
          <BaseCollapsible.Trigger
            ref={ref}
            className={cx("group", className)}
            {...props}
            render={(props, state) => (
              <Button
                variant="ghost"
                size="icon-sm"
                leftIcon={state.open ? OpenIcon : ClosedIcon}
                {...props}
              />
            )}
          />
        </div>
      );
    }

    // Default: full-width trigger (original behavior)
    return (
      <div className={cx("flex items-center justify-between", padding)}>
        <div
          className={cx(
            "flex-1 text-left text-sm font-medium transition-colors",
            "text-zinc-900 dark:text-zinc-50",
            "hover:text-zinc-700 dark:hover:text-zinc-300",
            className
          )}
        >
          {children}
        </div>
        <BaseCollapsible.Trigger
          ref={ref}
          className={cx("group")}
          {...props}
          render={(props, state) => (
            <Button
              variant="ghost"
              size="icon-sm"
              leftIcon={state.open ? OpenIcon : ClosedIcon}
              {...props}
            />
          )}
        />
      </div>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

/**
 * Collapsible panel content that expands and collapses.
 *
 * Based on Base UI's Collapsible.Panel, providing smooth height-based
 * animations when showing and hiding content. Uses CSS variables for
 * precise height calculations and smooth transitions.
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <p>This content will smoothly expand and collapse.</p>
 *   <div className="space-y-2">
 *     <p>Multiple paragraphs work perfectly.</p>
 *     <p>The height animation adapts to any content size.</p>
 *   </div>
 * </CollapsibleContent>
 * ```
 *
 * @see https://base-ui.com/react/components/collapsible - Base UI documentation
 */
const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof BaseCollapsible.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>
>(({ className, children, ...props }, ref) => (
  <BaseCollapsible.Panel
    ref={ref}
    className={cx(
      "overflow-hidden transition-all duration-200 ease-out",
      "data-[starting-style]:h-0 data-[ending-style]:h-0",
      "h-[var(--collapsible-panel-height)]"
    )}
    {...props}
  >
    <div
      className={cx(
        // base
        "pb-2 text-sm",
        // text color
        "text-zinc-700 dark:text-zinc-300",
        className
      )}
    >
      {children}
    </div>
  </BaseCollapsible.Panel>
));
CollapsibleContent.displayName = "CollapsibleContent";

/**
 * Simple chevron icon for collapsible components.
 *
 * Provides a basic right-pointing chevron that can be used as an alternative
 * to the default Lucide icons for simpler visual designs.
 *
 * @param props - Standard SVG props
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger closedIcon={ChevronIcon}>
 *   Simple chevron trigger
 * </CollapsibleTrigger>
 * ```
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
