"use client";

import React from "react";
import { TagInput } from "./component";

export type TagInputPreviewProps = {
  /**
   * Data type for the tag options.
   * Controls what kind of predefined tags are available.
   */
  dataType?: "technologies" | "skills" | "categories" | "colors";
  /**
   * Whether to allow creating new tags.
   * Enables users to add custom tags not in the predefined list.
   */
  allowCreate?: boolean;
  /**
   * Maximum number of tags allowed.
   * Limits how many tags can be selected.
   */
  maxTags?: number;
  /**
   * Whether to show tag descriptions.
   * Displays additional information for predefined tags.
   */
  showDescriptions?: boolean;
  /**
   * Default selected tags.
   * Pre-selects tags when the component loads.
   */
  defaultTags?: string[];
  /**
   * Preview layout style.
   * Controls how the tag input examples are displayed.
   */
  layout?: "simple" | "detailed" | "compact";
};

const dataConfigs = {
  technologies: {
    placeholder: "Select technologies...",
    options: [
      { value: "react", label: "React", description: "JavaScript library for building UIs" },
      { value: "typescript", label: "TypeScript", description: "JavaScript with static typing" },
      { value: "javascript", label: "JavaScript", description: "Programming language for web" },
      { value: "nextjs", label: "Next.js", description: "React framework for production" },
      { value: "tailwind", label: "Tailwind CSS", description: "Utility-first CSS framework" },
      { value: "nodejs", label: "Node.js", description: "JavaScript runtime environment" },
      { value: "python", label: "Python", description: "High-level programming language" },
      { value: "vue", label: "Vue.js", description: "Progressive JavaScript framework" },
    ],
  },
  skills: {
    placeholder: "Add your skills...",
    options: [
      { value: "leadership", label: "Leadership", description: "Team management and guidance" },
      { value: "communication", label: "Communication", description: "Effective verbal and written skills" },
      { value: "problem-solving", label: "Problem Solving", description: "Analytical thinking and resolution" },
      { value: "creativity", label: "Creativity", description: "Innovative thinking and design" },
      { value: "teamwork", label: "Teamwork", description: "Collaborative working approach" },
      { value: "time-management", label: "Time Management", description: "Efficient task prioritization" },
      { value: "adaptability", label: "Adaptability", description: "Flexibility in changing environments" },
      { value: "critical-thinking", label: "Critical Thinking", description: "Objective analysis and evaluation" },
    ],
  },
  categories: {
    placeholder: "Select categories...",
    options: [
      { value: "frontend", label: "Frontend", description: "User interface development" },
      { value: "backend", label: "Backend", description: "Server-side development" },
      { value: "mobile", label: "Mobile", description: "Mobile app development" },
      { value: "design", label: "Design", description: "User experience and interface design" },
      { value: "devops", label: "DevOps", description: "Development operations and deployment" },
      { value: "data", label: "Data Science", description: "Data analysis and machine learning" },
      { value: "security", label: "Security", description: "Cybersecurity and data protection" },
      { value: "testing", label: "Testing", description: "Quality assurance and testing" },
    ],
  },
  colors: {
    placeholder: "Choose colors...",
    options: [
      { value: "red", label: "Red", description: "Warm, energetic color" },
      { value: "blue", label: "Blue", description: "Cool, calming color" },
      { value: "green", label: "Green", description: "Natural, growth color" },
      { value: "yellow", label: "Yellow", description: "Bright, optimistic color" },
      { value: "purple", label: "Purple", description: "Creative, mysterious color" },
      { value: "orange", label: "Orange", description: "Vibrant, friendly color" },
      { value: "pink", label: "Pink", description: "Soft, romantic color" },
      { value: "gray", label: "Gray", description: "Neutral, balanced color" },
    ],
  },
};

export function TagInputExample({
  dataType = "technologies",
  allowCreate = false,
  maxTags,
  showDescriptions = false,
  defaultTags = [],
  layout = "detailed",
}: TagInputPreviewProps = {}) {
  const config = dataConfigs[dataType];
  const [tags, setTags] = React.useState<string[]>(defaultTags);
  const [basicTags, setBasicTags] = React.useState<string[]>([]);
  const [preselectedTags, setPreselectedTags] = React.useState<string[]>(["react", "typescript"]);
  const [createTags, setCreateTags] = React.useState<string[]>(["custom"]);

  const options = config.options.map(option => ({
    ...option,
    label: showDescriptions ? `${option.label} - ${option.description}` : option.label,
  }));

  if (layout === "compact") {
    return (
      <div className="p-4">
        <TagInput
          options={options}
          value={tags}
          onValueChange={setTags}
          placeholder={config.placeholder}
          allowCreate={allowCreate}
          maxTags={maxTags}
        />
        {tags.length > 0 && (
          <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {tags.length} tag{tags.length !== 1 ? "s" : ""} selected
          </div>
        )}
      </div>
    );
  }

  if (layout === "simple") {
    return (
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
          </label>
          <TagInput
            options={options}
            value={tags}
            onValueChange={setTags}
            placeholder={config.placeholder}
            allowCreate={allowCreate}
            maxTags={maxTags}
          />
          {maxTags && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {tags.length}/{maxTags} tags selected
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Basic Usage */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Basic Tag Selection</h3>
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Choose {dataType}
          </label>
          <TagInput
            options={options}
            value={basicTags}
            onValueChange={setBasicTags}
            placeholder={config.placeholder}
          />
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {basicTags.length === 0 ? "No tags selected" : `${basicTags.length} tag${basicTags.length !== 1 ? "s" : ""} selected`}
          </div>
        </div>
      </section>

      {/* Pre-selected Tags */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">With Pre-selected Tags</h3>
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Add more {dataType}
          </label>
          <TagInput
            options={options}
            value={preselectedTags}
            onValueChange={setPreselectedTags}
            placeholder="Add more..."
            maxTags={maxTags || 5}
          />
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {preselectedTags.length}/{maxTags || 5} tags selected
          </div>
        </div>
      </section>

      {/* Custom Tags */}
      {allowCreate && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create Custom Tags</h3>
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Type to create new tags
            </label>
            <TagInput
              options={options}
              value={createTags}
              onValueChange={setCreateTags}
              placeholder="Type to create custom tags..."
              allowCreate={true}
            />
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Custom tags can be created by typing and pressing Enter
            </div>
          </div>
        </section>
      )}

      {/* Configuration Summary */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Data Type</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">{dataType}</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Allow Create</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{allowCreate ? "Yes" : "No"}</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Max Tags</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{maxTags || "Unlimited"}</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Available Options</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{options.length} options</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Show Descriptions</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{showDescriptions ? "Yes" : "No"}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Preview props for prop explorer
export const TagInputPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Tag input style variant - controls the visual appearance of the input and tags.",
    options: ["default", "outline", "filled"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Tag input size variant - affects padding and text size of the input and tags.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "maxTags",
    type: "select",
    description: "Maximum number of tags allowed - controls the limit of tags that can be added.",
    options: [3, 5, 8, 10],
    defaultValue: 5,
  },
  {
    name: "showSuggestions",
    type: "boolean",
    description: "Whether to show tag suggestions - displays autocomplete suggestions when enabled.",
    defaultValue: true,
  },
  {
    name: "allowDuplicates",
    type: "boolean",
    description: "Whether to allow duplicate tags - permits adding the same tag multiple times when enabled.",
    defaultValue: false,
  },
];
