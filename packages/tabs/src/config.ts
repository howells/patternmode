import type { ComponentConfig } from "@patternmode/config/component-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from ".";
import { DefaultExample } from "./examples";

export const tabsConfig: ComponentConfig = {
  id: "tabs",
  name: "Tabs",
  description: "Tabs component",
  category: "navigation",
  featured: true,
  icon: undefined,
  importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@patternmode/tabs";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Simple tabs",
      component: DefaultExample,
    },
  ],
  components: [
    { name: "Tabs", description: "Tabs root", component: Tabs },
    { name: "TabsList", description: "Tabs list", component: TabsList },
    {
      name: "TabsTrigger",
      description: "Tabs trigger",
      component: TabsTrigger,
    },
    {
      name: "TabsContent",
      description: "Tabs content",
      component: TabsContent,
    },
  ],
};
