// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StatusMark } from "./index";

type ChangeListener = (event: { matches: boolean }) => void;

/** A `matchMedia` whose reduced-motion answer the test can flip while mounted. */
const installReducedMotion = (initial: boolean) => {
  let matches = initial;
  const listeners = new Set<ChangeListener>();
  vi.stubGlobal("matchMedia", (query: string) => ({
    addEventListener: (_type: "change", listener: ChangeListener) => listeners.add(listener),
    addListener: (listener: ChangeListener) => listeners.add(listener),
    get matches() {
      return matches;
    },
    media: query,
    removeEventListener: (_type: "change", listener: ChangeListener) => listeners.delete(listener),
    removeListener: (listener: ChangeListener) => listeners.delete(listener),
  }));
  return (next: boolean) => {
    matches = next;
    for (const listener of listeners) {
      listener({ matches: next });
    }
  };
};

const sweepPath = (container: HTMLElement) =>
  container.querySelector('[data-slot="status-mark-fill-sweep"]')?.getAttribute("d");

const finalSweepPath = (value: number) => {
  const { container, unmount } = render(<StatusMark value={value} />);
  const path = sweepPath(container);
  unmount();
  return path;
};

describe("StatusMark reduced motion", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("jumps the fill sweep to the new step when reduced motion is on at mount", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    installReducedMotion(true);
    const target = finalSweepPath(75);

    const { container, rerender } = render(<StatusMark value={25} />);
    rerender(<StatusMark value={75} />);

    expect(sweepPath(container)).toBe(target);
  });

  it("animates the fill sweep when reduced motion is off", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    installReducedMotion(false);
    const target = finalSweepPath(75);

    const { container, rerender } = render(<StatusMark value={25} />);
    rerender(<StatusMark value={75} />);

    expect(sweepPath(container)).not.toBe(target);
  });

  it("tweens the fill sweep path in place and settles on the target", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    installReducedMotion(false);
    const start = finalSweepPath(25);
    const target = finalSweepPath(75);

    const { container, rerender } = render(<StatusMark value={25} />);
    rerender(<StatusMark value={75} />);
    const path = container.querySelector('[data-slot="status-mark-fill-sweep"]');

    act(() => {
      vi.advanceTimersByTime(140);
    });
    const mid = sweepPath(container);
    expect(mid).not.toBe(start);
    expect(mid).not.toBe(target);
    expect(container.querySelector('[data-slot="status-mark-fill-sweep"]')).toBe(path);

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sweepPath(container)).toBe(target);
  });

  it("follows reduced motion turned on while mounted", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    const setReduced = installReducedMotion(false);
    const target = finalSweepPath(75);

    const { container, rerender } = render(<StatusMark value={25} />);
    act(() => {
      setReduced(true);
    });
    rerender(<StatusMark value={75} />);

    expect(sweepPath(container)).toBe(target);
  });
});
