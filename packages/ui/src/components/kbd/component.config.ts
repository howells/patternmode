import type { ComponentConfig } from "../../lib/component-config-types";
import { Keyboard } from "lucide-react";
import { Kbd } from "./component";
import { CombinationExample, DefaultExample, SizesExample, VariantExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "kbd",
  name: "Kbd",
  description: "Keyboard shortcut display component for showing keyboard shortcuts and commands in a consistent, styled format. Supports platform detection and complex key combinations.",
  category: "actions",
  icon: Keyboard,
  importStatement: `import { Kbd } from "@patternmode/ui/kbd";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic keyboard shortcut display",
      component: DefaultExample,
    },
    {
      id: "combination",
      title: "Key Combinations",
      description: "Multiple keys with automatic platform detection",
      component: CombinationExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants",
      component: SizesExample,
    },
    {
      id: "variants",
      title: "Variants",
      description: "Different visual variants for various contexts",
      component: VariantExample,
    },
  ],
  components: [
    {
      name: "Kbd",
      description: "Keyboard shortcut display component with platform detection and styling variants.",
      component: Kbd,
    },
  ],
};
