import type { ComponentConfig } from "../../lib/component-config-types";
import { Search } from "lucide-react";
import {
  Inspector,
  InspectorBody,
  InspectorGroup,
  InspectorHeader,
  InspectorSection,
  InspectorToggle,
} from "./component";
import {
  BasicExample,
  DesignToolExample,
  FilePropertiesExample,
  ToggleableExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "inspector",
  name: "Inspector",
  description: "A side panel component system for displaying detailed information, properties, or controls related to selected content. Features toggleable overlay mode for mobile devices, smooth animations, and structured content organization.",
  category: "forms",
  icon: Search,
  importStatement: `import { Inspector, InspectorHeader, InspectorBody, InspectorSection, InspectorGroup, InspectorToggle } from "@patternmode/ui/inspector";`,
  examples: [
    {
      id: "basic",
      title: "Basic Inspector",
      description: "Static inspector panel with structured content sections",
      component: BasicExample,
    },
    {
      id: "design-tool",
      title: "Design Tool Inspector",
      description: "Inspector for design tools with property controls",
      component: DesignToolExample,
    },
    {
      id: "file-properties",
      title: "File Properties",
      description: "Inspector displaying file metadata and details",
      component: FilePropertiesExample,
    },
    {
      id: "toggleable",
      title: "Toggleable Inspector",
      description: "Inspector with overlay mode and toggle button",
      component: ToggleableExample,
    },
  ],
  components: [
    {
      name: "Inspector",
      description: "Root inspector component providing the main panel container",
      component: Inspector,
      primary: true,
    },
    {
      name: "InspectorHeader",
      description: "Header component for titles and controls",
      component: InspectorHeader,
    },
    {
      name: "InspectorBody",
      description: "Main scrollable content area with automatic overflow handling",
      component: InspectorBody,
    },
    {
      name: "InspectorSection",
      description: "Section component for organizing related content",
      component: InspectorSection,
    },
    {
      name: "InspectorGroup",
      description: "Group component for form control groupings",
      component: InspectorGroup,
    },
    {
      name: "InspectorToggle",
      description: "Toggle button for opening/closing the inspector panel",
      component: InspectorToggle,
    },
  ],
};
