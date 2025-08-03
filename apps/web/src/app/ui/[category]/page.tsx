import { Badge } from "@patternmode/ui/badge";
import { Card } from "@patternmode/ui/card";
import { Grid, GridCell } from "@patternmode/ui/grid";
import { Heading } from "@patternmode/ui/heading";
import {
  CATEGORY_CONFIG,
  getCategoryInfo,
  getComponentsByCategory,
} from "@patternmode/ui/registry";
import { HStack, VStack } from "@patternmode/ui/stack";
import { Subheading } from "@patternmode/ui/subheading";
import { Text } from "@patternmode/ui/text";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { CategoryKey } from "@patternmode/ui/components/registry";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category is a valid CategoryKey
  const validCategory = CATEGORY_CONFIG.find(c => c.key === category);
  if (!validCategory) {
    notFound();
  }

  const categoryKey = validCategory.key as CategoryKey;
  const info = getCategoryInfo(categoryKey);
  const components = getComponentsByCategory(categoryKey);

  if (!info) {
    notFound();
  }

  return (
    <VStack padding={6} gap={8} as="main">
      {/* Header */}
      <VStack>
        <HStack align="center">
          <Heading level={1}>{info.title}</Heading>
          <Badge variant="neutral">
            {components.length}
            {" "}
            components
          </Badge>
        </HStack>
        <Text>{info.description}</Text>
      </VStack>

      {/* Component Grid */}
      {components.length > 0
        ? (
            <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={6} minHeight="none">
              {components.map(component => (
                <GridCell key={component.id}>
                  <Link href={`/ui/${categoryKey}/${component.id}`}>
                    <Card fillHeight>
                      <VStack>
                        <HStack justify="between" align="center">
                          <Subheading>{component.name}</Subheading>
                          {component.badge && (
                            <Badge variant="neutral">{component.badge}</Badge>
                          )}
                        </HStack>
                        <Text>{component.description}</Text>
                        <Text>
                          {component.examples.length}
                          {" "}
                          examples
                          {component.api && " • API reference"}
                          {component.accessibility && " • Accessible"}
                        </Text>
                      </VStack>
                    </Card>
                  </Link>
                </GridCell>
              ))}
            </Grid>
          )
        : (
            <VStack align="center" padding={12}>
              <Text>No components available in this category yet.</Text>
            </VStack>
          )}
    </VStack>
  );
}

export async function generateStaticParams() {
  return CATEGORY_CONFIG.map(category => ({
    category: category.key,
  }));
}
