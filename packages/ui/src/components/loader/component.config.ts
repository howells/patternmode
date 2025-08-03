import type { ComponentConfig } from "../../lib/component-config-types";
import { Loader2 } from "lucide-react";
import { Loader } from "./component";
import {
  CenteredExample,
  DefaultExample,
  InButtonExample,
  SizesExample,
  WithLabelExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "loader",
  name: "Loader",
  description: "A spinning loader component for indicating loading states and async operations. Built with Lucide React's Loader2 icon and tailwind-variants for consistent sizing and styling across different contexts.",
  category: "feedback",
  icon: Loader2,
  importStatement: `import { Loader } from "@patternmode/ui/loader";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic spinning loader with accessible label",
      component: DefaultExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants from extra small to extra large",
      component: SizesExample,
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Loader with visible text label",
      component: WithLabelExample,
    },
    {
      id: "in-button",
      title: "In Button",
      description: "Loader used inside a disabled button for form submission",
      component: InButtonExample,
    },
    {
      id: "centered",
      title: "Centered",
      description: "Centered loader with accompanying text for full-page loading states",
      component: CenteredExample,
    },
  ],
  components: [
    {
      name: "Loader",
      description: "Spinning loader component for loading states",
      component: Loader,
    },
  ],
};
