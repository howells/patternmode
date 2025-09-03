import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import { Button } from "./component";
import {
  ButtonAsLinkExample,
  DestructiveExample,
  DisabledExample,
  FullWidthExample,
  GhostExample,
  KeyboardShortcutsExample,
  LinkExample,
  LoadingExample,
  LoadingWithTextExample,
  OutlineDashedExample,
  OutlineExample,
  PrimaryExample,
  RoundedExample,
  SecondaryExample,
  SizesExample,
  TextAlignExample,
} from "./examples";

export const buttonConfig: ComponentConfig = {
  id: "button",
  name: "Button",
  description:
    "Interactive button component with multiple variants and states for user actions.",
  category: "controls",
  featured: true,
  icon: Square,
  importStatement: `import { Button } from "@patternmode/button";`,
  examples: [
    {
      id: "primary",
      title: "Primary",
      description: "Basic button with primary styling",
      component: PrimaryExample,
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
      id: "button-as-link",
      title: "Button as Link",
      description: "Button that renders as a link using href prop",
      component: ButtonAsLinkExample,
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
