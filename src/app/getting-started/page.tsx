"use client";

import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { CodeBlock } from "@/components/ui/code-block/code-block";
import { Grid, GridCell } from "@/components/ui/grid/grid";
import { Heading } from "@/components/ui/heading/heading";
import { IconContainer } from "@/components/ui/icon-container/icon-container";
import { List, ListIndicator, ListItem } from "@/components/ui/list/list";
import { HStack, Stack, VStack } from "@/components/ui/stack/stack";
import { Subheading } from "@/components/ui/subheading/subheading";
import { Code, Text } from "@/components/ui/text/text";
import {
  Box,
  CheckCircle,
  Code as CodeIcon,
  Database,
  ExternalLink,
  FormInput,
  MessageSquare,
  Package,
  Palette,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div>
      <PageHeader
        title="Patternmode"
        description="A React component library built with TypeScript, Tailwind CSS, and Base UI. Provides accessible, customizable components for modern web applications."
        badge="Getting Started"
      />

      <Stack gap={8}>
        {/* Component Categories */}
        <div>
          <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap={6}>
            <GridCell>
              <Card>
                <CardHeader>
                  <IconContainer icon={Box} size="lg" variant="default" />
                  <CardTitle>UI Components</CardTitle>
                  <CardDescription>Essential building blocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <List>
                    <ListItem>Buttons & Cards</ListItem>
                    <ListItem>Navigation & Layout</ListItem>
                    <ListItem>Modals & Drawers</ListItem>
                    <ListItem>Icons & Badges</ListItem>
                  </List>
                </CardContent>
              </Card>
            </GridCell>

            <GridCell>
              <Card>
                <CardHeader border>
                  <HStack>
                    <IconContainer
                      icon={FormInput}
                      size="lg"
                      variant="success"
                    />
                    <VStack gap={0}>
                      <CardTitle>Form Components</CardTitle>
                      <CardDescription>Complete form toolkit</CardDescription>
                    </VStack>
                  </HStack>
                </CardHeader>
                <CardContent>
                  <List>
                    <ListItem>Inputs & Textareas</ListItem>
                    <ListItem>Selects & Comboboxes</ListItem>
                    <ListItem>Checkboxes & Radios</ListItem>
                    <ListItem>Date Pickers</ListItem>
                  </List>
                </CardContent>
              </Card>
            </GridCell>

            <GridCell>
              <Card>
                <CardHeader>
                  <IconContainer icon={Database} size="lg" color="purple" />
                  <CardTitle>Data Display</CardTitle>
                  <CardDescription>Data visualization tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <List>
                    <ListItem>Tables & Lists</ListItem>
                    <ListItem>Charts & Graphs</ListItem>
                    <ListItem>Progress Indicators</ListItem>
                    <ListItem>Empty States</ListItem>
                  </List>
                </CardContent>
              </Card>
            </GridCell>

            <GridCell>
              <Card>
                <CardHeader>
                  <IconContainer
                    icon={MessageSquare}
                    size="lg"
                    color="orange"
                  />
                  <CardTitle>Feedback</CardTitle>
                  <CardDescription>User communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <List>
                    <ListItem>Toast Notifications</ListItem>
                    <ListItem>Alert Dialogs</ListItem>
                    <ListItem>Tooltips & Popovers</ListItem>
                    <ListItem>Callouts</ListItem>
                  </List>
                </CardContent>
              </Card>
            </GridCell>
          </Grid>
        </div>

        {/* Installation Section */}
        <div>
          <Heading level={2}>Installation</Heading>

          {/* Prerequisites */}
          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>
                Make sure you have the following installed before proceeding:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <List variant="plain" align="center">
                <ListItem>
                  <ListIndicator icon={CheckCircle} />
                  Node.js 18.0.0 or higher
                </ListItem>
                <ListItem>
                  <ListIndicator icon={CheckCircle} />
                  pnpm, npm, or yarn package manager
                </ListItem>
                <ListItem>
                  <ListIndicator icon={CheckCircle} />A React project (Next.js,
                  Vite, Create React App, etc.)
                </ListItem>
                <ListItem>
                  <ListIndicator icon={CheckCircle} />
                  Tailwind CSS (recommended for styling)
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
                  <CardTitle>Install Patternmode UI</CardTitle>
                </div>
                <CardDescription>
                  Install the main component library using your preferred
                  package manager.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <div>
                    <Text>Using pnpm (recommended):</Text>
                    <CodeBlock language="bash">
                      {`pnpm add @patternmode/react`}
                    </CodeBlock>
                  </div>
                  <div>
                    <Text>Using npm:</Text>
                    <CodeBlock language="bash">
                      {`npm install @patternmode/react`}
                    </CodeBlock>
                  </div>
                  <div>
                    <Text>Using yarn:</Text>
                    <CodeBlock language="bash">
                      {`yarn add @patternmode/react`}
                    </CodeBlock>
                  </div>
                </Stack>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardHeader>
                <div>
                  <Badge variant="default">Step 2</Badge>
                  <CardTitle>Install Peer Dependencies</CardTitle>
                </div>
                <CardDescription>
                  Install the required peer dependencies that Patternmode UI
                  depends on.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Text>
                    Patternmode UI requires several peer dependencies to
                    function properly. Install them using your package manager:
                  </Text>
                  <CodeBlock language="bash">
                    {`# Install peer dependencies
pnpm add react react-dom @base-ui-components/react lucide-react recharts zod framer-motion`}
                  </CodeBlock>
                  <div>
                    <div>
                      <Package />
                      <div>
                        <Text>Why Peer Dependencies?</Text>
                        <Text size="sm">
                          Using peer dependencies prevents version conflicts and
                          reduces bundle size by allowing your app to use its
                          own versions of these packages.
                        </Text>
                      </div>
                    </div>
                  </div>
                </Stack>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardHeader>
                <div>
                  <Badge variant="default">Step 3</Badge>
                  <CardTitle>
                    Set Up Tailwind CSS (Optional but Recommended)
                  </CardTitle>
                </div>
                <CardDescription>
                  Configure Tailwind CSS for optimal styling and theming
                  support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Text>
                    While Patternmode UI works without Tailwind CSS, we highly
                    recommend using it for the best experience and full theming
                    capabilities.
                  </Text>
                  <CodeBlock language="bash">
                    {`# Install Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p`}
                  </CodeBlock>
                  <Text>
                    Then add the following to your{" "}
                    <Code>tailwind.config.js</Code>:
                  </Text>
                  <CodeBlock language="javascript">
                    {`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@patternmode/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
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
                  Start using Patternmode UI components in your React
                  application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Text>
                    You can now import and use any component from the library:
                  </Text>
                  <CodeBlock language="tsx">
                    {`import { Button, Card, Heading } from '@patternmode/react';

function App() {
  return (
    <div className="p-8">
      <Heading level={1}>Welcome to My App</Heading>
      <Card>
        <CardContent className="p-6">
          <p>This is a card component from Patternmode UI!</p>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  );
}`}
                  </CodeBlock>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </div>

        {/* Next Steps */}
        <Card>
          <CardContent>
            <Heading level={2}>What&apos;s Next?</Heading>
            <Text size="lg">
              Now that you have Patternmode UI installed, explore the components
              and start building!
            </Text>
            <Stack direction="horizontal" gap={4}>
              <Button render={<Link href="/ui" />}>
                Browse Components
                <ExternalLink />
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
}
