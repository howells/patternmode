import { beforeEach } from "vitest";
import "@testing-library/jest-dom";

// Set up DOM cleanup between tests
beforeEach(() => {
  document.body.innerHTML = "";
});

// Mock ResizeObserver for component testing
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Mock IntersectionObserver for component testing
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class IntersectionObserver {
    root = null;
    rootMargin = "";
    thresholds = [];

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}
