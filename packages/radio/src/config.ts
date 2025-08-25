import type { ComponentConfig } from "@patternmode/config/component-types";
import { Circle } from "lucide-react";
import { Radio, RadioCard, RadioCardOption, RadioGroup, RadioIndicator, RadioItem, RadioLabel, RadioOption } from "./component";
import { CardStyleExample, CustomStructureExample, DefaultExample, DisabledExample, SizesExample, WithDescriptionExample } from "./examples";

export const radioConfig: ComponentConfig = {
  id: "radio",
  name: "Radio",
  description: "Radio button input for single selections within a group of options.",
  category: "controls",
  icon: Circle,
  importStatement: `import { Radio, RadioGroup, RadioItem, RadioOption, RadioLabel, RadioCard, RadioCardOption, RadioIndicator } from "@patternmode/radio";`,
  examples: [
    { id: "default", title: "Default", description: "Basic radio option with label", component: DefaultExample },
    { id: "sizes", title: "Sizes", description: "Different sizes", component: SizesExample },
    { id: "with-description", title: "With Description", description: "Options with descriptions", component: WithDescriptionExample },
    { id: "disabled", title: "Disabled", description: "Disabled radios", component: DisabledExample },
    { id: "card-style", title: "Card Style", description: "Card-style options", component: CardStyleExample },
    { id: "custom-structure", title: "Custom Structure", description: "Compose with primitives", component: CustomStructureExample },
  ],
  components: [
    { name: "Radio", description: "Root radio", component: Radio, primary: true },
    { name: "Radio Group", description: "Group for radios", component: RadioGroup },
    { name: "Radio Item", description: "Styled radio", component: RadioItem },
    { name: "Radio Option", description: "Label + description option", component: RadioOption },
    { name: "Radio Label", description: "Label element", component: RadioLabel },
    { name: "Radio Card", description: "Card-style radio", component: RadioCard },
    { name: "Radio Card Option", description: "Complete card option", component: RadioCardOption },
    { name: "Radio Indicator", description: "Indicator dot/circle", component: RadioIndicator },
  ],
};

