"use client";

import { useState } from "react";
import { LineChart } from "@patternmode/ui";

interface LineChartExampleProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  connectNulls?: boolean;
}

export function LineChartExample({
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showTooltip = true,
  showGridLines = true,
  connectNulls = false,
}: LineChartExampleProps) {
  const [activeCategory, setActiveCategory] = useState<any>(null);

  const salesData = [
    { month: "Jan", sales: 2400, revenue: 4000 },
    { month: "Feb", sales: 1398, revenue: 3000 },
    { month: "Mar", sales: 9800, revenue: 2000 },
    { month: "Apr", sales: 3908, revenue: 2780 },
    { month: "May", sales: 4800, revenue: 1890 },
    { month: "Jun", sales: 3800, revenue: 2390 },
  ];

  const analyticsData = [
    { day: "Mon", users: 120, sessions: 180, pageviews: 450 },
    { day: "Tue", users: 98, sessions: 145, pageviews: 380 },
    { day: "Wed", users: 156, sessions: 220, pageviews: 520 },
    { day: "Thu", users: 134, sessions: 195, pageviews: 480 },
    { day: "Fri", users: 178, sessions: 240, pageviews: 580 },
    { day: "Sat", users: 165, sessions: 210, pageviews: 495 },
    { day: "Sun", users: 142, sessions: 175, pageviews: 420 },
  ];

  const missingData = [
    { quarter: "Q1", profit: 4000, loss: 2400 },
    { quarter: "Q2", profit: null, loss: 1800 },
    { quarter: "Q3", profit: 2800, loss: null },
    { quarter: "Q4", profit: 3200, loss: 2100 },
  ];

  const deviceData = [
    { month: "Jan", mobile: 1200, desktop: 1800, tablet: 600 },
    { month: "Feb", mobile: 1100, desktop: 1650, tablet: 580 },
    { month: "Mar", mobile: 1350, desktop: 1920, tablet: 720 },
    { month: "Apr", mobile: 1280, desktop: 1780, tablet: 680 },
    { month: "May", mobile: 1420, desktop: 2100, tablet: 760 },
    { month: "Jun", mobile: 1380, desktop: 1950, tablet: 720 },
  ];

  const temperatureData = [
    { week: "Week 1", temperature: 22.5, humidity: 65.2 },
    { week: "Week 2", temperature: 25.1, humidity: 58.7 },
    { week: "Week 3", temperature: 23.8, humidity: 72.1 },
    { week: "Week 4", temperature: 27.2, humidity: 61.4 },
  ];

  const sparkData = [
    { x: "A", y: 10 },
    { x: "B", y: 25 },
    { x: "C", y: 15 },
    { x: "D", y: 30 },
    { x: "E", y: 20 },
  ];

  return (
    <div className="space-y-8">
      {/* Basic line chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Sales & Revenue</h3>
        <LineChart
          data={salesData}
          index="month"
          categories={["sales", "revenue"]}
          colors={["blue", "emerald"]}
          valueFormatter={(value) => `$${value}`}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          connectNulls={connectNulls}
        />
      </div>

      {/* Multiple lines */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Website Analytics</h3>
        <LineChart
          data={analyticsData}
          index="day"
          categories={["users", "sessions", "pageviews"]}
          colors={["blue", "emerald", "amber"]}
          valueFormatter={(value) => `${value}`}
          yAxisWidth={60}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          connectNulls={connectNulls}
        />
      </div>

      {/* With null values */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Quarterly Performance (Missing Data)</h3>
        <LineChart
          data={missingData}
          index="quarter"
          categories={["profit", "loss"]}
          colors={["emerald", "pink"]}
          connectNulls={connectNulls}
          valueFormatter={(value) => `$${value}`}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
        />
      </div>

      {/* Interactive chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Device Traffic (Interactive)</h3>
        <div className="space-y-4">
          <LineChart
            data={deviceData}
            index="month"
            categories={["mobile", "desktop", "tablet"]}
            colors={["blue", "emerald", "amber"]}
            valueFormatter={(value) => `${value} visits`}
            onValueChange={(value) => setActiveCategory(value)}
            showXAxis={showXAxis}
            showYAxis={showYAxis}
            showLegend={showLegend}
            showTooltip={showTooltip}
            showGridLines={showGridLines}
            connectNulls={connectNulls}
          />
          {activeCategory && (
            <div className="text-sm text-zinc-600 p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
              <div>Event Type: {activeCategory.eventType}</div>
              <div>Category: {activeCategory.categoryClicked}</div>
              {activeCategory.month && <div>Month: {activeCategory.month}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Custom formatting */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Environmental Data</h3>
        <LineChart
          data={temperatureData}
          index="week"
          categories={["temperature", "humidity"]}
          colors={["pink", "blue"]}
          valueFormatter={(value) => `${value.toFixed(1)}`}
          xAxisLabel="Time Period"
          yAxisLabel="Measurements"
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          connectNulls={connectNulls}
        />
      </div>

      {/* Minimal sparkline */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Minimal Sparkline</h3>
        <LineChart
          data={sparkData}
          index="x"
          categories={["y"]}
          colors={["blue"]}
          showXAxis={false}
          showYAxis={false}
          showLegend={false}
          showGridLines={false}
          className="h-24"
          showTooltip={showTooltip}
          connectNulls={connectNulls}
        />
      </div>

      {/* Different line styles */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Growth Metrics</h3>
        <LineChart
          data={[
            { period: "Jan", actual: 100, target: 120, forecast: 110 },
            { period: "Feb", actual: 120, target: 140, forecast: 130 },
            { period: "Mar", actual: 95, target: 130, forecast: 125 },
            { period: "Apr", actual: 140, target: 150, forecast: 145 },
            { period: "May", actual: 160, target: 170, forecast: 165 },
          ]}
          index="period"
          categories={["actual", "target", "forecast"]}
          colors={["blue", "emerald", "amber"]}
          valueFormatter={(value) => `${value}%`}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showLegend={showLegend}
          showTooltip={showTooltip}
          showGridLines={showGridLines}
          connectNulls={connectNulls}
        />
      </div>
    </div>
  );
}