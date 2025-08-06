import type { ComponentConfig } from "../../lib/component-config-types";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuItemLink,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./component";
import { DefaultExample, MixedLinksExample, WithViewportExample } from "./examples";

export const navigationMenuConfig: ComponentConfig = {
  id: "navigation-menu",
  name: "Navigation Menu",
  description: "A comprehensive navigation menu system built on Base UI NavigationMenu for creating dropdown navigation menus with smooth animations and accessibility.",
  category: "navigation",
  icon: Menu,
  importStatement: `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuItemLink, NavigationMenuViewport } from "@patternmode/ui/navigation-menu";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic navigation menu with dropdown content",
      component: DefaultExample,
    },
    {
      id: "with-viewport",
      title: "With Viewport",
      description: "Navigation menu with viewport for complex layouts",
      component: WithViewportExample,
    },
    {
      id: "mixed-links",
      title: "Mixed Links",
      description: "Navigation menu with both dropdown and direct links",
      component: MixedLinksExample,
    },
  ],
  components: [
    {
      name: "Navigation Menu",
      description: "Root container for the entire navigation menu structure.",
      component: NavigationMenu,
      primary: true,
    },
    {
      name: "Navigation Menu List",
      description: "Horizontal container for navigation menu items.",
      component: NavigationMenuList,
    },
    {
      name: "Navigation Menu Item",
      description: "Container for navigation menu triggers and content.",
      component: NavigationMenuItem,
    },
    {
      name: "Navigation Menu Trigger",
      description: "Button that opens dropdown content when activated.",
      component: NavigationMenuTrigger,
    },
    {
      name: "Navigation Menu Content",
      description: "Container for dropdown menu content.",
      component: NavigationMenuContent,
    },
    {
      name: "Navigation Menu Link",
      description: "Interactive link component for dropdown content.",
      component: NavigationMenuLink,
    },
    {
      name: "Navigation Menu Item Link",
      description: "Styled link component for top-level navigation.",
      component: NavigationMenuItemLink,
    },
    {
      name: "Navigation Menu Viewport",
      description: "Portal-rendered viewport for dropdown content.",
      component: NavigationMenuViewport,
    },
  ],
};
