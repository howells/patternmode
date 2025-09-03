import type { ComponentConfig } from "@patternmode/config/component-types";
import { BarChart } from "lucide-react";
import {
  Progress,
  ProgressBar,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "./component";
import {
  AnimationExample,
  CompositionExample,
  CustomFormatterExample,
  DefaultExample,
  VariantsExample,
  WithLabelExample,
  WithValueExample,
} from "./examples";

export const progressConfig: ComponentConfig = {
  id: "progress",
  name: "Progress",
  description:
    "A comprehensive progress indicator system built on Base UI Progress components. Provides linear progress bars with configurable styling, animations, labels, and value display options for tracking task completion and loading states.",
  category: "feedback",
  featured: true,
  icon: BarChart,
  importStatement: `import { Progress, ProgressBar, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@patternmode/progress";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic progress bar with default styling",
      component: DefaultExample,
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Progress bar with descriptive label",
      component: WithLabelExample,
    },
    {
      id: "with-value",
      title: "With Value",
      description: "Progress bar showing current percentage",
      component: WithValueExample,
    },
    {
      id: "variants",
      title: "Variants",
      description: "Different color variants for various states",
      component: VariantsExample,
    },
    {
      id: "custom-formatter",
      title: "Custom Formatter",
      description: "Custom value formatting for different use cases",
      component: CustomFormatterExample,
    },
    {
      id: "composition",
      title: "Composition",
      description: "Custom composition using individual components",
      component: CompositionExample,
    },
    {
      id: "animation",
      title: "Animation",
      description: "Animated progress with and without transitions",
      component: AnimationExample,
    },
  ],
  components: [
    {
      name: "Progress Bar",
      description:
        "Complete progress bar with all components composed together",
      component: ProgressBar,
      primary: true,
    },
    {
      name: "Progress",
      description:
        "Root progress component built on Base UI's Progress primitive",
      component: Progress,
    },
    {
      name: "Progress Track",
      description: "Progress track component containing the background rail",
      component: ProgressTrack,
    },
    {
      name: "Progress Indicator",
      description: "Visual indicator showing progress completion",
      component: ProgressIndicator,
    },
    {
      name: "Progress Label",
      description: "Accessible label for the progress bar",
      component: ProgressLabel,
    },
    {
      name: "Progress Value",
      description: "Displays the current progress value",
      component: ProgressValue,
    },
  ],
};
