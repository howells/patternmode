import { beforeEach } from "vitest";

// Set up DOM cleanup between tests
beforeEach(() => {
  document.body.innerHTML = "";
});

// Mock Next.js router if needed
global.ResizeObserver = global.ResizeObserver
  || class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// Mock IntersectionObserver for component testing
global.IntersectionObserver = global.IntersectionObserver
  || class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
