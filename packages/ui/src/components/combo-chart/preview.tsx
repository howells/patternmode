"use client";

import { ComboChart } from "@patternmode/ui";

interface ComboChartExampleProps {
  showXAxis?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  enableBiaxial?: boolean;
  enableLegendSlider?: boolean;
}

export function ComboChartExample({
  showXAxis = true,
  showLegend = true,
  showTooltip = true,
  showGridLines = true,
  enableBiaxial = false,
  enableLegendSlider = false,
}: ComboChartExampleProps) {
  const data = [
    { month: "Jan", sales: 4000, visitors: 2400 },
    { month: "Feb", sales: 3000, visitors: 1398 },
    { month: "Mar", sales: 2000, visitors: 9800 },
    { month: "Apr", sales: 2780, visitors: 3908 },
    { month: "May", sales: 1890, visitors: 4800 },
    { month: "Jun", sales: 2390, visitors: 3800 },
  ];

  return (
    <ComboChart
      data={data}
      index="month"
      showXAxis={showXAxis}
      showLegend={showLegend}
      showTooltip={showTooltip}
      showGridLines={showGridLines}
      enableBiaxial={enableBiaxial}
      enableLegendSlider={enableLegendSlider}
      barSeries={{
        categories: ["sales"],
        colors: ["blue"],
        valueFormatter: value => `$${value}`,
      }}
      lineSeries={{
        categories: ["visitors"],
        colors: ["emerald"],
        valueFormatter: value => `${value}`,
      }}
    />
  );
}
