"use client";

import { Card } from "@patternmode/ui";
import { Grid, GridCell } from "@patternmode/ui";
import { Stack } from "@patternmode/ui";
import { Subheading } from "@patternmode/ui";
import { Text } from "@patternmode/ui";
import { ScrollArea } from "@patternmode/ui";

interface ScrollAreaExampleProps {
  orientation?: "vertical" | "horizontal" | "both";
  className?: string;
  scrollbarClassName?: string;
  thumbClassName?: string;
  viewportClassName?: string;
}

export function ScrollAreaExample({
  orientation = "vertical",
  className,
  scrollbarClassName,
  thumbClassName,
  viewportClassName,
}: ScrollAreaExampleProps) {
  const getContainerClassName = () => {
    switch (orientation) {
      case "horizontal":
        return "h-32 w-full max-w-2xl border border-zinc-200 dark:border-zinc-800 rounded-md";
      case "both":
        return "h-48 w-80 border border-zinc-200 dark:border-zinc-800 rounded-md";
      default: // vertical
        return "h-48 w-full max-w-md border border-zinc-200 dark:border-zinc-800 rounded-md";
    }
  };

  const renderContent = () => {
    if (orientation === "horizontal") {
      return (
        <div className="flex gap-3 p-4 min-w-max">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} padding={3} className="w-44 flex-none">
              <Stack gap={1}>
                <Subheading level={3}>Item {i + 1}</Subheading>
                <Text>Horizontal content.</Text>
              </Stack>
            </Card>
          ))}
        </div>
      );
    }

    if (orientation === "both") {
      return (
        <div className="p-4 min-w-[800px] min-h-[600px]">
          <Grid
            columns={6}
            gap={3}
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <GridCell key={i}>
                <Card padding={2} className="w-full h-full">
                  <Stack gap={1}>
                    <Subheading level={3}>Item {i + 1}</Subheading>
                    <Text>
                      Content that overflows both horizontally and vertically.
                    </Text>
                  </Stack>
                </Card>
              </GridCell>
            ))}
          </Grid>
        </div>
      );
    }

    // Default vertical orientation
    return (
      <Stack gap={3} padding={4}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} padding={3}>
            <Stack gap={1}>
              <Subheading level={3}>Item {i + 1}</Subheading>
              <Text>Scrollable content item with description text.</Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  };

  return (
    <ScrollArea
      orientation={orientation}
      className={className || getContainerClassName()}
      scrollbarClassName={scrollbarClassName}
      thumbClassName={thumbClassName}
      viewportClassName={viewportClassName}
    >
      {renderContent()}
    </ScrollArea>
  );
}
