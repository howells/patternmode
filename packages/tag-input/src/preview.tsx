"use client";

import React from "react";
import { TagInput } from "./component";

export type TagInputPreviewProps = {
  allowCreate?: boolean;
  maxTags?: number;
  minTags?: number;
  showDescriptions?: boolean;
  placeholder?: string;
  selectedPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  wrap?: boolean;
  maxHeight?: number;
};

const europeanCities = {
  placeholder: "Select European cities...",
  options: [
    {
      value: "paris",
      label: "Paris",
      description: "Capital of France, City of Light",
    },
    {
      value: "london",
      label: "London",
      description: "Capital of United Kingdom",
    },
    { value: "berlin", label: "Berlin", description: "Capital of Germany" },
    {
      value: "rome",
      label: "Rome",
      description: "Capital of Italy, Eternal City",
    },
    { value: "madrid", label: "Madrid", description: "Capital of Spain" },
    {
      value: "amsterdam",
      label: "Amsterdam",
      description: "Capital of Netherlands",
    },
    { value: "vienna", label: "Vienna", description: "Capital of Austria" },
    {
      value: "prague",
      label: "Prague",
      description: "Capital of Czech Republic",
    },
    {
      value: "barcelona",
      label: "Barcelona",
      description: "Catalonian city in Spain",
    },
    {
      value: "florence",
      label: "Florence",
      description: "Renaissance city in Italy",
    },
    { value: "budapest", label: "Budapest", description: "Capital of Hungary" },
    { value: "lisbon", label: "Lisbon", description: "Capital of Portugal" },
  ],
};

export function TagInputPreview({
  allowCreate = true,
  maxTags = 5,
  showDescriptions = false,
  placeholder,
  selectedPlaceholder,
  emptyMessage = "No options found.",
  disabled = false,
  wrap = true,
  maxHeight = 200,
}: TagInputPreviewProps = {}) {
  const [tags, setTags] = React.useState<string[]>(["paris", "london"]);

  const options = europeanCities.options.map((option) => ({
    ...option,
    label: showDescriptions
      ? `${option.label} - ${option.description}`
      : option.label,
  }));

  return (
    <div className="p-6">
      <TagInput
        allowCreate={allowCreate}
        disabled={disabled}
        emptyMessage={emptyMessage}
        maxHeight={maxHeight}
        maxTags={maxTags}
        onCreate={(value) => ({
          value: value.toLowerCase().replace(/\s+/g, "-"),
          label: value,
        })}
        onValueChange={setTags}
        options={options}
        placeholder={placeholder || europeanCities.placeholder}
        selectedPlaceholder={selectedPlaceholder}
        value={tags}
        wrap={wrap}
      />
    </div>
  );
}

export const tagInputPreviewProps = [
  {
    name: "allowCreate",
    type: "boolean",
    description: "Allow creating custom tags",
    defaultValue: true,
  },
  {
    name: "maxTags",
    type: "number",
    description: "Max selectable tags",
    defaultValue: 5,
    min: 1,
    max: 20,
  },
  {
    name: "minTags",
    type: "number",
    description: "Min required tags",
    defaultValue: 0,
    min: 0,
    max: 10,
  },
  {
    name: "showDescriptions",
    type: "boolean",
    description: "Show descriptions in labels",
    defaultValue: false,
  },
  {
    name: "placeholder",
    type: "string",
    description: "Empty input placeholder",
    defaultValue: "Select tags...",
  },
  {
    name: "selectedPlaceholder",
    type: "string",
    description: "Placeholder once some selected",
    defaultValue: "Add more tags...",
  },
  {
    name: "emptyMessage",
    type: "string",
    description: "No options message",
    defaultValue: "No options found.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Disable interaction",
    defaultValue: false,
  },
  {
    name: "wrap",
    type: "boolean",
    description: "Wrap selected tags",
    defaultValue: true,
  },
  {
    name: "maxHeight",
    type: "number",
    description: "Dropdown max height",
    defaultValue: 200,
    min: 120,
    max: 480,
  },
];
