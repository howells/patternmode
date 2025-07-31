import { expect, Page, test } from "@playwright/test";

// Focused test for textarea component to debug example loading
test.describe("Textarea Component Examples Debug", () => {
  test("should load textarea examples without errors", async ({ page }) => {
    test.setTimeout(30000); // 30 seconds

    const componentId = "textarea";
    const category = "inputs";
    const url = `http://localhost:3000/ui/${category}/${componentId}`;

    // Set up detailed console logging
    const consoleMessages: { type: string; text: string }[] = [];
    page.on("console", (msg) => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text()
      });
      console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    });

    // Set up network request logging
    const failedRequests: string[] = [];
    page.on("requestfailed", (request) => {
      const failureText = `${request.method()} ${request.url()} - ${request.failure()?.errorText}`;
      failedRequests.push(failureText);
      console.log(`❌ Request failed: ${failureText}`);
    });

    // Navigate to textarea page
    console.log(`🔍 Navigating to: ${url}`);
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    // Check page loads
    expect(response?.status()).toBe(200);
    console.log("✅ Page loaded successfully");

    // Wait for main content
    await page.waitForSelector("h1", { timeout: 10000 });
    const title = await page.locator("h1").textContent();
    console.log(`📄 Page title: ${title}`);

    // Wait for examples section to appear
    console.log("🔍 Looking for Examples section...");

    // Check if Examples heading exists
    const examplesHeading = page.locator('h2:has-text("Examples")');
    await expect(examplesHeading).toBeVisible({ timeout: 10000 });
    console.log("✅ Examples section found");

    // Wait a bit for dynamic imports to resolve
    await page.waitForTimeout(2000);

    // Check for example cards
    const exampleCards = page.locator('[data-testid^="example-"]');
    const exampleCount = await exampleCards.count();
    console.log(`📊 Found ${exampleCount} example cards`);

    if (exampleCount === 0) {
      console.error("❌ No example cards found!");

      // Take a screenshot for debugging
      await page.screenshot({
        path: `tests/screenshots/textarea-debug-no-examples.png`,
        fullPage: true,
      });
    }

    expect(exampleCount).toBeGreaterThan(0);

    // Check each example card for content
    for (let i = 0; i < exampleCount; i++) {
      const card = exampleCards.nth(i);
      const cardTitle = await card.locator('h3').textContent();
      console.log(`🔍 Checking example: ${cardTitle}`);

      // Check for "Interactive example coming soon" text (indicates failure)
      const comingSoonText = await card.locator('text="Interactive example coming soon"').count();

      if (comingSoonText > 0) {
        console.error(`❌ Example "${cardTitle}" shows "Interactive example coming soon"`);

        // Look for error details
        const errorDetails = await card.locator('[class*="error"], [class*="Error"]').allTextContents();
        if (errorDetails.length > 0) {
          console.error("   Error details:", errorDetails);
        }
      }

      // Check for actual textarea elements in the example
      const textareas = await card.locator('textarea').count();
      console.log(`   📝 Found ${textareas} textarea elements in "${cardTitle}"`);

      // If no textareas found, this example likely failed to load
      if (textareas === 0 && comingSoonText > 0) {
        console.error(`❌ Example "${cardTitle}" failed to load properly`);
      } else if (textareas > 0) {
        console.log(`✅ Example "${cardTitle}" loaded successfully`);
      }
    }

    // Check for specific error messages
    const errorIndicators = [
      "Failed to load example",
      "Example component",
      "not found",
      "Interactive example coming soon",
      "Error loading example",
      "TypeError",
      "Cannot resolve",
      "Module not found"
    ];

    for (const errorText of errorIndicators) {
      const errorCount = await page.locator(`text*="${errorText}"`).count();
      if (errorCount > 0) {
        console.error(`❌ Found error indicator: "${errorText}" (${errorCount} times)`);

        // Get the full text of elements containing this error
        const errorElements = await page.locator(`text*="${errorText}"`).allTextContents();
        errorElements.forEach(text => console.error(`   Full error: ${text}`));
      }
    }

    // Log all console errors
    const errors = consoleMessages.filter(msg => msg.type === 'error');
    if (errors.length > 0) {
      console.error(`❌ Console errors found (${errors.length}):`);
      errors.forEach(error => console.error(`   - ${error.text}`));
    }

    // Log failed requests
    if (failedRequests.length > 0) {
      console.error(`❌ Failed requests (${failedRequests.length}):`);
      failedRequests.forEach(req => console.error(`   - ${req}`));
    }

    // Take final screenshot
    await page.screenshot({
      path: `tests/screenshots/textarea-examples-debug.png`,
      fullPage: true,
    });

    // Final assertions
    const comingSoonCount = await page.locator('text="Interactive example coming soon"').count();
    expect(comingSoonCount).toBe(0);

    const workingTextareas = await page.locator('textarea').count();
    expect(workingTextareas).toBeGreaterThan(0);

    console.log(`✅ Test completed - Found ${workingTextareas} working textareas`);
  });
});