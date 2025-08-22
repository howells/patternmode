"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Heading } from "@patternmode/ui/components/heading";
import { Stack } from "@patternmode/stack";
import { Text } from "@patternmode/text";

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
