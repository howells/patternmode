// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode, Ref, SVGAttributes } from "react";

import { getStatusMarkState, StatusMark } from "./index";

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

describe("getStatusMarkState", () => {
  it("snaps numeric values to a discrete scale", () => {
    expect(getStatusMarkState({ value: -20 })).toMatchObject({
      progress: 0,
      status: "empty",
      variant: "scale",
    });
    expect(getStatusMarkState({ value: 38 })).toMatchObject({
      progress: 50,
      status: "half",
      variant: "scale",
    });
    expect(getStatusMarkState({ value: 88 })).toMatchObject({
      progress: 100,
      status: "full",
      variant: "scale",
    });
  });

  it("lets symbolic statuses override numeric values", () => {
    expect(getStatusMarkState({ status: "blocked", value: 100 })).toMatchObject({
      progress: 0,
      status: "blocked",
      variant: "symbolic",
    });
  });
});

describe("StatusMark", () => {
  it("renders an accessible labelled status mark", () => {
    render(<StatusMark label="Build is halfway complete" value={50} />);

    const mark = screen.getByRole("img", { name: "Build is halfway complete" });
    expect(mark).toHaveAttribute("data-border", "true");
    expect(mark).toHaveAttribute("data-fill", "true");
    expect(mark).toHaveAttribute("data-status", "half");
    expect(mark).toHaveAttribute("data-progress", "50");
  });

  it("renders decorative marks as hidden when no label is supplied", () => {
    render(<StatusMark status="pending" />);

    const mark = document.querySelector(".patternmode-status-mark");
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).toHaveAttribute("data-status", "pending");
  });

  it("renders symbolic glyph parts for blocked and paused states", () => {
    const { rerender } = render(<StatusMark label="Blocked" status="blocked" />);

    expect(screen.getByTestId("status-mark-slash")).toBeInTheDocument();

    rerender(<StatusMark label="Paused" status="paused" />);

    expect(screen.getByTestId("status-mark-pause")).toBeInTheDocument();
  });

  it("renders refined pause and question glyph geometry", () => {
    const { rerender } = render(<StatusMark label="Paused" status="paused" />);

    expect(screen.getByTestId("status-mark-pause").querySelector("g")).toHaveAttribute(
      "transform",
      "translate(12 12) scale(0.82) translate(-12 -12)",
    );
    expect(screen.getByTestId("status-mark-pause")).toContainHTML("M10.15 8.85v6.3");
    expect(screen.getByTestId("status-mark-pause")).toContainHTML("M13.85 8.85v6.3");

    rerender(<StatusMark label="Unknown" status="unknown" />);

    expect(screen.getByTestId("status-mark-question").querySelector("g")).toHaveAttribute(
      "transform",
      "translate(12 12) scale(0.82) translate(-12 -12)",
    );
    expect(screen.getByTestId("status-mark-question").querySelector("path")).toHaveAttribute(
      "d",
      "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
    );
    expect(screen.getByTestId("status-mark-question")).toContainHTML("M12 17h.01");
  });

  it("renders the complete check at symbolic glyph scale", () => {
    render(<StatusMark label="Complete" status="complete" />);

    expect(screen.getByTestId("status-mark-check")).toHaveAttribute(
      "d",
      "m8.3 12.3 2.35 2.35 5.05-5.3",
    );
    expect(screen.getByTestId("status-mark-check").parentElement).toHaveAttribute(
      "transform",
      "translate(12 12) scale(0.82) translate(-12 -12)",
    );
  });

  it("renders fill disc behind symbolic glyphs when fill is enabled", () => {
    render(<StatusMark label="Blocked" status="blocked" />);

    expect(screen.getByRole("img", { name: "Blocked" })).toHaveAttribute("data-fill", "true");
    expect(screen.getByTestId("status-mark-fill")).toBeInTheDocument();
    expect(screen.getByTestId("status-mark-slash")).toBeInTheDocument();
  });

  it("renders filled sweep layer by default", () => {
    render(<StatusMark label="Three quarters complete" value={75} />);

    expect(screen.getByTestId("status-mark-fill")).toBeInTheDocument();
    expect(screen.getByTestId("status-mark-border")).toBeInTheDocument();
    expect(screen.getByTestId("status-mark-fill-sweep")).toBeInTheDocument();
  });

  it("renders precise filled sweep geometry for half and full progress", () => {
    const { unmount } = render(<StatusMark border={false} label="Half complete" value={50} />);

    expect(screen.getByTestId("status-mark-fill-sweep")).toHaveAttribute(
      "d",
      "M12 12 L12 3.0999999999999996 A8.9 8.9 0 0 1 12 20.9 Z",
    );

    unmount();
    render(<StatusMark border={false} label="Complete" value={100} />);

    expect(screen.getByTestId("status-mark-fill-sweep")).toHaveAttribute(
      "d",
      "M3.0999999999999996 12 a8.9 8.9 0 1 0 17.8 0 a8.9 8.9 0 1 0 -17.8 0",
    );
  });

  it("can hide the border or fill layers independently", () => {
    const { rerender } = render(<StatusMark border={false} label="No border" value={75} />);

    expect(screen.getByRole("img", { name: "No border" })).toHaveAttribute("data-border", "false");
    expect(screen.queryByTestId("status-mark-border")).not.toBeInTheDocument();
    expect(screen.getByTestId("status-mark-fill")).toBeInTheDocument();
    expect(screen.getByTestId("status-mark-fill")).toHaveAttribute("r", "8.9");

    rerender(<StatusMark fill={false} label="No fill" value={75} />);

    expect(screen.getByRole("img", { name: "No fill" })).toHaveAttribute("data-fill", "false");
    expect(screen.getByTestId("status-mark-border")).toBeInTheDocument();
    expect(screen.queryByTestId("status-mark-fill")).not.toBeInTheDocument();
  });

  it("accepts instance-level colors", () => {
    render(
      <StatusMark
        color="#315c4b"
        fillColor="#dfeae4"
        label="Almost complete"
        trackColor="#edeae2"
        value={75}
      />,
    );

    const mark = screen.getByRole("img", { name: "Almost complete" });
    expect(mark).toHaveStyle({
      "--patternmode-status-color": "#315c4b",
      "--patternmode-status-fill": "#dfeae4",
      "--patternmode-status-track": "#edeae2",
    });
  });
});
