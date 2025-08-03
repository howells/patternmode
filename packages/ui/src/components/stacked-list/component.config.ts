import type { ComponentConfig } from "../../lib/component-config-types";
import { List } from "lucide-react";
import { StackedList, StackedListContent, StackedListEmpty, StackedListHeader, StackedListItem } from "./component";
import { DefaultExample, EmptyStateExample, InCardExample, InteractiveExample, SimpleListExample, WithIconsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "stacked-list",
  name: "Stacked List",
  description: "Comprehensive components for building structured lists with consistent styling, interactive states, and flexible layouts for displaying collections of related items.",
  category: "ui",
  icon: List,
  importStatement: `import { StackedList } from "@patternmode/ui/stacked-list";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Complete stacked list with header and actions",
      component: DefaultExample,
    },
    {
      id: "in-card",
      title: "In Card",
      description: "Stacked list contained within a card component",
      component: InCardExample,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "List items with icons and status badges",
      component: WithIconsExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Clickable list items with navigation and actions",
      component: InteractiveExample,
    },
    {
      id: "empty-state",
      title: "Empty State",
      description: "List with empty state message and call-to-action",
      component: EmptyStateExample,
    },
    {
      id: "simple",
      title: "Simple",
      description: "Basic list without additional elements",
      component: SimpleListExample,
    },
  ],
  components: [
    {
      name: "StackedList",
      description: "Root container for the stacked list with compound components",
      component: StackedList,
      primary: true,
    },
    {
      name: "StackedList.Item",
      description: "Individual list item with flexible layout options",
      component: StackedListItem,
    },
    {
      name: "StackedList.Content",
      description: "Content component for title and description",
      component: StackedListContent,
    },
    {
      name: "StackedList.Header",
      description: "Header component for section titles and actions",
      component: StackedListHeader,
    },
    {
      name: "StackedList.Empty",
      description: "Empty state component with customizable messaging",
      component: StackedListEmpty,
    },
  ],
};
