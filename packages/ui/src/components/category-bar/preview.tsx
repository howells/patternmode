"use client";

import { CategoryBar } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  CategoryBarExample = ({
    values = [40, 30, 20, 10],
    showLabels = true,
    showMarker = false,
    markerValue = 50,
    markerTooltip = "Target: 50",
    showMarkerAnimation = true,
    ...props
  }: {
    values?: number[];
    showLabels?: boolean;
    showMarker?: boolean;
    markerValue?: number;
    markerTooltip?: string;
    showMarkerAnimation?: boolean;
    [key: string]: unknown;
  }) => {
  // Ensure values is always an array with at least one element
    const safeValues
    = Array.isArray(values) && values.length > 0 ? values : [40, 30, 20, 10];

    // Calculate the sum for marker validation
    const totalValue = safeValues.reduce((sum, value) => sum + value, 0);
    const clampedMarkerValue = Math.max(0, Math.min(markerValue, totalValue));

    return (
      <div className="w-full max-w-md">
        <CategoryBar
          values={safeValues}
          showLabels={showLabels}
          marker={
            showMarker
              ? {
                  value: clampedMarkerValue,
                  tooltip: markerTooltip,
                  showAnimation: showMarkerAnimation,
                }
              : undefined
          }
          {...props}
        />
      </div>
    );
  };
