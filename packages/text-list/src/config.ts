import type { ComponentConfig } from "@patternmode/config/component-types";
import { List } from "lucide-react";
import { TextList as ListComponent, TextListIndicator, TextListItem } from "./component";
import { DefaultExample, NestedExample, OrderedExample, PlainVariantExample, WithIconsExample } from "./examples";

export const textListConfig: ComponentConfig = {
  id: "text-list",
  name: "Text List",
  description:
    "Flexible components for creating ordered and unordered lists with custom styling, indicators, and alignment options. Supports traditional bullet/number lists as well as custom icon-based lists for enhanced visual presentation.",
  category: "display",
  icon: List,
  importStatement: `import { List, ListItem, ListIndicator } from "@patternmode/ui/text-list";`,
  examples: [
    { id: "default", title: "Default", description: "Basic unordered list with default marker styling", component: DefaultExample },
    { id: "ordered", title: "Ordered List", description: "Numbered list using the ol element", component: OrderedExample },
    { id: "with-icons", title: "With Icons", description: "Custom icon indicators for enhanced visual presentation", component: WithIconsExample },
    { id: "nested", title: "Nested Lists", description: "Lists with nested sublists for hierarchical content", component: NestedExample },
    { id: "plain", title: "Plain Variant", description: "Custom indicators using text or symbols", component: PlainVariantExample }
  ],
  components: [
    { name: "Text List", description: "Root container for list items with configurable styling and alignment", component: ListComponent, primary: true },
    { name: "Text List Item", description: "Individual list item with consistent styling and layout", component: TextListItem },
    { name: "Text List Indicator", description: "Custom indicator for list items supporting icons or custom content", component: TextListIndicator }
  ],
};

