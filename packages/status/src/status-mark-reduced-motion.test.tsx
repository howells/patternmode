// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Ref, SVGAttributes } from "react";

type MotionElementProps<TElement> = SVGAttributes<TElement> & {
  animate?: unknown;
  initial?: unknown;
  ref?: Ref<TElement>;
  transition?: unknown;
};

const stripMotionProps = vi.hoisted(
  () =>
    <TElement,>({
      animate: _animate,
      initial: _initial,
      transition: _transition,
      ...props
    }: MotionElementProps<TElement>) =>
      props,
);
// oxlint-disable-next-line anti-slop/no-module-mocking -- StatusMark imports motion/react directly; the mock strips animation props so jsdom reads the final SVG attributes. The reduced-motion preference is left real.
vi.mock(import("motion/react"), async (importOriginal) => {
  const actual = await importOriginal();
  const MotionPath = ({ ref, ...props }: MotionElementProps<SVGPathElement>) => (
    <path ref={ref} {...stripMotionProps(props)} />
  );
  const MotionCircle = ({ ref, ...props }: MotionElementProps<SVGCircleElement>) => (
    <circle ref={ref} {...stripMotionProps(props)} />
  );
  const MotionG = ({ ref, ...props }: MotionElementProps<SVGGElement>) => (
    <g ref={ref} {...stripMotionProps(props)} />
  );
  return { ...actual, m: { circle: MotionCircle, g: MotionG, path: MotionPath } };
});

const { StatusMark } = await import("./index");

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
