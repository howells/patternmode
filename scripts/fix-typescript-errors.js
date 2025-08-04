#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

// Find and fix common TypeScript errors
async function fixTypescriptErrors() {
  console.log("🔧 Fixing TypeScript errors...");

  // Fix 1: Add children props to components that are missing them
  
  // Look at CheckboxGroup examples - these are missing children
  const checkboxGroupExamplesPath = path.join(__dirname, "../packages/ui/src/components/checkbox-group/examples.tsx");
  if (fs.existsSync(checkboxGroupExamplesPath)) {
    let content = fs.readFileSync(checkboxGroupExamplesPath, "utf8");
    
    // Add children to CheckboxGroupItem components that have only value
    content = content.replace(
      /<CheckboxGroupItem value="([^"]+)"\s*\/>/g,
      '<CheckboxGroupItem value="$1">$1</CheckboxGroupItem>'
    );
    
    fs.writeFileSync(checkboxGroupExamplesPath, content);
    console.log("✅ Fixed CheckboxGroup examples");
  }

  // Fix 2: Add children to ToggleGroup components
  const toggleGroupFiles = [
    "packages/ui/src/components/toggle-group/examples.tsx",
    "packages/ui/src/components/toggle-group/preview.tsx"
  ];

  toggleGroupFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, "..", filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf8");
      
      // Find ToggleGroup components and add sample children
      // This is more complex - let's add placeholder children
      content = content.replace(
        /<ToggleGroup([^>]+)>\s*<\/ToggleGroup>/g,
        `<ToggleGroup$1>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>`
      );
      
      // For self-closing ToggleGroup tags
      content = content.replace(
        /<ToggleGroup([^>]+)\/>/g,
        `<ToggleGroup$1>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>`
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Fixed ${filePath}`);
    }
  });

  console.log("🎉 TypeScript error fixes completed!");
}

fixTypescriptErrors().catch(console.error);