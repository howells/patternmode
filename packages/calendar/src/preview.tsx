"use client";

import React from "react";
import { Calendar } from "./component";

export type CalendarPreviewProps = {
	/**
	 * Show year navigation buttons that allow jumping forward and backward by year.
	 * When enabled, additional year navigation buttons appear alongside month navigation.
	 */
	enableYearNavigation?: boolean;
	/**
	 * Whether to highlight today's date with special styling.
	 * When enabled, today's date will have a distinct background color.
	 */
	showToday?: boolean;
	/**
	 * Whether to show a "Go to Today" button below the calendar.
	 * When enabled, provides a quick way to navigate back to the current date.
	 */
	showTodayButton?: boolean;
	/**
	 * Selection mode for the calendar.
	 * Controls whether single dates, multiple dates, or date ranges can be selected.
	 */
	mode?: "single" | "multiple" | "range";
	/**
	 * Number of months to display at once.
	 * Shows multiple months side by side when greater than 1.
	 */
	numberOfMonths?: 1 | 2 | 3;
};

export function CalendarPreview({
	enableYearNavigation = false,
	showToday = true,
	showTodayButton = false,
	mode = "single",
	numberOfMonths = 1,
}: CalendarPreviewProps = {}) {
	const [selected, setSelected] = React.useState<
		Date | Date[] | { from: Date; to?: Date } | undefined
	>();

	const handleSelect = (
		value: Date | Date[] | { from: Date; to?: Date } | undefined,
	) => {
		setSelected(value);
	};

	return (
    mode === "single" ? (
      <Calendar
        mode="single"
        selected={selected as Date | undefined}
        onSelect={(v) => handleSelect(v)}
        enableYearNavigation={enableYearNavigation}
        showToday={showToday}
        showTodayButton={showTodayButton}
        numberOfMonths={numberOfMonths}
        className="rounded-md border"
      />
    ) : mode === "multiple" ? (
      <Calendar
        mode="multiple"
        selected={selected as Date[] | undefined}
        onSelect={(v) => handleSelect(v)}
        enableYearNavigation={enableYearNavigation}
        showToday={showToday}
        showTodayButton={showTodayButton}
        numberOfMonths={numberOfMonths}
        className="rounded-md border"
      />
    ) : (
      <Calendar
        mode="range"
        selected={selected as { from: Date; to?: Date } | undefined}
        onSelect={(v) => handleSelect(v as any)}
        required={false}
        enableYearNavigation={enableYearNavigation}
        showToday={showToday}
        showTodayButton={showTodayButton}
        numberOfMonths={numberOfMonths}
        className="rounded-md border"
      />
    )
	);
}

// Preview props for prop explorer
export const calendarPreviewProps = [
	{
		name: "enableYearNavigation",
		type: "boolean",
		description:
			"Show year navigation buttons that allow jumping forward and backward by year.",
		defaultValue: false,
	},
	{
		name: "showToday",
		type: "boolean",
		description: "Whether to highlight today's date with special styling.",
		defaultValue: true,
	},
	{
		name: "showTodayButton",
		type: "boolean",
		description: "Whether to show a 'Go to Today' button below the calendar.",
		defaultValue: false,
	},
	{
		name: "mode",
		type: "select",
		description:
			"Selection mode for the calendar - controls whether single dates, multiple dates, or date ranges can be selected.",
		options: ["single", "multiple", "range"],
		defaultValue: "single",
	},
	{
		name: "numberOfMonths",
		type: "select",
		description:
			"Number of months to display at once - shows multiple months side by side when greater than 1.",
		options: [1, 2, 3],
		defaultValue: 1,
	},
];
