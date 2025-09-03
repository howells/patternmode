"use client";

import type { Size } from "@patternmode/config/sizes";
import React from "react";
import { Combobox } from "./component";
import type { ComboboxOption } from "./types";

export type ComboboxPreviewProps = {
  dataType?: "frameworks" | "languages" | "countries" | "colors";
  optionCount?: 5 | 8 | 12 | 20;
  showDescriptions?: boolean;
  size?: Size;
  defaultValue?: string;
};

const dataConfigs = {
  frameworks: {
    placeholder: "Select framework...",
    searchPlaceholder: "Search frameworks...",
    options: [
      {
        id: "1",
        label: "React",
        value: "react",
        description: "A JavaScript library for building user interfaces",
      },
      {
        id: "2",
        label: "Vue.js",
        value: "vue",
        description: "The Progressive JavaScript Framework",
      },
      {
        id: "3",
        label: "Angular",
        value: "angular",
        description:
          "Platform for building mobile and desktop web applications",
      },
      {
        id: "4",
        label: "Svelte",
        value: "svelte",
        description: "Cybernetically enhanced web apps",
      },
      {
        id: "5",
        label: "Next.js",
        value: "nextjs",
        description: "The React Framework for Production",
      },
      {
        id: "6",
        label: "Nuxt.js",
        value: "nuxtjs",
        description: "The Intuitive Vue Framework",
      },
      {
        id: "7",
        label: "Remix",
        value: "remix",
        description: "Full stack web framework focused on web standards",
      },
      {
        id: "8",
        label: "SvelteKit",
        value: "sveltekit",
        description: "The fastest way to build svelte apps",
      },
    ],
  },
  languages: {
    placeholder: "Select language...",
    searchPlaceholder: "Search languages...",
    options: [
      {
        id: "1",
        label: "JavaScript",
        value: "javascript",
        description: "High-level programming language",
      },
      {
        id: "2",
        label: "TypeScript",
        value: "typescript",
        description: "JavaScript with syntax for types",
      },
      {
        id: "3",
        label: "Python",
        value: "python",
        description: "High-level general-purpose programming language",
      },
      {
        id: "4",
        label: "Java",
        value: "java",
        description: "Object-oriented programming language",
      },
      {
        id: "5",
        label: "C++",
        value: "cpp",
        description: "General-purpose programming language",
      },
      {
        id: "6",
        label: "Rust",
        value: "rust",
        description: "Systems programming language",
      },
      {
        id: "7",
        label: "Go",
        value: "go",
        description: "Open source programming language",
      },
      {
        id: "8",
        label: "Swift",
        value: "swift",
        description: "Programming language for iOS development",
      },
    ],
  },
  countries: {
    placeholder: "Select country...",
    searchPlaceholder: "Search countries...",
    options: [
      {
        id: "1",
        label: "United States",
        value: "us",
        description: "North America",
      },
      { id: "2", label: "United Kingdom", value: "uk", description: "Europe" },
      { id: "3", label: "Canada", value: "ca", description: "North America" },
      { id: "4", label: "Australia", value: "au", description: "Oceania" },
      { id: "5", label: "Germany", value: "de", description: "Europe" },
      { id: "6", label: "France", value: "fr", description: "Europe" },
      { id: "7", label: "Japan", value: "jp", description: "Asia" },
      { id: "8", label: "Brazil", value: "br", description: "South America" },
    ],
  },
  colors: {
    placeholder: "Select color...",
    searchPlaceholder: "Search colors...",
    options: [
      { id: "1", label: "Red", value: "red", description: "#FF0000" },
      { id: "2", label: "Blue", value: "blue", description: "#0000FF" },
      { id: "3", label: "Green", value: "green", description: "#00FF00" },
      { id: "4", label: "Yellow", value: "yellow", description: "#FFFF00" },
      { id: "5", label: "Purple", value: "purple", description: "#800080" },
      { id: "6", label: "Orange", value: "orange", description: "#FFA500" },
      { id: "7", label: "Pink", value: "pink", description: "#FFC0CB" },
      { id: "8", label: "Cyan", value: "cyan", description: "#00FFFF" },
    ],
  },
} satisfies Record<
  "frameworks" | "languages" | "countries" | "colors",
  {
    placeholder: string;
    searchPlaceholder: string;
    options: readonly ComboboxOption[];
  }
>;

export function ComboboxPreview({
  dataType = "frameworks",
  optionCount = 8,
  showDescriptions = true,
  size = "base",
  defaultValue,
}: ComboboxPreviewProps = {}) {
  const config = dataConfigs[dataType];
  const options: ComboboxOption[] = config.options.slice(
    0,
    optionCount
  ) as ComboboxOption[];
  const [value, setValue] = React.useState<string>(defaultValue || "");
  React.useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);
  return (
    <div className="p-6">
      <Combobox
        getItemLabel={(opt) => {
          const d = (opt as Record<string, unknown>).description;
          return showDescriptions && typeof d === "string"
            ? `${opt.label} — ${d}`
            : opt.label;
        }}
        onValueChange={(v) => setValue(v ?? "")}
        options={options}
        placeholder={config.placeholder}
        searchPlaceholder={config.searchPlaceholder}
        size={size}
        value={value}
      />
    </div>
  );
}

export const comboboxPreviewProps = [
  {
    name: "dataType",
    type: "select",
    options: ["frameworks", "languages", "countries", "colors"],
    defaultValue: "frameworks",
  },
  {
    name: "optionCount",
    type: "select",
    options: [5, 8, 12, 20],
    defaultValue: 8,
  },
  { name: "showDescriptions", type: "boolean", defaultValue: true },
  {
    name: "size",
    type: "select",
    options: ["2xs", "xs", "sm", "base", "lg"],
    defaultValue: "base",
  },
  { name: "defaultValue", type: "string", defaultValue: "" },
];
