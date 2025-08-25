import type { ComponentConfig } from "@patternmode/config/component-types";
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
import {
  ContactFormExample,
  DefaultExample,
  InformationExample,
  SettingsExample,
} from "./examples";

export const sheetConfig: ComponentConfig = {
  id: "sheet",
  name: "Sheet",
  description:
    "A desktop-optimized sheet implementation built on Base UI Dialog. Provides side panel overlays that slide in from the right side of the screen, perfect for detailed forms, settings panels, and navigation menus.",
  category: "overlay",
  icon: RectangleHorizontal,
  importStatement: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose } from "@patternmode/sheet";`,
  examples: [
    { id: "default", title: "Default", description: "Basic sheet with open/close controls", component: DefaultExample },
    { id: "settings", title: "Settings", description: "Form-style panel for user preferences", component: SettingsExample },
    { id: "information", title: "Information", description: "Read-only info panel with details", component: InformationExample },
    { id: "contact-form", title: "Contact Form", description: "Side panel with contact form fields", component: ContactFormExample },
  ],
  components: [
    { name: "Sheet", description: "Root sheet container", component: Sheet, primary: true },
    { name: "SheetTrigger", description: "Opens the sheet", component: SheetTrigger },
    { name: "SheetContent", description: "Sheet content container", component: SheetContent },
    { name: "SheetHeader", description: "Sheet header area", component: SheetHeader },
    { name: "SheetTitle", description: "Sheet title", component: SheetTitle },
    { name: "SheetDescription", description: "Sheet description text", component: SheetDescription },
    { name: "SheetBody", description: "Main body area", component: SheetBody },
    { name: "SheetFooter", description: "Footer with actions", component: SheetFooter },
    { name: "SheetClose", description: "Close button for the sheet", component: SheetClose },
  ],
};
