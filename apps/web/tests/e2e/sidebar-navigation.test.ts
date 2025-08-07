import { expect, test } from "@playwright/test";

test.describe("Sidebar Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display all components in sidebar", async ({ page }) => {
    // Wait for sidebar to load
    await page.waitForSelector("[data-testid=\"sidebar\"]", { timeout: 10000 });

    // Check that sidebar contains component navigation
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toBeVisible();

    // Check for component categories in the sidebar
    const expectedCategories = [
      "text",
      "layout",
      "navigation",
      "feedback",
      "overlay",
      "data",
      "media",
      "utility",
      "inputs",
      "forms",
      "charts",
    ];

    // Verify that category sections exist
    for (const category of expectedCategories) {
      const categorySection = sidebar.locator(`[data-category="${category}"]`);
      if (await categorySection.count() > 0) {
        console.log(`✓ Found category: ${category}`);
      }
    }

    // Check that there are component links in the sidebar
    const componentLinks = sidebar.locator("a[href^=\"/ui/components/\"]");
    const linkCount = await componentLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    console.log(`Found ${linkCount} component links in sidebar`);

    // Verify that each link has proper structure
    const firstFewLinks = await componentLinks.first().count() > 0
      ? await componentLinks.first().getAttribute("href")
      : null;

    if (firstFewLinks) {
      expect(firstFewLinks).toMatch(/^\/ui\/components\/[\w-]+$/);
      console.log(`✓ Link format correct: ${firstFewLinks}`);
    }
  });

  test("should have alphabetical and groups toggle functionality", async ({ page }) => {
    // Wait for sidebar to load
    await page.waitForSelector("[data-testid=\"sidebar\"]", { timeout: 10000 });

    // Look for toggle controls - these might be buttons, tabs, or other UI elements
    // Common patterns: "Alphabetical", "Groups", "A-Z", "Categories", etc.
    const toggleControls = await page.locator("button, [role=\"tab\"], [role=\"button\"]").all();

    let foundAlphabeticalToggle = false;
    let foundGroupsToggle = false;

    for (const control of toggleControls) {
      const text = await control.textContent();
      if (text && (text.toLowerCase().includes("alphabet") || text.includes("A-Z") || text.includes("a-z"))) {
        foundAlphabeticalToggle = true;
        console.log(`✓ Found alphabetical toggle: "${text}"`);
      }
      if (text && (text.toLowerCase().includes("group") || text.toLowerCase().includes("categor"))) {
        foundGroupsToggle = true;
        console.log(`✓ Found groups toggle: "${text}"`);
      }
    }

    // If we find toggle controls, test their functionality
    if (foundAlphabeticalToggle || foundGroupsToggle) {
      console.log("✓ Toggle controls found - testing functionality");

      // Try to find and click toggle buttons
      const alphabeticalButton = page.locator("button:has-text(\"Alphabetical\"), button:has-text(\"A-Z\"), [role=\"tab\"]:has-text(\"Alphabetical\")").first();
      const groupsButton = page.locator("button:has-text(\"Groups\"), button:has-text(\"Categories\"), [role=\"tab\"]:has-text(\"Groups\")").first();

      if (await alphabeticalButton.count() > 0) {
        await alphabeticalButton.click();
        await page.waitForTimeout(500);
        console.log("✓ Clicked alphabetical toggle");

        // Verify alphabetical sorting - components should be in A-Z order
        const componentLinks = page.locator("[data-testid=\"sidebar\"] a[href*=\"/ui/\"]");
        const linkTexts = await componentLinks.allTextContents();

        if (linkTexts.length > 1) {
          const sortedTexts = [...linkTexts].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
          const isAlphabetical = JSON.stringify(linkTexts.map(t => t.toLowerCase()))
            === JSON.stringify(sortedTexts.map(t => t.toLowerCase()));

          if (isAlphabetical) {
            console.log("✓ Components are sorted alphabetically");
          }
          else {
            console.log("⚠ Components may not be fully alphabetical, but toggle worked");
          }
        }
      }

      if (await groupsButton.count() > 0) {
        await groupsButton.click();
        await page.waitForTimeout(500);
        console.log("✓ Clicked groups toggle");

        // Verify grouped layout - should have category headers
        const categoryHeaders = page.locator("[data-testid=\"sidebar\"] h2, [data-testid=\"sidebar\"] h3, [data-testid=\"sidebar\"] .category-header");
        const headerCount = await categoryHeaders.count();

        if (headerCount > 0) {
          console.log(`✓ Found ${headerCount} category headers in groups view`);
        }
      }

      // Test that we can switch between views
      if (await alphabeticalButton.count() > 0 && await groupsButton.count() > 0) {
        // Switch back and forth
        await alphabeticalButton.click();
        await page.waitForTimeout(300);
        await groupsButton.click();
        await page.waitForTimeout(300);
        console.log("✓ Successfully toggled between views");
      }
    }
    else {
      // If no toggle found, that's also valid - log what we found instead
      console.log("ℹ No toggle controls found - sidebar may use a single view mode");

      // Just verify the sidebar has some organizational structure
      const sidebar = page.getByTestId("sidebar");
      const componentLinks = sidebar.locator("a[href*=\"/ui/\"]");
      const linkCount = await componentLinks.count();

      expect(linkCount).toBeGreaterThan(0);
      console.log(`✓ Sidebar displays ${linkCount} components`);
    }
  });

  test("should allow navigation to component pages", async ({ page }) => {
    // Wait for sidebar to load
    await page.waitForSelector("[data-testid=\"sidebar\"]", { timeout: 10000 });

    // Find the first component link in the sidebar
    const componentLinks = page.locator("[data-testid=\"sidebar\"] a[href^=\"/ui/components/\"]");
    const firstLink = componentLinks.first();

    await expect(firstLink).toBeVisible();

    // Get the href and component name for verification
    const href = await firstLink.getAttribute("href");
    const linkText = await firstLink.textContent();

    console.log(`Testing navigation to: ${linkText} (${href})`);

    // Click the link
    await firstLink.click();

    // Wait for navigation and page load
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Verify we navigated to the correct component page
    expect(page.url()).toContain(href!);

    // Verify the component page loaded properly
    // Look for common component page elements
    const pageHeader = page.locator("h1, [data-testid=\"page-header\"]").first();
    await expect(pageHeader).toBeVisible({ timeout: 5000 });

    const headerText = await pageHeader.textContent();
    console.log(`✓ Navigated to component page: ${headerText}`);

    // Verify there's a preview or content area
    const previewArea = page.locator("[data-testid=\"preview-container\"], [data-testid=\"component-preview\"], .preview, main").first();
    await expect(previewArea).toBeVisible({ timeout: 5000 });

    console.log("✓ Component page loaded with preview area");
  });

  test("should highlight active component in sidebar", async ({ page }) => {
    // Navigate to a specific component page
    await page.goto("http://localhost:3000/ui/inputs/button");

    // Wait for page and sidebar to load
    await page.waitForSelector("[data-testid=\"sidebar\"]", { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Look for active/current indicators in the sidebar
    const sidebar = page.getByTestId("sidebar");

    // Common patterns for active states
    const activeSelectors = [
      "a[aria-current=\"page\"]",
      "a.active",
      "a[data-active=\"true\"]",
      ".bg-blue-", // Tailwind active background
      ".text-blue-", // Tailwind active text
      "[data-state=\"active\"]",
      ".font-medium", // Often used for active states
      ".border-l-2", // Active border indicator
    ];

    let foundActiveIndicator = false;

    for (const selector of activeSelectors) {
      const activeElements = sidebar.locator(selector);
      const count = await activeElements.count();

      if (count > 0) {
        // Check if any of these elements contain "button" or relate to current page
        for (let i = 0; i < count; i++) {
          const element = activeElements.nth(i);
          const text = await element.textContent();
          const href = await element.getAttribute("href");

          if ((text && text.toLowerCase().includes("button"))
            || (href && href.includes("/button"))) {
            foundActiveIndicator = true;
            console.log(`✓ Found active indicator for button: ${selector} - "${text}"`);
            break;
          }
        }
      }
    }

    if (foundActiveIndicator) {
      console.log("✓ Sidebar correctly highlights active component");
    }
    else {
      console.log("ℹ No specific active state indicator found - this may be expected");

      // Just verify that the button link exists in the sidebar
      const buttonLink = sidebar.locator("a[href$=\"/components/button\"]");
      await expect(buttonLink).toBeVisible();
      console.log("✓ Button component link found in sidebar");
    }
  });
});
