#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Script to add @example tags to all components that are missing them
 */

const COMPONENTS_DIR = 'src/components';

// Helper function to get config data
function getConfigData(componentDir) {
  const configPath = path.join(COMPONENTS_DIR, componentDir, 'config.tsx');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  const configContent = fs.readFileSync(configPath, 'utf8');

  const idMatch = configContent.match(/id:\s*["']([^"']+)["']/);
  const nameMatch = configContent.match(/name:\s*["']([^"']+)["']/);

  return {
    id: idMatch ? idMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
  };
}

// Generate a basic example based on component name and type
function generateBasicExample(componentName, componentId) {
  const examples = {
    // Form components
    'input': `<Input placeholder="Enter text..." />`,
    'textarea': `<Textarea placeholder="Enter your message..." />`,
    'button': `<Button>Click me</Button>`,
    'checkbox': `<Checkbox>Accept terms</Checkbox>`,
    'radio': `<Radio name="option" value="1">Option 1</Radio>`,
    'select': `<Select>\n *   <SelectItem value="1">Option 1</SelectItem>\n *   <SelectItem value="2">Option 2</SelectItem>\n * </Select>`,
    'switch': `<Switch>Enable notifications</Switch>`,
    'slider': `<Slider defaultValue={50} />`,
    'label': `<Label htmlFor="input">Field Label</Label>`,
    'field': `<Field>\n *   <Label>Name</Label>\n *   <Input placeholder="Enter name" />\n * </Field>`,
    'fieldset': `<Fieldset>\n *   <Legend>Personal Information</Legend>\n *   <Field>\n *     <Label>Name</Label>\n *     <Input />\n *   </Field>\n * </Fieldset>`,
    'form': `<Form>\n *   <Field>\n *     <Label>Email</Label>\n *     <Input type="email" />\n *   </Field>\n *   <Button type="submit">Submit</Button>\n * </Form>`,

    // Layout components
    'card': `<Card>\n *   <CardHeader>\n *     <CardTitle>Card Title</CardTitle>\n *   </CardHeader>\n *   <CardContent>\n *     Card content goes here.\n *   </CardContent>\n * </Card>`,
    'stack': `<Stack gap="4">\n *   <div>Item 1</div>\n *   <div>Item 2</div>\n *   <div>Item 3</div>\n * </Stack>`,
    'grid': `<Grid cols={3} gap="4">\n *   <div>Item 1</div>\n *   <div>Item 2</div>\n *   <div>Item 3</div>\n * </Grid>`,
    'divider': `<Divider />`,
    'separator': `<Separator />`,

    // Navigation components
    'navbar': `<Navbar>\n *   <NavbarSection>\n *     <NavbarItem href="/" current>Home</NavbarItem>\n *     <NavbarItem href="/about">About</NavbarItem>\n *   </NavbarSection>\n * </Navbar>`,
    'breadcrumbs': `<Breadcrumbs>\n *   <BreadcrumbItem href="/">Home</BreadcrumbItem>\n *   <BreadcrumbItem href="/products">Products</BreadcrumbItem>\n *   <BreadcrumbItem>Current Page</BreadcrumbItem>\n * </Breadcrumbs>`,
    'tabs': `<Tabs defaultValue="tab1">\n *   <TabsList>\n *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>\n *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>\n *   </TabsList>\n *   <TabsContent value="tab1">Content 1</TabsContent>\n * </Tabs>`,
    'pagination': `<Pagination currentPage={1} totalPages={10} />`,

    // Feedback components
    'alert-dialog': `<AlertDialog>\n *   <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>\n *   <AlertDialogContent>\n *     <AlertDialogTitle>Are you sure?</AlertDialogTitle>\n *     <AlertDialogDescription>\n *       This action cannot be undone.\n *     </AlertDialogDescription>\n *   </AlertDialogContent>\n * </AlertDialog>`,
    'dialog': `<Dialog>\n *   <DialogTrigger>Open Dialog</DialogTrigger>\n *   <DialogContent>\n *     <DialogTitle>Dialog Title</DialogTitle>\n *     <DialogDescription>Dialog content goes here.</DialogDescription>\n *   </DialogContent>\n * </Dialog>`,
    'toast': `<Toast>Message sent successfully!</Toast>`,
    'callout': `<Callout>\n *   Important information goes here.\n * </Callout>`,
    'badge': `<Badge>New</Badge>`,
    'dot': `<Dot color="green" />`,

    // Display components
    'avatar': `<Avatar src="/avatar.jpg" alt="User" />`,
    'loader': `<Loader />`,
    'skeleton': `<Skeleton className="h-4 w-32" />`,
    'progress': `<Progress value={60} />`,
    'meter': `<Meter value={75} />`,
    'tracker': `<Tracker data={data} />`,

    // Charts
    'area-chart': `<AreaChart data={data} />`,
    'bar-chart': `<BarChart data={data} />`,
    'line-chart': `<LineChart data={data} />`,
    'donut-chart': `<DonutChart data={data} />`,
    'combo-chart': `<ComboChart data={data} />`,
    'spark-chart': `<SparkChart data={data} />`,
    'bar-list': `<BarList data={data} />`,
    'category-bar': `<CategoryBar values={values} />`,

    // Other components
    'icon': `<Icon name="heart" />`,
    'text': `<Text>Sample text content</Text>`,
    'heading': `<Heading level={1}>Page Title</Heading>`,
    'subheading': `<Subheading>Section subtitle</Subheading>`,
    'kbd': `<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>`,
    'code-block': `<CodeBlock language="javascript">\n *   console.log('Hello, world!');\n * </CodeBlock>`,
  };

  // Return specific example if available, otherwise generate generic one
  if (examples[componentId]) {
    return examples[componentId];
  }

  // Generate generic example based on component name
  return `<${componentName}>Content</${componentName}>`;
}

