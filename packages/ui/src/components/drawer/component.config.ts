import type { ComponentConfig } from "../../lib/component-config-types";
import { PanelRight } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "./component";
import {
  DefaultExample,
  FormExample,
  SettingsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "drawer",
  name: "Drawer",
  description: "A collection of components for creating slide-out drawers and bottom sheets with smooth animations.",
  category: "overlay",
  icon: PanelRight,
  importStatement: `import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@patternmode/ui/drawer";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic drawer with header, content, and footer",
      component: DefaultExample,
    },
    {
      id: "form",
      title: "Form",
      description: "Drawer containing a form with input fields",
      component: FormExample,
    },
    {
      id: "settings",
      title: "Settings",
      description: "Settings drawer with various controls",
      component: SettingsExample,
    },
  ],
  components: [
    {
      component: Drawer,
      name: "Drawer",
      primary: true,
      description: "Root drawer container component.",
    },
    {
      component: DrawerTrigger,
      name: "DrawerTrigger",
      description: "Button that opens the drawer.",
    },
    {
      component: DrawerContent,
      name: "DrawerContent",
      description: "Main drawer content container.",
    },
    {
      component: DrawerHeader,
      name: "DrawerHeader",
      description: "Header section of the drawer.",
    },
    {
      component: DrawerTitle,
      name: "DrawerTitle",
      description: "Title text for the drawer.",
    },
    {
      component: DrawerDescription,
      name: "DrawerDescription",
      description: "Description text for the drawer.",
    },
    {
      component: DrawerFooter,
      name: "DrawerFooter",
      description: "Footer section with action buttons.",
    },
    {
      component: DrawerClose,
      name: "DrawerClose",
      description: "Button to close the drawer.",
    },
    {
      component: DrawerOverlay,
      name: "DrawerOverlay",
      description: "Background overlay component.",
    },
    {
      component: DrawerPortal,
      name: "DrawerPortal",
      description: "Portal component for drawer rendering.",
    },
  ],
};
