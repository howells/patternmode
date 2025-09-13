import type { ComponentConfig } from "@patternmode/config/component-types";
import { Circle } from "lucide-react";
import { Radio } from "./components/radio";
import {
  CustomStructureExample,
  DefaultExample,
  DisabledExample,
  SizesExample,
  WithDescriptionExample,
} from "./examples";

export const radioConfig: ComponentConfig = {
  id: "radio",
  name: "Radio",
  description:
    "Radio button input for single selections within a group of options.",
  category: "controls",
  icon: Circle,
  importStatement: `import { Radio } from "@patternmode/radio";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic radio option with label",
      component: DefaultExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different sizes",
      component: SizesExample,
    },
    {
      id: "with-description",
      title: "With Description",
      description: "Options with descriptions",
      component: WithDescriptionExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled radios",
      component: DisabledExample,
    },
    {
      id: "custom-structure",
      title: "Custom Structure",
      description: "Compose with primitives",
      component: CustomStructureExample,
    },
  ],
  components: [
    {
      name: "Radio",
      description: "Radio button primitive (Base UI)",
      component: Radio,
      primary: true,
    },
  ],
};
