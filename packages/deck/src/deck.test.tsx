// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fragment } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Deck } from "./index";

type MotionTestProps = HTMLAttributes<HTMLElement> & {
  animate?: unknown;
  drag?: unknown;
  dragConstraints?: unknown;
  dragElastic?: unknown;
  dragMomentum?: unknown;
  dragTransition?: unknown;
  exit?: unknown;
  initial?: unknown;
  onDragEnd?: unknown;
  ref?: Ref<HTMLDivElement>;
  style?: CSSProperties;
  transition?: unknown;
  whileDrag?: unknown;
};

const stripMotionProps = vi.hoisted(
  () =>
    ({
      animate: _animate,
      drag: _drag,
      dragConstraints: _dragConstraints,
      dragElastic: _dragElastic,
      dragMomentum: _dragMomentum,
      dragTransition: _dragTransition,
      exit: _exit,
      initial: _initial,
      onDragEnd: _onDragEnd,
      transition: _transition,
      whileDrag: _whileDrag,
      ...props
    }: MotionTestProps) =>
      props,
);
const AnimatePresence = vi.hoisted(() => ({ children }: { children: ReactNode }) => (
  <>{children}</>
));
const LazyMotion = vi.hoisted(() => ({ children }: { children: ReactNode }) => <>{children}</>);

vi.mock("motion/react", () => {
  const MotionDiv = ({ ref, ...props }: MotionTestProps) => (
    <div ref={ref} {...stripMotionProps(props)} />
  );

  const motionComponents = {
    div: MotionDiv,
  };

  return {
    AnimatePresence,
    LazyMotion,
    domMax: {},
    m: motionComponents,
    motion: motionComponents,
    useReducedMotion: () => false,
  };
});

afterEach(() => {
  cleanup();
});

describe("Deck", () => {
  it("renders a cyclic stack and advances with the keyboard", async () => {
    const user = userEvent.setup();
    const onAdvance = vi.fn();
    const onIndexChange = vi.fn();

    render(
      <Deck
        aria-label="Project cards"
        defaultIndex={1}
        mode="cycle"
        onIndexChange={onIndexChange}
        onAdvance={onAdvance}
        visibleCount={3}
      >
        <Deck.Card>Alpha</Deck.Card>
        <Deck.Card>Beta</Deck.Card>
        <Deck.Card>Gamma</Deck.Card>
        <Deck.Card>Delta</Deck.Card>
      </Deck>,
    );

    const deck = screen.getByRole("slider", { name: "Project cards" });
    expect(screen.getByText("Beta")).toHaveAttribute("data-active", "true");
    expect(screen.getByText("Gamma")).toHaveAttribute("data-depth", "1");
    expect(screen.getByText("Delta")).toHaveAttribute("data-depth", "2");
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();

    deck.focus();
    await user.keyboard("{ArrowRight}");

    expect(onAdvance).toHaveBeenCalledWith(
      expect.objectContaining({ direction: "right", index: 1 }),
    );
    expect(onIndexChange).toHaveBeenCalledWith(2);
    expect(screen.getByText("Gamma")).toHaveAttribute("data-active", "true");
  });

  it("renders an empty state after a finite deck is exhausted", async () => {
    const user = userEvent.setup();
    const onExhausted = vi.fn();

    render(
      <Deck aria-label="Finite cards" defaultIndex={1} mode="finite" onExhausted={onExhausted}>
        <Deck.Card>One</Deck.Card>
        <Deck.Card>Two</Deck.Card>
        <Deck.Empty>No cards left</Deck.Empty>
      </Deck>,
    );

    const deck = screen.getByRole("slider", { name: "Finite cards" });
    deck.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByText("No cards left")).toBeInTheDocument();
    expect(onExhausted).toHaveBeenCalledTimes(1);
  });

  it("respects controlled index updates", async () => {
    const user = userEvent.setup();
    const onIndexChange = vi.fn();

    render(
      <Deck aria-label="Controlled cards" index={0} mode="cycle" onIndexChange={onIndexChange}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    const deck = screen.getByRole("slider", { name: "Controlled cards" });
    deck.focus();
    await user.keyboard("{ArrowRight}");

    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByText("First")).toHaveAttribute("data-active", "true");
  });

  it("renders card children inside fragments", () => {
    render(
      <Deck aria-label="Fragment cards">
        <Fragment key="fragment-cards">
          <Deck.Card>Fragment one</Deck.Card>
          <Deck.Card>Fragment two</Deck.Card>
        </Fragment>
      </Deck>,
    );

    expect(screen.getByText("Fragment one")).toHaveAttribute("data-active", "true");
    expect(screen.getByText("Fragment two")).toHaveAttribute("data-depth", "1");
  });

  it("warns when cards are wrapped in unsupported elements", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Deck aria-label="Wrapped cards">
        <div>
          <Deck.Card>Wrapped one</Deck.Card>
        </div>
      </Deck>,
    );

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Deck.Card must be a direct child"));

    warn.mockRestore();
  });
});
