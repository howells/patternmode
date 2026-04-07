import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";

type CommandStoryArgs = React.ComponentProps<typeof CommandDialog> & {
  placeholder?: string;
  emptyText?: string;
};

const meta: Meta<CommandStoryArgs> = {
  title: "Command",
  argTypes: {
    // Content
    placeholder: {
      control: "text",
      description: "Search input placeholder text",
    },
    emptyText: {
      control: "text",
      description: "Text shown when no results found",
    },
  },
  args: {
    placeholder: "Type a command…",
    emptyText: "No results found.",
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "terminal",
    },
    docs: {
      description: {
        component:
          "Command palettes provide fast, keyboard-driven access to actions and navigation. They support search, grouping, and keyboard shortcuts for efficient interaction.",
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
    <CommandDialog
      onOpenChange={() => {
        // No-op for static story
      }}
      open
    >
      <CommandInput placeholder={args.placeholder} />
      <CommandList>
        <CommandEmpty>{args.emptyText}</CommandEmpty>
        <CommandGroup heading="General">
          <CommandItem>Toggle theme</CommandItem>
          <CommandItem>Open settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem>Go to dashboard</CommandItem>
          <CommandItem>Open profile</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};

/**
 * Multiple command groups with separators.
 */
export const WithMultipleGroups: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Command palettes can organize items into multiple groups with headings and separators.",
      },
    },
  },
  render: () => (
    <CommandDialog
      onOpenChange={() => {
        // No-op for static story
      }}
      open
    >
      <CommandInput placeholder="Search commands…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="File">
          <CommandItem>New file</CommandItem>
          <CommandItem>Open file…</CommandItem>
          <CommandItem>Save</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Edit">
          <CommandItem>Copy</CommandItem>
          <CommandItem>Paste</CommandItem>
          <CommandItem>Cut</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="View">
          <CommandItem>Zoom in</CommandItem>
          <CommandItem>Zoom out</CommandItem>
          <CommandItem>Fullscreen</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};
