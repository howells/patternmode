import { Button } from "@patternmode/ui";
import { FileText, Plus, Save } from "lucide-react";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@patternmode/ui";

interface MenuExampleProps {
  sideOffset?: number;
  align?: "start" | "center" | "end";
  collisionPadding?: number;
}

export function MenuExample({
  sideOffset = 8,
  align = "center",
  collisionPadding = 8,
}: MenuExampleProps) {
  return (
    <div className="flex justify-center">
      <Menu>
        <MenuTrigger render={<Button />}>File Menu</MenuTrigger>
        <MenuContent
          sideOffset={sideOffset}
          align={align}
          collisionPadding={collisionPadding}
        >
          <MenuItem icon={Plus} shortcut="⌘N">
            New File
          </MenuItem>
          <MenuItem icon={FileText} shortcut="⌘O">
            Open File
          </MenuItem>
          <MenuItem icon={Save} shortcut="⌘S">
            Save File
          </MenuItem>
          <MenuSeparator />
          <MenuItem>Exit</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}

// Default export for the preview system
export default MenuExample;
