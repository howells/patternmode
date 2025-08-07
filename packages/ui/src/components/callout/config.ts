import type { ComponentConfig } from "../../types/component-types";

import { MessageSquare } from "lucide-react";

import { Callout } from "./component";
import {
  DefaultExample,
  ErrorExample,
  NeutralExample,
  SuccessExample,
  WarningExample,
  WithoutTitleExample,
} from "./examples";

export const calloutConfig: ComponentConfig = {
  id: "callout",
  name: "Callout",
  description: "Highlighted content box for important information, warnings, or tips with optional icons and semantic color variants.",
  category: "feedback",
  featured: true,
  icon: MessageSquare,
  importStatement: `import { Callout } from "@patternmode/ui/callout";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic informational callout with title",
      component: DefaultExample,
    },
    {
      id: "success",
      title: "Success",
      description: "Success callout with icon and green styling",
      component: SuccessExample,
    },
    {
      id: "error",
      title: "Error",
      description: "Error callout with icon and red styling",
      component: ErrorExample,
    },
    {
      id: "warning",
      title: "Warning",
      description: "Warning callout with icon and yellow styling",
      component: WarningExample,
    },
    {
      id: "neutral",
      title: "Neutral",
      description: "Neutral callout with gray styling",
      component: NeutralExample,
    },
    {
      id: "without-title",
      title: "Without Title",
      description: "Callout without title, showing only content with icon",
      component: WithoutTitleExample,
    },
  ],
  components: [
    {
      name: "Callout",
      description: "Highlighted content box for important messages and notifications.",
      component: Callout,
    },
  ],
};
