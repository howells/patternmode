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
    <ToggleGroup onValueChange={setAlignment} value={alignment}>
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
    <ToggleGroup onValueChange={setFormatting} value={formatting}>
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
    <ToggleGroup onValueChange={setView} value={view}>
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <ToggleGroup
          onValueChange={setDefaultValue}
          value={defaultValue}
          variant="default"
        >
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Outline
        </h4>
        <ToggleGroup
          onValueChange={setOutlineValue}
          value={outlineValue}
          variant="outline"
        >
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Ghost
        </h4>
        <ToggleGroup
          onValueChange={setGhostValue}
          value={ghostValue}
          variant="ghost"
        >
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Small
        </h4>
        <ToggleGroup onValueChange={setSmallValue} size="sm" value={smallValue}>
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <ToggleGroup
          onValueChange={setDefaultValue}
          size="base"
          value={defaultValue}
        >
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Large
        </h4>
        <ToggleGroup onValueChange={setLargeValue} size="lg" value={largeValue}>
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
    <ToggleGroup onValueChange={setTheme} orientation="vertical" value={theme}>
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
    <ToggleGroup defaultValue={["option1"]} disabled>
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
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          Selected: {value.length > 0 ? value.join(", ") : "None"}
        </p>
        <ToggleGroup onValueChange={setValue} value={value}>
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <button
        className="rounded bg-zinc-100 px-3 py-1 text-sm transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        onClick={() => setValue([])}
        type="button"
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
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Size: {size}
        </h4>
        <div className="flex items-center gap-3">
          <ToggleGroup
            onValueChange={setAlignment}
            size={size}
            value={alignment}
          >
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
            className={`rounded bg-blue-500 px-3 py-2 text-white transition-colors hover:bg-blue-600 ${
              size === "xs"
                ? "h-8 text-xs"
                : size === "sm"
                  ? "h-9 text-sm"
                  : size === "lg"
                    ? "h-12 text-base"
                    : "h-10 text-sm"
            }`}
            type="button"
          >
            Regular Button
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className={`rounded px-2 py-1 text-xs ${
            size === "xs"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 hover:bg-zinc-200"
          }`}
          onClick={() => setSize("xs")}
          type="button"
        >
          XS
        </button>
        <button
          className={`rounded px-2 py-1 text-xs ${
            size === "sm"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 hover:bg-zinc-200"
          }`}
          onClick={() => setSize("sm")}
          type="button"
        >
          SM
        </button>
        <button
          className={`rounded px-2 py-1 text-xs ${
            size === "base"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 hover:bg-zinc-200"
          }`}
          onClick={() => setSize("base")}
          type="button"
        >
          Base
        </button>
        <button
          className={`rounded px-2 py-1 text-xs ${
            size === "lg"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 hover:bg-zinc-200"
          }`}
          onClick={() => setSize("lg")}
          type="button"
        >
          LG
        </button>
      </div>
    </div>
  );
}
