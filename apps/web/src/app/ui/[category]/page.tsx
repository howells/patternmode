import { Badge, Card, Grid, GridCell, Heading, HStack, VStack, Subheading, Text } from "@patternmode/ui";
import { getComponentsByCategory } from "@/lib/component-registry";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryInfo = {
  text: {
    title: "Text Components",
    description:
      "Typography and text formatting components for content display.",
  },
  layout: {
    title: "Layout Components",
    description:
      "Structural components for organizing and positioning content.",
  },
  navigation: {
    title: "Navigation Components",
    description: "Navigation menus, breadcrumbs, and wayfinding components.",
  },
  feedback: {
    title: "Feedback Components",
    description:
      "Status indicators, notifications, and user feedback components.",
  },
  overlay: {
    title: "Overlay Components",
    description: "Modals, dialogs, tooltips, and other overlay elements.",
  },
  data: {
    title: "Data Components",
    description: "Components for displaying and organizing structured data.",
  },
  media: {
    title: "Media Components",
    description: "Image, video, and multimedia display components.",
  },
  utility: {
    title: "Utility Components",
    description: "Helper components and tools for enhanced functionality.",
  },
  inputs: {
    title: "Input Components",
    description:
      "Form inputs and interactive controls for user data collection.",
  },
  forms: {
    title: "Form Components",
    description:
      "Form layouts and validation components for complex data entry.",
  },
  charts: {
    title: "Chart Components",
    description:
      "Data visualization components for displaying metrics and analytics.",
  },
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Validate category
  if (!(category in categoryInfo)) {
    notFound();
  }

  const info = categoryInfo[category as keyof typeof categoryInfo];
  const components = getComponentsByCategory(category);

  return (
    <VStack padding={6} gap={8} as="main">
      {/* Header */}
      <VStack>
        <HStack align="center">
          <Heading level={1}>{info.title}</Heading>
          <Badge variant="neutral">{components.length} components</Badge>
        </HStack>
        <Text>{info.description}</Text>
      </VStack>

      {/* Component Grid */}
      {components.length > 0 ? (
        <Grid
          columns={{ sm: 1, md: 2, lg: 3 }}
          gap={6}
          minHeight="none"
        >
          {components.map((component) => (
            <GridCell key={component.id}>
              <Link href={`/ui/${category}/${component.id}`}>
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
                      {component.examples.length} examples
                      {component.api && " • API reference"}
                      {component.accessibility && " • Accessible"}
                    </Text>
                  </VStack>
                </Card>
              </Link>
            </GridCell>
          ))}
        </Grid>
      ) : (
        <VStack align="center" padding={12}>
          <Text>No components available in this category yet.</Text>
        </VStack>
      )}
    </VStack>
  );
}

export async function generateStaticParams() {
  return [
    { category: "text" },
    { category: "layout" },
    { category: "navigation" },
    { category: "feedback" },
    { category: "overlay" },
    { category: "data" },
    { category: "media" },
    { category: "utility" },
    { category: "inputs" },
    { category: "forms" },
    { category: "charts" },
  ];
}
