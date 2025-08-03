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

export const componentConfig: ComponentConfig = {
  id: "navigation-menu",
  name: "NavigationMenu",
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
      name: "NavigationMenu",
      description: "Root container for the entire navigation menu structure.",
      component: NavigationMenu,
      primary: true,
    },
    {
      name: "NavigationMenuList",
      description: "Horizontal container for navigation menu items.",
      component: NavigationMenuList,
    },
    {
      name: "NavigationMenuItem",
      description: "Container for navigation menu triggers and content.",
      component: NavigationMenuItem,
    },
    {
      name: "NavigationMenuTrigger",
      description: "Button that opens dropdown content when activated.",
      component: NavigationMenuTrigger,
    },
    {
      name: "NavigationMenuContent",
      description: "Container for dropdown menu content.",
      component: NavigationMenuContent,
    },
    {
      name: "NavigationMenuLink",
      description: "Interactive link component for dropdown content.",
      component: NavigationMenuLink,
    },
    {
      name: "NavigationMenuItemLink",
      description: "Styled link component for top-level navigation.",
      component: NavigationMenuItemLink,
    },
    {
      name: "NavigationMenuViewport",
      description: "Portal-rendered viewport for dropdown content.",
      component: NavigationMenuViewport,
    },
  ],
};
