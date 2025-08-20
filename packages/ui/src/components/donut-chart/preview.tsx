"use client";

import { DonutChart } from "./component";

const previewData = [
	{ name: "Chrome", value: 61 },
	{ name: "Safari", value: 25 },
	{ name: "Firefox", value: 8 },
	{ name: "Other", value: 6 },
];

export type DonutChartPreviewProps = {
	/**
	 * Whether to display legend.
	 * Shows category names with color indicators.
	 */
	showLegend?: boolean;
	/**
	 * Whether to show labels on segments.
	 * Displays values directly on the chart segments.
	 */
	showLabel?: boolean;
	/**
	 * Whether to show tooltip on hover.
	 * Provides detailed information on segment interaction.
	 */
	showTooltip?: boolean;
	/**
	 * Color scheme for chart segments.
	 * Colors are applied to segments in order.
	 */
	colors?: Array<
		| "blue"
		| "emerald"
		| "violet"
		| "amber"
		| "gray"
		| "cyan"
		| "pink"
		| "lime"
		| "fuchsia"
	>;
	/**
	 * Display variant of the donut chart.
	 * Controls the visual style and information display.
	 */
	variant?: "donut" | "pie";
};

export function DonutChartPreview({
	showLegend: _showLegend = true,
	showLabel = false,
	showTooltip = true,
	colors = ["blue", "emerald", "pink", "amber"],
	variant = "donut",
}: DonutChartPreviewProps = {}) {
	return (
		<div className="p-8 w-full max-w-lg">
			<DonutChart
				data={previewData}
				category="name"
				value="value"
				valueFormatter={(value) => `${value}%`}
				colors={colors}
				showLabel={showLabel}
				showTooltip={showTooltip}
				variant={variant}
			/>
		</div>
	);
}

// Preview props for prop explorer
export const donutChartPreviewProps = [
	{
		name: "showLegend",
		type: "boolean",
		description:
			"Whether to display legend - shows category names with color indicators.",
		defaultValue: true,
	},
	{
		name: "showLabel",
		type: "boolean",
		description:
			"Whether to show labels on segments - displays values directly on the chart segments.",
		defaultValue: false,
	},
	{
		name: "showTooltip",
		type: "boolean",
		description:
			"Whether to show tooltip on hover - provides detailed information on segment interaction.",
		defaultValue: true,
	},
	{
		name: "colors",
		type: "select",
		description:
			"Color scheme for chart segments - colors are applied to segments in order.",
		options: [
			{ label: "Multi-color", value: ["blue", "emerald", "pink", "orange"] },
			{ label: "Blue tones", value: ["blue", "indigo", "pink", "emerald"] },
			{ label: "Warm tones", value: ["orange", "pink", "emerald", "blue"] },
		],
		defaultValue: ["blue", "emerald", "pink", "orange"],
	},
	{
		name: "variant",
		type: "select",
		description:
			"Display variant of the donut chart - controls the visual style and information display.",
		options: ["default", "pie"],
		defaultValue: "default",
	},
];
