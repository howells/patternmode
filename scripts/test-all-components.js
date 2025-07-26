#!/usr/bin/env node

const { spawn } = require('child_process');

// Component lists from the registry
const COMPONENT_CATEGORIES = {
  ui: [
    "accordion", "alert-dialog", "avatar", "badge", "breadcrumbs", "button", 
    "calendar", "callout", "card", "carousel", "code-block", "collapsible", 
    "combobox", "command", "context-menu", "copy-button", "description-list", 
    "dialog", "divider", "drawer", "empty-state", "grid", "heading", "subheading", 
    "label", "loader", "menu", "menu-bar", "meter", "navbar", "navigation-menu", 
    "pagination", "popover", "preview-card", "progress", "progress-circle", 
    "responsive-drawer", "scroll-area", "separator", "sheet", "sidebar", 
    "skeleton", "split-button", "stack", "stacked-list", "dot", 
    "tab-navigation", "table", "tabs", "tag", "text", "toast", "toggle", 
    "toggle-group", "toolbar", "tooltip", "touch-target", "tracker"
  ],
  inputs: [
    "checkbox", "checkbox-group", "date-picker", "date-range-picker", "input", 
    "number-field", "radio", "radio-card-group", "radio-group", "select", 
    "select-native", "slider", "switch", "textarea"
  ],
  forms: ["field", "fieldset", "form"],
  charts: [
    "area-chart", "bar-chart", "bar-list", "category-bar", "combo-chart", 
    "donut-chart", "line-chart", "spark-chart"
  ]
};

// Generate all component URLs
const generateTestUrls = () => {
  const urls = [];
  
  Object.entries(COMPONENT_CATEGORIES).forEach(([category, components]) => {
    components.forEach(component => {
      urls.push({
        category,
        component,
        url: `http://localhost:3000/${category}/${component}`
      });
    });
  });
  
  return urls;
};

// Playwright test script
const playwrightTestScript = `
const { test, expect } = require('@playwright/test');

const TEST_URLS = ${JSON.stringify(generateTestUrls(), null, 2)};

test.describe('Component Pages Test Suite', () => {
  let results = {
    passed: [],
    failed: []
  };

  TEST_URLS.forEach(({ category, component, url }) => {
    test(\`\${category}/\${component} - should load without server errors\`, async ({ page }) => {
      console.log(\`Testing: \${url}\`);
      
      // Capture console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      try {
        // Navigate to the component page
        const response = await page.goto(url, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
        
        // Check if page loaded successfully
        expect(response.status()).toBe(200);
        
        // Wait for page content to load
        await page.waitForSelector('h1', { timeout: 10000 });
        
        // Check for specific server-side rendering errors
        const serverErrors = consoleErrors.filter(error => 
          error.includes('Attempted to call') || 
          error.includes('server component') ||
          error.includes('hydration') ||
          error.includes('TypeError')
        );
        
        if (serverErrors.length > 0) {
          console.error(\`❌ \${component}: Server errors found:\`);
          serverErrors.forEach(error => console.error(\`   - \${error}\`));
          results.failed.push({ category, component, url, errors: serverErrors });
        } else {
          console.log(\`✅ \${component}: No server errors\`);
          results.passed.push({ category, component, url });
        }
        
        // Take a screenshot for visual verification
        await page.screenshot({ 
          path: \`screenshots/\${category}-\${component}.png\`,
          fullPage: false 
        });
        
      } catch (error) {
        console.error(\`❌ \${component}: Test failed - \${error.message}\`);
        results.failed.push({ 
          category, 
          component, 
          url, 
          errors: [error.message] 
        });
      }
    });
  });

  test.afterAll(async () => {
    // Generate comprehensive report
    console.log('\\n' + '='.repeat(80));
    console.log('COMPREHENSIVE TEST RESULTS');
    console.log('='.repeat(80));
    
    console.log(\`\\n📊 SUMMARY:\`);
    console.log(\`✅ Passed: \${results.passed.length}\`);
    console.log(\`❌ Failed: \${results.failed.length}\`);
    console.log(\`📋 Total: \${results.passed.length + results.failed.length}\`);
    
    if (results.passed.length > 0) {
      console.log(\`\\n✅ PASSING COMPONENTS (\${results.passed.length}):\`);
      results.passed.forEach(({ category, component }) => {
        console.log(\`   • \${category}/\${component}\`);
      });
    }
    
    if (results.failed.length > 0) {
      console.log(\`\\n❌ FAILING COMPONENTS (\${results.failed.length}):\`);
      results.failed.forEach(({ category, component, errors }) => {
        console.log(\`   • \${category}/\${component}\`);
        if (errors && errors.length > 0) {
          errors.forEach(error => console.log(\`     - \${error}\`));
        }
      });
    }
    
    console.log('\\n' + '='.repeat(80));
    
    // Write detailed JSON report
    const fs = require('fs');
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        total: results.passed.length + results.failed.length,
        passed: results.passed.length,
        failed: results.failed.length
      },
      results: {
        passed: results.passed,
        failed: results.failed
      }
    };
    
    fs.writeFileSync('test-results.json', JSON.stringify(reportData, null, 2));
    console.log('📄 Detailed report saved to: test-results.json');
  });
});
`;

// Write the Playwright test file
const fs = require('fs');
const path = require('path');

// Create screenshots directory
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

// Write the test file
fs.writeFileSync('component-tests.spec.js', playwrightTestScript);

console.log('🚀 Component testing setup complete!');
console.log('📋 Total URLs to test: ' + generateTestUrls().length);
console.log('');
console.log('Test categories:');
Object.entries(COMPONENT_CATEGORIES).forEach(([category, components]) => {
  console.log('  ' + category + ': ' + components.length + ' components');
});

console.log('');
console.log('📁 Files created:');
console.log('  • component-tests.spec.js - Playwright test suite');
console.log('  • screenshots/ - Directory for component screenshots');
console.log('');
console.log('▶️  To run the tests:');
console.log('   npx playwright test component-tests.spec.js');
console.log('');
console.log('📄 After tests complete, check:');
console.log('   • test-results.json - Detailed JSON report');
console.log('   • screenshots/ - Visual verification images');