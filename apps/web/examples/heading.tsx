"use client";

import { Heading } from "@patternmode/ui/components/heading";

export default function HeadingExample() {
  return (
    <div className="flex flex-col gap-3">
      <Heading level="1" size="lg">
        Large heading
      </Heading>
      <Heading level="2" size="base">
        Base heading
      </Heading>
      <Heading level="3" size="sm">
        Small heading
      </Heading>
    </div>
  );
}
