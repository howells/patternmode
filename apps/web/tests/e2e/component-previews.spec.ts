import { expect, Page, test } from "@playwright/test";
import { COMPONENT_LIST } from "../../src/lib/component-registry";

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
    waitUntil: "domcontentloaded",
    timeout: 15000, // Reduced timeout
  });

  // Wait a bit for async content to settle
  await page.waitForTimeout(500); // Reduced wait

  // Check that page loads successfully
  expect(response?.status()).toBe(200);

  // Wait for main content to load
  await page.waitForSelector("h1", { timeout: 5000 }); // Reduced timeout

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
  await page.waitForTimeout(500);

  // Filter out expected/harmless console errors
  const serverErrors = consoleErrors.filter(
    (error) =>
      !error.includes("ResizeObserver") &&
      !error.includes("Non-passive event listener") &&
      !error.includes("favicon.ico") &&
      !error.includes("404") && // Ignore 404s for missing assets
      !error.includes("net::ERR_FAILED") &&
      !error.includes("lucide-react") && // Ignore lucide icon errors
      !error.includes("Name in Lucide DynamicIcon not found") &&
      !error.includes("Received `%s` for a non-boolean attribute") && // React dev warnings
      !error.includes("React does not recognize the `%s` prop") &&
      !error.includes("non-boolean attribute") &&
      !error.includes("custom attribute")
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
        '[data-testid="component-preview"]', // Preview tab content
        '[data-testid="preview-container"]', // Preview container
        '[data-testid="component-examples"]', // Examples section
        '[data-testid^="example-"]', // Individual examples
        '[data-testid="example-content"]', // Example content
        '[role="tabpanel"][data-state="active"]', // Preview tab panel
        'h2:has-text("Examples")', // Examples section heading
        ".preview-container",
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
  test.setTimeout(600000); // 10 minutes for all components
  const failures: string[] = [];

  // Loop through all components and test them
  for (const [category, components] of Object.entries(COMPONENT_LIST)) {
    for (const componentId of components) {
      console.log(`Testing ${category}/${componentId}...`);
      try {
        await testComponentPage(page, category, componentId);
        console.log(`✅ ${category}/${componentId} passed`);
      } catch (error) {
        const errorMsg = `❌ ${category}/${componentId}: ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(errorMsg);
        failures.push(errorMsg);
        // Continue testing other components instead of stopping
      }
    }
  }

  // Report all failures at the end
  if (failures.length > 0) {
    console.error(`\n🚨 TOTAL FAILURES: ${failures.length}`);
    failures.forEach((failure) => console.error(failure));
    throw new Error(
      `${failures.length} components failed e2e tests:\n${failures.join("\n")}`
    );
  }

  console.log(
    `\n🎉 SUCCESS: All ${
      Object.values(COMPONENT_LIST).flat().length
    } components passed e2e tests!`
  );
});
