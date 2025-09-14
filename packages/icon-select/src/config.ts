import type { ComponentConfig } from "@patternmode/config/component-types";
import { Search } from "lucide-react";
import { IconSelect } from ".";
import {
  CustomPlaceholderExample,
  DefaultExample,
  DisabledExample,
  DynamicIconExample,
  HookExample,
  SizesExample,
  WithValueExample,
} from "./examples";

export const iconSelectConfig: ComponentConfig = {
  id: "icon-select",
  name: "Icon Select",
  description:
    "A high-performance, tree-shakable searchable icon picker component that provides access to ALL Lucide React icons using a static registry and virtual scrolling.",
  category: "controls",
  icon: Search,
  importStatement: `import { IconSelect, useIconSelect, getDynamicIconByName } from "@patternmode/icon-select";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic icon select with default settings",
      component: DefaultExample,
    },
    {
      id: "with-value",
      title: "With Initial Value",
      description: "Icon select with a pre-selected icon value",
      component: WithValueExample,
    },
    {
      id: "custom-placeholder",
      title: "Custom Placeholder",
      description: "Custom placeholder text",
      component: CustomPlaceholderExample,
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Disabled icon select",
      component: DisabledExample,
    },
    {
      id: "hook-usage",
      title: "Hook Usage",
      description: "Using the useIconSelect hook",
      component: HookExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Size variants",
      component: SizesExample,
    },
    {
      id: "dynamic-icon",
      title: "Dynamic Icon Rendering",
      description: "Render icons dynamically by name",
      component: DynamicIconExample,
    },
  ],
  components: [
    {
      name: "Icon Select",
      description: "Searchable icon picker with virtual scrolling",
      component: IconSelect,
      primary: true,
    },
  ],
};
