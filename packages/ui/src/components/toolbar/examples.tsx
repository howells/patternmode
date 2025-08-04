"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Clipboard,
  Copy,
  Download,
  Home,
  Italic,
  Redo,
  Save,
  Scissors,
  Search,
  Settings,
  Share,
  Underline,
  Undo,
  Upload,
  User,
} from "lucide-react";
import React from "react";

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "./component";

export function DefaultExample() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton aria-label="Cut">
          <Scissors className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Copy">
          <Copy className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Paste">
          <Clipboard className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Undo">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Redo">
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

export function TextFormattingExample() {
  const [formatting, setFormatting] = React.useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [alignment, setAlignment] = React.useState("left");

  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton
          aria-label="Bold"
          data-pressed={formatting.bold}
          onClick={() =>
            setFormatting(prev => ({ ...prev, bold: !prev.bold }))}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Italic"
          data-pressed={formatting.italic}
          onClick={() =>
            setFormatting(prev => ({ ...prev, italic: !prev.italic }))}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Underline"
          data-pressed={formatting.underline}
          onClick={() =>
            setFormatting(prev => ({ ...prev, underline: !prev.underline }))}
        >
          <Underline className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarButton
          aria-label="Align Left"
          data-pressed={alignment === "left"}
          onClick={() => setAlignment("left")}
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Align Center"
          data-pressed={alignment === "center"}
          onClick={() => setAlignment("center")}
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Align Right"
          data-pressed={alignment === "right"}
          onClick={() => setAlignment("right")}
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

export function WithInputExample() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton aria-label="Save">
          <Save className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Download">
          <Download className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Upload">
          <Upload className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarInput
          placeholder="Search..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <ToolbarButton aria-label="Search">
          <Search className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarLink href="/help">Help</ToolbarLink>
        <ToolbarLink href="/settings">Settings</ToolbarLink>
      </ToolbarGroup>
    </Toolbar>
  );
}

export function VariantsExample() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <Toolbar variant="default">
          <ToolbarButton aria-label="Save">
            <Save className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Share">
            <Share className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Settings">
            <Settings className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Outline
        </h4>
        <Toolbar variant="outline">
          <ToolbarButton aria-label="Save">
            <Save className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Share">
            <Share className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Settings">
            <Settings className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Ghost
        </h4>
        <Toolbar variant="ghost">
          <ToolbarButton aria-label="Save">
            <Save className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Share">
            <Share className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Settings">
            <Settings className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </div>
    </div>
  );
}

export function SizesExample() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Small
        </h4>
        <Toolbar size="sm">
          <ToolbarButton aria-label="Home">
            <Home className="h-3 w-3" />
          </ToolbarButton>
          <ToolbarButton aria-label="Settings">
            <Settings className="h-3 w-3" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="User">
            <User className="h-3 w-3" />
          </ToolbarButton>
        </Toolbar>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <Toolbar size="default">
          <ToolbarButton aria-label="Home">
            <Home className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Settings">
            <Settings className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="User">
            <User className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Large
        </h4>
        <Toolbar size="lg">
          <ToolbarButton aria-label="Home">
            <Home className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarButton aria-label="Settings">
            <Settings className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="User">
            <User className="h-5 w-5" />
          </ToolbarButton>
        </Toolbar>
      </div>
    </div>
  );
}

export function VerticalExample() {
  return (
    <div className="flex justify-center">
      <Toolbar orientation="vertical" className="w-12">
        <ToolbarButton aria-label="Home">
          <Home className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Settings">
          <Settings className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarSeparator orientation="vertical" />
        <ToolbarButton aria-label="User">
          <User className="h-4 w-4" />
        </ToolbarButton>
      </Toolbar>
    </div>
  );
}

export function DisabledExample() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton aria-label="Save">
          <Save className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Undo" disabled>
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Redo" disabled>
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarInput placeholder="Search..." disabled />
        <ToolbarButton aria-label="Search" disabled>
          <Search className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
