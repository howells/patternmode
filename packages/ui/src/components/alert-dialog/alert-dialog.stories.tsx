import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { Button } from "../button";

type AlertDialogStoryArgs = React.ComponentProps<typeof AlertDialog> & {
  triggerText?: string;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
};

const meta: Meta<AlertDialogStoryArgs> = {
  title: "AlertDialog",
  component: AlertDialog,
  argTypes: {
    // Content
    triggerText: {
      control: "text",
      description: "Text for the trigger button",
    },
    title: {
      control: "text",
      description: "Alert dialog title",
    },
    description: {
      control: "text",
      description: "Alert dialog description",
    },
    cancelText: {
      control: "text",
      description: "Cancel button text",
    },
    actionText: {
      control: "text",
      description: "Action button text",
    },
  },
  args: {
    triggerText: "Delete project…",
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete the project and remove your data from our servers.",
    cancelText: "Cancel",
    actionText: "Continue",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "alert-triangle",
    },
    docs: {
      description: {
        component:
          "Interrupts users with important content requiring action. Use for confirmations, warnings, or critical information.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{args.triggerText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{args.title}</AlertDialogTitle>
          <AlertDialogDescription>{args.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{args.cancelText}</AlertDialogCancel>
          <AlertDialogAction>{args.actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * Destructive variant for dangerous actions.
 */
export const Destructive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use the destructive variant for irreversible or dangerous actions.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account…</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and all associated data.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
