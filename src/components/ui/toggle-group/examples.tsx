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
import { Icon, useIconSize } from "../icon";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

export function DefaultExample() {
  const [alignment, setAlignment] = React.useState<string[]>(["left"]);

  return (
    <ToggleGroup value={alignment} onValueChange={setAlignment}>
      <ToggleGroupItem value="left">
        <Icon icon={AlignLeft} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <Icon icon={AlignCenter} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <Icon icon={AlignRight} />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify">
        <Icon icon={AlignJustify} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function MultipleSelectionExample() {
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);

  return (
    <ToggleGroup value={formatting} onValueChange={setFormatting}>
      <ToggleGroupItem value="bold">
        <Icon icon={Bold} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Icon icon={Italic} />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Icon icon={Underline} />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough">
        <Icon icon={Strikethrough} />
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
          <Icon icon={List} />
          <span>List</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <div className="flex items-center gap-2">
          <Icon icon={Grid3X3} />
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
        <ToggleGroup
          variant="default"
          value={defaultValue}
          onValueChange={setDefaultValue}
        >
          <ToggleGroupItem value="chart1">
            <Icon icon={BarChart3} />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart2">
            <Icon icon={PieChart} />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart3">
            <Icon icon={LineChart} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Outline
        </h4>
        <ToggleGroup
          variant="outline"
          value={outlineValue}
          onValueChange={setOutlineValue}
        >
          <ToggleGroupItem value="chart1">
            <Icon icon={BarChart3} />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart2">
            <Icon icon={PieChart} />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart3">
            <Icon icon={LineChart} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Ghost
        </h4>
        <ToggleGroup
          variant="ghost"
          value={ghostValue}
          onValueChange={setGhostValue}
        >
          <ToggleGroupItem value="chart1">
            <Icon icon={BarChart3} />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart2">
            <Icon icon={PieChart} />
          </ToggleGroupItem>
          <ToggleGroupItem value="chart3">
            <Icon icon={LineChart} />
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
            <Icon icon={Calendar} size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <Icon icon={CalendarDays} size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <Icon icon={CalendarRange} size="sm" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <ToggleGroup
          size="default"
          value={defaultValue}
          onValueChange={setDefaultValue}
        >
          <ToggleGroupItem value="day">
            <Icon icon={Calendar} />
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <Icon icon={CalendarDays} />
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <Icon icon={CalendarRange} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Large
        </h4>
        <ToggleGroup size="lg" value={largeValue} onValueChange={setLargeValue}>
          <ToggleGroupItem value="day">
            <Icon icon={Calendar} size="lg" />
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <Icon icon={CalendarDays} size="lg" />
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <Icon icon={CalendarRange} size="lg" />
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
          <Icon icon={Sun} />
          <span>Light</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark">
        <div className="flex items-center gap-2">
          <Icon icon={Moon} />
          <span>Dark</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem value="system">
        <div className="flex items-center gap-2">
          <Icon icon={Monitor} />
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
        onClick={() => setValue([])}
        className="text-sm px-3 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded transition-colors"
      >
        Clear Selection
      </button>
    </div>
  );
}

export function ButtonStyleExample() {
  const [view, setView] = React.useState<string[]>(["card"]);
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Button Default Style
        </h4>
        <ToggleGroup
          variant="button-default"
          size="button-default"
          value={view}
          onValueChange={setView}
        >
          <ToggleGroupItem value="list">
            <div className="flex items-center gap-2">
              <Icon icon={List} />
              <span>List View</span>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem value="card">
            <div className="flex items-center gap-2">
              <Icon icon={Grid3X3} />
              <span>Card View</span>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem value="table">
            <div className="flex items-center gap-2">
              <Icon icon={BarChart3} />
              <span>Table View</span>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Button Secondary Style
        </h4>
        <ToggleGroup
          variant="button-secondary"
          size="button-default"
          value={view}
          onValueChange={setView}
        >
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="card">Card</ToggleGroupItem>
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Button Outline Style
        </h4>
        <ToggleGroup
          variant="button-outline"
          size="button-default"
          value={formatting}
          onValueChange={setFormatting}
        >
          <ToggleGroupItem value="bold">
            <div className="flex items-center gap-2">
              <Icon icon={Bold} />
              <span>Bold</span>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <div className="flex items-center gap-2">
              <Icon icon={Italic} />
              <span>Italic</span>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <div className="flex items-center gap-2">
              <Icon icon={Underline} />
              <span>Underline</span>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Button Ghost Style
        </h4>
        <ToggleGroup
          variant="button-ghost"
          size="button-sm"
          value={view}
          onValueChange={setView}
        >
          <ToggleGroupItem value="list">
            <div className="flex items-center gap-1.5">
              <Icon icon={List} size="sm" />
              <span>List</span>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem value="card">
            <div className="flex items-center gap-1.5">
              <Icon icon={Grid3X3} size="sm" />
              <span>Card</span>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Button Destructive Style
        </h4>
        <ToggleGroup
          variant="button-destructive"
          size="button-lg"
          value={view}
          onValueChange={setView}
        >
          <ToggleGroupItem value="delete">Delete Mode</ToggleGroupItem>
          <ToggleGroupItem value="archive">Archive Mode</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
