import "@testing-library/jest-dom/vitest";

class ResizeObserver {
  disconnect() {
    return undefined;
  }

  observe() {
    return undefined;
  }

  unobserve() {
    return undefined;
  }
}

globalThis.ResizeObserver = ResizeObserver;
globalThis.HTMLElement.prototype.scrollIntoView = function scrollIntoView() {
  return undefined;
};
