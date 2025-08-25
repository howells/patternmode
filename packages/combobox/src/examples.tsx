"use client";

import React from "react";
import { Combobox } from "./component";

export const DefaultExample = () => {
  const options = [
    { id: "1", label: "Apple", value: "apple" },
    { id: "2", label: "Banana", value: "banana" },
    { id: "3", label: "Orange", value: "orange" },
    { id: "4", label: "Grape", value: "grape" },
  ];
  return <Combobox options={options} placeholder="Select a fruit..." />;
};

export const AsyncExample = () => {
  async function fetchData({ search = "", pageParam = 0 }: { search?: string; pageParam?: number }) {
    const all = Array.from({ length: 200 }).map((_, i) => ({ id: String(i + 1), label: `Item ${i + 1}`, value: `item-${i + 1}` }));
    const filtered = search ? all.filter((x) => x.label.toLowerCase().includes(search.toLowerCase())) : all;
    const pageSize = 25;
    const start = pageParam * pageSize;
    const end = start + pageSize;
    const data = filtered.slice(start, end);
    return Promise.resolve({ data, hasNextPage: end < filtered.length, nextCursor: end < filtered.length ? pageParam + 1 : undefined });
  }
  return <Combobox fetchData={fetchData} placeholder="Search items..." />;
};

export const CustomRenderingExample = () => {
  const colors = [
    { id: "1", label: "Red", value: "red", color: "#ef4444" },
    { id: "2", label: "Blue", value: "blue", color: "#3b82f6" },
    { id: "3", label: "Green", value: "green", color: "#10b981" },
    { id: "4", label: "Purple", value: "purple", color: "#8b5cf6" },
  ];
  return (
    <Combobox
      options={colors}
      placeholder="Select a color..."
      renderItem={(item) => (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: (item as any).color }} />
          {(item as any).label}
        </div>
      )}
    />
  );
};

export const SizesExample = () => (
  <div className="space-y-3">
    <Combobox options={[{ id: "1", label: "XS", value: "xs" }]} size="xs" placeholder="Extra small" />
    <Combobox options={[{ id: "1", label: "SM", value: "sm" }]} size="sm" placeholder="Small" />
    <Combobox options={[{ id: "1", label: "Base", value: "base" }]} size="base" placeholder="Base" />
    <Combobox options={[{ id: "1", label: "LG", value: "lg" }]} size="lg" placeholder="Large" />
  </div>
);

export const ErrorExample = () => (
  <div className="space-y-3">
    <Combobox options={[{ id: "1", label: "Apple", value: "apple" }]} hasError placeholder="Error state" />
  </div>
);

export const DisabledExample = () => (
  <Combobox options={[{ id: "1", label: "Disabled", value: "disabled" }]} disabled placeholder="Disabled" />
);

