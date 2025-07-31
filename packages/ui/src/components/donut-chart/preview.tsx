"use client";

import { DonutChart } from "@patternmode/ui";
import { useState } from "react";

interface DonutChartExampleProps {
  variant?: "donut" | "pie";
  showLabel?: boolean;
  showTooltip?: boolean;
}

export function DonutChartExample({
  variant = "donut",
  showLabel = false,
  showTooltip = true,
}: DonutChartExampleProps) {
  const [selectedSegment, setSelectedSegment] = useState<any>(null);

  const browserData = [
    { name: "Chrome", value: 61.04 },
    { name: "Safari", value: 24.57 },
    { name: "Edge", value: 5.29 },
    { name: "Firefox", value: 5.83 },
    { name: "Other", value: 3.27 },
  ];

  const deviceData = [
    { segment: "Desktop", users: 2400 },
    { segment: "Mobile", users: 1800 },
    { segment: "Tablet", users: 600 },
  ];

  const revenueData = [
    { category: "Revenue", amount: 45000 },
    { category: "Costs", amount: 32000 },
    { category: "Profit", amount: 13000 },
  ];

  const taskData = [
    { status: "Completed", count: 120 },
    { status: "In Progress", count: 45 },
    { status: "Pending", count: 30 },
    { status: "Cancelled", count: 15 },
  ];

  const budgetData = [
    { department: "Engineering", budget: 250000 },
    { department: "Marketing", budget: 150000 },
    { department: "Sales", budget: 180000 },
    { department: "Support", budget: 80000 },
  ];

  const statusData = [
    { type: "Success", value: 85 },
    { type: "Warning", value: 10 },
    { type: "Error", value: 5 },
  ];

  return (
    <div className="space-y-8">
      {/* Basic donut chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Browser Market Share</h3>
        <DonutChart
          data={browserData}
          category="name"
          value="value"
          variant={variant}
          showLabel={showLabel}
          showTooltip={showTooltip}
          valueFormatter={value => `${value}%`}
        />
      </div>

      {/* Device breakdown */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Device Usage</h3>
        <DonutChart
          data={deviceData}
          category="segment"
          value="users"
          variant={variant}
          showLabel={showLabel}
          showTooltip={showTooltip}
          colors={["blue", "emerald", "amber"]}
          valueFormatter={value => `${value.toLocaleString()} users`}
        />
      </div>

      {/* Revenue breakdown */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Financial Overview</h3>
        <DonutChart
          data={revenueData}
          category="category"
          value="amount"
          variant={variant}
          showLabel={showLabel}
          showTooltip={showTooltip}
          valueFormatter={value => `$${(value / 1000).toFixed(0)}K`}
        />
      </div>

      {/* Task status with custom colors */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Task Status</h3>
        <DonutChart
          data={taskData}
          category="status"
          value="count"
          variant={variant}
          showLabel={showLabel}
          showTooltip={showTooltip}
          colors={["emerald", "blue", "amber", "pink"]}
          valueFormatter={value => `${value} tasks`}
        />
      </div>

      {/* Interactive chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Department Budget (Interactive)</h3>
        <div className="space-y-4">
          <DonutChart
            data={budgetData}
            category="department"
            value="budget"
            variant={variant}
            showLabel={showLabel}
            showTooltip={showTooltip}
            onValueChange={setSelectedSegment}
            valueFormatter={value => `$${(value / 1000).toFixed(0)}K`}
          />
          {selectedSegment && (
            <div className="text-sm text-zinc-600 p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
              <div>
                Department:
                {selectedSegment.categoryClicked}
              </div>
              <div>
                Budget: $
                {(selectedSegment.budget / 1000).toFixed(0)}
                K
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Small size variant */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">System Health (Compact)</h3>
        <div className="flex items-center gap-4">
          <DonutChart
            data={statusData}
            category="type"
            value="value"
            variant={variant}
            showLabel={showLabel}
            showTooltip={showTooltip}
            className="h-24 w-24"
            colors={["emerald", "amber", "pink"]}
            valueFormatter={value => `${value}%`}
          />
          <div className="text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Success: 85%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Warning: 10%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Error: 5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multiple sizes comparison */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Size Comparison</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <DonutChart
              data={statusData}
              category="type"
              value="value"
              variant={variant}
              showLabel={showLabel}
              showTooltip={showTooltip}
              className="h-16 w-16"
              colors={["emerald", "amber", "pink"]}
              valueFormatter={value => `${value}%`}
            />
            <p className="text-xs text-zinc-500 mt-1">Small</p>
          </div>
          <div className="text-center">
            <DonutChart
              data={statusData}
              category="type"
              value="value"
              variant={variant}
              showLabel={showLabel}
              showTooltip={showTooltip}
              className="h-32 w-32"
              colors={["emerald", "amber", "pink"]}
              valueFormatter={value => `${value}%`}
            />
            <p className="text-xs text-zinc-500 mt-1">Medium</p>
          </div>
          <div className="text-center">
            <DonutChart
              data={statusData}
              category="type"
              value="value"
              variant={variant}
              showLabel={showLabel}
              showTooltip={showTooltip}
              className="h-48 w-48"
              colors={["emerald", "amber", "pink"]}
              valueFormatter={value => `${value}%`}
            />
            <p className="text-xs text-zinc-500 mt-1">Large</p>
          </div>
        </div>
      </div>
    </div>
  );
}
