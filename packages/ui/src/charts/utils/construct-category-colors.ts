import type { AvailableChartColorsKeys } from "../constants/chart-colors";

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  return new Map(
    categories.map((category, index) => [
      category, 
      colors[index % colors.length]
    ])
  );
};