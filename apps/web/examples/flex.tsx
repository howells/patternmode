"use client";

import { Flex } from "@patternmode/ui/components/flex";

export default function FlexExample() {
  return (
    <Flex gap="base" align="center">
      <div className="rounded-md bg-accent/15 px-4 py-2 text-sm text-accent-foreground">
        One
      </div>
      <div className="rounded-md bg-accent/15 px-4 py-2 text-sm text-accent-foreground">
        Two
      </div>
      <div className="rounded-md bg-accent/15 px-4 py-2 text-sm text-accent-foreground">
        Three
      </div>
    </Flex>
  );
}
