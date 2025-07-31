/**
 * Navigation Menu Components.
 *
 * A comprehensive navigation menu system built on Base UI NavigationMenu for
 * creating dropdown navigation menus with smooth animations and accessibility.
 * Perfect for website headers, main navigation, and complex menu structures.
 *
 * Features:
 * - Base UI NavigationMenu integration for full accessibility
 * - Smooth animated dropdowns with custom timing curves
 * - Keyboard navigation (Tab, Arrow keys, Enter, Escape)
 * - Focus management and ARIA attributes
 * - Animated chevron indicators
 * - Collision detection and smart positioning
 * - Portal rendering for z-index management
 * - Dark mode support
 * - Responsive design considerations.
 *
 * Built on Base UI NavigationMenu documentation:
 * https://base-ui.com/react/components/navigation-menu.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
 *       <NavigationMenuContent>Content</NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 */

import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cx } from "../../lib/utils";

/**
 * Root navigation menu component.
 *
 * The container for the entire navigation menu structure.
 * Built on Base UI NavigationMenu.Root for full accessibility.
 */
const /**
       *
       */
  NavigationMenu = BaseNavigationMenu.Root;

/**
 * Navigation menu list component for menu item containers.
 *
 * Horizontal container for navigation menu items with proper keyboard
 * navigation and focus management.
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuList>
 *   <NavigationMenuItem>
 *     <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
 *     <NavigationMenuContent>Content</NavigationMenuContent>
 *   </NavigationMenuItem>
 * </NavigationMenuList>
 * ```
 */
const /**
       *
       */
  NavigationMenuList = BaseNavigationMenu.List;

/**
 * Navigation menu item component for individual menu sections.
 *
 * Container for navigation menu triggers and their associated content.
 * Manages the open/closed state and focus behavior.
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *   <NavigationMenuContent>
 *     Menu content here
 *   </NavigationMenuContent>
 * </NavigationMenuItem>
 * ```
 */
const /**
       *
       */
  NavigationMenuItem = BaseNavigationMenu.Item;

/**
 * Navigation menu trigger component for dropdown buttons.
 *
 * Clickable trigger that opens dropdown menu content. Features animated
 * chevron indicator and proper focus states.
 *
 * @param className - Additional CSS classes.
 * @param children - Trigger content (typically text).
 * @param props - Additional Base UI Trigger props.
 *
 *
 * @id navigation-menu
 * @name Navigation Menu
 * @component
 * @example
 * ```tsx
 * <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 * <NavigationMenuTrigger className="font-bold">Featured</NavigationMenuTrigger>
 * ```
 */
