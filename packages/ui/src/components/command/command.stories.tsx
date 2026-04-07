import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { CommandDialog } from "./command-dialog";
import { CommandEmpty } from "./command-empty";
import { CommandGroup } from "./command-group";
import { CommandInput } from "./command-input";
import { CommandItem } from "./command-item";
import { CommandList } from "./command-list";
import { Command } from "./command-root";
import { CommandSeparator } from "./command-separator";
import { CommandShortcut } from "./command-shortcut";

const meta = {
  title: "Navigation/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-[32rem]">
      <Command>
        <CommandInput placeholder="Search primitives, stories, and docs..." />
        <CommandList>
          <CommandEmpty>No matching primitive.</CommandEmpty>
          <CommandGroup heading="Library">
            <CommandItem>
              Button
              <CommandShortcut>UI</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Select
              <CommandShortcut>UI</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Sheet
              <CommandShortcut>NEW</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Review surfaces">
            <CommandItem>
              Storybook overview
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Playground shell
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const InDialog: Story = {
  render: () => (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle>Command search belongs in the shared shell layer</CardTitle>
      </CardHeader>
      <CardContent>
        <CommandDialog defaultOpen>
          <CommandInput placeholder="Jump to a primitive..." />
          <CommandList>
            <CommandGroup heading="Components">
              <CommandItem>
                Breadcrumb
                <CommandShortcut>Nav</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Pagination
                <CommandShortcut>Nav</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Command
                <CommandShortcut>Nav</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </CardContent>
    </Card>
  ),
};
