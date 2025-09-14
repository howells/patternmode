"use client";

import React from "react";
import {
  MenuBar,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarSeparator,
  MenuBarSubmenu,
  MenuBarSubmenuContent,
  MenuBarSubmenuTrigger,
  MenuBarTrigger,
} from ".";

export type MenuBarPreviewProps = {
  /**
   * Number of menu sections to display.
   * Controls how many top-level menu sections are shown.
   */
  menuCount?: 2 | 3 | 4;
  /**
   * Whether to show submenu items.
   * Demonstrates nested menu functionality when enabled.
   */
  showSubmenus?: boolean;
  /**
   * Whether to include menu separators.
   * Shows visual dividers between menu groups when enabled.
   */
  showSeparators?: boolean;
  /**
   * Whether to include disabled menu items.
   * Demonstrates disabled state styling when enabled.
   */
  showDisabledItems?: boolean;
};

export function MenuBarPreview({
  menuCount = 3,
  showSubmenus = true,
  showSeparators = true,
  showDisabledItems = false,
}: MenuBarPreviewProps = {}) {
  const menus = [
    {
      title: "File",
      items: [
        { label: "New", shortcut: "⌘N" },
        { label: "Open", shortcut: "⌘O" },
        { label: "Save", shortcut: "⌘S" },
      ],
    },
    {
      title: "Edit",
      items: [
        { label: "Undo", shortcut: "⌘Z" },
        { label: "Redo", shortcut: "⌘⇧Z" },
        { label: "Cut", shortcut: "⌘X" },
        { label: "Copy", shortcut: "⌘C" },
        { label: "Paste", shortcut: "⌘V" },
      ],
    },
    {
      title: "View",
      items: [
        { label: "Zoom In", shortcut: "⌘+" },
        { label: "Zoom Out", shortcut: "⌘-" },
        { label: "Reset Zoom", shortcut: "⌘0" },
      ],
    },
    {
      title: "Help",
      items: [
        { label: "Documentation" },
        { label: "Keyboard Shortcuts", shortcut: "⌘?" },
        { label: "About" },
      ],
    },
  ].slice(0, menuCount);

  return (
    <MenuBar>
      {menus.map((menu, menuIndex) => (
        <React.Fragment key={menu.title}>
          <MenuBarMenu>
            <MenuBarTrigger>{menu.title}</MenuBarTrigger>
            <MenuBarContent>
              {menu.items.map((item, itemIndex) => (
                <React.Fragment key={item.label}>
                  <MenuBarItem disabled={showDisabledItems && itemIndex === 2}>
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="ml-auto text-xs text-zinc-400">
                        {item.shortcut}
                      </span>
                    )}
                  </MenuBarItem>
                  {showSeparators && itemIndex === 1 && menuIndex === 0 && (
                    <MenuBarSeparator />
                  )}
                  {showSubmenus && item.label === "Zoom In" && (
                    <MenuBarSubmenu>
                      <MenuBarSubmenuTrigger>
                        More Options
                      </MenuBarSubmenuTrigger>
                      <MenuBarSubmenuContent>
                        <MenuBarItem>Fit to Window</MenuBarItem>
                        <MenuBarItem>Actual Size</MenuBarItem>
                      </MenuBarSubmenuContent>
                    </MenuBarSubmenu>
                  )}
                </React.Fragment>
              ))}
            </MenuBarContent>
          </MenuBarMenu>
        </React.Fragment>
      ))}
    </MenuBar>
  );
}

// Preview props for prop explorer
const MENU_COUNT_TWO = ["a", "b"].length;
const MENU_COUNT_THREE = ["a", "b", "c"].length;
const MENU_COUNT_FOUR = ["a", "b", "c", "d"].length;
const MENU_COUNT_OPTIONS = [
  MENU_COUNT_TWO,
  MENU_COUNT_THREE,
  MENU_COUNT_FOUR,
] as const;
const DEFAULT_MENU_COUNT = MENU_COUNT_THREE;

export const menuBarPreviewProps = [
  {
    name: "menuCount",
    type: "select",
    description:
      "Number of menu sections to display - controls how many top-level menu sections are shown.",
    options: [...MENU_COUNT_OPTIONS],
    defaultValue: DEFAULT_MENU_COUNT,
  },
  {
    name: "showSubmenus",
    type: "boolean",
    description:
      "Whether to show submenu items - demonstrates nested menu functionality when enabled.",
    defaultValue: true,
  },
  {
    name: "showSeparators",
    type: "boolean",
    description:
      "Whether to include menu separators - shows visual dividers between menu groups when enabled.",
    defaultValue: true,
  },
  {
    name: "showDisabledItems",
    type: "boolean",
    description:
      "Whether to include disabled menu items - demonstrates disabled state styling when enabled.",
    defaultValue: false,
  },
];
