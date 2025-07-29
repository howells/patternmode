"use client";

import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Sample data sets
  const basicData = [
    { month: "Jan", sales: 4000, visitors: 2400 },
    { month: "Feb", sales: 3000, visitors: 1398 },
    { month: "Mar", sales: 2000, visitors: 9800 },
    { month: "Apr", sales: 2780, visitors: 3908 },
    { month: "May", sales: 1890, visitors: 4800 },
    { month: "Jun", sales: 2390, visitors: 3800 },
  ];

  const biaxialData = [
    { month: "Jan", revenue: 4000, conversionRate: 2.4 },
    { month: "Feb", revenue: 3000, conversionRate: 1.3 },
    { month: "Mar", revenue: 2000, conversionRate: 4.8 },
    { month: "Apr", revenue: 2780, conversionRate: 3.9 },
    { month: "May", revenue: 1890, conversionRate: 4.2 },
    { month: "Jun", revenue: 2390, conversionRate: 3.1 },
  ];

  const stackedData = [
    { quarter: "Q1", desktop: 2400, mobile: 1600, totalUsers: 5200 },
    { quarter: "Q2", desktop: 1398, mobile: 2200, totalUsers: 4800 },
    { quarter: "Q3", desktop: 9800, mobile: 3400, totalUsers: 15600 },
    { quarter: "Q4", desktop: 3908, mobile: 2800, totalUsers: 8200 },
  ];

  const multiLineData = [
    { week: "W1", orders: 120, newUsers: 45, returningUsers: 78 },
    { week: "W2", orders: 98, newUsers: 38, returningUsers: 65 },
    { week: "W3", orders: 156, newUsers: 62, returningUsers: 94 },
    { week: "W4", orders: 134, newUsers: 54, returningUsers: 87 },
    { week: "W5", orders: 178, newUsers: 71, returningUsers: 102 },
  ];

  const productData = [
    { product: "Product A", units: 1200, revenue: 24000 },
    { product: "Product B", units: 800, revenue: 19200 },
    { product: "Product C", units: 1500, revenue: 18000 },
    { product: "Product D", units: 950, revenue: 22800 },
    { product: "Product E", units: 1100, revenue: 26400 },
  ];

  return (
    <div className="space-y-8">
      {/* Basic combo chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Combo Chart</h3>
        <ComboChart
          data={basicData}
          index="month"
          showXAxis={showXAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          enableLegendSlider={enableLegendSlider}
          barSeries={{
            categories: ["sales"],
            colors: ["blue"],
            valueFormatter: (value) => `$${value}`,
          }}
          lineSeries={{
            categories: ["visitors"],
            colors: ["emerald"],
            valueFormatter: (value) => `${value}`,
          }}
        />
      </div>

      {/* Biaxial chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Biaxial (Dual Y-Axis)</h3>
        <ComboChart
          data={biaxialData}
          index="month"
          enableBiaxial
          showXAxis={showXAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          enableLegendSlider={enableLegendSlider}
          barSeries={{
            categories: ["revenue"],
            colors: ["blue"],
            valueFormatter: (value) => `$${value}`,
            yAxisLabel: "Revenue ($)",
          }}
          lineSeries={{
            categories: ["conversionRate"],
            colors: ["emerald"],
            valueFormatter: (value) => `${value}%`,
            yAxisLabel: "Conversion Rate (%)",
          }}
        />
      </div>

      {/* Stacked bars with line */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Stacked Bars with Line</h3>
        <ComboChart
          data={stackedData}
          index="quarter"
          showXAxis={showXAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          enableBiaxial={enableBiaxial}
          enableLegendSlider={enableLegendSlider}
          barSeries={{
            categories: ["desktop", "mobile"],
            type: "stacked",
            colors: ["blue", "emerald"],
            valueFormatter: (value) => `${value}`,
            yAxisLabel: "Sessions",
          }}
          lineSeries={{
            categories: ["totalUsers"],
            colors: ["pink"],
            valueFormatter: (value) => `${value}`,
          }}
        />
      </div>

      {/* Multiple lines with bar */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Multiple Lines with Bar</h3>
        <ComboChart
          data={multiLineData}
          index="week"
          showXAxis={showXAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          enableBiaxial={enableBiaxial}
          enableLegendSlider={enableLegendSlider}
          barSeries={{
            categories: ["orders"],
            colors: ["blue"],
            valueFormatter: (value) => `${value}`,
          }}
          lineSeries={{
            categories: ["newUsers", "returningUsers"],
            colors: ["emerald", "amber"],
            valueFormatter: (value) => `${value}`,
          }}
        />
      </div>

      {/* Interactive chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Interactive Chart</h3>
        <div className="space-y-4">
          <ComboChart
            data={basicData}
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
              valueFormatter: (value) => `$${value}`,
            }}
            lineSeries={{
              categories: ["visitors"],
              colors: ["emerald"],
              valueFormatter: (value) => `${value}`,
            }}
            onValueChange={(value) => setSelectedCategory(value)}
          />
          {selectedCategory && (
            <div className="text-sm text-zinc-600 p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
              <div>Event Type: {selectedCategory.eventType}</div>
              <div>Category: {selectedCategory.categoryClicked}</div>
              {selectedCategory.month && (
                <div>Month: {selectedCategory.month}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom formatting */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Custom Formatting & Labels</h3>
        <ComboChart
          data={productData}
          index="product"
          xAxisLabel="Product Categories"
          showXAxis={showXAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          enableBiaxial={enableBiaxial}
          enableLegendSlider={enableLegendSlider}
          barSeries={{
            categories: ["units"],
            colors: ["blue"],
            valueFormatter: (value) => `${value.toLocaleString()} units`,
            yAxisLabel: "Units Sold",
          }}
          lineSeries={{
            categories: ["revenue"],
            colors: ["emerald"],
            valueFormatter: (value) => `$${(value / 1000).toFixed(1)}K`,
          }}
          legendPosition="center"
        />
      </div>

      {/* With legend slider (many categories) */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Legend Slider</h3>
        <ComboChart
          data={[
            {
              month: "Jan",
              cat1: 400,
              cat2: 240,
              cat3: 300,
              cat4: 150,
              cat5: 200,
              line1: 180,
              line2: 320,
            },
            {
              month: "Feb",
              cat1: 300,
              cat2: 139,
              cat3: 250,
              cat4: 120,
              cat5: 180,
              line1: 160,
              line2: 280,
            },
            {
              month: "Mar",
              cat1: 200,
              cat2: 380,
              cat3: 200,
              cat4: 180,
              cat5: 220,
              line1: 200,
              line2: 350,
            },
          ]}
          index="month"
          showXAxis={showXAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          enableBiaxial={enableBiaxial}
          enableLegendSlider={true}
          barSeries={{
            categories: ["cat1", "cat2", "cat3", "cat4", "cat5"],
            colors: ["blue", "emerald", "amber", "pink", "violet"],
            valueFormatter: (value) => `${value}`,
          }}
          lineSeries={{
            categories: ["line1", "line2"],
            colors: ["amber", "pink"],
            valueFormatter: (value) => `${value}`,
          }}
        />
      </div>
    </div>
  );
}
