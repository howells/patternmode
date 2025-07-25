"use client";

import React from "react";
import { BarList } from "./bar-list";

// Default bar list
export const DefaultExample = () => (
  <BarList
    data={[
      { name: "New York", value: 400 },
      { name: "London", value: 300 },
      { name: "Tokyo", value: 200 },
      { name: "Paris", value: 100 },
    ]}
  />
);

// Bar list with value formatter
export const WithFormatterExample = () => (
  <BarList
    data={[
      { name: "Revenue", value: 125000 },
      { name: "Expenses", value: 75000 },
      { name: "Profit", value: 50000 },
    ]}
    valueFormatter={(value) => `$${value.toLocaleString()}`}
  />
);

// Interactive bar list
export const InteractiveExample = () => {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  return (
    <div className="space-y-3">
      <BarList
        data={[
          { name: "Product A", value: 85 },
          { name: "Product B", value: 70 },
          { name: "Product C", value: 45 },
        ]}
        onValueChange={(item) => setSelectedItem(item.name)}
      />
      {selectedItem && (
        <p className="text-sm text-zinc-600">
          Selected: <span className="font-medium">{selectedItem}</span>
        </p>
      )}
    </div>
  );
};

// Bar list with links
export const WithLinksExample = () => (
  <BarList
    data={[
      { name: "Documentation", value: 95, href: "https://docs.example.com" },
      { name: "GitHub", value: 80, href: "https://github.com/example" },
      { name: "Website", value: 60, href: "https://example.com" },
    ]}
  />
);

// Animated bar list
export const AnimatedExample = () => {
  const [data, setData] = React.useState([
    { name: "Q1", value: 100 },
    { name: "Q2", value: 150 },
    { name: "Q3", value: 125 },
    { name: "Q4", value: 175 },
  ]);

  const refreshData = () => {
    setData((prev) =>
      prev.map((item) => ({
        ...item,
        value: Math.floor(Math.random() * 200) + 50,
      }))
    );
  };

  return (
    <div className="space-y-4">
      <button
        onClick={refreshData}
        className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Refresh Data
      </button>
      <BarList data={data} showAnimation={true} />
    </div>
  );
};

// Ascending order bar list
export const AscendingExample = () => (
  <BarList
    data={[
      { name: "Small", value: 25 },
      { name: "Large", value: 100 },
      { name: "Medium", value: 60 },
    ]}
    sortOrder="ascending"
  />
);

// Performance metrics example
export const PerformanceExample = () => (
  <BarList
    data={[
      { name: "Page Load Time", value: 92 },
      { name: "First Contentful Paint", value: 88 },
      { name: "Time to Interactive", value: 75 },
      { name: "Speed Index", value: 83 },
    ]}
    valueFormatter={(value) => `${value}/100`}
  />
);

// Sales by region
export const SalesByRegionExample = () => (
  <BarList
    data={[
      { name: "North America", value: 345000 },
      { name: "Europe", value: 287000 },
      { name: "Asia Pacific", value: 198000 },
      { name: "Latin America", value: 123000 },
      { name: "Middle East", value: 89000 },
    ]}
    valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
    showAnimation={true}
  />
);

// Percentage values
export const PercentageExample = () => (
  <BarList
    data={[
      { name: "Completed", value: 85 },
      { name: "In Progress", value: 12 },
      { name: "Not Started", value: 3 },
    ]}
    valueFormatter={(value) => `${value}%`}
  />
);

// No sorting example
export const NoSortingExample = () => (
  <BarList
    data={[
      { name: "First", value: 50 },
      { name: "Second", value: 80 },
      { name: "Third", value: 30 },
      { name: "Fourth", value: 90 },
      { name: "Fifth", value: 60 },
    ]}
    sortOrder="none"
  />
);

// Complex data with additional properties
export const ComplexDataExample = () => {
  type ExtendedBar = {
    name: string;
    value: number;
    category: string;
    trend: "up" | "down" | "stable";
  };

  const complexData: ExtendedBar[] = [
    { name: "Sales", value: 150, category: "revenue", trend: "up" },
    { name: "Marketing", value: 75, category: "expense", trend: "down" },
    { name: "Support", value: 120, category: "revenue", trend: "stable" },
    { name: "Development", value: 200, category: "expense", trend: "up" },
  ];

  const [selectedBar, setSelectedBar] = React.useState<ExtendedBar | null>(
    null
  );

  return (
    <div className="space-y-4">
      <BarList<ExtendedBar>
        data={complexData}
        valueFormatter={(value) => `$${value}K`}
        onValueChange={(bar) => setSelectedBar(bar)}
      />
      {selectedBar && (
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md">
          <p className="text-sm">
            <span className="font-medium">{selectedBar.name}</span> - Category:{" "}
            {selectedBar.category}, Trend: {selectedBar.trend}, Value: $
            {selectedBar.value}K
          </p>
        </div>
      )}
    </div>
  );
};

// Real-world website analytics example
export const WebsiteAnalyticsExample = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
      Top Pages (Last 30 Days)
    </h4>
    <BarList
      data={[
        { name: "/dashboard", value: 12500, href: "/dashboard" },
        { name: "/products", value: 8900, href: "/products" },
        { name: "/about", value: 6700, href: "/about" },
        { name: "/contact", value: 4200, href: "/contact" },
        { name: "/blog", value: 3100, href: "/blog" },
      ]}
      valueFormatter={(value) => `${value.toLocaleString()} views`}
    />
  </div>
);
