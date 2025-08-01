#!/usr/bin/env node

/**
 * Comprehensive script to fix JSDoc for all components based on the textarea canonical example.
 *
 * This script analyzes each component and adds/updates JSDoc to match the required structure:
 * - @component marker
 * - @name [PascalCaseName]
 * - @id [kebab-case-name]
 * - @icon [LucideIconName]
 * - @category [category]
 * - @param props - Component properties
 * - @see (for components with external dependencies)
 * - Brief description (~140 chars)
 */

const fs = require("node:fs");
const path = require("node:path");

// Component categorization mapping
const COMPONENT_CATEGORIES = {
  // Input components
  "button": { category: "inputs", icon: "Square", description: "Interactive button component with multiple variants and states for user actions." },
  "input": { category: "inputs", icon: "Type", description: "Single-line text input field with validation support and various styling options." },
  "textarea": { category: "inputs", icon: "FileText", description: "Auto-resizing multi-line text input component built on react-textarea-autosize with configurable constraints and error states." },
  "checkbox": { category: "inputs", icon: "CheckSquare", description: "Checkbox input component for boolean selections with indeterminate state support." },
  "checkbox-group": { category: "inputs", icon: "CheckSquare", description: "Group component for managing multiple related checkbox selections." },
  "radio": { category: "inputs", icon: "Circle", description: "Radio button input for single selections within a group of options." },
  "radio-group": { category: "inputs", icon: "Circle", description: "Group component for managing mutually exclusive radio button selections." },
  "radio-card-group": { category: "inputs", icon: "Circle", description: "Card-style radio group with enhanced visual presentation for option selection." },
  "select": { category: "inputs", icon: "ChevronDown", description: "Dropdown select component with search and filtering capabilities." },
  "select-native": { category: "inputs", icon: "ChevronDown", description: "Native HTML select element with consistent styling and accessibility features." },
  "combobox": { category: "inputs", icon: "Search", description: "Searchable dropdown component combining input and select functionality." },
  "switch": { category: "inputs", icon: "ToggleLeft", description: "Toggle switch component for binary on/off state selection." },
  "slider": { category: "inputs", icon: "Sliders", description: "Range slider component for selecting numeric values within a defined range." },
  "number-field": { category: "inputs", icon: "Hash", description: "Numeric input field with increment/decrement controls and validation." },
  "date-picker": { category: "inputs", icon: "Calendar", description: "Date selection component with calendar interface and input field.", hasExternal: true, seeLink: "https://react-day-picker.js.org/" },
  "toggle": { category: "inputs", icon: "ToggleLeft", description: "Toggle button component for binary state switching with visual feedback." },
  "toggle-group": { category: "inputs", icon: "ToggleLeft", description: "Group of toggle buttons for multiple selection with coordinated state." },
  "tag-input": { category: "inputs", icon: "Tag", description: "Input component for creating and managing multiple tags or labels." },

  // Form components
  "form": { category: "forms", icon: "FileText", description: "Form container component with validation and submission handling." },
  "field": { category: "forms", icon: "FormInput", description: "Form field wrapper component providing label, validation, and layout structure." },
  "fieldset": { category: "forms", icon: "FormInput", description: "Fieldset component for grouping related form fields with legend support." },

  // Chart components (external dependencies)
  "area-chart": { category: "charts", icon: "BarChart", description: "Area chart component for visualizing data trends over time with filled regions.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/AreaChart" },
  "bar-chart": { category: "charts", icon: "BarChart", description: "Bar chart component for comparing categorical data with horizontal or vertical bars.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/BarChart" },
  "line-chart": { category: "charts", icon: "TrendingUp", description: "Line chart component for displaying data trends and changes over time.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/LineChart" },
  "donut-chart": { category: "charts", icon: "PieChart", description: "Donut chart component for displaying proportional data with a hollow center.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/PieChart" },
  "combo-chart": { category: "charts", icon: "BarChart", description: "Combination chart supporting multiple chart types in a single visualization.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/ComposedChart" },
  "spark-chart": { category: "charts", icon: "TrendingUp", description: "Minimal sparkline chart for inline data visualization and trend indication.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/LineChart" },
  "category-bar": { category: "charts", icon: "BarChart", description: "Horizontal bar chart component for categorical data comparison and ranking.", hasExternal: true, seeLink: "https://recharts.org/en-US/api/BarChart" },
  "bar-list": { category: "charts", icon: "BarChart", description: "List-style bar chart component for simple data comparison with text labels." },
  "tracker": { category: "charts", icon: "Activity", description: "Progress tracking component with visual indicators for completion status.", hasExternal: true, seeLink: "https://recharts.org/en-US/api" },

  // Data components
  "table": { category: "data", icon: "Table", description: "Data table component with sorting, filtering, and pagination capabilities." },
  "list": { category: "data", icon: "List", description: "List component for displaying structured data items with flexible layouts." },
  "description-list": { category: "data", icon: "List", description: "Definition list component for displaying term-description pairs with consistent formatting." },
  "stacked-list": { category: "data", icon: "List", description: "Vertically stacked list component for displaying related items with consistent spacing." },
  "accordion": { category: "data", icon: "ChevronDown", description: "Collapsible content sections with expand/collapse functionality for organizing information." },
  "collapsible": { category: "data", icon: "ChevronDown", description: "Container component with show/hide functionality for progressive disclosure." },

  // Navigation components
  "breadcrumbs": { category: "navigation", icon: "ChevronRight", description: "Navigation component showing the current page location within a site hierarchy." },
  "navbar": { category: "navigation", icon: "Menu", description: "Top-level navigation bar component with links and branding elements." },
  "menu": { category: "navigation", icon: "Menu", description: "Contextual menu component with hierarchical navigation and action items." },
  "menu-bar": { category: "navigation", icon: "Menu", description: "Horizontal menu bar component for primary navigation and actions." },
  "navigation-menu": { category: "navigation", icon: "Navigation", description: "Complex navigation menu with dropdown submenus and keyboard navigation." },
  "pagination": { category: "navigation", icon: "MoreHorizontal", description: "Page navigation component with previous/next controls and page indicators." },
  "tab-navigation": { category: "navigation", icon: "Folder", description: "Tab-based navigation component for switching between related content sections." },
  "tabs": { category: "navigation", icon: "Folder", description: "Tabbed interface component for organizing content into selectable panels." },
  "toolbar": { category: "navigation", icon: "Settings", description: "Action toolbar component containing grouped buttons and controls." },

  // UI components
  "card": { category: "ui", icon: "Square", description: "Container component with consistent styling for grouping related content." },
  "badge": { category: "ui", icon: "Tag", description: "Small status indicator component for labels, counts, and categorical information." },
  "avatar": { category: "ui", icon: "User", description: "User profile image component with fallback initials and various size options." },
  "skeleton": { category: "ui", icon: "Loader2", description: "Loading placeholder component mimicking content structure during data fetching." },
  "loader": { category: "ui", icon: "Loader2", description: "Loading indicator component with various animation styles for async operations." },
  "progress": { category: "ui", icon: "BarChart", description: "Progress bar component for showing completion status of tasks or processes.", hasExternal: true, seeLink: "https://www.base-ui.com/react/components/progress" },
  "progress-circle": { category: "ui", icon: "Circle", description: "Circular progress indicator for displaying completion percentage in compact spaces.", hasExternal: true, seeLink: "https://www.base-ui.com/react/components/progress" },
  "meter": { category: "ui", icon: "Gauge", description: "Meter component for displaying scalar values within a known range with thresholds.", hasExternal: true, seeLink: "https://www.base-ui.com/react/components/meter" },
  "callout": { category: "ui", icon: "Info", description: "Highlighted content box for important information, warnings, or tips." },
  "alert-dialog": { category: "ui", icon: "AlertTriangle", description: "Modal dialog component for critical alerts and confirmation prompts." },
  "dialog": { category: "ui", icon: "Square", description: "Modal dialog component for displaying overlaid content and user interactions." },
  "drawer": { category: "ui", icon: "PanelLeft", description: "Slide-out panel component for navigation or supplementary content." },
  "responsive-drawer": { category: "ui", icon: "PanelLeft", description: "Responsive drawer component that adapts behavior based on screen size." },
  "sheet": { category: "ui", icon: "PanelLeft", description: "Overlay panel component sliding from screen edges for mobile-friendly interfaces." },
  "popover": { category: "ui", icon: "MessageSquare", description: "Floating content container positioned relative to trigger elements." },
  "tooltip": { category: "ui", icon: "MessageSquare", description: "Contextual information popup displayed on hover or focus interactions." },
  "context-menu": { category: "ui", icon: "MoreHorizontal", description: "Right-click contextual menu component with hierarchical action items." },
  "calendar": { category: "ui", icon: "Calendar", description: "Calendar component for date selection and navigation with customizable appearance.", hasExternal: true, seeLink: "https://react-day-picker.js.org/" },
  "carousel": { category: "ui", icon: "ChevronRight", description: "Image and content carousel component with navigation controls and indicators." },
  "sidebar": { category: "ui", icon: "Sidebar", description: "Collapsible sidebar component for navigation and supplementary content organization." },
  "dot": { category: "ui", icon: "Circle", description: "Small circular indicator component for status, notifications, or decorative purposes." },
  "divider": { category: "ui", icon: "Minus", description: "Visual separator component for dividing content sections with customizable styling." },
  "separator": { category: "ui", icon: "Minus", description: "Semantic separator component for creating visual and logical content divisions." },
  "preview-card": { category: "ui", icon: "Square", description: "Card component for displaying content previews with consistent formatting." },
  "toast": { category: "ui", icon: "Bell", description: "Temporary notification component for displaying status messages and alerts." },
  "icon": { category: "ui", icon: "Star", description: "Icon display component with consistent sizing and styling for visual elements." },
  "icon-container": { category: "ui", icon: "Square", description: "Container component for icons with consistent padding and background styling." },
  "tag": { category: "ui", icon: "Tag", description: "Label component for categorizing and tagging content with removable options." },
  "text": { category: "ui", icon: "Type", description: "Typography component with consistent text styling and semantic meaning." },
  "heading": { category: "ui", icon: "Type", description: "Heading component with hierarchical levels and consistent typography styling." },
  "heading-element": { category: "ui", icon: "Type", description: "Semantic heading element component with proper HTML heading structure." },
  "subheading": { category: "ui", icon: "Type", description: "Secondary heading component for section subtitles and supplementary titles." },
  "label": { category: "ui", icon: "Tag", description: "Form label component providing accessible labeling for input elements." },
  "kbd": { category: "ui", icon: "Command", description: "Keyboard key display component for showing keyboard shortcuts and commands." },

  // Utility components
  "copy-button": { category: "utility", icon: "Copy", description: "Button component for copying text content to the clipboard with feedback." },
  "dismiss-button": { category: "utility", icon: "X", description: "Close button component for dismissing modals, alerts, and temporary content." },
  "scroll-area": { category: "utility", icon: "Scroll", description: "Custom scrollable container component with styled scrollbars and smooth scrolling." },
  "empty-state": { category: "utility", icon: "FileX", description: "Placeholder component for displaying empty states with helpful messaging." },
  "inspector": { category: "utility", icon: "Settings", description: "Development tool component for inspecting and debugging component properties." },
  "code-block": { category: "utility", icon: "Code", description: "Syntax-highlighted code display component with copy functionality.", hasExternal: true, seeLink: "https://shiki.style/" },
  "grid": { category: "utility", icon: "Grid3x3", description: "Layout grid component with responsive columns and flexible item placement." },
  "stack": { category: "utility", icon: "Layers", description: "Layout component for arranging items vertically or horizontally with consistent spacing." },
  "split-button": { category: "utility", icon: "MoreHorizontal", description: "Compound button with primary action and dropdown menu for secondary actions." },
  "icon-select": { category: "utility", icon: "Search", description: "Icon picker component with search and selection functionality for icon libraries." },
};

