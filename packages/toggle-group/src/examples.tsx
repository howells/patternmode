"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BarChart3,
  Bold,
  Calendar,
  CalendarDays,
  CalendarRange,
  Grid3X3,
  Italic,
  LineChart,
  List,
  Monitor,
  Moon,
  PieChart,
  Strikethrough,
  Sun,
  Underline,
} from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./component";

export function DefaultExample() {
  const [alignment, setAlignment] = React.useState<string[]>(["left"]);

  return (
    <ToggleGroup value={alignment} onValueChange={setAlignment}>
      <ToggleGroupItem value="left">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify">
        <AlignJustify className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function MultipleSelectionExample() {
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);

  return (
    <ToggleGroup value={formatting} onValueChange={setFormatting}>
      <ToggleGroupItem value="bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough">
        <Strikethrough className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function WithTextExample() {
  const [view, setView] = React.useState<string[]>(["list"]);

  return (
    <ToggleGroup value={view} onValueChange={setView}>
      <ToggleGroupItem value="list">
        <div className="flex items-center gap-2">
          <List className="size-4" />
          <span>List</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <div className="flex items-center gap-2">
          <Grid3X3 className="size-4" />
          <span>Grid</span>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function VariantsExample() {
  const [defaultValue, setDefaultValue] = React.useState<string[]>(["chart1"]);
  const [outlineValue, setOutlineValue] = React.useState<string[]>(["chart2"]);
  const [ghostValue, setGhostValue] = React.useState<string[]>(["chart3"]);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <ToggleGroup variant="default" value={defaultValue} onValueChange={setDefaultValue}>
          <ToggleGroupItem value="chart1">
          <BarChart3 className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart2">
            <PieChart className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart3">
            <LineChart className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Outline
        </h4>
        <ToggleGroup variant="outline" value={outlineValue} onValueChange={setOutlineValue}>
          <ToggleGroupItem value="chart1">
            <BarChart3 className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart2">
            <PieChart className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart3">
            <LineChart className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Ghost
        </h4>
        <ToggleGroup variant="ghost" value={ghostValue} onValueChange={setGhostValue}>
          <ToggleGroupItem value="chart1">
            <BarChart3 className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart2">
            <PieChart className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart3">
            <LineChart className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

export function SizesExample() {
  const [smallValue, setSmallValue] = React.useState<string[]>(["day"]);
  const [defaultValue, setDefaultValue] = React.useState<string[]>(["week"]);
  const [largeValue, setLargeValue] = React.useState<string[]>(["month"]);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Small
        </h4>
        <ToggleGroup size="sm" value={smallValue} onValueChange={setSmallValue}>
          <ToggleGroupItem value="day">
            <Calendar className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <CalendarDays className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <CalendarRange className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <ToggleGroup size="base" value={defaultValue} onValueChange={setDefaultValue}>
          <ToggleGroupItem value="day">
            <Calendar className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <CalendarDays className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <CalendarRange className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Large
        </h4>
        <ToggleGroup size="lg" value={largeValue} onValueChange={setLargeValue}>
          <ToggleGroupItem value="day">
            <Calendar className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <CalendarDays className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <CalendarRange className="size-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

export function VerticalExample() {
  const [theme, setTheme] = React.useState<string[]>(["light"]);

  return (
    <ToggleGroup orientation="vertical" value={theme} onValueChange={setTheme}>
      <ToggleGroupItem value="light">
        <div className="flex items-center gap-2">
          <Sun className="size-4" />
          <span>Light</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark">
        <div className="flex items-center gap-2">
          <Moon className="size-4" />
          <span>Dark</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem value="system">
        <div className="flex items-center gap-2">
          <Monitor className="size-4" />
          <span>System</span>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function DisabledExample() {
  return (
    <ToggleGroup disabled defaultValue={["option1"]}>
      <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
      <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
      <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ControlledExample() {
  const [value, setValue] = React.useState<string[]>(["option1"]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Selected: {value.length > 0 ? value.join(", ") : "None"}
        </p>
        <ToggleGroup value={value} onValueChange={setValue}>
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <button
        type="button"
        onClick={() => setValue([])}
        className="text-sm px-3 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded transition-colors"
      >
        Clear Selection
      </button>
    </div>
  );
}

export function ButtonAlignmentExample() {
  const [alignment, setAlignment] = React.useState<string[]>(["left"]);
  const [size, setSize] = React.useState<"xs" | "sm" | "base" | "lg">("base");

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Size: {size}
        </h4>
        <div className="flex items-center gap-3">
          <ToggleGroup size={size} value={alignment} onValueChange={setAlignment}>
            <ToggleGroupItem value="left">
            <AlignLeft className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
            <AlignCenter className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
            <AlignRight className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <button
            type="button"
            className={`px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
              size === "xs"
                ? "text-xs h-8"
                : size === "sm"
                ? "text-sm h-9"
                : size === "lg"
                ? "text-base h-12"
                : "text-sm h-10"
            }`}
          >
            Regular Button
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSize("xs")}
          className={`px-2 py-1 text-xs rounded ${
            size === "xs" ? "bg-blue-500 text-white" : "bg-zinc-100 hover:bg-zinc-200"
          }`}
        >
          XS
        </button>
        <button
          type="button"
          onClick={() => setSize("sm")}
          className={`px-2 py-1 text-xs rounded ${
            size === "sm" ? "bg-blue-500 text-white" : "bg-zinc-100 hover:bg-zinc-200"
          }`}
        >
          SM
        </button>
        <button
          type="button"
          onClick={() => setSize("base")}
          className={`px-2 py-1 text-xs rounded ${
            size === "base" ? "bg-blue-500 text-white" : "bg-zinc-100 hover:bg-zinc-200"
          }`}
        >
          Base
        </button>
        <button
          type="button"
          onClick={() => setSize("lg")}
          className={`px-2 py-1 text-xs rounded ${
            size === "lg" ? "bg-blue-500 text-white" : "bg-zinc-100 hover:bg-zinc-200"
          }`}
        >
          LG
        </button>
      </div>
    </div>
  );
}
