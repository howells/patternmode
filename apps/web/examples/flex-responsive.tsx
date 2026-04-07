"use client";

import { Flex } from "@patternmode/ui/components/flex";

export default function FlexResponsiveExample() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "xs", lg: "base" }}
    >
      <div className="flex-1 rounded-lg bg-accent/10 p-4 text-center text-sm">
        One
      </div>
      <div className="flex-1 rounded-lg bg-accent/10 p-4 text-center text-sm">
        Two
      </div>
      <div className="flex-1 rounded-lg bg-accent/10 p-4 text-center text-sm">
        Three
      </div>
    </Flex>
  );
}
