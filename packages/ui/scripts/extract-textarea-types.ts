#!/usr/bin/env tsx

/**
 * Type Extraction Script for react-textarea-autosize
 *
 * This script analyzes the types available from react-textarea-autosize
 * and generates documentation for the props that our Textarea component inherits.
 */

import type React from "react";
import type TextareaAutosize from "react-textarea-autosize";

// Extract the props type from react-textarea-autosize (for analysis)
type _TextareaAutosizeProps = React.ComponentPropsWithoutRef<typeof TextareaAutosize>;

// Standard HTML textarea props (for analysis)
type _HTMLTextareaProps = React.ComponentPropsWithoutRef<"textarea">;

// Type analysis for documentation purposes
// (These help us understand the prop inheritance structure)

/**
 * Generate prop documentation based on TypeScript types
 */
function generatePropDocumentation() {
  const propCategories = {
    "Core HTML Props": {
      description: "Standard HTML textarea attributes that work in both modes",
      props: [
        "name",
        "id",
        "required",
        "disabled",
        "readOnly",
        "placeholder",
        "value",
        "defaultValue",
        "onChange",
        "onFocus",
        "onBlur",
        "className",
        "style",
      ],
    },
    "Standard Textarea Props": {
      description: "Props only used when autoResize=false (native textarea mode)",
      props: ["rows", "cols", "wrap"],
    },
    "Auto-resize Props": {
      description: "Props only used when autoResize=true (react-textarea-autosize mode)",
      props: ["minRows", "maxRows", "onHeightChange", "cacheMeasurements"],
    },
    "Custom Props": {
      description: "Props specific to our Textarea component",
      props: ["hasError", "autoResize"],
    },
  };

  return propCategories;
}

/**
 * Generate TypeScript interface documentation
 */
function generateInterfaceDocumentation() {
  return `
/**
 * Enhanced Textarea props that conditionally extend different base types
 * based on the autoResize prop value.
 */
interface TextareaProps {
  // When autoResize=true: extends React.ComponentPropsWithoutRef<typeof TextareaAutosize>
  // When autoResize=false: extends React.ComponentPropsWithoutRef<'textarea'>

  // Custom props
  hasError?: boolean;
  autoResize?: boolean;

  // All other props are inherited from the appropriate base type
}

// Alternative approach using conditional types:
type TextareaProps<TAutoResize extends boolean = true> =
  TAutoResize extends true
    ? React.ComponentPropsWithoutRef<typeof TextareaAutosize> & CustomTextareaProps
    : React.ComponentPropsWithoutRef<'textarea'> & CustomTextareaProps;

interface CustomTextareaProps {
  hasError?: boolean;
  autoResize?: boolean;
}
`;
}

/**
 * Analyze prop inheritance patterns
 */
function analyzePropInheritance() {
  console.log("🔍 Analyzing react-textarea-autosize type inheritance...\n");

  const categories = generatePropDocumentation();

  Object.entries(categories).forEach(([categoryName, { description, props }]) => {
    console.log(`📋 ${categoryName}`);
    console.log(`   ${description}`);
    console.log(`   Props: ${props.join(", ")}\n`);
  });

  console.log("📝 Recommended TypeScript Interface:");
  console.log(generateInterfaceDocumentation());
}

/**
 * Generate config props based on TypeScript analysis
 */
function generateConfigProps() {
  const configProps = [
    // Core HTML Props
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text shown when empty",
      defaultValue: "",
      category: "Core HTML Props",
    },
    {
      name: "value",
      type: "string",
      description: "Current value of the textarea",
      defaultValue: "",
      category: "Core HTML Props",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLTextAreaElement>) => void",
      description: "Callback fired when value changes",
      defaultValue: "",
      category: "Core HTML Props",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for form submission",
      defaultValue: "",
      category: "Core HTML Props",
    },
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the textarea",
      defaultValue: "",
      category: "Core HTML Props",
    },
    {
      name: "required",
      type: "boolean",
      description: "Whether the textarea is required for form validation",
      defaultValue: false,
      category: "Core HTML Props",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the textarea is disabled",
      defaultValue: false,
      category: "Core HTML Props",
    },
    {
      name: "readOnly",
      type: "boolean",
      description: "Whether the textarea is read-only",
      defaultValue: false,
      category: "Core HTML Props",
    },

    // Custom Props
    {
      name: "hasError",
      type: "boolean",
      description: "Whether to display error styling for form validation",
      defaultValue: false,
      category: "Custom Props",
    },
    {
      name: "autoResize",
      type: "boolean",
      description: "Whether to enable auto-resizing behavior using react-textarea-autosize",
      defaultValue: true,
      category: "Custom Props",
    },

    // Auto-resize Props (react-textarea-autosize)
    {
      name: "minRows",
      type: "number",
      description: "Minimum number of rows to display (only when autoResize=true)",
      defaultValue: 3,
      min: 1,
      category: "Auto-resize Props",
    },
    {
      name: "maxRows",
      type: "number",
      description: "Maximum number of rows before scrolling (only when autoResize=true)",
      defaultValue: undefined,
      min: 1,
      category: "Auto-resize Props",
    },
    {
      name: "onHeightChange",
      type: "(height: number, meta: { rowHeight: number }) => void",
      description: "Callback when textarea height changes (only when autoResize=true)",
      defaultValue: "",
      category: "Auto-resize Props",
    },
    {
      name: "cacheMeasurements",
      type: "boolean",
      description: "Cache measurements for better performance (only when autoResize=true)",
      defaultValue: false,
      category: "Auto-resize Props",
    },

    // Standard Textarea Props (when autoResize=false)
    {
      name: "rows",
      type: "number",
      description: "Number of visible text lines (only when autoResize=false)",
      defaultValue: undefined,
      min: 1,
      category: "Standard Textarea Props",
    },
    {
      name: "cols",
      type: "number",
      description: "Visible width of the text control (only when autoResize=false)",
      defaultValue: undefined,
      min: 1,
      category: "Standard Textarea Props",
    },

    // Styling Props
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the textarea",
      defaultValue: "",
      category: "Core HTML Props",
    },
    {
      name: "style",
      type: "React.CSSProperties",
      description: "Standard CSS style object",
      defaultValue: undefined,
      category: "Core HTML Props",
    },
  ];

  return configProps;
}

// Run the analysis
if (require.main === module) {
  analyzePropInheritance();

  console.log("\n🎯 Generated Config Props:");
  const configProps = generateConfigProps();

  // Group by category
  const groupedProps = configProps.reduce((acc, prop) => {
    if (!acc[prop.category]) {
      acc[prop.category] = [];
    }
    acc[prop.category].push(prop);
    return acc;
  }, {} as Record<string, typeof configProps>);

  Object.entries(groupedProps).forEach(([category, props]) => {
    console.log(`\n📋 ${category}:`);
    props.forEach((prop) => {
      console.log(`   • ${prop.name}: ${prop.type}`);
      console.log(`     ${prop.description}`);
    });
  });
}

export { generateConfigProps, generatePropDocumentation };
