import type { ComponentConfig } from "@patternmode/config/component-types";
import { Sidebar } from "./components/sidebar";
import {
  CollapsedExample,
  DefaultExample,
  PinnedExample,
  SizesExample,
  WithActiveStatesExample,
} from "./examples";

export const sidebarConfig: ComponentConfig = {
  id: "sidebar",
  name: "Sidebar",
  description: "Collapsible app sidebar with groups, items, and controls",
  category: "layout",
  badge: "beta",
  importStatement: `import { Sidebar } from "@patternmode/sidebar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic sidebar with navigation items and groups",
      component: DefaultExample,
    },
    {
      id: "collapsed",
      title: "Collapsed",
      description: "Sidebar starts collapsed and expands on hover",
      component: CollapsedExample,
    },
    {
      id: "pinned",
      title: "Pinned",
      description: "Sidebar is pinned open and pushes content aside",
      component: PinnedExample,
    },
    {
      id: "active-states",
      title: "Active States",
      description: "Sidebar with active navigation states",
      component: WithActiveStatesExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants of the sidebar",
      component: SizesExample,
    },
  ],
  components: [
    {
      name: "Sidebar",
      description: "Main sidebar container with state management",
      component: Sidebar,
    },
  ],
};
