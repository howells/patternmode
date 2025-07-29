import { Icon } from "../icon";
import {
  MenuBar,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarTrigger,
} from "@patternmode/ui";
import { Edit, Plus, Trash } from "lucide-react";
import React from "react";

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
