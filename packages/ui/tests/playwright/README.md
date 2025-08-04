# Playwright Component Tests

This directory contains Playwright component tests that were moved here to avoid conflicts with Vitest.

## Available Tests

- `button.playwright.test.tsx` - Tests for the Button component
- `tag-input.playwright.test.tsx` - Tests for the TagInput component

## Running the Tests

To run these Playwright tests:

```bash
# Install Playwright browsers if not already installed
pnpm playwright install

# Run the component tests
pnpm playwright test

# Run with UI mode
pnpm playwright test --ui

# Run a specific test file
pnpm playwright test button.playwright.test.tsx
```

## Notes

- These tests use `@playwright/experimental-ct-react` for component testing
- They are isolated from the Vitest tests to prevent configuration conflicts
- The tests focus on interaction and visual behavior that's best tested in a real browser environment

## Configuration

The Playwright configuration is in `playwright-ct.config.ts` and is set to look for tests in this directory (`./tests/playwright`).