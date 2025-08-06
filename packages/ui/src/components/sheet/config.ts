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

export const sheetConfig: ComponentConfig = {
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
      name: "Sheet Trigger",
      description: "Interactive element that opens the sheet when activated.",
      component: SheetTrigger,
    },
    {
      name: "Sheet Content",
      description: "Main container that slides in from the right with backdrop overlay.",
      component: SheetContent,
    },
    {
      name: "Sheet Header",
      description: "Header section with title, description, and automatic close button.",
      component: SheetHeader,
    },
    {
      name: "Sheet Title",
      description: "Semantic heading element for the sheet's primary title.",
      component: SheetTitle,
    },
    {
      name: "Sheet Description",
      description: "Explanatory text providing context about the sheet's purpose.",
      component: SheetDescription,
    },
    {
      name: "Sheet Body",
      description: "Flexible container for the main scrollable content area.",
      component: SheetBody,
    },
    {
      name: "Sheet Footer",
      description: "Footer section for action buttons with responsive layout.",
      component: SheetFooter,
    },
    {
      name: "Sheet Close",
      description: "Interactive element that closes the sheet when activated.",
      component: SheetClose,
    },
  ],
};
