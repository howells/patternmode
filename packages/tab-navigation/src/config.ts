import type { ComponentConfig } from "@patternmode/config/component-types";
import { Navigation } from "lucide-react";
import { TabNavigation, TabNavigationLink } from ".";
import {
  ActiveExample,
  DefaultExample,
  DisabledExample,
  ManyTabsExample,
  ProfileSectionExample,
} from "./examples";

export const tabNavigationConfig: ComponentConfig = {
  id: "tab-navigation",
  name: "Tab Navigation",
  description:
    "A navigation component system built on Base UI NavigationMenu for creating tab-style navigation with active states and hover effects.",
  category: "navigation",
  icon: Navigation,
  importStatement: `import { TabNavigation, TabNavigationLink } from "@patternmode/tab-navigation";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic tab navigation",
      component: DefaultExample,
    },
    {
      id: "active",
      title: "Active State",
      description: "Tab navigation with active state",
      component: ActiveExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Tab navigation with disabled link",
      component: DisabledExample,
    },
    {
      id: "profile-section",
      title: "Profile Section",
      description: "Page section navigation example",
      component: ProfileSectionExample,
    },
    {
      id: "many-tabs",
      title: "Many Tabs",
      description: "Navigation with many tabs for overflow testing",
      component: ManyTabsExample,
    },
  ],
  components: [
    {
      name: "Tab Navigation",
      description: "Root container for tab navigation",
      component: TabNavigation,
      primary: true,
    },
    {
      name: "Tab Navigation Link",
      description: "Individual tab navigation link with active state support",
      component: TabNavigationLink,
    },
  ],
};
