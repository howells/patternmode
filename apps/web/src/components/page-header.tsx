"use client";

import { Badge, Heading, Stack, Text } from "@patternmode/ui";

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
};

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <Stack gap={2} padding={6} className="border-b">
      <Stack direction="horizontal" align="center" gap={3}>
        <Heading level={1}>{title}</Heading>
        {badge && <Badge variant="neutral">{badge}</Badge>}
      </Stack>
      {description && <Text>{description}</Text>}
    </Stack>
  );
}
