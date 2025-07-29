"use client";

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
} from "@patternmode/ui";

export function MenuBarExample() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>New File</MenuBarItem>
          <MenuBarItem>Open</MenuBarItem>
          <MenuBarSubmenu>
            <MenuBarSubmenuTrigger>Recent Files</MenuBarSubmenuTrigger>
            <MenuBarSubmenuContent>
              <MenuBarItem>project.tsx</MenuBarItem>
              <MenuBarItem>components.tsx</MenuBarItem>
              <MenuBarItem>utils.ts</MenuBarItem>
            </MenuBarSubmenuContent>
          </MenuBarSubmenu>
          <MenuBarSeparator />
          <MenuBarItem>Save</MenuBarItem>
          <MenuBarItem>Save As...</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>Exit</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>Undo</MenuBarItem>
          <MenuBarItem>Redo</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>Cut</MenuBarItem>
          <MenuBarItem>Copy</MenuBarItem>
          <MenuBarItem>Paste</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
      <MenuBarMenu>
        <MenuBarTrigger>View</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarSubmenu>
            <MenuBarSubmenuTrigger>Theme</MenuBarSubmenuTrigger>
            <MenuBarSubmenuContent>
              <MenuBarItem>Light</MenuBarItem>
              <MenuBarItem>Dark</MenuBarItem>
              <MenuBarItem>System</MenuBarItem>
            </MenuBarSubmenuContent>
          </MenuBarSubmenu>
          <MenuBarItem>Toggle Sidebar</MenuBarItem>
          <MenuBarItem>Full Screen</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
    </MenuBar>
  );
}
