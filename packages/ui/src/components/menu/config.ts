import type { ComponentConfig } from "../../lib/component-config-types";
import { MoreVertical } from "lucide-react";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "./component";
import {
  ComplexMenuExample,
  DefaultExample,
  WithCheckboxesExample,
  WithIconsExample,
  WithRadioGroupExample,
  WithSubmenuExample,
} from "./examples";

export const menuConfig: ComponentConfig = {
  id: "menu",
  name: "Menu",
  description: "Contextual menu component with hierarchical navigation and action items. Supports icons, shortcuts, checkboxes, radio groups, and nested submenus for complex navigation patterns.",
  category: "navigation",
  featured: true,
  icon: MoreVertical,
  importStatement: `import { Menu, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuLabel, MenuSeparator, MenuSubmenu, MenuSubmenuTrigger, MenuSubmenuContent, MenuGroup } from "@patternmode/ui/menu";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic menu with simple action items",
      component: DefaultExample,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Menu items enhanced with icons and keyboard shortcuts",
      component: WithIconsExample,
    },
    {
      id: "with-checkboxes",
      title: "With Checkboxes",
      description: "Menu with checkbox items for toggle functionality",
      component: WithCheckboxesExample,
    },
    {
      id: "with-radio-group",
      title: "With Radio Group",
      description: "Menu with radio group for mutually exclusive selections",
      component: WithRadioGroupExample,
    },
    {
      id: "with-submenu",
      title: "With Submenu",
      description: "Hierarchical menu with nested submenu navigation",
      component: WithSubmenuExample,
    },
    {
      id: "complex-menu",
      title: "Complex Menu",
      description: "Advanced menu combining all features with proper organization",
      component: ComplexMenuExample,
    },
  ],
  components: [
    {
      name: "Menu",
      component: Menu,
      primary: true,
      description: "Root container for contextual menu with action items and navigation.",
    },
    {
      name: "MenuTrigger",
      component: MenuTrigger,
      description: "Trigger element that opens the menu when activated.",
    },
    {
      name: "MenuContent",
      component: MenuContent,
      description: "Container for menu items with positioning and animation support.",
    },
    {
      name: "MenuItem",
      component: MenuItem,
      description: "Individual menu item with support for icons, shortcuts, and hints.",
    },
    {
      name: "MenuCheckboxItem",
      component: MenuCheckboxItem,
      description: "Menu item with checkbox functionality for toggle states.",
    },
    {
      name: "MenuRadioGroup",
      component: MenuRadioGroup,
      description: "Container for grouping radio menu items with shared state.",
    },
    {
      name: "MenuRadioItem",
      component: MenuRadioItem,
      description: "Menu item with radio button functionality for mutually exclusive selections.",
    },
    {
      name: "MenuLabel",
      component: MenuLabel,
      description: "Label component for grouping and organizing menu items.",
    },
    {
      name: "MenuSeparator",
      component: MenuSeparator,
      description: "Visual separator for dividing menu items into logical groups.",
    },
    {
      name: "MenuSubmenu",
      component: MenuSubmenu,
      description: "Container for nested submenu functionality.",
    },
    {
      name: "MenuSubmenuTrigger",
      component: MenuSubmenuTrigger,
      description: "Trigger element for opening submenu with chevron indicator.",
    },
    {
      name: "MenuSubmenuContent",
      component: MenuSubmenuContent,
      description: "Container for submenu items with proper positioning.",
    },
    {
      name: "MenuGroup",
      component: MenuGroup,
      description: "Container for logically grouping related menu items.",
    },
  ],
};
