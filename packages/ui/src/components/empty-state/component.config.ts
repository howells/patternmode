import type { ComponentConfig } from "../../lib/component-config-types";
import { FileX } from "lucide-react";
import { EmptyState } from "./component";
import { DefaultExample, LargeSizeExample, MinimalExample, WithBothActionsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "empty-state",
  name: "Empty State",
  description: "A component for displaying empty states when there's no content to show. Provides a structured layout with optional icon, title, description, and action buttons to guide users toward taking action.",
  category: "ui",
  icon: FileX,
  importStatement: `import { EmptyState } from "@patternmode/ui/empty-state";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic empty state with icon and primary action",
      component: DefaultExample,
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Minimal variant without background styling",
      component: MinimalExample,
    },
    {
      id: "with-both-actions",
      title: "With Both Actions",
      description: "Empty state with primary and secondary actions",
      component: WithBothActionsExample,
    },
    {
      id: "large-size",
      title: "Large Size",
      description: "Large variant with increased spacing and heading",
      component: LargeSizeExample,
    },
  ],
  components: [
    {
      name: "EmptyState",
      description: "Empty state component with icon, title, description, and actions",
      component: EmptyState,
    },
  ],
};