// Function to add @example tag to a component's JSDoc
function addExampleTag(content, componentName, componentId) {
  const lines = content.split('\n');
  let jsdocStart = -1;
  let jsdocEnd = -1;
  let hasExample = false;

  // Find JSDoc block
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '/**') {
      jsdocStart = i;
    } else if (line === '*/' && jsdocStart !== -1) {
      jsdocEnd = i;
      break;
    } else if (line.includes('@example')) {
      hasExample = true;
    }
  }

  if (jsdocStart === -1 || jsdocEnd === -1 || hasExample) {
    return content; // No JSDoc found or already has example
  }

  // Generate example
  const example = generateBasicExample(componentName, componentId);

  // Add @example tag before the closing */
  const exampleLines = [
    ' * @example',
    ' * ```tsx',
    ...example.split('\n').map(line => ` * ${line}`),
    ' * ```'
  ];

  lines.splice(jsdocEnd, 0, ...exampleLines);
  return lines.join('\n');
}

// Function to find the main component in a file
function findMainComponent(content, componentDir) {
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for various component definition patterns
    const patterns = [
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*React\.forwardRef/,
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*forwardRef/,
      /^(?:export\s+)?function\s+([A-Z][a-zA-Z0-9]*)\s*[\(]/,
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*\(/,
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1];

        // Skip utility functions or internal components
        if (name.includes('Internal') || name.includes('Util') ||
            name.includes('Helper') || name.startsWith('use') ||
            name.includes('Context') || name.includes('Provider')) {
          continue;
        }

        return name;
      }
    }
  }

  return null;
}

// Main function to process a component file
function processComponentFile(componentDir) {
  const componentPath = path.join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);

  if (!fs.existsSync(componentPath)) {
    return { success: false, reason: 'Component file not found' };
  }

  const content = fs.readFileSync(componentPath, 'utf8');
  const config = getConfigData(componentDir);

  if (!config) {
    return { success: false, reason: 'Config file not found' };
  }

  const componentName = findMainComponent(content, componentDir);

  if (!componentName) {
    return { success: false, reason: 'Main component not found' };
  }

  const updatedContent = addExampleTag(content, componentName, config.id || componentDir);

  if (updatedContent === content) {
    return { success: true, reason: 'Already has @example tag' };
  }

  fs.writeFileSync(componentPath, updatedContent, 'utf8');
  return { success: true, reason: '@example tag added successfully' };
}

// Main execution
function main() {
  console.log('🔧 Adding @example tags to all components...\n');

  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(componentDir => {
      const componentPath = path.join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);
      return fs.existsSync(componentPath);
    })
    .sort();

  let processed = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const componentDir of componentDirs) {
    const result = processComponentFile(componentDir);
    processed++;

    if (result.success) {
      if (result.reason.includes('added')) {
        console.log(`🔧 ${componentDir}: ${result.reason}`);
        updated++;
      } else {
        console.log(`✅ ${componentDir}: ${result.reason}`);
        skipped++;
      }
    } else {
      console.log(`❌ ${componentDir}: ${result.reason}`);
      failed++;
    }
  }

  console.log('\n📊 @example Tag Addition Summary:');
  console.log(`Total components processed: ${processed}`);
  console.log(`Updated: ${updated}`);
  console.log(`Already had examples: ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log('\n✅ @example tag addition complete!');
}

main();