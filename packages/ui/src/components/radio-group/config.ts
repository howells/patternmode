import type { ComponentConfig } from "../../lib/component-config-types";
import { CircleDot } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./component";
import {
  ControlledExample,
  CustomStructureExample,
  DefaultExample,
  DisabledExample,
  SizesExample,
  VerticalExample,
} from "./examples";

export const radioGroupConfig: ComponentConfig = {
  id: "radio-group",
  name: "Radio Group",
  description: "A container component that manages a group of radio buttons with mutually exclusive selection behavior. Provides keyboard navigation, focus management, and value synchronization across all radio buttons within the group.",
  category: "controls",
  featured: true,
  icon: CircleDot,
  importStatement: `import { RadioGroup, RadioGroupItem } from "@patternmode/ui/radio-group";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic horizontal radio group with size options",
      component: DefaultExample,
    },
    {
      id: "vertical",
      title: "Vertical Layout",
      description: "Vertical radio group with descriptions",
      component: VerticalExample,
    },
    {
      id: "sizes",
      title: "Size Variants",
      description: "Radio groups with different spacing sizes",
      component: SizesExample,
    },
    {
      id: "disabled",
      title: "With Disabled Option",
      description: "Radio group with disabled options",
      component: DisabledExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled radio group with external buttons",
      component: ControlledExample,
    },
    {
      id: "custom-structure",
      title: "Custom Structure",
      description: "Custom radio layout using RadioGroupItem",
      component: CustomStructureExample,
    },
  ],
  components: [
    {
      name: "Radio Group",
      description: "Root container for managing mutually exclusive radio selections.",
      component: RadioGroup,
      primary: true,
    },
    {
      name: "Radio Group Item",
      description: "Legacy radio item component for backward compatibility.",
      component: RadioGroupItem,
    },
  ],
};
