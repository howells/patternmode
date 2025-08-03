import type { ComponentConfig } from "../../lib/component-config-types";
import { RectangleHorizontal } from "lucide-react";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./component";
import { ContactFormExample, DefaultExample, InformationExample, SettingsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "sheet",
  name: "Sheet",
  description: "A desktop-optimized sheet implementation built on Base UI Dialog. Provides side panel overlays that slide in from the right side of the screen, perfect for detailed forms, settings panels, and navigation menus.",
  category: "overlay",
  icon: RectangleHorizontal,
  importStatement: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose } from "@patternmode/ui/sheet";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic sheet with form for editing profile information",
      component: DefaultExample,
    },
    {
      id: "settings",
      title: "Settings Panel",
      description: "Sheet containing application settings and preferences",
      component: SettingsExample,
    },
    {
      id: "contact-form",
      title: "Contact Form",
      description: "Sheet with a contact form for user inquiries",
      component: ContactFormExample,
    },
    {
      id: "information",
      title: "Information Panel",
      description: "Sheet displaying component information and documentation",
      component: InformationExample,
    },
  ],
  components: [
    {
      name: "Sheet",
      description: "Root container that manages sheet state and behavior.",
      component: Sheet,
      primary: true,
    },
    {
      name: "SheetTrigger",
      description: "Interactive element that opens the sheet when activated.",
      component: SheetTrigger,
    },
    {
      name: "SheetContent",
      description: "Main container that slides in from the right with backdrop overlay.",
      component: SheetContent,
    },
    {
      name: "SheetHeader",
      description: "Header section with title, description, and automatic close button.",
      component: SheetHeader,
    },
    {
      name: "SheetTitle",
      description: "Semantic heading element for the sheet's primary title.",
      component: SheetTitle,
    },
    {
      name: "SheetDescription",
      description: "Explanatory text providing context about the sheet's purpose.",
      component: SheetDescription,
    },
    {
      name: "SheetBody",
      description: "Flexible container for the main scrollable content area.",
      component: SheetBody,
    },
    {
      name: "SheetFooter",
      description: "Footer section for action buttons with responsive layout.",
      component: SheetFooter,
    },
    {
      name: "SheetClose",
      description: "Interactive element that closes the sheet when activated.",
      component: SheetClose,
    },
  ],
};
