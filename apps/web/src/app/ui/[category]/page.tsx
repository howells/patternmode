import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Badge,
  Card,
  Grid,
  GridCell,
  Heading,
  HStack,
  Subheading,
  Text,
  VStack,
} from "@patternmode/ui";

import {
  CATEGORY_CONFIG,
  getComponentsByCategory,
} from "@patternmode/ui/component-registry";
import type { CategoryKey } from "@patternmode/ui/component-registry";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

// Create mapping from category keys to display info
const categoryInfo = CATEGORY_CONFIG.reduce((acc, category) => {
  const descriptions: Record<CategoryKey, string> = {
    data: "Components for displaying and organizing structured data.",
    ui: "Core user interface components for building applications.", 
    inputs: "Form inputs and interactive controls for user data collection.",
    forms: "Form layouts and validation components for complex data entry.",
    charts: "Data visualization components for displaying metrics and analytics.",
    navigation: "Navigation menus, breadcrumbs, and wayfinding components.",
    typography: "Typography and text formatting components for content display.",
    utility: "Helper components and tools for enhanced functionality.",
    layout: "Structural components for organizing and positioning content.",
    feedback: "Status indicators, notifications, and user feedback components.",
  };
  
  acc[category.key] = {
    title: `${category.name} Components`,
    description: descriptions[category.key] || `${category.name} components for your application.`,
  };
  return acc;
}, {} as Record<CategoryKey, { title: string; description: string }>);

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category is a valid CategoryKey
  const validCategory = CATEGORY_CONFIG.find(c => c.key === category);
  if (!validCategory) {
    notFound();
  }

  const categoryKey = validCategory.key as CategoryKey;
  const info = categoryInfo[categoryKey];
  const components = getComponentsByCategory(categoryKey);

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