// External dependency @see links
const EXTERNAL_DEPS_SEE_LINKS = {
  "textarea": "https://github.com/Andarist/react-textarea-autosize",
  "area-chart": "https://recharts.org/en-US/api/AreaChart",
  "bar-chart": "https://recharts.org/en-US/api/BarChart",
  "line-chart": "https://recharts.org/en-US/api/LineChart",
  "donut-chart": "https://recharts.org/en-US/api/PieChart",
  "combo-chart": "https://recharts.org/en-US/api/ComposedChart",
  "spark-chart": "https://recharts.org/en-US/api/LineChart",
  "category-bar": "https://recharts.org/en-US/api/BarChart",
  "tracker": "https://recharts.org/en-US/api",
  "progress": "https://www.base-ui.com/react/components/progress",
  "progress-circle": "https://www.base-ui.com/react/components/progress",
  "meter": "https://www.base-ui.com/react/components/meter",
  "calendar": "https://react-day-picker.js.org/",
  "code-block": "https://shiki.style/",
};

function kebabToPascalCase(str) {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function getComponentDirectories() {
  const componentsDir = path.join(process.cwd(), "src", "components");

  if (!fs.existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(name => !name.startsWith(".") && !name.startsWith("_"))
    .sort();
}

function findComponentDefinition(content, componentDir) {
  const lines = content.split("\n");

  // Patterns to match React component definitions
  const componentPatterns = [
    // forwardRef pattern: React.forwardRef<HTMLElement, Props>((props, ref) =>
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*React\.forwardRef/,
    // TypeScript function component pattern: const Component: React.FC<Props> = ({
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*:\s*React\.FC/,
    // Any const assignment (most flexible - catches all component styles)
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*[:=]/,
    // Function declaration pattern: function Component(props)
    /^(?:export\s+)?function\s+([A-Z][a-zA-Z0-9]*)\s*\(/,
  ];

  const expectedComponentName = kebabToPascalCase(componentDir);
  const candidateComponents = [];

  // First pass: collect all component candidates
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    for (const pattern of componentPatterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1];

        // Skip utility functions, hooks, or internal components
        // But allow legitimate component names like ContextMenu, ResponsiveDrawer
        if (name.includes("Internal") || name.includes("Util")
          || name.includes("Helper") || name.startsWith("use")
          || (name.includes("Context") && !name.match(/^(ContextMenu|ContextDialog)$/))
          || name.includes("Provider")
          || name.includes("Config") || name.includes("Schema")) {
          continue;
        }

        candidateComponents.push({ name, lineIndex: i });
      }
    }
  }

  // Second pass: prioritize the component that matches the expected name
  const exactMatch = candidateComponents.find(c => c.name === expectedComponentName);
  if (exactMatch) {
    return exactMatch;
  }
  else if (candidateComponents.length > 0) {
    // Fallback to first candidate if no exact match
    return candidateComponents[0];
  }

  return null;
}

