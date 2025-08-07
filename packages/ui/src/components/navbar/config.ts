import type { ComponentConfig } from "../../types/component-types";
import { Navigation } from "lucide-react";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "./component";
import { DefaultExample, WithCurrentStateExample, WithDividerExample } from "./examples";

export const navbarConfig: ComponentConfig = {
  id: "navbar",
  name: "Navbar",
  description: "A flexible navigation bar component system for building application headers, toolbars, and navigation areas. Features animated current indicators, flexible layout options, and responsive design.",
  category: "navigation",
  icon: Navigation,
  importStatement: `import { Navbar, NavbarSection, NavbarItem, NavbarLabel, NavbarDivider, NavbarSpacer } from "@patternmode/ui/navbar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic navbar with navigation items",
      component: DefaultExample,
    },
    {
      id: "with-divider",
      title: "With Divider",
      description: "Navbar with visual section dividers",
      component: WithDividerExample,
    },
    {
      id: "with-current-state",
      title: "With Current State",
      description: "Navbar with animated current page indicator",
      component: WithCurrentStateExample,
    },
  ],
  components: [
    {
      name: "Navbar",
      description: "Root container for horizontal navigation layouts.",
      component: Navbar,
      primary: true,
    },
    {
      name: "Navbar Section",
      description: "Groups related navbar items with shared animation context.",
      component: NavbarSection,
    },
    {
      name: "Navbar Item",
      description: "Interactive navigation item with current state support.",
      component: NavbarItem,
    },
    {
      name: "Navbar Label",
      description: "Text label with automatic truncation for navbar items.",
      component: NavbarLabel,
    },
    {
      name: "Navbar Divider",
      description: "Visual separator between navbar sections.",
      component: NavbarDivider,
    },
    {
      name: "Navbar Spacer",
      description: "Flexible spacer for pushing sections apart.",
      component: NavbarSpacer,
    },
  ],
};
