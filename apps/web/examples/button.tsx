"use client";

import { Button } from "@patternmode/ui/components/button";

export default function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="default">Accent</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
