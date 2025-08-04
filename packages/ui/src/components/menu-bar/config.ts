import type { ComponentConfig } from "../../lib/component-config-types";
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
} from "./component";
import {
  ApplicationMenuExample,
  DefaultExample,
  WithIconsExample,
  WithSubmenusExample,
} from "./examples";

export const menuBarConfig: ComponentConfig = {
  id: "menu-bar",
  name: "Menu Bar",
  description: "A horizontal menu bar component system built on Base UI Menubar for creating application menu bars with dropdown menus. Provides desktop application-style menu navigation with keyboard support and proper accessibility.",
  category: "navigation",
  icon: Menu,
  importStatement: `import { MenuBar, MenuBarMenu, MenuBarTrigger, MenuBarContent, MenuBarItem, MenuBarSeparator, MenuBarSubmenu, MenuBarSubmenuTrigger, MenuBarSubmenuContent } from "@patternmode/ui/menu-bar";`,
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
      description: "Complete application menu bar with multiple sections and actions",
      component: ApplicationMenuExample,
    },
  ],
  components: [
    {
      name: "MenuBar",
      description: "Root container for horizontal menu navigation with proper styling and accessibility.",
      component: MenuBar,
      primary: true,
    },
    {
      name: "MenuBarMenu",
      description: "Individual menu section within the menu bar.",
      component: MenuBarMenu,
    },
    {
      name: "MenuBarTrigger",
      description: "Clickable menu section header that opens dropdown content.",
      component: MenuBarTrigger,
    },
    {
      name: "MenuBarContent",
      description: "Dropdown content container for menu items.",
      component: MenuBarContent,
    },
    {
      name: "MenuBarItem",
      description: "Individual clickable menu option within dropdown content.",
      component: MenuBarItem,
    },
    {
      name: "MenuBarSeparator",
      description: "Visual separator for grouping menu items.",
      component: MenuBarSeparator,
    },
    {
      name: "MenuBarSubmenu",
      description: "Container for nested submenu structures.",
      component: MenuBarSubmenu,
    },
    {
      name: "MenuBarSubmenuTrigger",
      description: "Trigger button for opening nested submenu content.",
      component: MenuBarSubmenuTrigger,
    },
    {
      name: "MenuBarSubmenuContent",
      description: "Content container for nested submenu items.",
      component: MenuBarSubmenuContent,
    },
  ],
};
