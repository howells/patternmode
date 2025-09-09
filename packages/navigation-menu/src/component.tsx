import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import {
  floatingArrowBorderDark,
  floatingArrowBorderLight,
  floatingArrowFill,
  floatingSurfaceVariants,
} from "@patternmode/utils/floating-surface";
import { ChevronDown } from "lucide-react";
import type React from "react";

type NavigationMenuProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Root
>;

/**
 * Root navigation menu component with dropdown submenus and keyboard navigation.
 */
const NavigationMenu = (props: NavigationMenuProps) => (
  <BaseNavigationMenu.Root data-testid="navigation-menu" {...props}>
    {props.children}
  </BaseNavigationMenu.Root>
);

type _NavigationMenuListProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.List
>;

/**
 * Navigation menu list component for menu item containers.
 */
const NavigationMenuList = BaseNavigationMenu.List;

type _NavigationMenuItemProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Item
>;

/**
 * Navigation menu item component for individual menu sections.
 */
const NavigationMenuItem = BaseNavigationMenu.Item;

type NavigationMenuTriggerProps = {
  /**
   * Reference to the trigger element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Trigger
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Content to display within the trigger button.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>;

/**
 * Navigation menu trigger component that opens dropdown content when activated.
 */
const NavigationMenuTrigger = ({
  ref,
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) => (
  <BaseNavigationMenu.Trigger
    className={cx(
      // layout
      "flex h-10 items-center justify-center gap-1.5 rounded-md px-3",
      // typography
      "select-none font-medium text-sm no-underline",
      // colors
      "bg-zinc-50 text-zinc-900",
      // interactions
      "hover:bg-zinc-100 active:bg-zinc-100 data-[popup-open]:bg-zinc-100",
      // focus
      "focus-visible:-outline-offset-1 focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <BaseNavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
      <ChevronDown className="h-3 w-3" />
    </BaseNavigationMenu.Icon>
  </BaseNavigationMenu.Trigger>
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

type NavigationMenuContentProps = {
  /**
   * Reference to the content element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Content
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>;

/**
 * Navigation menu content component for dropdown content containers.
 */
const NavigationMenuContent = ({
  ref,
  className,
  ...props
}: NavigationMenuContentProps) => (
  <BaseNavigationMenu.Content
    className={cx(
      // layout
      "h-full p-4",
      // animations
      "transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
      // states
      "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      className
    )}
    ref={ref}
    {...props}
  />
);
NavigationMenuContent.displayName = "NavigationMenuContent";

type NavigationMenuLinkProps = {
  /**
   * Reference to the link element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Link
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>;

/**
 * Navigation menu link component for dropdown links.
 */
const NavigationMenuLink = ({
  ref,
  className,
  ...props
}: NavigationMenuLinkProps) => (
  <BaseNavigationMenu.Link
    className={cx(
      // layout
      "block rounded-md px-3 py-3",
      // typography
      "text-inherit text-sm no-underline",
      // interactions
      "hover:bg-zinc-100",
      // focus
      "focus-visible:-outline-offset-1 focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800",
      className
    )}
    ref={ref}
    {...props}
  />
);
NavigationMenuLink.displayName = "NavigationMenuLink";

type NavigationMenuItemLinkProps = {
  /**
   * Reference to the link element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Link
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>;

/**
 * Navigation menu item link component for top-level navigation links.
 */
const NavigationMenuItemLink = ({
  ref,
  className,
  ...props
}: NavigationMenuItemLinkProps) => (
  <BaseNavigationMenu.Link
    className={cx(
      // layout
      "flex h-10 items-center justify-center rounded-md px-3",
      // typography
      "select-none font-medium text-sm no-underline",
      // colors
      "bg-zinc-50 text-zinc-900",
      // interactions
      "hover:bg-zinc-100 active:bg-zinc-100",
      // focus
      "focus-visible:-outline-offset-1 focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800",
      className
    )}
    ref={ref}
    {...props}
  />
);
NavigationMenuItemLink.displayName = "NavigationMenuItemLink";

type NavigationMenuViewportProps = {
  /**
   * Reference to the viewport element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Viewport
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport>;

/**
 * Navigation menu viewport component for dropdown rendering with smart positioning.
 */
const NavigationMenuViewport = ({
  ref,
  className,
  ...props
}: NavigationMenuViewportProps) => (
  <BaseNavigationMenu.Portal>
    <BaseNavigationMenu.Positioner
      className={cx(
        // layout
        "box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
        // animations
        "transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
        // pseudo elements
        "before:absolute before:content-['']",
        // states
        "data-[instant]:transition-none",
        // bottom positioning
        "data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5",
        // left positioning
        "data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5",
        // right positioning
        "data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5",
        // top positioning
        "data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
      )}
      collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
      sideOffset={10}
    >
      <BaseNavigationMenu.Popup
        className={cx(
          floatingSurfaceVariants({ density: "comfy", width: "auto" }).base(),
          // override radius to lg for mega menus
          "relative h-[var(--popup-height)] w-max origin-[var(--transform-origin)] rounded-lg",
          // remove default md radius from helper and keep transitions
          "transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-150",
          "xs:w-[var(--popup-width)] min-[500px]:w-[var(--popup-width)]"
        )}
      >
        <BaseNavigationMenu.Arrow
          className={cx(
            // layout
            "flex",
            // animations
            "transition-[left] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
            // positioning
            "data-[side=right]:-rotate-90 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180"
          )}
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="10"
            viewBox="0 0 20 10"
            width="20"
          >
            <title>Menu arrow</title>
            <path
              className={floatingArrowFill}
              d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
            />
            <path
              className={cx(floatingArrowBorderLight, floatingArrowBorderDark)}
              d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
            />
            <path
              className="dark:fill-zinc-300"
              d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
            />
          </svg>
        </BaseNavigationMenu.Arrow>
        <BaseNavigationMenu.Viewport
          className={cx("relative h-full w-full overflow-hidden", className)}
          ref={ref}
          {...props}
        />
      </BaseNavigationMenu.Popup>
    </BaseNavigationMenu.Positioner>
  </BaseNavigationMenu.Portal>
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuItemLink,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
};

export type { NavigationMenuProps };