function hasExistingJSDoc(content, componentLineIndex) {
  const lines = content.split("\n");

  // Look backwards from component definition for JSDoc
  for (let i = componentLineIndex - 1; i >= Math.max(0, componentLineIndex - 30); i--) {
    const line = lines[i].trim();

    if (line === "*/") {
      // Found end of JSDoc, look for start
      for (let j = i - 1; j >= 0; j--) {
        if (lines[j].trim() === "/**") {
          return { start: j, end: i };
        }
      }
    }
  }

  return null;
}

function generateJSDoc(componentDir, componentName) {
  const config = COMPONENT_CATEGORIES[componentDir];
  if (!config) {
    console.warn(`No configuration found for component: ${componentDir}`);
    return null;
  }

  const { category, icon, description, hasExternal, seeLink } = config;
  const pascalName = kebabToPascalCase(componentDir);

  let jsdoc = `/**\n`;
  jsdoc += ` * ${description}\n`;
  jsdoc += ` *\n`;
  jsdoc += ` * @id ${componentDir}\n`;
  jsdoc += ` * @name ${pascalName}\n`;
  jsdoc += ` * @icon ${icon}\n`;
  jsdoc += ` * @category ${category}\n`;
  jsdoc += ` * @component\n`;

  if (hasExternal && seeLink) {
    jsdoc += ` * @see {@link ${seeLink}}\n`;
  }

  jsdoc += ` * @param props - Component properties.\n`;
  jsdoc += ` */`;

  return jsdoc;
}

