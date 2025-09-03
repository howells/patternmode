import type { ComponentConfig } from "@patternmode/config/component-types";
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

export const toolbarConfig: ComponentConfig = {
  id: "toolbar",
  name: "Toolbar",
  description:
    "A comprehensive toolbar system for creating organized collections of interactive controls, actions, and inputs. Perfect for application headers, editing interfaces, and action bars with full accessibility support.",
  category: "controls",
  icon: Wrench,
  importStatement: `import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator } from "@patternmode/toolbar";`,
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
      description:
        "Toolbar with input field and links for search functionality",
      component: WithInputExample,
    },
    {
      id: "variants",
      title: "Variants",
      description:
        "Different visual style variants - default, outline, and ghost",
      component: VariantsExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different toolbar sizes for various use cases",
      component: SizesExample,
    },
    {
      id: "vertical",
      title: "Vertical",
      description:
        "Vertical orientation for sidebar toolbars and narrow layouts",
      component: VerticalExample,
    },
    {
      id: "disabled",
      title: "Disabled States",
      description:
        "Toolbar items in disabled state showing accessibility support",
      component: DisabledExample,
    },
  ],
  components: [
    {
      name: "Toolbar",
      description: "Root toolbar container for organizing controls.",
      component: Toolbar,
    },
    {
      name: "Toolbar Button",
      description: "Interactive button component for actions.",
      component: ToolbarButton,
    },
    {
      name: "Toolbar Link",
      description: "Link component for navigation actions.",
      component: ToolbarLink,
    },
    {
      name: "Toolbar Input",
      description: "Input field for search and data entry.",
      component: ToolbarInput,
    },
    {
      name: "Toolbar Group",
      description: "Group for organizing related toolbar items.",
      component: ToolbarGroup,
    },
    {
      name: "Toolbar Separator",
      description: "Visual divider for toolbar sections.",
      component: ToolbarSeparator,
    },
  ],
};
