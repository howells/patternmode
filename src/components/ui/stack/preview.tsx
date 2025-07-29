"use client";

import React from "react";
import { Stack } from "@patternmode/ui";

// Example component for preview system
export const StackExample = ({
  direction = "vertical",
  gap = 4,
  padding,
  align,
  justify,
  wrap = false,
  as = "div",
  showResponsive = false,
  ...props
}: {
  direction?: "vertical" | "horizontal";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  as?: string;
  showResponsive?: boolean;
  [key: string]: unknown;
}) => {
  // Convert string gap/padding to numbers for the component
  const gapValue = typeof gap === "string" ? parseInt(gap, 10) : gap;
  const paddingValue =
    typeof padding === "string" ? parseInt(padding, 10) : padding;

  // Show responsive example when showResponsive is true
  if (showResponsive) {
    return (
      <div className="space-y-6">
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          <strong>Responsive Example:</strong> This stack changes direction and
          gap at different breakpoints.
          <br />
          <span className="text-xs">
            Try resizing your browser to see the responsive behavior!
          </span>
        </div>

        <Stack
          direction={{ sm: "vertical", lg: "horizontal" }}
          gap={{ sm: 2, md: 4, lg: 6 }}
          className="min-h-[200px] border border-dashed border-zinc-200 dark:border-zinc-600 p-4"
        >
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded text-blue-900 dark:text-blue-100 text-center flex-1">
            <div className="font-medium">Responsive Item 1</div>
            <div className="text-xs mt-1 opacity-75">
              Mobile: Vertical + gap-2
              <br />
              Desktop: Horizontal + gap-6
            </div>
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded text-green-900 dark:text-green-100 text-center flex-1">
            <div className="font-medium">Responsive Item 2</div>
            <div className="text-xs mt-1 opacity-75">
              Adapts to screen size
              <br />
              Like Vercel&apos;s Stack!
            </div>
          </div>
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded text-purple-900 dark:text-purple-100 text-center flex-1">
            <div className="font-medium">Responsive Item 3</div>
            <div className="text-xs mt-1 opacity-75">
              Resize browser
              <br />
              to see changes
            </div>
          </div>
        </Stack>

        <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
          <div>
            <strong>sm:</strong> direction=&quot;vertical&quot;, gap=2 (8px)
          </div>
          <div>
            <strong>md:</strong> direction=&quot;vertical&quot;, gap=4 (16px)
          </div>
          <div>
            <strong>lg:</strong> direction=&quot;horizontal&quot;, gap=6 (24px)
          </div>
        </div>
      </div>
    );
  }

  return (
    <Stack
      direction={direction}
      gap={gapValue as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24}
      padding={
        paddingValue as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24
      }
      align={align}
      justify={justify}
      wrap={wrap}
      as={as as React.ElementType}
      className="min-h-[200px] border border-dashed border-zinc-200 dark:border-zinc-600"
      {...props}
    >
      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded text-blue-900 dark:text-blue-100 text-center">
        Item 1
      </div>
      <div className="p-4 bg-green-100 dark:bg-green-900 rounded text-green-900 dark:text-green-100 text-center">
        Item 2
      </div>
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded text-red-900 dark:text-red-100 text-center">
        Item 3
      </div>
      {wrap && (
        <>
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded text-yellow-900 dark:text-yellow-100 text-center">
            Item 4
          </div>
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded text-purple-900 dark:text-purple-100 text-center">
            Item 5
          </div>
          <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded text-pink-900 dark:text-pink-100 text-center">
            Item 6
          </div>
        </>
      )}
    </Stack>
  );
};
