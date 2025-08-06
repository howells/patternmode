"use client";

import React from "react";
import type { ButtonProps } from "../button/component";
import { Button } from "../button/component";
import { buttonVariants } from "../button/types";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "./component";

export type MenuPreviewProps = {
  /**
   * Trigger button variant.
   * Controls the styling of the menu trigger button.
   */
  triggerVariant?: ButtonProps["variant"];
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
  /**
   * Whether to show keyboard shortcuts.
   * Displays shortcut hints alongside menu items when enabled.
   */
  showShortcuts?: boolean;
};

export function MenuPreview({
  triggerVariant = "primary",
  showSubmenus = true,
  showSeparators = true,
  showDisabledItems = false,
  showShortcuts = true,
}: MenuPreviewProps = {}) {
  return (

      <Menu>
        <MenuTrigger render={<Button variant={triggerVariant} />}>
          Open Menu
        </MenuTrigger>
        <MenuContent>
          <MenuItem>
            <span>Profile</span>
            {showShortcuts && (
              <span className="ml-auto text-xs text-zinc-400">⌘P</span>
            )}
          </MenuItem>
          <MenuItem>
            <span>Settings</span>
            {showShortcuts && (
              <span className="ml-auto text-xs text-zinc-400">⌘,</span>
            )}
          </MenuItem>
          {showSeparators && <MenuSeparator />}
          {showSubmenus && (
            <MenuSubmenu>
              <MenuSubmenuTrigger>More Options</MenuSubmenuTrigger>
              <MenuSubmenuContent>
                <MenuItem>Export Data</MenuItem>
                <MenuItem>Import Data</MenuItem>
                <MenuSeparator />
                <MenuItem>Advanced Settings</MenuItem>
              </MenuSubmenuContent>
            </MenuSubmenu>
          )}
          <MenuItem disabled={showDisabledItems}>
            <span>Team (Coming Soon)</span>
          </MenuItem>
          {showSeparators && <MenuSeparator />}
          <MenuItem>
            <span>Help</span>
            {showShortcuts && (
              <span className="ml-auto text-xs text-zinc-400">⌘?</span>
            )}
          </MenuItem>
          <MenuItem>
            <span>Sign Out</span>
            {showShortcuts && (
              <span className="ml-auto text-xs text-zinc-400">⌘Q</span>
            )}
          </MenuItem>
        </MenuContent>
      </Menu>

  );
}

// Preview props for prop explorer
export const menuPreviewProps = [
  {
    name: "triggerVariant",
    type: "select",
    description: "Trigger button variant - controls the styling of the menu trigger button.",
    options: buttonVariants,
    defaultValue: "primary",
  },
  {
    name: "showSubmenus",
    type: "boolean",
    description: "Whether to show submenu items - demonstrates nested menu functionality when enabled.",
    defaultValue: true,
  },
  {
    name: "showSeparators",
    type: "boolean",
    description: "Whether to include menu separators - shows visual dividers between menu groups when enabled.",
    defaultValue: true,
  },
  {
    name: "showDisabledItems",
    type: "boolean",
    description: "Whether to include disabled menu items - demonstrates disabled state styling when enabled.",
    defaultValue: false,
  },
  {
    name: "showShortcuts",
    type: "boolean",
    description: "Whether to show keyboard shortcuts - displays shortcut hints alongside menu items when enabled.",
    defaultValue: true,
  },
];
