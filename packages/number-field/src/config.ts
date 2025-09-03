import type { ComponentConfig } from "@patternmode/config/component-types";
import { NumberField } from "./component";
import {
  DefaultExample,
  DisabledExample,
  SizesExample,
  WithLabelExample,
  WithoutSteppersExample,
} from "./examples";

export const numberFieldConfig: ComponentConfig = {
  id: "number-field",
  name: "Number Field",
  description:
    "Numeric input with increment/decrement steppers and optional scrub-area label.",
  category: "controls",
  importStatement: `import { NumberField } from "@patternmode/number-field";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic number field",
      component: DefaultExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Size variants",
      component: SizesExample,
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Scrub-area label",
      component: WithLabelExample,
    },
    {
      id: "without-steppers",
      title: "Without Steppers",
      description: "No stepper buttons",
      component: WithoutSteppersExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled state",
      component: DisabledExample,
    },
  ],
  components: [
    {
      name: "NumberField",
      description: "Numeric input field",
      component: NumberField,
    },
  ],
};
