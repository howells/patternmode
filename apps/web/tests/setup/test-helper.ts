// Test helper utilities for web app tests
export const TEST_BASE_URL = "http://localhost:3000";

export function getComponentUrl(category: string, componentId: string): string {
  return `${TEST_BASE_URL}/ui/${category}/${componentId}`;
}

export function waitForComponentLoad(page: any, timeout = 10000) {
  return page.waitForSelector("[data-testid=\"preview-container\"]", { timeout });
}
