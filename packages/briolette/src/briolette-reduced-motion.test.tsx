// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BriolettePicker } from "./briolette-picker";

type ChangeListener = (event: { matches: boolean }) => void;

/** A `matchMedia` whose reduced-motion answer the test can flip while mounted. */
const installReducedMotion = (initial: boolean) => {
  let matches = initial;
  const listeners = new Set<ChangeListener>();
  vi.stubGlobal("matchMedia", (query: string) => ({
    addEventListener: (_type: "change", listener: ChangeListener) => listeners.add(listener),
    get matches() {
      return matches;
    },
    media: query,
    removeEventListener: (_type: "change", listener: ChangeListener) => listeners.delete(listener),
  }));
  return (next: boolean) => {
    matches = next;
    for (const listener of listeners) {
      listener({ matches: next });
    }
  };
};

const anchoredPoints = (container: HTMLElement): string | null =>
  container.querySelector("polygon[data-selected]")?.getAttribute("points") ?? null;

describe("BriolettePicker reduced motion", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("snaps an in-flight centering glide when reduced motion turns on", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });

    installReducedMotion(true);
    const reference = render(
      <BriolettePicker onChange={vi.fn<(value: string | null) => void>()} value="#7a9c8b" />,
    );
    const centered = anchoredPoints(reference.container);
    reference.unmount();
    expect(centered).not.toBeNull();

    const setReduced = installReducedMotion(false);
    const { container } = render(
      <BriolettePicker onChange={vi.fn<(value: string | null) => void>()} value="#7a9c8b" />,
    );
    // The glide has started but no frame has run, so the facet is not yet centred.
    expect(anchoredPoints(container)).not.toBe(centered);

    act(() => {
      setReduced(true);
    });
    expect(anchoredPoints(container)).toBe(centered);
  });

  it("stops idle drift once reduced motion turns on", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    const setReduced = installReducedMotion(false);
    const { container } = render(
      <BriolettePicker onChange={vi.fn<(value: string | null) => void>()} value={null} />,
    );
    const firstPoints = () => container.querySelector("polygon")?.getAttribute("points");

    const before = firstPoints();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(firstPoints()).not.toBe(before);

    act(() => {
      setReduced(true);
    });
    const settled = firstPoints();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(firstPoints()).toBe(settled);
  });
});
