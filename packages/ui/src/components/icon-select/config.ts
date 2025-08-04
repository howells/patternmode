import type { ComponentConfig } from "../../lib/component-config-types";
import { Search } from "lucide-react";
import { IconSelect } from "./component";
import {
  CustomPlaceholderExample,
  DefaultExample,
  DisabledExample,
  DynamicIconExample,
  HookExample,
  WithValueExample,
} from "./examples";

export const iconSelectConfig: ComponentConfig = {
  id: "icon-select",
  name: "IconSelect",
  description: "A high-performance, tree-shakable searchable icon picker component that provides access to ALL 1,700+ Lucide React icons using a static registry and virtual scrolling. Icons are loaded instantly with no async operations, ensuring optimal performance and reliability.",
  category: "controls",
  icon: Search,
  importStatement: `import { IconSelect, useIconSelect, getDynamicIconByName } from "@patternmode/ui/icon-select";`,
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
      description: "Icon select with custom placeholder text",
      component: CustomPlaceholderExample,
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Icon select in disabled state",
      component: DisabledExample,
    },
    {
      id: "hook-usage",
      title: "Hook Usage",
      description: "Using the useIconSelect hook for state management",
      component: HookExample,
    },
    {
      id: "dynamic-icon",
      title: "Dynamic Icon Rendering",
      description: "Rendering icons dynamically using getDynamicIconByName utility",
      component: DynamicIconExample,
    },
  ],
  components: [
    {
      name: "IconSelect",
      description: "Searchable icon picker with virtual scrolling for 1700+ Lucide icons.",
      component: IconSelect,
      primary: true,
    },
  ],
};
