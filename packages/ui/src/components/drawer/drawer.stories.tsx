import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Button } from "../button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Input } from "../input";
import { Label } from "../label";
import { VStack } from "../stack";
import { Text } from "../text";

interface DrawerStoryArgs {
  bodyContent?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  contentItemCount?: number;
  contentText?: string;
  description?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  title?: string;
  triggerLabel?: string;
}

const meta: Meta<DrawerStoryArgs> = {
  title: "Drawer",
  parameters: {
    builder: {
      category: "container",
      icon: "panel-bottom",
    },

    docs: {
      description: {
        component:
          "Slides up from the bottom. Built with Vaul for gesture support.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base interactive story
export const Base: Story = {
  args: {
    triggerLabel: "Open drawer",
    title: "Drawer title",
    description: "This is a responsive drawer using Vaul.",
    bodyContent: "Body content here.",
    cancelLabel: "Cancel",
    confirmLabel: "Confirm",
  },
  argTypes: {
    triggerLabel: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    bodyContent: { control: "text" },
    cancelLabel: { control: "text" },
    confirmLabel: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic drawer with header, content, and footer. Drag down or press escape to dismiss.",
      },
    },
  },
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>{args.triggerLabel}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{args.title}</DrawerTitle>
          <DrawerDescription>{args.description}</DrawerDescription>
        </DrawerHeader>
        <Text className="p-4">{args.bodyContent}</Text>
        <DrawerFooter>
          <Button appearance="outline" variant="secondary">
            {args.cancelLabel}
          </Button>
          <Button>{args.confirmLabel}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// Docs-only stories showing comprehensive examples
export const WithForm: Story = {
  args: {
    triggerLabel: "Edit profile",
    title: "Edit profile",
    description: "Make changes to your profile here.",
    nameLabel: "Name",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "jane@example.com",
    cancelLabel: "Cancel",
    confirmLabel: "Save changes",
  },
  argTypes: {
    triggerLabel: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    nameLabel: { control: "text" },
    namePlaceholder: { control: "text" },
    emailLabel: { control: "text" },
    emailPlaceholder: { control: "text" },
    cancelLabel: { control: "text" },
    confirmLabel: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers can contain forms and interactive content. Perfect for mobile-friendly input experiences.",
      },
    },
  },
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>{args.triggerLabel}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{args.title}</DrawerTitle>
          <DrawerDescription>{args.description}</DrawerDescription>
        </DrawerHeader>
        <VStack className="p-4" gap="base">
          <VStack gap="2xs">
            <Label htmlFor="name">{args.nameLabel}</Label>
            <Input id="name" placeholder={args.namePlaceholder} />
          </VStack>
          <VStack gap="2xs">
            <Label htmlFor="email">{args.emailLabel}</Label>
            <Input
              id="email"
              placeholder={args.emailPlaceholder}
              type="email"
            />
          </VStack>
        </VStack>
        <DrawerFooter>
          <Button appearance="outline" variant="secondary">
            {args.cancelLabel}
          </Button>
          <Button>{args.confirmLabel}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithScrollableContent: Story = {
  args: {
    triggerLabel: "View details",
    title: "Terms and conditions",
    description: "Please review the following terms.",
    contentText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    contentItemCount: 20,
    cancelLabel: "Decline",
    confirmLabel: "Accept",
  },
  argTypes: {
    triggerLabel: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    contentText: { control: "text" },
    contentItemCount: { control: "number" },
    cancelLabel: { control: "text" },
    confirmLabel: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers handle scrollable content gracefully while maintaining the header and footer in place.",
      },
    },
  },
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>{args.triggerLabel}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{args.title}</DrawerTitle>
          <DrawerDescription>{args.description}</DrawerDescription>
        </DrawerHeader>
        <VStack className="max-h-[400px] overflow-y-auto p-4" gap="base">
          {Array.from(
            { length: args.contentItemCount ?? 20 },
            (_, itemNumber) => itemNumber + 1,
          ).map((itemNumber) => (
            <Text key={itemNumber}>{args.contentText}</Text>
          ))}
        </VStack>
        <DrawerFooter>
          <Button appearance="outline" variant="secondary">
            {args.cancelLabel}
          </Button>
          <Button>{args.confirmLabel}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
