import type { ComponentConfig } from "../../types/component-types";
import { Square } from "lucide-react";
import { Skeleton } from "./component";
import { ArticleExample, CardExample, DefaultExample, ListExample } from "./examples";

export const skeletonConfig: ComponentConfig = {
  id: "skeleton",
  name: "Skeleton",
  description: "Loading placeholder component with pulse animation for indicating content that is being loaded.",
  category: "feedback",
  icon: Square,
  importStatement: `import { Skeleton } from "@patternmode/ui/skeleton";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic skeleton with avatar and text placeholders",
      component: DefaultExample,
    },
    {
      id: "card",
      title: "Card",
      description: "Skeleton for card content with header and body",
      component: CardExample,
    },
    {
      id: "list",
      title: "List",
      description: "Skeleton for list items with consistent spacing",
      component: ListExample,
    },
    {
      id: "article",
      title: "Article",
      description: "Skeleton for article content with image and text",
      component: ArticleExample,
    },
  ],
  components: [
    {
      name: "Skeleton",
      description: "Loading placeholder with pulse animation",
      component: Skeleton,
    },
  ],
};