function processComponent(componentDir) {
  const componentsDir = path.join(process.cwd(), "src", "components");
  const componentFilePath = path.join(componentsDir, componentDir, `${componentDir}.tsx`);

  if (!fs.existsSync(componentFilePath)) {
    console.log(`❌ ${componentDir}: Component file not found`);
    return false;
  }

  const content = fs.readFileSync(componentFilePath, "utf-8");
  const componentDef = findComponentDefinition(content, componentDir);

  if (!componentDef) {
    console.log(`❌ ${componentDir}: No component definition found`);
    return false;
  }

  const { name: componentName, lineIndex } = componentDef;
  const expectedName = kebabToPascalCase(componentDir);

  if (componentName !== expectedName) {
    console.log(`⚠️  ${componentDir}: Component name "${componentName}" doesn't match expected "${expectedName}"`);
  }

  // Check if JSDoc already exists
  const existingJSDoc = hasExistingJSDoc(content, lineIndex);
  const newJSDoc = generateJSDoc(componentDir, componentName);

  if (!newJSDoc) {
    console.log(`❌ ${componentDir}: Could not generate JSDoc`);
    return false;
  }

  const lines = content.split("\n");

  if (existingJSDoc) {
    // Replace existing JSDoc
    const beforeLines = lines.slice(0, existingJSDoc.start);
    const afterLines = lines.slice(existingJSDoc.end + 1);
    const newContent = [...beforeLines, newJSDoc, ...afterLines].join("\n");

    fs.writeFileSync(componentFilePath, newContent, "utf-8");
    console.log(`✅ ${componentDir}: Updated existing JSDoc`);
  }
  else {
    // Insert new JSDoc before component definition
    const beforeLines = lines.slice(0, lineIndex);
    const afterLines = lines.slice(lineIndex);
    const newContent = [...beforeLines, newJSDoc, ...afterLines].join("\n");

    fs.writeFileSync(componentFilePath, newContent, "utf-8");
    console.log(`✅ ${componentDir}: Added new JSDoc`);
  }

  return true;
}

function main() {
  console.log("🔧 Fixing component JSDoc across all components...\n");

  const componentDirs = getComponentDirectories();
  console.log(`Found ${componentDirs.length} component directories\n`);

  let successCount = 0;
  let skipCount = 0;

  for (const componentDir of componentDirs) {
    // Skip textarea as it's the canonical example
    if (componentDir === "textarea") {
      console.log(`⏭️  ${componentDir}: Skipping canonical example`);
      skipCount++;
      continue;
    }

    const success = processComponent(componentDir);
    if (success) {
      successCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully processed: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`❌ Failed: ${componentDirs.length - successCount - skipCount}`);
  console.log(`\n🎉 JSDoc fixing complete!`);
}

if (require.main === module) {
  main();
}

module.exports = {
  processComponent,
  generateJSDoc,
  COMPONENT_CATEGORIES,
};
