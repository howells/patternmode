import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { AlertTriangle, Info } from "lucide-react";
import type React from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogAnatomy,
} from "../dialog";
import { Icon } from "../icon";
import { Text } from "../text";

type DialogStoryArgs = React.ComponentProps<typeof Dialog> & {
  triggerLabel?: string;
  title?: string;
  description?: string;
  bodyText?: string;
  cancelLabel?: string;
  confirmLabel?: string;
};

const meta: Meta<DialogStoryArgs> = {
  title: "Dialog",
  component: Dialog,
  argTypes: {
    // Content
    triggerLabel: {
      control: "text",
      description: "Text for the trigger button",
    },
    title: {
      control: "text",
      description: "Dialog title",
    },
    description: {
      control: "text",
      description: "Dialog description",
    },
    bodyText: {
      control: "text",
      description: "Body content text",
    },
    cancelLabel: {
      control: "text",
      description: "Cancel button label",
    },
    confirmLabel: {
      control: "text",
      description: "Confirm button label",
    },
  },
  args: {
    triggerLabel: "Open dialog",
    title: "Dialog title",
    description: "Short description for the dialog content goes here.",
    bodyText: "Body content can contain any elements.",
    cancelLabel: "Cancel",
    confirmLabel: "Save",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "panel-top",
    },
    docs: {
      description: {
        component:
          "Modal overlays that require interaction before returning to main content. Includes trigger, header, body, and optional footer.",
      },
      anatomy: dialogAnatomy,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>{args.triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>
        <Text variant="muted">{args.bodyText}</Text>
        <DialogFooter>
          <Button appearance="outline" variant="secondary">
            {args.cancelLabel}
          </Button>
          <Button>{args.confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Common dialog patterns for different use cases.
 */
export const DialogPatterns: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Common dialog patterns: informational, confirmation, and destructive actions.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button appearance="outline" icon={Info} variant="secondary">
            Info dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Information</DialogTitle>
            <DialogDescription>
              This is an informational dialog.
            </DialogDescription>
          </DialogHeader>
          <Text variant="muted">
            Informational dialogs provide details without requiring a decision.
          </Text>
          <DialogFooter>
            <Button>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Confirmation dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <Text variant="muted">This action will update your settings.</Text>
          <DialogFooter>
            <Button appearance="outline" variant="secondary">
              Cancel
            </Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button icon={AlertTriangle} variant="destructive">
            Destructive dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon icon={AlertTriangle} />
              Delete item
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <Text variant="muted">
            This will permanently delete the item and all associated data.
          </Text>
          <DialogFooter>
            <Button appearance="outline" variant="secondary">
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
