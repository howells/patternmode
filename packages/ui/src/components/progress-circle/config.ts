import type { ComponentConfig } from "../../lib/component-config-types";
import { Loader2 } from "lucide-react";

import { ProgressCircle } from "./component";
import {
  CustomContentExample,
  CustomFormatterExample,
  DefaultExample,
  IndeterminateExample,
  NoAnimationExample,
  SizesExample,
  VariantsExample,
  WithLabelExample,
  WithValueExample,
} from "./examples";

export const progressCircleConfig: ComponentConfig = {
  id: "progress-circle",
  name: "Progress Circle",
  description: "Circular progress indicator for displaying completion status, loading states, and quantitative data visualization with customizable styling and animations.",
  category: "feedback",
  icon: Loader2,
  importStatement: `import { ProgressCircle } from "@patternmode/ui/progress-circle";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic circular progress indicator with default styling",
      component: DefaultExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Available size variants from extra small to extra large",
      component: SizesExample,
    },
    {
      id: "variants",
      title: "Variants",
      description: "Color variants for different states and contexts",
      component: VariantsExample,
    },
    {
      id: "with-value",
      title: "With Value",
      description: "Display the current progress value as text",
      component: WithValueExample,
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Add descriptive labels to provide context",
      component: WithLabelExample,
    },
    {
      id: "custom-formatter",
      title: "Custom Formatter",
      description: "Custom value formatting for different units and display formats",
      component: CustomFormatterExample,
    },
    {
      id: "indeterminate",
      title: "Indeterminate",
      description: "Loading state when progress is unknown",
      component: IndeterminateExample,
    },
    {
      id: "custom-content",
      title: "Custom Content",
      description: "Custom icons and content in the center of the circle",
      component: CustomContentExample,
    },
    {
      id: "no-animation",
      title: "Animation Control",
      description: "Enable or disable smooth progress animations",
      component: NoAnimationExample,
    },
  ],
  components: [
    {
      name: "Progress Circle",
      description: "Circular progress indicator component",
      component: ProgressCircle,
    },
  ],
};
