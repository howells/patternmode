// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode, Ref, SVGAttributes } from "react";

import { resolveStatusProgress, StatusMark } from "./index";

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
const LazyMotion = vi.hoisted(() => ({ children }: { children: ReactNode }) => <>{children}</>);

vi.mock("motion/react", () => {
  const MotionPath = ({ ref, ...props }: MotionElementProps<SVGPathElement>) => (
    <path ref={ref} {...stripMotionProps(props)} />
  );
  const MotionCircle = ({ ref, ...props }: MotionElementProps<SVGCircleElement>) => (
    <circle ref={ref} {...stripMotionProps(props)} />
  );
  const MotionG = ({ ref, ...props }: MotionElementProps<SVGGElement>) => (
    <g ref={ref} {...stripMotionProps(props)} />
  );
  return {
    LazyMotion,
    domMax: {},
    m: {
      circle: MotionCircle,
      g: MotionG,
      path: MotionPath,
    },
    useReducedMotion: () => false,
  };
});

afterEach(() => {
  cleanup();
});

/* The shipped components expose `data-slot`, not `data-testid` — test hooks do
   not belong in a consumer's production DOM. Fixtures local to this file still
   use `data-testid`, so the two are queried differently on purpose. */
const querySlot = (slot: string): Element | null => document.querySelector(`[data-slot="${slot}"]`);

const bySlot = (slot: string): Element => {
  const element = document.querySelector(`[data-slot="${slot}"]`);
  if (!element) {
    throw new Error(`expected an element with [data-slot="${slot}"]`);
  }
  return element;
};

describe("resolveStatusProgress", () => {
  it("snaps numeric values to discrete progress steps", () => {
    expect(resolveStatusProgress({ value: -20 })).toEqual({
      progress: 0,
      status: "empty",
    });
    expect(resolveStatusProgress({ value: 38 })).toEqual({
      progress: 50,
      status: "half",
    });
    expect(resolveStatusProgress({ value: 88 })).toEqual({
      progress: 100,
      status: "full",
    });
  });

  it("treats NaN values as unknown progress instead of empty", () => {
    expect(resolveStatusProgress({ value: Number.NaN })).toEqual({
      progress: null,
      status: "null",
    });
  });

  it("keeps null progress distinct from zero progress", () => {
    expect(resolveStatusProgress({ status: "null", value: 100 })).toEqual({
      progress: null,
      status: "null",
    });
    expect(resolveStatusProgress({ status: "empty" })).toEqual({ progress: 0, status: "empty" });
  });
});

describe("StatusMark", () => {
  it("renders an accessible labelled status mark", () => {
    render(<StatusMark label="Build is halfway complete" value={50} />);

    const mark = screen.getByRole("img", { name: "Build is halfway complete" });
    expect(mark).toHaveAttribute("data-variant", "fill");
    expect(mark).toHaveAttribute("data-status", "half");
    expect(mark).toHaveAttribute("data-progress", "50");
  });

  it("renders decorative marks as hidden when no label is supplied", () => {
    render(<StatusMark status="null" />);

    const mark = document.querySelector(".patternmode-status-mark");
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).toHaveAttribute("data-status", "null");
    expect(mark).toHaveAttribute("data-progress", "null");
  });

  it("renders null progress as the same dashed placeholder in every variant", () => {
    const { rerender } = render(<StatusMark label="Null" status="null" />);

    expect(bySlot("status-mark-null")).toHaveAttribute("r", "8");
    expect(querySlot("status-mark-fill")).not.toBeInTheDocument();
    expect(querySlot("status-mark-border")).not.toBeInTheDocument();

    rerender(<StatusMark label="Null" status="null" variant="border" />);

    expect(bySlot("status-mark-null")).toHaveAttribute("r", "8");
    expect(querySlot("status-mark-fill")).not.toBeInTheDocument();
    expect(querySlot("status-mark-border")).not.toBeInTheDocument();
  });

  it("renders filled sweep layer by default", () => {
    render(<StatusMark label="Three quarters complete" value={75} />);

    expect(bySlot("status-mark-fill")).toBeInTheDocument();
    expect(querySlot("status-mark-border")).not.toBeInTheDocument();
    expect(bySlot("status-mark-fill-sweep")).toBeInTheDocument();
  });

  it("renders precise filled sweep geometry for half and full progress", () => {
    const { unmount } = render(<StatusMark label="Half complete" value={50} />);

    expect(bySlot("status-mark-fill-sweep")).toHaveAttribute(
      "d",
      "M12 12 L12 3.0999999999999996 A8.9 8.9 0 0 1 12 20.9 Z",
    );

    unmount();
    render(<StatusMark label="Complete" value={100} />);

    expect(bySlot("status-mark-fill-sweep")).toHaveAttribute(
      "d",
      "M3.0999999999999996 12 a8.9 8.9 0 1 0 17.8 0 a8.9 8.9 0 1 0 -17.8 0",
    );
  });

  it("switches between fill and border variants", () => {
    const { rerender } = render(<StatusMark label="Filled" value={75} />);

    expect(screen.getByRole("img", { name: "Filled" })).toHaveAttribute("data-variant", "fill");
    expect(querySlot("status-mark-border")).not.toBeInTheDocument();
    expect(bySlot("status-mark-fill")).toBeInTheDocument();
    expect(bySlot("status-mark-fill")).toHaveAttribute("r", "8.9");

    rerender(<StatusMark label="Bordered" value={75} variant="border" />);

    expect(screen.getByRole("img", { name: "Bordered" })).toHaveAttribute("data-variant", "border");
    expect(bySlot("status-mark-border")).toBeInTheDocument();
    expect(querySlot("status-mark-fill")).not.toBeInTheDocument();
  });

  it("accepts instance-level colors", () => {
    render(<StatusMark color="#315c4b" label="Almost complete" trackColor="#edeae2" value={75} />);

    const mark = screen.getByRole("img", { name: "Almost complete" });
    expect(mark).toHaveStyle({
      "--patternmode-status-color": "#315c4b",
      "--patternmode-status-track": "#edeae2",
    });
  });
});
