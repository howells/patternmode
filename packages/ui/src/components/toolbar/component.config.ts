import type { ComponentConfig } from "../../lib/component-config-types";
import { Wrench } from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "./component";
import {
  DefaultExample,
  DisabledExample,
  SizesExample,
  TextFormattingExample,
  VariantsExample,
  VerticalExample,
  WithInputExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "toolbar",
  name: "Toolbar",
  description: "A comprehensive toolbar system for creating organized collections of interactive controls, actions, and inputs. Perfect for application headers, editing interfaces, and action bars with full accessibility support.",
  category: "ui",
  icon: Wrench,
  importStatement: `import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator } from "@patternmode/ui/toolbar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic toolbar with grouped buttons and separators",
      component: DefaultExample,
    },
    {
      id: "text-formatting",
      title: "Text Formatting",
      description: "Text editor toolbar with formatting and alignment controls",
      component: TextFormattingExample,
    },
    {
      id: "with-input",
      title: "With Input",
      description: "Toolbar with input field and links for search functionality",
      component: WithInputExample,
    },
    {
      id: "variants",
      title: "Variants",
      description: "Different visual style variants - default, outline, and ghost",
      component: VariantsExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Toolbars in different sizes - small, default, and large",
      component: SizesExample,
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Toolbar with vertical orientation layout",
      component: VerticalExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Toolbar with disabled buttons and inputs",
      component: DisabledExample,
    },
  ],
  components: [
    {
      name: "Toolbar",
      description: "Root container for toolbar items with coordinated layout and styling.",
      component: Toolbar,
      primary: true,
    },
    {
      name: "ToolbarButton",
      description: "Interactive button component for toolbar actions with hover and pressed states.",
      component: ToolbarButton,
    },
    {
      name: "ToolbarGroup",
      description: "Group component for organizing related toolbar items with consistent spacing.",
      component: ToolbarGroup,
    },
    {
      name: "ToolbarInput",
      description: "Input component for toolbar search and data entry with integrated styling.",
      component: ToolbarInput,
    },
    {
      name: "ToolbarLink",
      description: "Link component for toolbar navigation actions with proper focus management.",
      component: ToolbarLink,
    },
    {
      name: "ToolbarSeparator",
      description: "Visual separator for dividing toolbar sections and improving organization.",
      component: ToolbarSeparator,
    },
  ],
};
