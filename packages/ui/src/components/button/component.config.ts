import type { ComponentConfig } from "../../lib/component-config-types";
import { Square } from "lucide-react";
import { Button } from "./component";
import {
  DefaultExample,
  DestructiveExample,
  DisabledExample,
  FullWidthExample,
  GhostExample,
  IconPropExample,
  KeyboardShortcutsExample,
  LinkExample,
  LoadingExample,
  LoadingWithTextExample,
  OutlineDashedExample,
  OutlineExample,
  RoundedExample,
  SecondaryExample,
  SizesExample,
  TextAlignExample,
  WithIconsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "button",
  name: "Button",
  description: "Interactive button component with multiple variants and states for user actions.",
  category: "controls",
  featured: true,
  icon: Square,
  importStatement: `import { Button } from "@patternmode/ui/button";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic button with default styling",
      component: DefaultExample,
    },
    {
      id: "secondary",
      title: "Secondary",
      description: "Secondary variant button",
      component: SecondaryExample,
    },
    {
      id: "destructive",
      title: "Destructive",
      description: "Destructive action button",
      component: DestructiveExample,
    },
    {
      id: "outline",
      title: "Outline",
      description: "Outlined button variant",
      component: OutlineExample,
    },
    {
      id: "outline-dashed",
      title: "Outline Dashed",
      description: "Outlined button with dashed border",
      component: OutlineDashedExample,
    },
    {
      id: "ghost",
      title: "Ghost",
      description: "Ghost button with minimal styling",
      component: GhostExample,
    },
    {
      id: "link",
      title: "Link",
      description: "Link-styled button",
      component: LinkExample,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Button with left and right icons",
      component: WithIconsExample,
    },
    {
      id: "icon-prop",
      title: "Icon Prop",
      description: "Button using icon prop for single icons",
      component: IconPropExample,
    },
    {
      id: "loading",
      title: "Loading",
      description: "Button in loading state",
      component: LoadingExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different button sizes including icon variants",
      component: SizesExample,
    },
    {
      id: "full-width",
      title: "Full Width",
      description: "Button that spans full container width",
      component: FullWidthExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled button state",
      component: DisabledExample,
    },
    {
      id: "rounded",
      title: "Rounded",
      description: "Button with rounded pill shape",
      component: RoundedExample,
    },
    {
      id: "loading-with-text",
      title: "Loading With Text",
      description: "Loading state with custom loading text",
      component: LoadingWithTextExample,
    },
    {
      id: "text-align",
      title: "Text Alignment",
      description: "Text alignment options for full-width buttons",
      component: TextAlignExample,
    },
    {
      id: "keyboard-shortcuts",
      title: "Keyboard Shortcuts",
      description: "Buttons with keyboard shortcut indicators",
      component: KeyboardShortcutsExample,
    },
  ],
  components: [
    {
      name: "Button",
      description: "Interactive button component for user actions",
      component: Button,
    },
  ],
};
