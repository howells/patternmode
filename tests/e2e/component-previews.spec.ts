import { COMPONENT_LIST } from "@/lib/component-registry";
import { expect, Page, test } from "@playwright/test";

// Helper function to test a single component page
async function testComponentPage(
  page: Page,
  category: string,
  componentId: string
) {
  const componentName = componentId;
  const url = `http://localhost:3000/ui/${category}/${componentId}`;

  // Set up console error tracking before navigation
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to component page
  const response = await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Check that page loads successfully
  expect(response?.status()).toBe(200);

  // Wait for main content to load
  await page.waitForSelector("h1", { timeout: 10000 });

  // Critical: Check for "Example Load Error" text on the page
  const exampleLoadErrors = await page
    .locator("text=Example Load Error")
    .count();
  if (exampleLoadErrors > 0) {
    console.error(`❌ ${componentName}: Found "Example Load Error" on page`);

    // Try to get more details about the error
    const errorElements = await page.locator("text=Example Load Error").all();
    for (const errorElement of errorElements) {
      const errorText = await errorElement.textContent();
      console.error("   Error details:", errorText);
    }
  }
  expect(exampleLoadErrors).toBe(0);

  // Check for other error indicators in the UI
  const errorTexts = [
    "Error:",
    "Failed to load",
    "Component not found",
    "TypeError",
    "ReferenceError",
    "Cannot read",
    "is not defined",
  ];

  for (const errorText of errorTexts) {
    const errorCount = await page.locator(`text=${errorText}`).count();
    if (errorCount > 0) {
      console.error(
        `❌ ${componentName}: Found error indicator: "${errorText}"`
      );
      expect(errorCount).toBe(0);
    }
  }

  // Wait a bit more for any async errors to appear
  await page.waitForTimeout(2000);

  // Filter out expected/harmless console errors
  const serverErrors = consoleErrors.filter(
    (error) =>
      !error.includes("ResizeObserver") &&
      !error.includes("Non-passive event listener") &&
      !error.includes("favicon.ico") &&
      !error.includes("404") && // Ignore 404s for missing assets
      !error.includes("net::ERR_FAILED") &&
      !error.includes("lucide-react") && // Ignore lucide icon errors
      !error.includes("Name in Lucide DynamicIcon not found")
  );

  if (serverErrors.length > 0) {
    console.error(`❌ ${componentName}: Console errors found:`);
    serverErrors.forEach((error) => console.error("   - " + error));
  }

  expect(serverErrors.length).toBe(0);

  // Check that component examples are actually rendered
  const componentExamples = await page
    .locator(
      [
        '[data-testid="component-example"]',
        '[data-testid="example"]',
        ".component-example",
        ".example-container",
        '[class*="example"]',
        ".preview-container",
        '[data-testid*="preview"]',
      ].join(", ")
    )
    .count();

  if (componentExamples === 0) {
    console.warn(`⚠️ ${componentName}: No component examples found on page`);
    // Also check if there are any interactive elements that suggest working components
    const interactiveElements = await page
      .locator('button, input, select, [role="button"], [role="textbox"]')
      .count();
    if (interactiveElements > 0) {
      console.log(
        "   But found " +
          interactiveElements +
          " interactive elements, component may be working"
      );
    }
  }

  // Take screenshot for visual verification
  await page.screenshot({
    path: `tests/screenshots/${category}-${componentId}.png`,
    fullPage: false,
  });
}

test("All component preview pages should load successfully", async ({
  page,
}) => {
  // Loop through all components and test them
  for (const [category, components] of Object.entries(COMPONENT_LIST)) {
    for (const componentId of components) {
      console.log(`Testing ${category}/${componentId}...`);
      await testComponentPage(page, category, componentId);
    }
  }
});
