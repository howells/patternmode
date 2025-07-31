/**
 * Menu Bar Components.
 *
 * A horizontal menu bar component system built on Base UI Menubar for creating
 * application menu bars with dropdown menus. Provides desktop application-style
 * menu navigation with keyboard support and proper accessibility.
 *
 * Features:
 * - Base UI Menubar integration for full accessibility
 * - Horizontal menu bar layout with dropdown menus
 * - Keyboard navigation (Left/Right arrows, Enter, Escape)
 * - Focus management and ARIA attributes
 * - Nested submenu support
 * - Consistent styling with design system
 * - Dark mode support
 * - Disabled state handling.
 *
 * Built on Base UI Menubar documentation:
 * https://base-ui.com/react/components/menubar.
 *
 * @example
 * ```tsx
 * // Basic menu bar
 * <MenuBar>
 *   <MenuBarMenu>
 *     <MenuBarTrigger>File</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem>New File</MenuBarItem>
 *       <MenuBarItem>Open File</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarItem>Save</MenuBarItem>
 *       <MenuBarItem>Save As...</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 *
 *   <MenuBarMenu>
 *     <MenuBarTrigger>Edit</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem>Undo</MenuBarItem>
 *       <MenuBarItem>Redo</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarItem>Cut</MenuBarItem>
 *       <MenuBarItem>Copy</MenuBarItem>
 *       <MenuBarItem>Paste</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 * </MenuBar>
 *
 * // With submenus
 * <MenuBar>
 *   <MenuBarMenu>
 *     <MenuBarTrigger>View</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem>Zoom In</MenuBarItem>
 *       <MenuBarItem>Zoom Out</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarSubmenu>
 *         <MenuBarSubmenuTrigger>Layout</MenuBarSubmenuTrigger>
 *         <MenuBarSubmenuContent>
 *           <MenuBarItem>Sidebar</MenuBarItem>
 *           <MenuBarItem>Panel</MenuBarItem>
 *           <MenuBarItem>Minimap</MenuBarItem>
 *         </MenuBarSubmenuContent>
 *       </MenuBarSubmenu>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 * </MenuBar>
 *
 * // Application menu bar
 * <MenuBar className="mb-4">
 *   <MenuBarMenu>
 *     <MenuBarTrigger>File</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem onSelect={() => createNew()}>New Project</MenuBarItem>
 *       <MenuBarItem onSelect={() => openFile()}>Open...</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarItem onSelect={() => save()}>Save</MenuBarItem>
 *       <MenuBarItem onSelect={() => saveAs()}>Save As...</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarItem onSelect={() => exit()}>Exit</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 *
 *   <MenuBarMenu>
 *     <MenuBarTrigger>Tools</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem onSelect={() => openSettings()}>Settings</MenuBarItem>
 *       <MenuBarItem onSelect={() => openExtensions()}>Extensions</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarItem onSelect={() => runCommand()}>Command Palette</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 *
 *   <MenuBarMenu>
 *     <MenuBarTrigger>Help</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem onSelect={() => openDocs()}>Documentation</MenuBarItem>
 *       <MenuBarItem onSelect={() => openSupport()}>Support</MenuBarItem>
 *       <MenuBarSeparator />
 *       <MenuBarItem onSelect={() => showAbout()}>About</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 * </MenuBar>
 * ```
 */

import { Menubar as BaseMenubar } from "@base-ui-components/react/menubar";
import React from "react";
import { cx } from "../../lib/utils";
import {
    Menu,
    MenuContent,
    MenuItem,
    MenuSeparator,
    MenuSubmenu,
    MenuSubmenuContent,
    MenuSubmenuTrigger,
    MenuTrigger,
} from "../menu/menu";

/**
 * Root menu bar component for horizontal menu navigation.
 *
 * Creates a horizontal container for menu bar items with proper styling
 * and accessibility. Built on Base UI Menubar for full keyboard navigation
 * and screen reader support.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Menubar props.
 *
 *
 * @id menu-bar
 * @name Menu Bar
 * @component
 * @example
 * ```tsx
 * <MenuBar>
 *   <MenuBarMenu>
 *     <MenuBarTrigger>File</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem>New</MenuBarItem>
 *       <MenuBarItem>Open</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 * </MenuBar>
 * ```
 */
/**
 * A horizontal menu bar containing multiple dropdown menus.
 *
 * @id menu-bar
 * @name Menu Bar
 * @component
 */
