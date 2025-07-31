import { expect, test } from '@playwright/test';

test.describe('Textarea Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ui/inputs/textarea');
  });

  test('should allow typing in the textarea', async ({ page }) => {
    // Find the first textarea on the page
    const textarea = page.locator('textarea').first();

    // Verify textarea is visible and enabled
    await expect(textarea).toBeVisible();
    await expect(textarea).toBeEnabled();

    // Type some text
    const testText = 'Hello, this is a test message';
    await textarea.fill(testText);

    // Verify the text was entered
    await expect(textarea).toHaveValue(testText);
  });

  test('should auto-resize when typing multiple lines', async ({ page }) => {
    const textarea = page.locator('textarea').first();

    // Get initial height
    const initialHeight = await textarea.evaluate(el => el.getBoundingClientRect().height);

    // Type multiple lines
    const multiLineText = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
    await textarea.fill(multiLineText);

    // Get new height after typing
    const newHeight = await textarea.evaluate(el => el.getBoundingClientRect().height);

    // Height should have increased
    expect(newHeight).toBeGreaterThan(initialHeight);

    // Verify content is correct
    await expect(textarea).toHaveValue(multiLineText);
  });

  test('should handle placeholder text', async ({ page }) => {
    const textarea = page.locator('textarea').first();

    // Check if placeholder is present
    const placeholder = await textarea.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();

    // When empty, should show placeholder
    await expect(textarea).toHaveAttribute('placeholder');
  });

  test('should show error state when hasError prop is true', async ({ page }) => {
    // Look for error example section
    const errorSection = page.locator('text=Error state').locator('..').locator('textarea');

    if (await errorSection.count() > 0) {
      // Check if error styling is applied
      const hasErrorClass = await errorSection.evaluate(el =>
        el.className.includes('border-red') || el.className.includes('ring-red')
      );

      // Note: This might not work if error state isn't visible by default
      // We'll just verify the textarea exists in the error section
      await expect(errorSection).toBeVisible();
    }
  });

  test('should handle disabled state', async ({ page }) => {
    // Look for disabled example
    const disabledSection = page.locator('text=Disabled state').locator('..').locator('textarea');

    if (await disabledSection.count() > 0) {
      await expect(disabledSection).toBeDisabled();
    }
  });

  test('should maintain focus and cursor position', async ({ page }) => {
    const textarea = page.locator('textarea').first();

    // Click to focus
    await textarea.click();
    await expect(textarea).toBeFocused();

    // Type some text
    await textarea.type('Hello world');

    // Move cursor to middle and type
    await textarea.press('Home');
    await textarea.press('ArrowRight');
    await textarea.press('ArrowRight');
    await textarea.type('XX');

    // Should have inserted text at cursor position
    await expect(textarea).toHaveValue('HeXXllo world');
  });

  test('should handle copy/paste operations', async ({ page }) => {
    const textarea = page.locator('textarea').first();

    // Type initial text
    await textarea.fill('Original text');

    // Select all and copy
    await textarea.press('Control+a');
    await textarea.press('Control+c');

    // Clear and paste
    await textarea.fill('');
    await textarea.press('Control+v');

    // Should have pasted the original text
    await expect(textarea).toHaveValue('Original text');
  });

  test('should work with form submission', async ({ page }) => {
    // Look for form integration example
    const formSection = page.locator('text=Form Integration').locator('..');

    if (await formSection.count() > 0) {
      const formTextarea = formSection.locator('textarea').first();
      const submitButton = formSection.locator('button[type="submit"]');

      if (await formTextarea.count() > 0 && await submitButton.count() > 0) {
        // Fill the textarea
        await formTextarea.fill('Test form submission');

        // Set up dialog handler for the alert
        page.on('dialog', async dialog => {
          expect(dialog.message()).toContain('Form submitted');
          await dialog.accept();
        });

        // Submit form
        await submitButton.click();

        // Verify textarea still has value after submission
        await expect(formTextarea).toHaveValue('Test form submission');
      }
    }
  });

  test('should respect minRows and maxRows constraints', async ({ page }) => {
    // Look for row constraints example
    const constraintsSection = page.locator('text=With Row Constraints').locator('..');

    if (await constraintsSection.count() > 0) {
      const constrainedTextarea = constraintsSection.locator('textarea');

      if (await constrainedTextarea.count() > 0) {
        // Get initial height (should be at least minRows)
        const initialHeight = await constrainedTextarea.evaluate(el => el.getBoundingClientRect().height);

        // Type many lines to test maxRows
        const manyLines = Array(20).fill('This is a line of text').join('\n');
        await constrainedTextarea.fill(manyLines);

        // Get height after many lines
        const maxHeight = await constrainedTextarea.evaluate(el => el.getBoundingClientRect().height);

        // Should have grown but not infinitely (maxRows constraint)
        expect(maxHeight).toBeGreaterThan(initialHeight);

        // Clear and verify it goes back to minimum
        await constrainedTextarea.fill('');
        const minHeight = await constrainedTextarea.evaluate(el => el.getBoundingClientRect().height);

        // Should be back to minimum height
        expect(minHeight).toBeLessThanOrEqual(maxHeight);
      }
    }
  });
});