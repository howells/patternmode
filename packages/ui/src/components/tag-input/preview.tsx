"use client";

import React from "react";
import { TagInput } from "./component";

export type TagInputPreviewProps = {
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
	 * Minimum number of tags required.
	 * Shows validation when fewer tags are selected.
	 */
	minTags?: number;
	/**
	 * Whether to show tag descriptions.
	 * Displays additional information for predefined tags.
	 */
	showDescriptions?: boolean;
	/**
	 * Placeholder text when no tags are selected.
	 * Shown when the input is empty.
	 */
	placeholder?: string;
	/**
	 * Placeholder text when tags are already selected.
	 * Shown when there are existing tags.
	 */
	selectedPlaceholder?: string;
	/**
	 * Message shown when no options match search.
	 * Displayed in dropdown when search yields no results.
	 */
	emptyMessage?: string;
	/**
	 * Whether the input is disabled.
	 * Prevents all interaction when true.
	 */
	disabled?: boolean;
	/**
	 * Whether tags should wrap to new lines.
	 * Controls horizontal scrolling vs wrapping behavior.
	 */
	wrap?: boolean;
	/**
	 * Maximum height for dropdown in pixels.
	 * Controls how tall the options list can be.
	 */
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
				options={options}
				value={tags}
				onValueChange={setTags}
				placeholder={placeholder || europeanCities.placeholder}
				selectedPlaceholder={selectedPlaceholder}
				emptyMessage={emptyMessage}
				allowCreate={allowCreate}
				maxTags={maxTags}
				disabled={disabled}
				wrap={wrap}
				maxHeight={maxHeight}
				onCreate={(value) => ({
					value: value.toLowerCase().replace(/\s+/g, "-"),
					label: value,
				})}
			/>
		</div>
	);
}

// Prop explorer configuration
export const tagInputPreviewProps = [
	{
		name: "allowCreate",
		type: "boolean",
		description:
			"Whether users can create custom tags that don't exist in the predefined options.",
		defaultValue: true,
	},
	{
		name: "maxTags",
		type: "number",
		description:
			"Maximum number of tags that can be selected - input becomes disabled when reached.",
		defaultValue: 5,
		min: 1,
		max: 20,
	},
	{
		name: "minTags",
		type: "number",
		description:
			"Minimum number of tags required - shows validation message when not met.",
		defaultValue: 0,
		min: 0,
		max: 10,
	},
	{
		name: "showDescriptions",
		type: "boolean",
		description:
			"Whether to show descriptions alongside tag labels in the dropdown options.",
		defaultValue: false,
	},
	{
		name: "placeholder",
		type: "string",
		description: "Custom placeholder text shown when no tags are selected.",
		defaultValue: "",
	},
	{
		name: "selectedPlaceholder",
		type: "string",
		description:
			"Custom placeholder text shown when tags are already selected.",
		defaultValue: "",
	},
	{
		name: "emptyMessage",
		type: "string",
		description: "Message displayed when search yields no matching options.",
		defaultValue: "No options found.",
	},
	{
		name: "disabled",
		type: "boolean",
		description: "Whether the entire input is disabled and non-interactive.",
		defaultValue: false,
	},
	{
		name: "wrap",
		type: "boolean",
		description:
			"Whether tags should wrap to new lines or scroll horizontally when space is limited.",
		defaultValue: true,
	},
	{
		name: "maxHeight",
		type: "number",
		description:
			"Maximum height of the dropdown menu in pixels - controls how many options are visible.",
		defaultValue: 200,
		min: 100,
		max: 500,
	},
];
