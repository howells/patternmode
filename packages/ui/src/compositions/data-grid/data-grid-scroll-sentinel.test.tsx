import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataGridScrollSentinel } from "./data-grid-scroll-sentinel";

afterEach(cleanup);

describe("DataGridScrollSentinel", () => {
  let observeCallback: IntersectionObserverCallback;
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    mockDisconnect.mockReset();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = "";
      readonly thresholds: readonly number[] = [];

      constructor(
        callback: IntersectionObserverCallback,
        public options?: IntersectionObserverInit,
      ) {
        observeCallback = callback;
        // Track constructor calls for assertions
        MockIntersectionObserver._lastOptions = options;
        MockIntersectionObserver._instances.push(this);
      }

      static _lastOptions: IntersectionObserverInit | undefined;
      static _instances: MockIntersectionObserver[] = [];

      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = mockDisconnect;
      takeRecords = vi.fn(() => []);
    }

    MockIntersectionObserver._instances = [];
    MockIntersectionObserver._lastOptions = undefined;

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("renders a sentinel div", () => {
    const { container } = render(
      <DataGridScrollSentinel onEndReached={vi.fn()} />,
    );
    const sentinel = container.querySelector("[data-slot='scroll-sentinel']");
    expect(sentinel).toBeInTheDocument();
  });

  it("creates an IntersectionObserver with default rootMargin", () => {
    render(<DataGridScrollSentinel onEndReached={vi.fn()} />);
    const MockIO = IntersectionObserver as unknown as {
      _lastOptions: IntersectionObserverInit | undefined;
    };
    expect(MockIO._lastOptions).toEqual(
      expect.objectContaining({ rootMargin: "200px" }),
    );
  });

  it("uses custom threshold for rootMargin", () => {
    render(<DataGridScrollSentinel onEndReached={vi.fn()} threshold={500} />);
    const MockIO = IntersectionObserver as unknown as {
      _lastOptions: IntersectionObserverInit | undefined;
    };
    expect(MockIO._lastOptions).toEqual(
      expect.objectContaining({ rootMargin: "500px" }),
    );
  });

  it("calls onEndReached when sentinel becomes visible", () => {
    const onEndReached = vi.fn();
    render(<DataGridScrollSentinel onEndReached={onEndReached} />);

    // Simulate intersection
    observeCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(onEndReached).toHaveBeenCalledOnce();
  });

  it("does not call onEndReached when sentinel is not intersecting", () => {
    const onEndReached = vi.fn();
    render(<DataGridScrollSentinel onEndReached={onEndReached} />);

    observeCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(onEndReached).not.toHaveBeenCalled();
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(
      <DataGridScrollSentinel onEndReached={vi.fn()} />,
    );
    unmount();
    expect(mockDisconnect).toHaveBeenCalledOnce();
  });
});
