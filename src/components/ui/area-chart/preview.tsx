import React from "react";
import { AreaChart } from "@patternmode/ui";

// Sample data for the area chart
const sampleData = [
  { date: "Jan 23", desktop: 167, mobile: 145, tablet: 87 },
  { date: "Feb 23", desktop: 125, mobile: 110, tablet: 75 },
  { date: "Mar 23", desktop: 156, mobile: 149, tablet: 94 },
  { date: "Apr 23", desktop: 165, mobile: 112, tablet: 81 },
  { date: "May 23", desktop: 153, mobile: 138, tablet: 89 },
  { date: "Jun 23", desktop: 124, mobile: 145, tablet: 92 },
  { date: "Jul 23", desktop: 164, mobile: 142, tablet: 85 },
  { date: "Aug 23", desktop: 136, mobile: 126, tablet: 78 },
  { date: "Sep 23", desktop: 147, mobile: 151, tablet: 96 },
  { date: "Oct 23", desktop: 168, mobile: 119, tablet: 83 },
  { date: "Nov 23", desktop: 145, mobile: 132, tablet: 88 },
  { date: "Dec 23", desktop: 152, mobile: 141, tablet: 91 },
];

// Example component for preview system
export const AreaChartExample = ({
  type = "default",
  fill = "gradient",
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showTooltip = true,
  showLegend = true,
  legendPosition = "right",
  connectNulls = false,
  allowDecimals = true,
  autoMinValue = false,
  enableLegendSlider = false,
  startEndOnly = false,
  xAxisLabel,
  yAxisLabel,
  ...props
}: {
  type?: "default" | "stacked" | "percent";
  fill?: "gradient" | "solid" | "none";
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  legendPosition?: "left" | "center" | "right";
  connectNulls?: boolean;
  allowDecimals?: boolean;
  autoMinValue?: boolean;
  enableLegendSlider?: boolean;
  startEndOnly?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  [key: string]: unknown;
}) => {
  return (
    <AreaChart
      data={sampleData}
      index="date"
      categories={["desktop", "mobile", "tablet"]}
      type={type}
      fill={fill}
      showXAxis={showXAxis}
      showYAxis={showYAxis}
      showGridLines={showGridLines}
      showTooltip={showTooltip}
      showLegend={showLegend}
      legendPosition={legendPosition}
      connectNulls={connectNulls}
      allowDecimals={allowDecimals}
      autoMinValue={autoMinValue}
      enableLegendSlider={enableLegendSlider}
      startEndOnly={startEndOnly}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      valueFormatter={(value) => `${value}k`}
      {...props}
    />
  );
};
