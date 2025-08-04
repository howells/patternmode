import type { ComponentConfig } from "../../lib/component-config-types";
import { Layout } from "lucide-react";
import { HStack, Stack, VStack } from "./component";
import { AlignmentExample, CustomSpacingExample, DefaultExample, HelperComponentsExample, HorizontalExample, ResponsiveExample, WithPaddingExample, WrappingExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "stack",
  name: "Stack",
  description: "Flexible layout components for arranging content in vertical or horizontal stacks with consistent spacing, alignment, and responsive behavior.",
  category: "layout",
  featured: true,
  icon: Layout,
  importStatement: `import { Stack, VStack, HStack } from "@patternmode/ui/stack";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic vertical stack with consistent spacing",
      component: DefaultExample,
    },
    {
      id: "horizontal",
      title: "Horizontal",
      description: "Horizontal arrangement of items",
      component: HorizontalExample,
    },
    {
      id: "custom-spacing",
      title: "Custom Spacing",
      description: "Different gap sizes using the 4px grid system",
      component: CustomSpacingExample,
    },
    {
      id: "alignment",
      title: "Alignment",
      description: "Center alignment along the cross axis",
      component: AlignmentExample,
    },
    {
      id: "responsive",
      title: "Responsive",
      description: "Responsive direction and spacing changes",
      component: ResponsiveExample,
    },
    {
      id: "helper-components",
      title: "Helper Components",
      description: "VStack and HStack convenience components",
      component: HelperComponentsExample,
    },
    {
      id: "with-padding",
      title: "With Padding",
      description: "Stack with responsive padding around content",
      component: WithPaddingExample,
    },
    {
      id: "wrapping",
      title: "Wrapping",
      description: "Items wrapping to multiple lines",
      component: WrappingExample,
    },
  ],
  components: [
    {
      name: "Stack",
      description: "Main layout component with full responsive capabilities",
      component: Stack,
      primary: true,
    },
    {
      name: "VStack",
      description: "Vertical stack helper component",
      component: VStack,
    },
    {
      name: "HStack",
      description: "Horizontal stack helper component",
      component: HStack,
    },
  ],
};
