import type { ComponentConfig } from "../../lib/component-config-types";
import { X } from "lucide-react";
import { DismissButton } from "./component";
import {
  CustomIconExample,
  DefaultExample,
  InteractiveExample,
  PositionedExample,
  SizesExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "dismiss-button",
  name: "DismissButton",
  description: "Close button component for dismissing modals, alerts, and temporary content.",
  category: "actions",
  icon: X,
  importStatement: `import { DismissButton } from "@patternmode/ui/dismiss-button";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic dismiss button with default styling",
      component: DefaultExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different button sizes (sm, base, lg)",
      component: SizesExample,
    },
    {
      id: "custom-icon",
      title: "Custom Icon",
      description: "Using a custom icon instead of the default X",
      component: CustomIconExample,
    },
    {
      id: "positioned",
      title: "Positioned",
      description: "Examples in context with badges and tags",
      component: PositionedExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Interactive example with remove functionality",
      component: InteractiveExample,
    },
  ],
  components: [
    {
      name: "DismissButton",
      description: "Close button component for dismissing content",
      component: DismissButton,
    },
  ],
};
