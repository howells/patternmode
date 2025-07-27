import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, WithShortcutsExample, WithIconsExample, DialogModeExample, SizesExample  } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "command",
  name: "Command",
  description:
    "Command palette component built on cmdk with search, keyboard navigation, and grouping features.",
  category: "overlay" as const,
  icon: "Terminal",

  importStatement: `import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandShortcut,
  CommandDialog
} from "@/components/ui/command";`,
  componentId: "CommandExample",
  props: [
    {
      name: "size",
      type: "select",
      options: ["sm", "default", "lg"],
      defaultValue: "default",
      description: "Size variant of the command palette."
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: "Type a command or search...",
      description: "Placeholder text for the search input."
    },
    {
      name: "emptyMessage",
      type: "string",
      defaultValue: "No results found.",
      description: "Message to show when no results are found."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic command palette with search and items.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "with-shortcuts",
      title: "With Shortcuts",
      description: "Command items with keyboard shortcuts.",
      code: jsxToString(<WithShortcutsExample />)},
    {
      id: "with-icons",
      title: "With Icons",
      description: "Command items with icons and actions.",
      code: jsxToString(<WithIconsExample />)},
    {
      id: "dialog-mode",
      title: "Dialog Mode",
      description: "Command palette as a modal dialog.",
      code: `const [open, setOpen] = useState(false);

// Listen for keyboard shortcut
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };

  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);

return (
  <>
    <Button
      variant="outline"
      onClick={() => setOpen(true)}
    >
      Open Command Palette
      <CommandShortcut className="ml-2">⌘K</CommandShortcut>
    </Button>

    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => {
            setOpen(false);
            // Handle new file action
          }}>
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => {
            setOpen(false);
            // Handle open action
          }}>
            Open File
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem>Preferences</CommandItem>
          <CommandItem>Extensions</CommandItem>
          <CommandItem>About</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </>
);`},
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants of the command palette.",
      code: jsxToString(<SizesExample />)}
  ]
};
