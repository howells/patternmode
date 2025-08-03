import type { ComponentConfig } from "../../lib/component-config-types";
import { Hash } from "lucide-react";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldScrubCursor,
} from "./component";
import { DefaultExample, DisabledExample, DisabledScrubAreaExample, FullWidthExample, WithConstraintsExample, WithoutSteppersExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "number-field",
  name: "NumberField",
  description: "An advanced numeric input field with stepper controls, interactive scrub area, and comprehensive keyboard navigation. Built on Base UI's NumberField primitive with sophisticated numeric input capabilities.",
  category: "inputs",
  icon: Hash,
  importStatement: `import { NumberField, NumberFieldLabel, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement, NumberFieldScrubCursor } from "@patternmode/ui/number-field";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic number field with label and steppers",
      component: DefaultExample,
    },
    {
      id: "with-constraints",
      title: "With Constraints",
      description: "Number field with min/max values and step increments",
      component: WithConstraintsExample,
    },
    {
      id: "without-steppers",
      title: "Without Steppers",
      description: "Clean input without increment/decrement buttons",
      component: WithoutSteppersExample,
    },
    {
      id: "disabled-scrub-area",
      title: "Disabled Scrub Area",
      description: "Number field with static label (no drag interaction)",
      component: DisabledScrubAreaExample,
    },
    {
      id: "full-width",
      title: "Full Width",
      description: "Number field that takes full container width",
      component: FullWidthExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled number field for display purposes",
      component: DisabledExample,
    },
  ],
  components: [
    {
      name: "NumberField",
      description: "Advanced numeric input with stepper controls and scrub area.",
      component: NumberField,
      primary: true,
    },
    {
      name: "NumberFieldLabel",
      description: "Label with optional interactive scrub area.",
      component: NumberFieldLabel,
    },
    {
      name: "NumberFieldGroup",
      description: "Container for input and stepper buttons.",
      component: NumberFieldGroup,
    },
    {
      name: "NumberFieldInput",
      description: "The numeric input element with validation.",
      component: NumberFieldInput,
    },
    {
      name: "NumberFieldIncrement",
      description: "Button to increase the numeric value.",
      component: NumberFieldIncrement,
    },
    {
      name: "NumberFieldDecrement",
      description: "Button to decrease the numeric value.",
      component: NumberFieldDecrement,
    },
    {
      name: "NumberFieldScrubCursor",
      description: "Custom cursor for scrub area interactions.",
      component: NumberFieldScrubCursor,
    },
  ],
};
