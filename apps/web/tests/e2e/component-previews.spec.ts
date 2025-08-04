import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import { COMPONENT_LIST } from "@patternmode/ui/components/registry";

// Helper function to test a single component page
async function testComponentPage(
  page: Page,
  componentId: string,
) {
  const componentName = componentId;
  const url = `/ui/components/${componentId}`;

  // Set up console error tracking before navigation
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to component page
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 30000, // Increased timeout for reliability
  });

  // Wait a bit for async content to settle
  await page.waitForTimeout(1000); // Increased wait for stability

  // Check that page loads successfully
  expect(response?.status()).toBe(200);

  // Wait for main content to load
  await page.waitForSelector("h1", { timeout: 10000 }); // Increased timeout

  // Critical: Check for "Failed to load examples" error messages
  const failedToLoadErrors = await page
    .locator("text=Failed to load examples")
    .count();
  if (failedToLoadErrors > 0) {
    console.error(`❌ ${componentName}: Found "Failed to load examples" on page`);

    // Try to get more details about the error
    const errorElements = await page.locator("text=Failed to load examples").all();
    for (const errorElement of errorElements) {
      const errorText = await errorElement.textContent();
      console.error("   Error details:", errorText);
    }
  }
  expect(failedToLoadErrors).toBe(0);

  // Check for other error indicators in the UI
  const errorTexts = [
    "Error:",
    "Failed to load",
    "Component not found",
    "TypeError",
    "ReferenceError",
    "Cannot read",
    "is not defined",
    "Error rendering component",
    "Error rendering",
    "Unable to load examples",
  ];

  for (const errorText of errorTexts) {
    const errorCount = await page.locator(`text=${errorText}`).count();
    if (errorCount > 0) {
      console.error(
        `❌ ${componentName}: Found error indicator: "${errorText}"`,
      );
      expect(errorCount).toBe(0);
    }
  }

  // Wait a bit more for any async errors to appear
  await page.waitForTimeout(1000);

  // Filter out expected/harmless console errors
  const serverErrors = consoleErrors.filter(
    error =>
      !error.includes("ResizeObserver")
      && !error.includes("Non-passive event listener")
      && !error.includes("favicon.ico")
      && !error.includes("404") // Ignore 404s for missing assets
      && !error.includes("net::ERR_FAILED")
      && !error.includes("lucide-react") // Ignore lucide icon errors
      && !error.includes("Name in Lucide DynamicIcon not found")
      && !error.includes("Received `%s` for a non-boolean attribute") // React dev warnings
      && !error.includes("React does not recognize the `%s` prop")
      && !error.includes("non-boolean attribute")
      && !error.includes("custom attribute")
      && !error.includes("Failed to load icon"), // Ignore icon loading failures
  );

  if (serverErrors.length > 0) {
    console.error(`❌ ${componentName}: Console errors found:`);
    serverErrors.forEach(error => console.error(`   - ${error}`));
  }

  expect(serverErrors.length).toBe(0);

  // Check that component preview is actually rendered
  const componentPreview = await page
    .locator("[data-testid=\"component-preview\"]")
    .count();

  if (componentPreview === 0) {
    console.error(`❌ ${componentName}: No component preview found on page`);
  }
  expect(componentPreview).toBeGreaterThan(0);

  // Check that component examples are actually rendered
  const componentExamples = await page
    .locator("[data-testid=\"component-examples\"]")
    .count();

  if (componentExamples === 0) {
    console.error(`❌ ${componentName}: No component examples found on page`);
  }
  expect(componentExamples).toBeGreaterThan(0);

  // Check for "coming soon" placeholder messages (these should be treated as failures)
  const comingSoonMessages = await page
    .locator("text=Interactive preview coming soon")
    .or(page.locator("text=Documentation for this component is being prepared"))
    .count();
  if (comingSoonMessages > 0) {
    console.error(`❌ ${componentName}: Found ${comingSoonMessages} "coming soon" placeholder(s) - components should be complete`);
  }
  expect(comingSoonMessages).toBe(0);

  // Take screenshot for visual verification
  await page.screenshot({
    path: `tests/screenshots/${componentId}.png`,
    fullPage: false,
  });

  console.log(`✅ ${componentId} passed all checks`);
}

test("All component preview pages should load successfully", async ({
  page,
}) => {
  test.setTimeout(900000); // 15 minutes for all components
  const failures: string[] = [];

  console.log(`Starting tests for ${Object.values(COMPONENT_LIST).flat().length} components across ${Object.keys(COMPONENT_LIST).length} categories...`);

  // Get all components from all categories
  const allComponents = Object.values(COMPONENT_LIST).flat();

  for (const componentId of allComponents) {
    console.log(`  🔍 Testing ${componentId}...`);
    try {
      await testComponentPage(page, componentId);
    }
    catch (error) {
      const errorMsg = `❌ ${componentId}: ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(`    ${errorMsg}`);
      failures.push(errorMsg);
      // Continue testing other components instead of stopping
    }
  }

  // Report all failures at the end
  if (failures.length > 0) {
    console.error(`\n🚨 TOTAL FAILURES: ${failures.length}`);
    failures.forEach(failure => console.error(failure));
    throw new Error(
      `${failures.length} components failed e2e tests:\n${failures.join("\n")}`,
    );
  }

  console.log(
    `\n🎉 SUCCESS: All ${
      Object.values(COMPONENT_LIST).flat().length
    } components passed e2e tests!`,
  );
});
