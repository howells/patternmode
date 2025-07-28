import { test, expect } from '@playwright/test';

test.describe('IconSelect Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/ui/inputs/icon-select');
    await page.waitForLoadState('networkidle');
  });

  test('should render the component', async ({ page }) => {
    const iconSelect = page.getByTestId('preview-container').getByTestId('icon-select');
    await expect(iconSelect).toBeVisible();
    
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText('Select an icon');
  });

  test('should open dropdown when clicked', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    const dropdown = page.getByTestId('preview-container').getByTestId('combobox-dropdown');
    await expect(dropdown).toBeVisible();
    
    const searchInput = page.getByTestId('preview-container').getByTestId('combobox-search');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  });

  test('should load and display icons', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    // Wait for icons to load
    await page.waitForSelector('[data-testid="preview-container"] [data-testid="combobox-items"]', { timeout: 10000 });
    
    const itemsContainer = page.getByTestId('preview-container').getByTestId('combobox-items');
    await expect(itemsContainer).toBeVisible();
    
    // Check that at least some icons are loaded
    const iconItems = page.getByTestId('preview-container').locator('[data-testid^="combobox-item-"]');
    await expect(iconItems.first()).toBeVisible({ timeout: 10000 });
    
    const iconCount = await iconItems.count();
    expect(iconCount).toBeGreaterThan(0);
    console.log(`Loaded ${iconCount} icons`);
  });

  test('should allow scrolling to load more icons', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    // Wait for initial icons to load
    await page.waitForSelector('[data-testid="preview-container"] [data-testid="combobox-items"]', { timeout: 10000 });
    
    const optionsContainer = page.getByTestId('preview-container').getByTestId('combobox-options');
    const initialIconCount = await page.getByTestId('preview-container').locator('[data-testid^="combobox-item-"]').count();
    
    // Scroll to bottom to trigger infinite scroll
    await optionsContainer.evaluate(el => {
      el.scrollTop = el.scrollHeight;
    });
    
    // Wait for loading more indicator (might be brief)
    try {
      await expect(page.getByTestId('preview-container').getByTestId('combobox-loading-more')).toBeVisible({ timeout: 2000 });
    } catch (e) {
      // Loading indicator might have been too brief, that's okay
      console.log('Loading indicator not seen, but proceeding with test');
    }
    
    // Wait for more icons to load
    await page.waitForFunction(
      (initialCount) => {
        const previewContainer = document.querySelector('[data-testid="preview-container"]');
        const items = previewContainer?.querySelectorAll('[data-testid^="combobox-item-"]') || [];
        return items.length > initialCount;
      },
      initialIconCount,
      { timeout: 10000 }
    );
    
    const newIconCount = await page.getByTestId('preview-container').locator('[data-testid^="combobox-item-"]').count();
    expect(newIconCount).toBeGreaterThan(initialIconCount);
    console.log(`Initial: ${initialIconCount}, After scroll: ${newIconCount}`);
  });

  test('should allow selecting an icon', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    // Wait for icons to load
    await page.waitForSelector('[data-testid="preview-container"] [data-testid="combobox-items"]', { timeout: 10000 });
    
    // Click on the first icon
    const firstIcon = page.getByTestId('preview-container').locator('[data-testid^="combobox-item-"]').first();
    await expect(firstIcon).toBeVisible({ timeout: 10000 });
    
    // Get the icon name before clicking
    const iconName = await firstIcon.textContent();
    expect(iconName).toBeTruthy();
    
    await firstIcon.click();
    
    // Dropdown should close
    const dropdown = page.getByTestId('preview-container').getByTestId('combobox-dropdown');
    await expect(dropdown).toBeHidden();
    
    // Trigger should show selected icon name
    await expect(trigger).toContainText(iconName!);
  });

  test('should filter icons when searching', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    const searchInput = page.getByTestId('preview-container').getByTestId('combobox-search');
    await expect(searchInput).toBeVisible();
    
    // Search for a specific icon
    await searchInput.fill('arrow');
    
    // Wait for search results
    await page.waitForTimeout(500); // Wait for debounce
    await page.waitForSelector('[data-testid="preview-container"] [data-testid="combobox-items"]', { timeout: 10000 });
    
    // Check that results contain search term
    const iconItems = page.getByTestId('preview-container').locator('[data-testid^="combobox-item-"]');
    await expect(iconItems.first()).toBeVisible({ timeout: 10000 });
    
    const firstIconText = await iconItems.first().textContent();
    expect(firstIconText?.toLowerCase()).toContain('arrow');
  });

  test('should handle empty search results', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    const searchInput = page.getByTestId('preview-container').getByTestId('combobox-search');
    await searchInput.fill('nonexistenticon12345');
    
    // Wait for search
    await page.waitForTimeout(500);
    
    // Should show empty state
    const emptyState = page.getByTestId('preview-container').getByTestId('combobox-empty');
    await expect(emptyState).toBeVisible({ timeout: 10000 });
    await expect(emptyState).toContainText('No icons found');
  });

  test('should close dropdown when clicking outside', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    const dropdown = page.getByTestId('preview-container').getByTestId('combobox-dropdown');
    await expect(dropdown).toBeVisible();
    
    // Click outside the dropdown
    await page.click('body', { position: { x: 10, y: 10 } });
    
    // Dropdown should close
    await expect(dropdown).toBeHidden();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    // Wait for icons to load
    await page.waitForSelector('[data-testid="preview-container"] [data-testid="combobox-items"]', { timeout: 10000 });
    
    const searchInput = page.getByTestId('preview-container').getByTestId('combobox-search');
    
    // Press arrow down to highlight first item
    await searchInput.press('ArrowDown');
    
    // Press Enter to select
    await searchInput.press('Enter');
    
    // Dropdown should close
    const dropdown = page.getByTestId('preview-container').getByTestId('combobox-dropdown');
    await expect(dropdown).toBeHidden();
    
    // Should have selected an item
    await expect(trigger).not.toContainText('Select an icon');
  });

  test('should display icons correctly in the list', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    // Wait for icons to load
    await page.waitForSelector('[data-testid="preview-container"] [data-testid="combobox-items"]', { timeout: 10000 });
    
    const firstIcon = page.getByTestId('preview-container').locator('[data-testid^="combobox-item-"]').first();
    await expect(firstIcon).toBeVisible({ timeout: 10000 });
    
    // Check that the icon contains both the icon element and text
    const iconElement = firstIcon.locator('div').first(); // The icon container
    const textElement = firstIcon.locator('span');
    
    await expect(iconElement).toBeVisible();
    await expect(textElement).toBeVisible();
    
    const iconText = await textElement.textContent();
    expect(iconText).toBeTruthy();
    expect(iconText!.length).toBeGreaterThan(0);
    
    // CRITICAL: Check that we're not showing fallback "?" symbols
    expect(iconText).not.toBe('?');
    expect(iconText).not.toContain('?');
    
    // CRITICAL: Check that actual icon names are displayed (should be PascalCase)
    expect(iconText).toMatch(/^[A-Z][a-zA-Z0-9]*$/); // Should match PascalCase pattern
    
    // CRITICAL: Check that SVG icons are actually rendered, not just fallback
    const svgIcon = firstIcon.locator('svg');
    await expect(svgIcon).toBeVisible();
  });

  test('should handle loading states correctly', async ({ page }) => {
    const trigger = page.getByTestId('preview-container').getByTestId('combobox-trigger');
    await trigger.click();
    
    // Initially should show loading
    const loadingState = page.getByTestId('preview-container').getByTestId('combobox-loading');
    // Note: Loading might be very fast, so we'll check if it exists or if items are already loaded
    
    const hasLoading = await loadingState.isVisible().catch(() => false);
    const hasItems = await page.getByTestId('preview-container').getByTestId('combobox-items').isVisible().catch(() => false);
    
    // Either loading is shown initially, or items are already loaded
    expect(hasLoading || hasItems).toBe(true);
    
    // Eventually items should be visible
    await expect(page.getByTestId('preview-container').getByTestId('combobox-items')).toBeVisible({ timeout: 10000 });
  });
});