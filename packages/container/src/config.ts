import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import { Container } from "./component";
import { BasicExample, FluidExample, SizesExample } from "./examples";

export const containerConfig: ComponentConfig = {
  id: "container",
  name: "Container",
  description:
    "Responsive content container with center alignment, horizontal padding, and shared size mapping.",
  category: "layout",
  icon: Square,
  importStatement: `import { Container } from "@patternmode/container";`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Centered container with base width and safe padding",
      component: BasicExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Container widths using shared size tokens",
      component: SizesExample,
    },
    {
      id: "fluid",
      title: "Fluid",
      description: "Full-bleed container without max-width",
      component: FluidExample,
    },
  ],
  components: [
    {
      name: "Container",
      description:
        "Layout wrapper that constrains content to a sensible max-width and centers it.",
      component: Container,
    },
  ],
};
