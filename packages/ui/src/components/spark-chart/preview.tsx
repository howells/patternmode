"use client";

import { SparkBarChart, SparkLineChart } from "@patternmode/ui";

interface SparkChartExampleProps {
  type?: "line" | "bar";
}

export function SparkChartExample({ type = "line" }: SparkChartExampleProps) {
  const /**
         *
         */
    SparkChart = type === "bar" ? SparkBarChart : SparkLineChart;

  const weeklyData = [
    { day: 1, value: 10 },
    { day: 2, value: 25 },
    { day: 3, value: 15 },
    { day: 4, value: 30 },
    { day: 5, value: 20 },
    { day: 6, value: 35 },
    { day: 7, value: 28 },
  ];

  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 600 },
    { month: "Apr", sales: 350 },
    { month: "May", sales: 700 },
  ];

  const trendData = [
    { x: 1, y: 20 },
    { x: 2, y: 35 },
    { x: 3, y: 25 },
    { x: 4, y: 40 },
    { x: 5, y: 30 },
  ];

  return (
    <div className="space-y-8">
      {/* Basic spark chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Weekly Performance</h3>
        <SparkChart
          data={weeklyData}
          index="day"
          categories={["value"]}
          colors={["blue"]}
        />
      </div>

      {/* Bar variant */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Monthly Sales</h3>
        <SparkBarChart
          data={salesData}
          index="month"
          categories={["sales"]}
          colors={["emerald"]}
        />
      </div>

      {/* Different colors */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Trend Indicators</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <SparkChart
              data={trendData}
              index="x"
              categories={["y"]}
              colors={["pink"]}
              className="h-12 w-20"
            />
            <p className="text-xs text-zinc-500 mt-1">Negative</p>
          </div>
          <div className="text-center">
            <SparkChart
              data={trendData}
              index="x"
              categories={["y"]}
              colors={["emerald"]}
              className="h-12 w-20"
            />
            <p className="text-xs text-zinc-500 mt-1">Positive</p>
          </div>
          <div className="text-center">
            <SparkChart
              data={trendData}
              index="x"
              categories={["y"]}
              colors={["amber"]}
              className="h-12 w-20"
            />
            <p className="text-xs text-zinc-500 mt-1">Neutral</p>
          </div>
        </div>
      </div>

      {/* Different sizes */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Size Variants</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 w-12">Small:</span>
            <SparkChart
              data={weeklyData}
              index="day"
              categories={["value"]}
              colors={["blue"]}
              className="h-8 w-16"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 w-12">Medium:</span>
            <SparkChart
              data={weeklyData}
              index="day"
              categories={["value"]}
              colors={["blue"]}
              className="h-12 w-24"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 w-12">Large:</span>
            <SparkChart
              data={weeklyData}
              index="day"
              categories={["value"]}
              colors={["blue"]}
              className="h-16 w-32"
            />
          </div>
        </div>
      </div>

      {/* Dashboard style */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Dashboard Widgets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-zinc-500 mb-1">Revenue</div>
            <div className="text-lg font-semibold mb-2">$24,562</div>
            <SparkBarChart
              data={salesData}
              index="month"
              categories={["sales"]}
              colors={["emerald"]}
              className="h-8 w-full"
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-zinc-500 mb-1">Users</div>
            <div className="text-lg font-semibold mb-2">1,234</div>
            <SparkChart
              data={weeklyData}
              index="day"
              categories={["value"]}
              colors={["blue"]}
              className="h-8 w-full"
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-zinc-500 mb-1">Conversion</div>
            <div className="text-lg font-semibold mb-2">3.2%</div>
            <SparkChart
              data={trendData}
              index="x"
              categories={["y"]}
              colors={["amber"]}
              className="h-8 w-full"
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-zinc-500 mb-1">Bounce Rate</div>
            <div className="text-lg font-semibold mb-2">28.4%</div>
            <SparkChart
              data={[...trendData].reverse()}
              index="x"
              categories={["y"]}
              colors={["pink"]}
              className="h-8 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
