/**
 * Horizontal menu bar component for primary navigation and actions.
 */

import { Menubar as BaseMenubar } from "@base-ui-components/react/menubar";
import { cx } from "../../utils/cx";

import React from "react";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "../menu/component";

/**
 * Props for the MenuBar component.
 */
type MenuBarProps = {
  /**
   * Additional CSS classes for custom styling.
   * Applied to the root menu bar container element.
   */
  className?: string;
  /**
   * React ref for the menu bar container element.
   * Provides direct access to the underlying Base UI Menubar element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BaseMenubar> | null>;
} & React.ComponentPropsWithoutRef<typeof BaseMenubar>;

/**
 * Horizontal menu bar component for primary navigation with full keyboard and screen reader support.
 */
const MenuBar = ({ ref, className, ...props }: MenuBarProps) => (
  <BaseMenubar
    data-testid="menu-bar"
    ref={ref}
    className={cx(
      // base
      "flex rounded-md border p-0.5",
      // background color
      "bg-zinc-50 dark:bg-zinc-900",
      // border color
      " dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);
MenuBar.displayName = "MenuBar";

/**
 * Menu bar menu component for individual menu sections.
 *
 * Represents a single menu section within the menu bar.
 * Uses the Menu component as the base implementation.
 */
const MenuBarMenu: typeof Menu = Menu;

/**
 * Props for the MenuBarTrigger component.
 */
type MenuBarTriggerProps = {
  /**
   * Additional CSS classes for custom styling.
   * Applied to the menu trigger button element.
   */
  className?: string;
  /**
   * React ref for the menu trigger element.
   * Provides direct access to the underlying MenuTrigger element.
   */
  ref?: React.RefObject<React.ElementRef<typeof MenuTrigger> | null>;
} & React.ComponentPropsWithoutRef<typeof MenuTrigger>;

/**
 * Menu bar trigger component for menu section buttons.
 *
 * Renders clickable menu section headers with proper styling and states.
 * Handles hover, focus, and active states with smooth transitions.
 */
const MenuBarTrigger = ({ ref, className, ...props }: MenuBarTriggerProps) => (
  <MenuTrigger
    ref={ref}
    className={cx(
      // base
      "h-8 rounded px-3 text-sm font-medium outline-hidden select-none transition-colors",
      // text color
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      // focus
      "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800",
      // active/open
      "data-[popup-open]:bg-zinc-100 dark:data-[popup-open]:bg-zinc-800",
      // disabled
      "data-disabled:opacity-50 data-disabled:pointer-events-none",
      className,
    )}
    {...props}
  />
);
MenuBarTrigger.displayName = "MenuBarTrigger";

/**
 * Props for the MenuBarContent component.
 */
type MenuBarContentProps = {
  /**
   * Additional CSS classes for custom styling.
   * Applied to the dropdown menu content container.
   */
  className?: string;
  /**
   * Distance from the trigger element in pixels.
   * Controls the spacing between the trigger and dropdown content.
   * @default 6
   */
  sideOffset?: number;
  /**
   * React ref for the menu content element.
   * Provides direct access to the underlying MenuContent element.
   */
  ref?: React.RefObject<React.ElementRef<typeof MenuContent> | null>;
} & React.ComponentPropsWithoutRef<typeof MenuContent>;

/**
 * Menu bar content component for dropdown menu content.
 *
 * Renders the dropdown menu content with proper positioning and styling.
 * Uses MenuContent as the base with menu bar specific offset settings.
 */
const MenuBarContent = ({ ref, className, sideOffset = 6, ...props }: MenuBarContentProps) => (
  <MenuContent
    ref={ref}
    className={className}
    sideOffset={sideOffset}
    {...props}
  />
);
MenuBarContent.displayName = "MenuBarContent";

/**
 * Menu bar item component for individual menu options.
 *
 * Represents clickable menu items within menu bar dropdowns.
 * Uses MenuItem as the base implementation.
 */
const MenuBarItem: typeof MenuItem = MenuItem;

/**
 * Menu bar separator component for visual grouping.
 *
 * Creates visual separation between menu item groups.
 * Uses MenuSeparator as the base implementation.
 */
const MenuBarSeparator = MenuSeparator;

/**
 * Menu bar submenu component for nested menus.
 *
 * Enables creation of nested menu structures within menu bars.
 * Uses MenuSubmenu as the base implementation.
 */
const MenuBarSubmenu: typeof MenuSubmenu = MenuSubmenu;

/**
 * Menu bar submenu trigger for nested menu headers.
 *
 * Renders triggers for nested submenu sections.
 * Uses MenuSubmenuTrigger as the base implementation.
 */
const MenuBarSubmenuTrigger: typeof MenuSubmenuTrigger = MenuSubmenuTrigger;

/**
 * Menu bar submenu content for nested menu items.
 *
 * Renders content for nested submenu sections.
 * Uses MenuSubmenuContent as the base implementation.
 */
const MenuBarSubmenuContent: typeof MenuSubmenuContent = MenuSubmenuContent;

export {
  MenuBar,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarSeparator,
  MenuBarSubmenu,
  MenuBarSubmenuContent,
  MenuBarSubmenuTrigger,
  MenuBarTrigger,
};

export type {
  MenuBarContentProps,
  MenuBarProps,
  MenuBarTriggerProps,
};
