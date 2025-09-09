"use client";

import type { Size } from "@patternmode/config/sizes";
import { Heart, Star, Zap, Code, Globe, Palette } from "lucide-react";
import React from "react";
import { Combobox, ComboboxMulti } from "./component";
import type { ComboboxOption } from "./types";

export type ComboboxPreviewProps = {
  dataType?: "frameworks" | "languages" | "countries" | "colors";
  optionCount?: 5 | 8 | 12 | 20;
  showDescriptions?: boolean;
  showIcons?: boolean;
  size?: Size;
  defaultValue?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  hasError?: boolean;
  searchDebounce?: number;
  iconStrokeWidth?: number;
  clearSearchOnSelect?: boolean;
  multiSelect?: boolean;
  variant?: "single" | "multi";
};

const iconMap = {
  react: Code,
  vue: Code,
  angular: Code,
  svelte: Code,
  nextjs: Zap,
  nuxtjs: Zap,
  remix: Zap,
  sveltekit: Zap,
  javascript: Code,
  typescript: Code,
  python: Code,
  java: Code,
  cpp: Code,
  rust: Code,
  go: Code,
  swift: Code,
  us: Globe,
  uk: Globe,
  ca: Globe,
  au: Globe,
  de: Globe,
  fr: Globe,
  jp: Globe,
  br: Globe,
  red: Palette,
  blue: Palette,
  green: Palette,
  yellow: Palette,
  purple: Palette,
  orange: Palette,
  pink: Heart,
  cyan: Star,
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
  showIcons = true,
  size = "base",
  defaultValue,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  disabled = false,
  hasError = false,
  searchDebounce = 300,
  iconStrokeWidth = 1.5,
  clearSearchOnSelect = true,
  multiSelect = false,
  variant = "single",
}: ComboboxPreviewProps = {}) {
  const config = dataConfigs[dataType];
  const options: ComboboxOption[] = config.options.slice(
    0,
    optionCount
  ) as ComboboxOption[];

  // Single select state
  const [singleValue, setSingleValue] = React.useState<string>(defaultValue || "");
  
  // Multi select state
  const [multiValues, setMultiValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSingleValue(defaultValue || "");
  }, [defaultValue]);

  const getItemLabel = React.useCallback((opt: ComboboxOption) => {
    const d = (opt as Record<string, unknown>).description;
    return showDescriptions && typeof d === "string"
      ? `${opt.label} — ${d}`
      : opt.label;
  }, [showDescriptions]);

  const getItemIcon = React.useCallback((opt: ComboboxOption) => {
    if (!showIcons) return undefined;
    const IconComponent = iconMap[opt.value as keyof typeof iconMap];
    return IconComponent ? React.createElement(IconComponent, { 
      className: "size-4",
      strokeWidth: iconStrokeWidth 
    }) : undefined;
  }, [showIcons, iconStrokeWidth]);

  const effectiveVariant = multiSelect ? "multi" : variant;

  return (
    <div className="p-6">
      {effectiveVariant === "multi" ? (
        <ComboboxMulti
          options={options}
          values={multiValues}
          onValuesChange={setMultiValues}
          placeholder={placeholder || config.placeholder}
          searchPlaceholder={searchPlaceholder || config.searchPlaceholder}
          emptyMessage={emptyMessage}
          disabled={disabled}
          hasError={hasError}
          size={size}
          searchDebounce={searchDebounce}
          iconStrokeWidth={iconStrokeWidth}
          getItemLabel={getItemLabel}
          getItemIcon={getItemIcon}
        />
      ) : (
        <Combobox
          options={options}
          value={singleValue}
          onValueChange={(v) => setSingleValue(v ?? "")}
          placeholder={placeholder || config.placeholder}
          searchPlaceholder={searchPlaceholder || config.searchPlaceholder}
          emptyMessage={emptyMessage}
          disabled={disabled}
          hasError={hasError}
          size={size}
          searchDebounce={searchDebounce}
          iconStrokeWidth={iconStrokeWidth}
          clearSearchOnSelect={clearSearchOnSelect}
          getItemLabel={getItemLabel}
          getItemIcon={getItemIcon}
        />
      )}

      {/* Debug Info */}
      <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm dark:bg-zinc-900">
        <div className="font-medium text-zinc-700 dark:text-zinc-300">
          Current Selection:
        </div>
        <div className="text-zinc-600 dark:text-zinc-400">
          {effectiveVariant === "multi" 
            ? `[${multiValues.join(", ")}] (${multiValues.length} selected)`
            : singleValue || "(none)"
          }
        </div>
      </div>
    </div>
  );
}

export const comboboxPreviewProps = [
  {
    name: "variant",
    type: "select",
    options: ["single", "multi"],
    defaultValue: "single",
    description: "Choose between single or multi-select mode",
  },
  {
    name: "dataType",
    type: "select",
    options: ["frameworks", "languages", "countries", "colors"],
    defaultValue: "frameworks",
    description: "Sample data to display in the combobox",
  },
  {
    name: "optionCount",
    type: "select",
    options: [5, 8, 12, 20],
    defaultValue: 8,
    description: "Number of options to show",
  },
  {
    name: "size",
    type: "select",
    options: ["2xs", "xs", "sm", "base", "lg"],
    defaultValue: "base",
    description: "Size variant of the combobox",
  },
  {
    name: "showDescriptions",
    type: "boolean",
    defaultValue: true,
    description: "Show option descriptions in the dropdown",
  },
  {
    name: "showIcons",
    type: "boolean",
    defaultValue: true,
    description: "Show icons next to options",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: false,
    description: "Disable the combobox",
  },
  {
    name: "hasError",
    type: "boolean",
    defaultValue: false,
    description: "Show error state styling",
  },
  {
    name: "clearSearchOnSelect",
    type: "boolean",
    defaultValue: true,
    description: "Clear search input after selection (single select only)",
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: "",
    description: "Custom placeholder text (leave empty for default)",
  },
  {
    name: "searchPlaceholder",
    type: "string",
    defaultValue: "",
    description: "Custom search placeholder text (leave empty for default)",
  },
  {
    name: "emptyMessage",
    type: "string",
    defaultValue: "",
    description: "Custom empty state message (leave empty for default)",
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "",
    description: "Default selected value (single select only)",
  },
  {
    name: "searchDebounce",
    type: "number",
    min: 0,
    max: 1000,
    step: 50,
    defaultValue: 300,
    description: "Search input debounce delay in milliseconds",
  },
  {
    name: "iconStrokeWidth",
    type: "number",
    min: 1,
    max: 3,
    step: 0.1,
    defaultValue: 1.5,
    description: "Icon stroke width",
  },
  {
    name: "multiSelect",
    type: "boolean",
    defaultValue: false,
    description: "Enable multi-select mode (overrides variant)",
  },
];