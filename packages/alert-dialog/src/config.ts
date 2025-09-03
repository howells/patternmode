import type { ComponentConfig } from "@patternmode/config/component-types";
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

export const alertDialogConfig: ComponentConfig = {
  id: "alert-dialog",
  name: "Alert Dialog",
  description:
    "Modal dialog component for critical alerts and confirmation prompts.",
  category: "overlay",
  icon: AlertTriangle,
  importStatement: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@patternmode/alert-dialog";`,
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
      name: "Alert Dialog",
      description: "Root component for alert dialog",
      component: AlertDialog,
      primary: true,
    },
    {
      name: "Alert Dialog Trigger",
      description: "Button that triggers the alert dialog",
      component: AlertDialogTrigger,
    },
    {
      name: "Alert Dialog Content",
      description: "Main content container for the dialog",
      component: AlertDialogContent,
    },
    {
      name: "Alert Dialog Header",
      description: "Header container for title and description",
      component: AlertDialogHeader,
    },
    {
      name: "Alert Dialog Title",
      description: "Title heading for the dialog",
      component: AlertDialogTitle,
    },
    {
      name: "Alert Dialog Description",
      description: "Description text for additional context",
      component: AlertDialogDescription,
    },
    {
      name: "Alert Dialog Footer",
      description: "Footer container for action buttons",
      component: AlertDialogFooter,
    },
    {
      name: "Alert Dialog Cancel",
      description: "Cancel button that closes without action",
      component: AlertDialogCancel,
    },
    {
      name: "Alert Dialog Action",
      description: "Primary action button for confirmation",
      component: AlertDialogAction,
    },
    {
      name: "Alert Dialog Backdrop",
      description: "Semi-transparent backdrop overlay",
      component: AlertDialogBackdrop,
    },
    {
      name: "Alert Dialog Portal",
      description: "Portal component for rendering outside DOM tree",
      component: AlertDialogPortal,
    },
  ],
};