const /**
       *
       */
  NavigationMenuTrigger = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger> & { ref?: React.RefObject<React.ElementRef<typeof BaseNavigationMenu.Trigger> | null> }) => (
    <BaseNavigationMenu.Trigger
      ref={ref}
      className={cx(
      // layout
        "flex items-center justify-center gap-1.5 h-10 px-3 rounded-md",
        // typography
        "font-medium text-sm select-none no-underline",
        // colors
        "bg-zinc-50 text-zinc-900",
        // interactions
        "hover:bg-zinc-100 active:bg-zinc-100 data-[popup-open]:bg-zinc-100",
        // focus
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 focus-visible:relative",
        className,
      )}
      {...props}
    >
      {children}
      <BaseNavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
        <ChevronDown className="h-3 w-3" />
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/**
 * Navigation menu content component for dropdown content.
 *
 * Container for dropdown menu content with smooth animations and transitions.
 * Rendered within the NavigationMenuViewport with proper positioning.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Content props.
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuContent>
 *   <div className="p-6 space-y-3">
 *     <NavigationMenuLink href="/link1">Link 1</NavigationMenuLink>
 *     <NavigationMenuLink href="/link2">Link 2</NavigationMenuLink>
 *   </div>
 * </NavigationMenuContent>
 *
 * <NavigationMenuContent className="w-96">
 *   <div className="grid grid-cols-2 gap-4 p-6">
 *     <div>Column 1</div>
 *     <div>Column 2</div>
 *   </div>
 * </NavigationMenuContent>
 * ```
 */
const /**
       *
       */
  NavigationMenuContent = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content> & { ref?: React.RefObject<React.ElementRef<typeof BaseNavigationMenu.Content> | null> }) => (
    <BaseNavigationMenu.Content
      ref={ref}
      className={cx(
      // layout
        "h-full p-4",
        // animations
        "transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
        // states
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
NavigationMenuContent.displayName = "NavigationMenuContent";

/**
 * Navigation menu link component for dropdown links.
 *
 * Interactive link component for use within dropdown menu content.
 * Features hover states and proper focus management.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Link props (href, onClick, etc.).
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuLink href="/products">
 *   View All Products
 * </NavigationMenuLink>
 *
 * <NavigationMenuLink href="/services" className="font-semibold">
 *   Premium Services
 * </NavigationMenuLink>
 *
 * <NavigationMenuLink onClick={() => handleAction()}>
 *   Custom Action
 * </NavigationMenuLink>
 * ```
 */
const /**
       *
       */
  NavigationMenuLink = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link> & { ref?: React.RefObject<React.ElementRef<typeof BaseNavigationMenu.Link> | null> }) => (
    <BaseNavigationMenu.Link
      ref={ref}
      className={cx(
      // layout
        "block rounded-md px-3 py-3",
        // typography
        "text-sm no-underline text-inherit",
        // interactions
        "hover:bg-zinc-100",
        // focus
        "focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800",
        className,
      )}
      {...props}
    />
  );
NavigationMenuLink.displayName = "NavigationMenuLink";

/**
 * Navigation menu item link component for top-level links.
 *
 * Styled link component for navigation items that don't have dropdown content.
 * Matches the styling of NavigationMenuTrigger for visual consistency.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Link props (href, onClick, etc.).
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuItemLink href="/about">
 *     About Us
 *   </NavigationMenuItemLink>
 * </NavigationMenuItem>
 *
 * <NavigationMenuItem>
 *   <NavigationMenuItemLink href="/contact" className="bg-blue-500 text-white">
 *     Contact
 *   </NavigationMenuItemLink>
 * </NavigationMenuItem>
 * ```
 */
const /**
       *
       */
  NavigationMenuItemLink = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link> & { ref?: React.RefObject<React.ElementRef<typeof BaseNavigationMenu.Link> | null> }) => (
    <BaseNavigationMenu.Link
      ref={ref}
      className={cx(
      // layout
        "flex items-center justify-center h-10 px-3 rounded-md",
        // typography
        "font-medium text-sm select-none no-underline",
        // colors
        "bg-zinc-50 text-zinc-900",
        // interactions
        "hover:bg-zinc-100 active:bg-zinc-100",
        // focus
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 focus-visible:relative",
        className,
      )}
      {...props}
    />
  );
NavigationMenuItemLink.displayName = "NavigationMenuItemLink";

/**
 * Navigation menu viewport component for dropdown rendering.
 *
 * Portal-rendered viewport that contains dropdown content with smart positioning,
 * collision detection, and smooth animations. Features arrow indicators and
 * responsive behavior.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Viewport props.
 *
 * @component
 * @example
 * ```tsx
 * // Must be included at the root level of NavigationMenu
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>...</NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 *
 * // Custom styled viewport
 * <NavigationMenuViewport className="border-2 border-blue-200" />
 * ```
 */
const /**
       *
       */
  NavigationMenuViewport = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport> & { ref?: React.RefObject<React.ElementRef<typeof BaseNavigationMenu.Viewport> | null> }) => (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        sideOffset={10}
        collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
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
          "data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5",
        )}
      >
        <BaseNavigationMenu.Popup
          className={cx(
          // layout
            "relative h-[var(--popup-height)] w-max origin-[var(--transform-origin)] rounded-lg",
            // colors
            "bg-white text-zinc-900",
            // shadows & borders
            "shadow-lg shadow-zinc-200 outline outline-1 outline-zinc-200",
            // animations
            "transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
            // states
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            // responsive
            "min-[500px]:w-[var(--popup-width)] xs:w-[var(--popup-width)]",
            // dark mode
            "dark:shadow-none dark:-outline-offset-1 dark:outline-zinc-300",
          )}
        >
          <BaseNavigationMenu.Arrow
            className={cx(
            // layout
              "flex",
              // animations
              "transition-[left] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
              // positioning
              "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
            )}
          >
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className="fill-white"
              />
              <path
                d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                className="fill-zinc-200 dark:fill-none"
              />
              <path
                d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
                className="dark:fill-zinc-300"
              />
            </svg>
          </BaseNavigationMenu.Arrow>
          <BaseNavigationMenu.Viewport
            ref={ref}
            className={cx("relative h-full w-full overflow-hidden", className)}
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
