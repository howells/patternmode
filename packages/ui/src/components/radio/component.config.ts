import type { ComponentConfig } from "../../lib/component-config-types";
import { Circle } from "lucide-react";
import {
  Radio,
  RadioCard,
  RadioCardOption,
  RadioIndicator,
  RadioItem,
  RadioLabel,
  RadioOption,
} from "./component";
import {
  CardStyleExample,
  CustomStructureExample,
  DefaultExample,
  DisabledExample,
  SizesExample,
  WithDescriptionExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "radio",
  name: "Radio",
  description: "Radio button input for single selections within a group of options. Provides accessible radio button functionality with proper keyboard navigation and form integration.",
  category: "inputs",
  icon: Circle,
  importStatement: `import { Radio, RadioItem, RadioOption, RadioLabel, RadioCard, RadioCardOption, RadioIndicator } from "@patternmode/ui/radio";`,
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
      description: "Radio options in different sizes",
      component: SizesExample,
    },
    {
      id: "with-description",
      title: "With Description",
      description: "Radio options with additional description text",
      component: WithDescriptionExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled radio options",
      component: DisabledExample,
    },
    {
      id: "card-style",
      title: "Card Style",
      description: "Card-style radio options for rich content",
      component: CardStyleExample,
    },
    {
      id: "custom-structure",
      title: "Custom Structure",
      description: "Custom radio layout using individual components",
      component: CustomStructureExample,
    },
  ],
  components: [
    {
      name: "Radio",
      description: "Root radio component built on Base UI's Radio primitive.",
      component: Radio,
      primary: true,
    },
    {
      name: "RadioItem",
      description: "Styled radio button with visual circle and dot indicator.",
      component: RadioItem,
    },
    {
      name: "RadioOption",
      description: "Complete radio option with integrated label and description.",
      component: RadioOption,
    },
    {
      name: "RadioLabel",
      description: "Label component for radio buttons with proper styling.",
      component: RadioLabel,
    },
    {
      name: "RadioCard",
      description: "Card-style radio button for enhanced presentation.",
      component: RadioCard,
    },
    {
      name: "RadioCardOption",
      description: "Complete card-style radio option with title and description.",
      component: RadioCardOption,
    },
    {
      name: "RadioIndicator",
      description: "Visual indicator component for showing selection state.",
      component: RadioIndicator,
    },
  ],
};
