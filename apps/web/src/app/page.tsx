"use client";

import type { LucideIcon } from "lucide-react";
import type { GlobalSemanticVariant, TailwindColor } from "../lib/variants";

import {
  Badge,
  Button,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Code,
  CodeBlock,
  Grid,
  GridCell,
  Heading,
  HStack,
  IconContainer,
  List,
  ListIndicator,
  ListItem,
  Stack,
  Subheading,
  Text,
  VStack,
} from "@patternmode/ui";

import {
  Box,
  CheckCircle,
  Code as CodeIcon,
  Database,
  ExternalLink,
  FormInput,
  MessageSquare,
  Package,
} from "lucide-react";

import Link from "next/link";
import { PageHeader } from "../components/page-header";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  variant?: GlobalSemanticVariant;
  color?: GlobalSemanticVariant | TailwindColor;
  headerBorder?: boolean;
  useHorizontalLayout?: boolean;
}

function CategoryCard({
  icon: Icon,
  title,
  description,
  items,
  variant = "default",
  color,
  headerBorder = false,
  useHorizontalLayout = false,
}: CategoryCardProps) {
  if (useHorizontalLayout) {
    return (
      <Card>
        <CardHeader border={headerBorder}>
          <HStack align="center">
            <IconContainer
              icon={Icon}
              size="lg"
              variant={variant}
              color={color}
            />
            <VStack gap={1}>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </VStack>
          </HStack>
        </CardHeader>
        <CardContent>
          <List>
            {items.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <IconContainer icon={Icon} size="lg" variant={variant} color={color} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

const componentCategories = [
  {
    icon: Box,
    title: "UI Components",
    description: "Essential building blocks",
    items: [
      "Buttons & Cards",
      "Navigation & Layout",
      "Modals & Drawers",
      "Icons & Badges",
    ],
    variant: "default" as const,
    headerBorder: true,
    useHorizontalLayout: true,
  },
  {
    icon: FormInput,
    title: "Form Components",
    description: "Complete form toolkit",
    items: [
      "Inputs & Textareas",
      "Selects & Comboboxes",
      "Checkboxes & Radios",
      "Date Pickers",
    ],
    variant: "success" as const,
    headerBorder: true,
    useHorizontalLayout: true,
  },
  {
    icon: Database,
    title: "Data Display",
    description: "Data visualization tools",
    items: [
      "Tables & Lists",
      "Charts & Graphs",
      "Progress Indicators",
      "Empty States",
    ],
    color: "purple" as const,
    headerBorder: true,
    useHorizontalLayout: true,
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "User communication",
    items: [
      "Toast Notifications",
      "Alert Dialogs",
      "Tooltips & Popovers",
      "Callouts",
    ],
    color: "orange" as const,
    headerBorder: true,
    useHorizontalLayout: true,
  },
];

export default function Home() {
  return (
    <div>
      <PageHeader
        title="Patternmode"
        description="A React component library built with TypeScript, Tailwind CSS, and Base UI. Provides accessible, customizable components for modern web applications."
      />

      <Stack gap={8}>
        {/* Component Categories */}
        <div className="p-6">
          <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap={6}>
            {componentCategories.map((category, index) => (
              <GridCell key={index}>
                <CategoryCard {...category} />
              </GridCell>
            ))}
          </Grid>
        </div>

        {/* Installation Section */}
        <div className="p-6">
          <Heading level={2}>Installation</Heading>

          {/* Prerequisites */}
          <Card>
            <CardHeader border={true}>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>
                Make sure you have the following installed before proceeding:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <List align="center">
                <ListItem>
                  <ListIndicator icon={CheckCircle} />
                  Node.js 18.0.0 or higher
                </ListItem>
                <ListItem>
                  <ListIndicator icon={CheckCircle} />
                  pnpm package manager (recommended)
                </ListItem>
                <ListItem>
                  <ListIndicator icon={CheckCircle} />A React 19+ project
                  (Next.js, Vite, Create React App, etc.)
                </ListItem>
                <ListItem>
                  <ListIndicator icon={CheckCircle} />
                  Tailwind CSS v4+ for styling
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Installation Steps */}
          <Stack gap={6}>
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <div>
                  <Badge variant="default">Step 1</Badge>
                  <CardTitle>Clone or Copy Components</CardTitle>
                </div>
                <CardDescription>
                  This is a component library template. Copy the components you
                  need into your project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <div>
                    <Text>Clone the repository:</Text>
                    <CodeBlock language="bash">
                      {`git clone https://github.com/your-org/patternmode.git
cd patternmode`}
                    </CodeBlock>
                  </div>
                  <div>
                    <Text>
                      Or copy individual components from the{" "}
                      <Code>src/components/ui/</Code> directory into your
                      project.
                    </Text>
                  </div>
                </Stack>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardHeader>
                <div>
                  <Badge variant="default">Step 2</Badge>
                  <CardTitle>Install Required Dependencies</CardTitle>
                </div>
                <CardDescription>
                  Install the peer dependencies that the components require to
                  function.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Text>Install the required peer dependencies:</Text>
                  <CodeBlock language="bash">
                    {`# Core React dependencies (v19+)
pnpm add react@^19.0.0 react-dom@^19.0.0

# UI and component dependencies
pnpm add @base-ui-components/react@^1.0.0 lucide-react@^0.525.0

# Data fetching and state management
pnpm add @tanstack/react-query@^5.0.0

# Data visualization and charts
pnpm add recharts@^3.1.0

# Animation and validation
pnpm add framer-motion@^12.23.0 zod@^4.0.0

# Optional: Next.js for automatic image optimization
pnpm add next@^14.0.0`}
                  </CodeBlock>
                  <Callout
                    title="Why These Dependencies?"
                    variant="default"
                    icon={Package}
                  >
                    These are peer dependencies that prevent version conflicts
                    and allow your app to control the versions of these core
                    packages.
                  </Callout>
                </Stack>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardHeader>
                <div>
                  <Badge variant="default">Step 3</Badge>
                  <CardTitle>Set Up Tailwind CSS v4</CardTitle>
                </div>
                <CardDescription>
                  Configure Tailwind CSS v4 for styling support (required for
                  components to work properly).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Text>
                    The components require Tailwind CSS v4 for styling. Install
                    and configure it:
                  </Text>
                  <CodeBlock language="bash">
                    {`# Install Tailwind CSS v4
pnpm add -D @tailwindcss/postcss tailwindcss

# Add to your CSS file (e.g., globals.css)
echo "@import 'tailwindcss';" > src/app/globals.css`}
                  </CodeBlock>
                  <Text>
                    Update your <Code>postcss.config.js</Code>:
                  </Text>
                  <CodeBlock language="javascript">
                    {`module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}`}
                  </CodeBlock>
                  <Text>
                    Add component paths to your <Code>tailwind.config.ts</Code>:
                  </Text>
                  <CodeBlock language="typescript">
                    {`import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Add paths to copied components
    './components/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config`}
                  </CodeBlock>
                </Stack>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card>
              <CardHeader>
                <div>
                  <Badge variant="default">Step 4</Badge>
                  <CardTitle>Import and Use Components</CardTitle>
                </div>
                <CardDescription>
                  Start using the components in your React application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Text>
                    Import components from your local components directory:
                  </Text>
                  <CodeBlock language="tsx">
                    {`// Import from your copied components
import { Button } from '@patternmode/ui
import { Card, CardContent } from '@patternmode/ui
import { Heading } from '@patternmode/ui

function App() {
  return (
    <div className="p-8">
      <Heading level={1}>Welcome to My App</Heading>
      <Card>
        <CardContent className="p-6">
          <p>This is a card component from Patternmode!</p>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  );
}`}
                  </CodeBlock>
                  <Callout
                    variant="warning"
                    title="Don't Forget Dependencies"
                    icon={ExternalLink}
                  >
                    Make sure to also copy the required utility files like{" "}
                    <Code>@/lib/utils</Code>,<Code>@/lib/variants</Code>, and
                    any hooks the components depend on.
                  </Callout>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </div>

        {/* Next Steps */}
        <div className="p-6">
          <Subheading level={2}>What&apos;s Next?</Subheading>
          <Text>
            Now that you have the components set up, explore the available
            components and start building!
          </Text>
          <HStack gap={4} className="mt-4">
            <Button render={<Link href="/ui" />} rightIcon={ExternalLink}>
              Browse Components
            </Button>
          </HStack>
        </div>
      </Stack>
    </div>
  );
}
