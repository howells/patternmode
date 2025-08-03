import type { ComponentConfig } from "../../lib/component-config-types";
import { MoreHorizontal } from "lucide-react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuIconWrapper,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuContent,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
} from "./component";
import {
  DefaultExample,
  WithSectionsExample,
  WithShortcutsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "context-menu",
  name: "Context Menu",
  description: "Right-click contextual menu component with hierarchical action items and keyboard shortcuts.",
  category: "ui",
  icon: MoreHorizontal,
  importStatement: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@patternmode/ui/context-menu";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic context menu with simple items",
      component: DefaultExample,
    },
    {
      id: "with-shortcuts",
      title: "With Shortcuts",
      description: "Context menu with keyboard shortcuts displayed",
      component: WithShortcutsExample,
    },
    {
      id: "with-sections",
      title: "With Sections",
      description: "Organized context menu with separators",
      component: WithSectionsExample,
    },
  ],
  components: [
    {
      name: "ContextMenu",
      description: "Root container for context menu functionality.",
      component: ContextMenu,
      primary: true,
    },
    {
      name: "ContextMenuTrigger",
      description: "Element that opens the context menu when right-clicked.",
      component: ContextMenuTrigger,
    },
    {
      name: "ContextMenuContent",
      description: "Container for menu items with positioning and styling.",
      component: ContextMenuContent,
    },
    {
      name: "ContextMenuItem",
      description: "Individual interactive menu item with support for shortcuts.",
      component: ContextMenuItem,
    },
    {
      name: "ContextMenuSeparator",
      description: "Visual divider between menu sections.",
      component: ContextMenuSeparator,
    },
    {
      name: "ContextMenuCheckboxItem",
      description: "Menu item with checkbox functionality for toggleable options.",
      component: ContextMenuCheckboxItem,
    },
    {
      name: "ContextMenuRadioItem",
      description: "Menu item with radio button for mutually exclusive selection.",
      component: ContextMenuRadioItem,
    },
    {
      name: "ContextMenuRadioGroup",
      description: "Container for grouping radio items together.",
      component: ContextMenuRadioGroup,
    },
    {
      name: "ContextMenuLabel",
      description: "Label for menu groups providing section headers.",
      component: ContextMenuLabel,
    },
    {
      name: "ContextMenuGroup",
      description: "Groups related menu items for better organization.",
      component: ContextMenuGroup,
    },
    {
      name: "ContextMenuSubmenu",
      description: "Root component for nested submenu functionality.",
      component: ContextMenuSubmenu,
    },
    {
      name: "ContextMenuSubmenuTrigger",
      description: "Trigger element for opening nested submenus.",
      component: ContextMenuSubmenuTrigger,
    },
    {
      name: "ContextMenuSubmenuContent",
      description: "Container for submenu items with proper positioning.",
      component: ContextMenuSubmenuContent,
    },
    {
      name: "ContextMenuIconWrapper",
      description: "Wrapper for icons in menu items with consistent styling.",
      component: ContextMenuIconWrapper,
    },
  ],
};
