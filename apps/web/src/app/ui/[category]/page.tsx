import type { CategoryKey } from "@/registry/components";

import { Badge } from "@patternmode/badge";
import { Card } from "@patternmode/card";
import { Grid, GridCell } from "@patternmode/grid";
import { Heading } from "@patternmode/heading";
import { CATEGORY_CONFIG, getCategoryInfo, getComponentsByCategory } from "@/registry/components";
import { HStack, VStack } from "@patternmode/stack";
import { Subheading } from "@patternmode/subheading";
import { Text } from "@patternmode/text";
import Link from "next/link";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

// Type guard to safely read optional boolean flags without `any`
const hasBooleanProp = <K extends string>(
  objectValue: object,
  key: K,
): objectValue is Record<K, boolean> => {
  return Object.prototype.hasOwnProperty.call(objectValue, key);
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
                          {component.examples?.length ?? 0}
                          {" "}
                          examples
                          {hasBooleanProp(component, "api") && component.api && " • API reference"}
                          {hasBooleanProp(component, "accessibility") && component.accessibility && " • Accessible"}
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
