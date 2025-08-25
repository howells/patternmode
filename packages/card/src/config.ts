import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import { Card } from "./component";
import { DefaultExample, WithFooterExample } from "./examples";

export const cardConfig: ComponentConfig = {
  id: "card",
  name: "Card",
  description: "Container component with consistent styling for grouping related content.",
  category: "layout",
  featured: true,
  icon: Square,
  importStatement: `import { Card } from "@patternmode/card";`,
  examples: [
    { id: "default", title: "Default", description: "Basic card with header and content", component: DefaultExample },
    { id: "with-footer", title: "With Footer", description: "Card with footer actions", component: WithFooterExample },
  ],
  components: [
    { name: "Card", description: "Container component for grouped content", component: Card },
  ],
};
