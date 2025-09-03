import type { ComponentConfig } from "@patternmode/config/component-types";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./component";
import {
  ConfirmationExample,
  ControlledExample,
  DefaultExample,
  WithFormExample,
} from "./examples";

export const dialogConfig: ComponentConfig = {
  id: "dialog",
  name: "Dialog",
  description:
    "Modal dialog component built on Base UI's Dialog primitive with focus management and accessibility.",
  category: "overlay",
  featured: true,
  icon: MessageSquare,
  importStatement: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@patternmode/dialog";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic dialog with header, content, and footer",
      component: DefaultExample,
    },
    {
      id: "with-form",
      title: "With Form",
      description: "Dialog containing form inputs and controls",
      component: WithFormExample,
    },
    {
      id: "confirmation",
      title: "Confirmation",
      description: "Confirmation dialog for destructive actions",
      component: ConfirmationExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Dialog with external state control",
      component: ControlledExample,
    },
  ],
  components: [
    {
      name: "Dialog",
      description: "Root dialog component that manages modal state.",
      component: Dialog,
      primary: true,
    },
    {
      name: "Dialog Trigger",
      description: "Element that opens the dialog when activated.",
      component: DialogTrigger,
    },
    {
      name: "Dialog Content",
      description:
        "Main dialog content container with overlay and positioning.",
      component: DialogContent,
    },
    {
      name: "Dialog Header",
      description: "Header container for dialog title and description.",
      component: DialogHeader,
    },
    {
      name: "Dialog Title",
      description: "Dialog title heading with semantic markup.",
      component: DialogTitle,
    },
    {
      name: "Dialog Description",
      description: "Dialog description text for additional context.",
      component: DialogDescription,
    },
    {
      name: "Dialog Footer",
      description: "Footer container for dialog action buttons.",
      component: DialogFooter,
    },
    {
      name: "Dialog Close",
      description: "Button that dismisses the dialog when activated.",
      component: DialogClose,
    },
  ],
};
