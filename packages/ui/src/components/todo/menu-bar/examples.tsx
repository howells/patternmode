"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Icon, iconRegistry, MenuBar, MenuBarContent, MenuBarItem, MenuBarMenu, MenuBarTrigger } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { Edit, Plus, Trash } = iconRegistry;

export function DefaultExample() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>New</MenuBarItem>
          <MenuBarItem>Open</MenuBarItem>
          <MenuBarItem>Save</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>Cut</MenuBarItem>
          <MenuBarItem>Copy</MenuBarItem>
          <MenuBarItem>Paste</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
    </MenuBar>
  );
}

export function WithIconsExample() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>Actions</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>
            <div className="flex items-center gap-2">
              <Icon icon={Plus} />
              New Item
            </div>
          </MenuBarItem>
          <MenuBarItem>
            <div className="flex items-center gap-2">
              <Icon icon={Edit} />
              Edit Item
            </div>
          </MenuBarItem>
          <MenuBarItem>
            <div className="flex items-center gap-2">
              <Icon icon={Trash} />
              Delete Item
            </div>
          </MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
    </MenuBar>
  );
}
export const MenuBarExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "MenuBarExample",
    title: "Menu Bar",
    description: "Menu Bar example",
    component: MenuBarExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
];
