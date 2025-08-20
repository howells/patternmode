import type {
	AvailableChartColorsKeys,
	ColorUtility,
} from "../constants/chart-colors";
import { chartColors } from "../constants/chart-colors";

export const getColorClassName = (
	color: AvailableChartColorsKeys,
	type: ColorUtility,
): string => {
	const fallbackColor = {
		bg: "bg-zinc-500",
		stroke: "stroke-zinc-500",
		fill: "fill-zinc-500",
		text: "text-zinc-500",
	};
	return chartColors[color]?.[type] ?? fallbackColor[type];
};