const MenuBar = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseMenubar> & { ref?: React.RefObject<React.ElementRef<typeof BaseMenubar> | null> }) => (
    <BaseMenubar
      ref={ref}
      className={cx(
      // base
        "flex rounded-md border p-0.5",
        // background color
        "bg-zinc-50 dark:bg-zinc-900",
        // border color
        "border-zinc-200 dark:border-zinc-800",
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
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarMenu>
 *   <MenuBarTrigger>Edit</MenuBarTrigger>
 *   <MenuBarContent>
 *     <MenuBarItem>Undo</MenuBarItem>
 *     <MenuBarItem>Redo</MenuBarItem>
 *   </MenuBarContent>
 * </MenuBarMenu>
 * ```
 */
const MenuBarMenu: typeof Menu = Menu;

/**
 * Menu bar trigger component for menu section buttons.
 *
 * Renders clickable menu section headers with proper styling and states.
 * Handles hover, focus, and active states with smooth transitions.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional MenuTrigger props.
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarTrigger>File</MenuBarTrigger>
 * <MenuBarTrigger disabled>Disabled Menu</MenuBarTrigger>
 * <MenuBarTrigger className="font-bold">Important</MenuBarTrigger>
 * ```
 */
const MenuBarTrigger: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenuTrigger> & React.RefAttributes<React.ElementRef<typeof MenuTrigger>>
> = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof MenuTrigger> & { ref?: React.RefObject<React.ElementRef<typeof MenuTrigger> | null> }) => (
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
 * Menu bar content component for dropdown menu content.
 *
 * Renders the dropdown menu content with proper positioning and styling.
 * Uses MenuContent as the base with menu bar specific offset settings.
 *
 * @param className - Additional CSS classes.
 * @param sideOffset - Distance from trigger (default: 6).
 * @param props - Additional MenuContent props.
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarContent>
 *   <MenuBarItem>Menu Item 1</MenuBarItem>
 *   <MenuBarItem>Menu Item 2</MenuBarItem>
 *   <MenuBarSeparator />
 *   <MenuBarItem>Menu Item 3</MenuBarItem>
 * </MenuBarContent>
 *
 * <MenuBarContent sideOffset={12}>
 *   <MenuBarItem>Item with more spacing</MenuBarItem>
 * </MenuBarContent>
 * ```
 */
const MenuBarContent: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenuContent> & React.RefAttributes<React.ElementRef<typeof MenuContent>>
> = ({ ref, className, sideOffset = 6, ...props }: React.ComponentPropsWithoutRef<typeof MenuContent> & { ref?: React.RefObject<React.ElementRef<typeof MenuContent> | null> }) => (
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
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarItem onSelect={() => handleAction()}>Action Item</MenuBarItem>
 * <MenuBarItem disabled>Disabled Item</MenuBarItem>
 * ```
 */
const MenuBarItem: typeof MenuItem = MenuItem;

/**
 * Menu bar separator component for visual grouping.
 *
 * Creates visual separation between menu item groups.
 * Uses MenuSeparator as the base implementation.
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarItem>Item 1</MenuBarItem>
 * <MenuBarItem>Item 2</MenuBarItem>
 * <MenuBarSeparator />
 * <MenuBarItem>Item 3</MenuBarItem>
 * ```
 */
const MenuBarSeparator = MenuSeparator;

/**
 * Menu bar submenu component for nested menus.
 *
 * Enables creation of nested menu structures within menu bars.
 * Uses MenuSubmenu as the base implementation.
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarSubmenu>
 *   <MenuBarSubmenuTrigger>More Options</MenuBarSubmenuTrigger>
 *   <MenuBarSubmenuContent>
 *     <MenuBarItem>Nested Item 1</MenuBarItem>
 *     <MenuBarItem>Nested Item 2</MenuBarItem>
 *   </MenuBarSubmenuContent>
 * </MenuBarSubmenu>
 * ```
 */
const MenuBarSubmenu: typeof MenuSubmenu = MenuSubmenu;

/**
 * Menu bar submenu trigger for nested menu headers.
 *
 * Renders triggers for nested submenu sections.
 * Uses MenuSubmenuTrigger as the base implementation.
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarSubmenuTrigger>Advanced Tools</MenuBarSubmenuTrigger>
 * ```
 */
const MenuBarSubmenuTrigger: typeof MenuSubmenuTrigger = MenuSubmenuTrigger;

/**
 * Menu bar submenu content for nested menu items.
 *
 * Renders content for nested submenu sections.
 * Uses MenuSubmenuContent as the base implementation.
 *
 * @component
 * @example
 * ```tsx
 * <MenuBarSubmenuContent>
 *   <MenuBarItem>Nested Option 1</MenuBarItem>
 *   <MenuBarItem>Nested Option 2</MenuBarItem>
 * </MenuBarSubmenuContent>
 * ```
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
    MenuBarTrigger
};
