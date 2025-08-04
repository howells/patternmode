"use client";

import React from "react";
import { Combobox } from "./component";

export type ComboboxPreviewProps = {
  /**
   * Data type for the combobox options.
   * Controls what kind of data is displayed in the dropdown.
   */
  dataType?: "frameworks" | "languages" | "countries" | "colors";
  /**
   * Number of options to display.
   * Controls how many choices are available in the dropdown.
   */
  optionCount?: 5 | 8 | 12 | 20;
  /**
   * Whether to show option descriptions.
   * Displays additional information for each option.
   */
  showDescriptions?: boolean;
  /**
   * Combobox size variant.
   * Controls the overall size and padding of the input.
   */
  size?: "sm" | "base" | "lg";
  /**
   * Default selected value.
   * Pre-selects an option when the component loads.
   */
  defaultValue?: string;
};

const dataConfigs = {
  frameworks: {
    placeholder: "Select framework...",
    searchPlaceholder: "Search frameworks...",
    options: [
      { id: "1", label: "React", value: "react", description: "A JavaScript library for building user interfaces" },
      { id: "2", label: "Vue.js", value: "vue", description: "The Progressive JavaScript Framework" },
      { id: "3", label: "Angular", value: "angular", description: "Platform for building mobile and desktop web applications" },
      { id: "4", label: "Svelte", value: "svelte", description: "Cybernetically enhanced web apps" },
      { id: "5", label: "Next.js", value: "nextjs", description: "The React Framework for Production" },
      { id: "6", label: "Nuxt.js", value: "nuxtjs", description: "The Intuitive Vue Framework" },
      { id: "7", label: "Remix", value: "remix", description: "Full stack web framework focused on web standards" },
      { id: "8", label: "SvelteKit", value: "sveltekit", description: "The fastest way to build svelte apps" },
    ],
  },
  languages: {
    placeholder: "Select language...",
    searchPlaceholder: "Search languages...",
    options: [
      { id: "1", label: "JavaScript", value: "javascript", description: "High-level programming language" },
      { id: "2", label: "TypeScript", value: "typescript", description: "JavaScript with syntax for types" },
      { id: "3", label: "Python", value: "python", description: "High-level general-purpose programming language" },
      { id: "4", label: "Java", value: "java", description: "Object-oriented programming language" },
      { id: "5", label: "C++", value: "cpp", description: "General-purpose programming language" },
      { id: "6", label: "Rust", value: "rust", description: "Systems programming language" },
      { id: "7", label: "Go", value: "go", description: "Open source programming language" },
      { id: "8", label: "Swift", value: "swift", description: "Programming language for iOS development" },
    ],
  },
  countries: {
    placeholder: "Select country...",
    searchPlaceholder: "Search countries...",
    options: [
      { id: "1", label: "United States", value: "us", description: "North America" },
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
};

export function ComboboxExample({
  dataType = "frameworks",
  optionCount = 5,
  showDescriptions = false,
  size = "base",
  defaultValue,
}: ComboboxPreviewProps = {}) {
  const [value, setValue] = React.useState<string>(defaultValue || "");
  const config = dataConfigs[dataType];
  const displayedOptions = config.options.slice(0, optionCount);

  const sizeClass = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
  }[size];

  return (
    <div className="p-8 flex justify-center">
      <div className={sizeClass}>
        <Combobox
          options={displayedOptions.map(option => ({
            ...option,
            label: showDescriptions ? `${option.label} - ${option.description}` : option.label,
          }))}
          value={value}
          onValueChange={setValue}
          placeholder={config.placeholder}
          searchPlaceholder={config.searchPlaceholder}
          size={size}
        />
        {value && (
          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Selected: <span className="font-medium">{value}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Preview props for prop explorer
export const ComboboxPreviewProps = [
  {
    name: "dataType",
    type: "select",
    description: "Data type for the combobox options - controls what kind of data is displayed in the dropdown.",
    options: ["frameworks", "languages", "countries", "colors"],
    defaultValue: "frameworks",
  },
  {
    name: "optionCount",
    type: "select",
    description: "Number of options to display - controls how many choices are available in the dropdown.",
    options: [5, 8, 12, 20],
    defaultValue: 5,
  },
  {
    name: "showDescriptions",
    type: "boolean",
    description: "Whether to show option descriptions - displays additional information for each option.",
    defaultValue: false,
  },
  {
    name: "size",
    type: "select",
    description: "Combobox size variant - controls the overall size and padding of the input.",
    options: ["sm", "base", "lg"],
    defaultValue: "base",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "Default selected value - pre-selects an option when the component loads.",
    defaultValue: "",
  },
];

export default ComboboxExample;
