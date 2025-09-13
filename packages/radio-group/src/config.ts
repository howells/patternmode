import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import { RadioGroupItem } from "./components/radio-group-item";
import { RadioGroupRoot } from "./components/radio-group-root";
import {
  AlignmentExample,
  ColorExample,
  DefaultExample,
  DisabledExample,
  HighContrastExample,
  SizeExample,
  VariantExample,
} from "./examples";

export const radioGroupConfig: ComponentConfig = {
  id: "radio-group",
  name: "Radio Group",
  description:
    "Set of interactive radio buttons where only one can be selected at a time.",
  category: "controls",
  icon: Square,
  importStatement: `import { RadioGroupRoot, RadioGroupItem } from "@patternmode/radio-group";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic radio group with text labels",
      component: DefaultExample,
    },
    {
      id: "size",
      title: "Size",
      description: "Different sizes (1, 2, 3)",
      component: SizeExample,
    },
    {
      id: "variant",
      title: "Variant",
      description: "Visual style variants (surface, classic, soft)",
      component: VariantExample,
    },
    {
      id: "color",
      title: "Color",
      description: "Different color themes",
      component: ColorExample,
    },
    {
      id: "high-contrast",
      title: "High Contrast",
      description: "High contrast color variants",
      component: HighContrastExample,
    },
    {
      id: "alignment",
      title: "Alignment",
      description: "Proper alignment with text labels",
      component: AlignmentExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled radio group state",
      component: DisabledExample,
    },
  ],
  components: [
    {
      name: "Radio Group Root",
      description: "Root container for radio group items",
      component: RadioGroupRoot,
      primary: true,
    },
    {
      name: "Radio Group Item",
      description: "Individual selectable radio item",
      component: RadioGroupItem,
    },
  ],
};
