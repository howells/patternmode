"use client";

import { Badge } from "@patternmode/ui/components/badge";

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Neutral</Badge>
      <Badge variant="secondary">Accent</Badge>
      <Badge variant="affirmative">Success</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
