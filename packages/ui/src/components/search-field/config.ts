import type { ComponentConfig } from "../../lib/component-config-types";
import { Search } from "lucide-react";
import { SearchField } from "./component";
import { DefaultExample, GroupedExample, WithItemsExample } from "./examples";

export const searchFieldConfig: ComponentConfig = {
  id: "search-field",
  name: "Search Field",
  description: "A search input with dropdown results and keyboard navigation",
  category: "inputs",
  featured: false,
  icon: Search,
  importStatement: `import { SearchField } from "@patternmode/ui/search-field";`,
  component: SearchField,
  components: [
    {
      name: "SearchField",
      description: "Main search input component with dropdown results",
      component: SearchField,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic search field",
      component: DefaultExample,
    },
    {
      id: "with-items",
      title: "With Items",
      description: "Search field with dropdown results",
      component: WithItemsExample,
    },
    {
      id: "grouped",
      title: "Grouped",
      description: "Search field with grouped results",
      component: GroupedExample,
    },
  ],
};
