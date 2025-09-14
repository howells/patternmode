import type { ComponentConfig } from "@patternmode/config/component-types";
import { Menu } from "lucide-react";
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
import {
  ApplicationMenuExample,
  DefaultExample,
  WithIconsExample,
  WithSubmenusExample,
} from "./examples";

export const menuBarConfig: ComponentConfig = {
  id: "menu-bar",
  name: "Menu Bar",
  description:
    "A horizontal menu bar component system built on Base UI Menubar for creating application menu bars with dropdown menus. Provides desktop application-style menu navigation with keyboard support and proper accessibility.",
  category: "navigation",
  icon: Menu,
  importStatement: `import { MenuBar, MenuBarMenu, MenuBarTrigger, MenuBarContent, MenuBarItem, MenuBarSeparator, MenuBarSubmenu, MenuBarSubmenuTrigger, MenuBarSubmenuContent } from "@patternmode/menu-bar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic menu bar with File and Edit menus",
      component: DefaultExample,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Menu bar with icon integration for visual clarity",
      component: WithIconsExample,
    },
    {
      id: "with-submenus",
      title: "With Submenus",
      description: "Menu bar with nested submenu navigation",
      component: WithSubmenusExample,
    },
    {
      id: "application-menu",
      title: "Application Menu",
      description:
        "Complete application menu bar with multiple sections and actions",
      component: ApplicationMenuExample,
    },
  ],
  components: [
    {
      name: "Menu Bar",
      description:
        "Root container for horizontal menu navigation with proper styling and accessibility.",
      component: MenuBar,
      primary: true,
    },
    {
      name: "Menu Bar Menu",
      description: "Individual menu section within the menu bar.",
      component: MenuBarMenu,
    },
    {
      name: "Menu Bar Trigger",
      description: "Clickable menu section header that opens dropdown content.",
      component: MenuBarTrigger,
    },
    {
      name: "Menu Bar Content",
      description: "Dropdown content container for menu items.",
      component: MenuBarContent,
    },
    {
      name: "Menu Bar Item",
      description: "Individual clickable menu option within dropdown content.",
      component: MenuBarItem,
    },
    {
      name: "Menu Bar Separator",
      description: "Visual separator for grouping menu items.",
      component: MenuBarSeparator,
    },
    {
      name: "Menu Bar Submenu",
      description: "Container for nested submenu structures.",
      component: MenuBarSubmenu,
    },
    {
      name: "Menu Bar Submenu Trigger",
      description: "Trigger button for opening nested submenu content.",
      component: MenuBarSubmenuTrigger,
    },
    {
      name: "Menu Bar Submenu Content",
      description: "Content container for nested submenu items.",
      component: MenuBarSubmenuContent,
    },
  ],
};
