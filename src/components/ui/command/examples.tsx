"use client";

import React, { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandShortcut,
  CommandDialog
} from "@patternmode/ui";
import { Button } from "../button/button";
import { File, Folder, Save, Search, Command as CommandIcon } from "lucide-react";

// Default command palette
export const DefaultExample = () => (
  <Command className="rounded-lg border shadow-md max-w-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>New File</CommandItem>
        <CommandItem>Open File</CommandItem>
        <CommandItem>Save File</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>Preferences</CommandItem>
        <CommandItem>Keyboard Shortcuts</CommandItem>
        <CommandItem>Extensions</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

// With shortcuts
export const WithShortcutsExample = () => (
  <Command className="rounded-lg border shadow-md max-w-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="File">
        <CommandItem>
          New File
          <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Open File
          <CommandShortcut>⌘O</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Save File
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Edit">
        <CommandItem>
          Copy
          <CommandShortcut>⌘C</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Paste
          <CommandShortcut>⌘V</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Find
          <CommandShortcut>⌘F</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

// With icons
export const WithIconsExample = () => (
  <Command className="rounded-lg border shadow-md max-w-md">
    <CommandInput placeholder="Search commands..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Actions">
        <CommandItem>
          <File className="mr-2 h-4 w-4" />
          New Document
        </CommandItem>
        <CommandItem>
          <Folder className="mr-2 h-4 w-4" />
          Open Folder
        </CommandItem>
        <CommandItem>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Navigation">
        <CommandItem>
          <Search className="mr-2 h-4 w-4" />
          Go to File
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CommandIcon className="mr-2 h-4 w-4" />
          Command Palette
          <CommandShortcut>⌘K</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

// Dialog mode
export const DialogModeExample = () => {
  const [open, setOpen] = useState(false);

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
  );
};

// Different sizes
export const SizesExample = () => (
  <div className="space-y-4">
    <Command className="rounded-lg border shadow-md max-w-sm" size="sm">
      <CommandInput placeholder="Small command..." />
      <CommandList>
        <CommandItem>Small Item 1</CommandItem>
        <CommandItem>Small Item 2</CommandItem>
      </CommandList>
    </Command>

    <Command className="rounded-lg border shadow-md max-w-md" size="default">
      <CommandInput placeholder="Default command..." />
      <CommandList>
        <CommandItem>Default Item 1</CommandItem>
        <CommandItem>Default Item 2</CommandItem>
      </CommandList>
    </Command>

    <Command className="rounded-lg border shadow-md max-w-lg" size="lg">
      <CommandInput placeholder="Large command..." />
      <CommandList>
        <CommandItem>Large Item 1</CommandItem>
        <CommandItem>Large Item 2</CommandItem>
      </CommandList>
    </Command>
  </div>
);