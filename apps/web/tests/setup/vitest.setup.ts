import { beforeEach } from "vitest";

// Set up DOM cleanup between tests
beforeEach(() => {
  document.body.innerHTML = "";
});

// Mock Next.js router if needed
globalThis.ResizeObserver = globalThis.ResizeObserver
  || class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// Mock IntersectionObserver for component testing
globalThis.IntersectionObserver = globalThis.IntersectionObserver
  || class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    root = null;
    rootMargin = "";
    thresholds = [];
    takeRecords() { return []; }
  };
