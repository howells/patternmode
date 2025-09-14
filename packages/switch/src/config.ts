import type { ComponentConfig } from "@patternmode/config/component-types";
import { Switch } from ".";
import { LabeledSwitchExample, SizesExample, SwitchExample } from "./examples";

export const switchConfig: ComponentConfig = {
  id: "switch",
  name: "Switch",
  description:
    "A binary toggle switch component for on/off states with accessibility support.",
  category: "controls",
  importStatement: `import { Switch } from "@patternmode/switch";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic switch",
      component: SwitchExample,
    },
    {
      id: "labeled",
      title: "Labeled",
      description: "Switch with label",
      component: LabeledSwitchExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different sizes",
      component: SizesExample,
    },
  ],
  components: [
    { name: "Switch", description: "Toggle switch", component: Switch },
  ],
};
