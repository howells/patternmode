import type { ComponentConfig } from "../../lib/component-config-types";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBackdrop,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./component";
import {
  CustomStyledExample,
  DefaultExample,
  DestructiveExample,
  SimpleConfirmationExample,
  WarningExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "alert-dialog",
  name: "AlertDialog",
  description: "Modal dialog component for critical alerts and confirmation prompts.",
  category: "ui",
  icon: AlertTriangle,
  importStatement: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@patternmode/ui/alert-dialog";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic alert dialog with confirmation",
      component: DefaultExample,
    },
    {
      id: "destructive",
      title: "Destructive",
      description: "Alert dialog for destructive actions",
      component: DestructiveExample,
    },
    {
      id: "simple-confirmation",
      title: "Simple Confirmation",
      description: "Simple confirmation dialog",
      component: SimpleConfirmationExample,
    },
    {
      id: "warning",
      title: "Warning",
      description: "Warning dialog for potentially unwanted actions",
      component: WarningExample,
    },
    {
      id: "custom-styled",
      title: "Custom Styled",
      description: "Alert dialog with custom styling and colors",
      component: CustomStyledExample,
    },
  ],
  components: [
    {
      name: "AlertDialog",
      description: "Root component for alert dialog",
      component: AlertDialog,
      primary: true,
    },
    {
      name: "AlertDialogTrigger",
      description: "Button that triggers the alert dialog",
      component: AlertDialogTrigger,
    },
    {
      name: "AlertDialogContent",
      description: "Main content container for the dialog",
      component: AlertDialogContent,
    },
    {
      name: "AlertDialogHeader",
      description: "Header container for title and description",
      component: AlertDialogHeader,
    },
    {
      name: "AlertDialogTitle",
      description: "Title heading for the dialog",
      component: AlertDialogTitle,
    },
    {
      name: "AlertDialogDescription",
      description: "Description text for additional context",
      component: AlertDialogDescription,
    },
    {
      name: "AlertDialogFooter",
      description: "Footer container for action buttons",
      component: AlertDialogFooter,
    },
    {
      name: "AlertDialogCancel",
      description: "Cancel button that closes without action",
      component: AlertDialogCancel,
    },
    {
      name: "AlertDialogAction",
      description: "Primary action button for confirmation",
      component: AlertDialogAction,
    },
    {
      name: "AlertDialogBackdrop",
      description: "Semi-transparent backdrop overlay",
      component: AlertDialogBackdrop,
    },
    {
      name: "AlertDialogPortal",
      description: "Portal component for rendering outside DOM tree",
      component: AlertDialogPortal,
    },
  ],
};
