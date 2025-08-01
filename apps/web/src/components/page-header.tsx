"use client";

import { Badge, Heading, Text } from "@patternmode/ui";

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
};

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="space-y-2 px-6 py-6 border-b">
      <div className="flex items-center gap-3">
        <Heading level={1}>{title}</Heading>
        {badge && <Badge variant="neutral">{badge}</Badge>}
      </div>
      {description && <Text>{description}</Text>}
    </div>
  );
}
