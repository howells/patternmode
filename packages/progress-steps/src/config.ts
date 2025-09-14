import type { ComponentConfig } from "@patternmode/config/component-types";
import { ListOrdered } from "lucide-react";
import { ProgressSteps } from "./components/progress-steps";
import {
  ExplicitStateExample,
  HorizontalExample,
  VerticalExample,
} from "./examples";

export const progressStepsConfig: ComponentConfig = {
  id: "progress-steps",
  name: "Progress Steps",
  description:
    "Displays a multi-step progress indicator with clear states and connectors.",
  category: "feedback",
  featured: false,
  icon: ListOrdered,
  importStatement:
    'import { ProgressSteps } from "@patternmode/progress-steps";',
  examples: [
    {
      id: "vertical",
      title: "Vertical",
      description: "Default vertical orientation with titles and descriptions",
      component: VerticalExample,
    },
    {
      id: "horizontal",
      title: "Horizontal",
      description: "Compact horizontal layout for shorter labels",
      component: HorizontalExample,
    },
    {
      id: "explicit",
      title: "Explicit State",
      description: "Provide per-step states without using current index",
      component: ExplicitStateExample,
    },
  ],
  components: [
    {
      name: "ProgressSteps",
      description: "Renders steps with states and connectors",
      component: ProgressSteps,
      primary: true,
    },
  ],
};
