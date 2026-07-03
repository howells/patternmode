// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fragment } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Deck } from "./index";
import type { DeckAdvanceEvent } from "./types";

interface TestPanInfo {
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface TestDragHandlers {
  onDragEnd?: (event: unknown, info: TestPanInfo) => void;
  onDragStart?: () => void;
}

type MotionTestProps = HTMLAttributes<HTMLElement> & {
  animate?: unknown;
  drag?: unknown;
  dragConstraints?: unknown;
  dragElastic?: unknown;
  dragMomentum?: unknown;
  dragTransition?: unknown;
  exit?: unknown;
  initial?: unknown;
  onDragEnd?: TestDragHandlers["onDragEnd"];
  onDragStart?: TestDragHandlers["onDragStart"];
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
      onDragStart: _onDragStart,
      transition: _transition,
      whileDrag: _whileDrag,
      ...props
    }: MotionTestProps) =>
      props,
);
const latestExitComplete = vi.hoisted((): { current: (() => void) | undefined } => ({
  current: undefined,
}));
const latestDragHandlers = vi.hoisted((): { current: TestDragHandlers } => ({ current: {} }));
const AnimatePresence = vi.hoisted(
  () =>
    ({ children, onExitComplete }: { children: ReactNode; onExitComplete?: () => void }) => {
      latestExitComplete.current = onExitComplete;
      return <>{children}</>;
    },
);
const LazyMotion = vi.hoisted(() => ({ children }: { children: ReactNode }) => <>{children}</>);

vi.mock("motion/react", () => {
  const MotionDiv = ({ ref, ...props }: MotionTestProps) => {
    if (props.onDragEnd !== undefined) {
      latestDragHandlers.current = {
        onDragEnd: props.onDragEnd,
        onDragStart: props.onDragStart,
      };
    }
    return <div ref={ref} {...stripMotionProps(props)} />;
  };

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

beforeEach(() => {
  latestExitComplete.current = undefined;
  latestDragHandlers.current = {};
});

afterEach(() => {
  cleanup();
});

const dragActiveCard = (offsetX: number, velocityX = 0) => {
  act(() => {
    latestDragHandlers.current.onDragStart?.();
    latestDragHandlers.current.onDragEnd?.(
      {},
      { offset: { x: offsetX, y: 0 }, velocity: { x: velocityX, y: 0 } },
    );
  });
};

describe("Deck", () => {
  it("renders a cyclic stack and advances with the keyboard", async () => {
    const user = userEvent.setup();
    const onAdvance = vi.fn<(event: DeckAdvanceEvent) => void>();
    const onIndexChange = vi.fn<(index: number) => void>();

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
    expect(screen.getByText("Beta")).not.toHaveAttribute("inert");
    expect(screen.getByText("Gamma")).toHaveAttribute("data-depth", "1");
    expect(screen.getByText("Gamma")).toHaveAttribute("inert");
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
    const onExhausted = vi.fn<() => void>();

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
    const onIndexChange = vi.fn<(index: number) => void>();

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

  it("defers onAdvanceEnd until the exit animation completes", async () => {
    const user = userEvent.setup();
    const onAdvanceEnd = vi.fn<(event: DeckAdvanceEvent) => void>();

    render(
      <Deck aria-label="Advance end cards" mode="cycle" onAdvanceEnd={onAdvanceEnd}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    const deck = screen.getByRole("slider", { name: "Advance end cards" });
    deck.focus();
    await user.keyboard("{ArrowRight}");

    expect(onAdvanceEnd).not.toHaveBeenCalled();

    act(() => {
      latestExitComplete.current?.();
    });

    expect(onAdvanceEnd).toHaveBeenCalledTimes(1);
    expect(onAdvanceEnd).toHaveBeenCalledWith(
      expect.objectContaining({ direction: "right", index: 0, nextIndex: 1 }),
    );

    act(() => {
      latestExitComplete.current?.();
    });

    expect(onAdvanceEnd).toHaveBeenCalledTimes(1);
  });

  it("measures drag distance against a real card width, not a 1px fallback", () => {
    const onAdvance = vi.fn<(event: DeckAdvanceEvent) => void>();

    render(
      <Deck aria-label="Drag cards" mode="cycle" onAdvance={onAdvance}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    // jsdom cannot measure layout, so the fallback width (320px) applies and
    // the 0.35 ratio threshold resolves to 112px, not 0.35px.
    dragActiveCard(40);
    expect(onAdvance).not.toHaveBeenCalled();

    dragActiveCard(200);
    expect(onAdvance).toHaveBeenCalledTimes(1);
    expect(onAdvance).toHaveBeenCalledWith(
      expect.objectContaining({ direction: "right", index: 0 }),
    );
  });

  it("still advances a short drag past the velocity threshold", () => {
    const onAdvance = vi.fn<(event: DeckAdvanceEvent) => void>();

    render(
      <Deck aria-label="Fling cards" mode="cycle" onAdvance={onAdvance}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    dragActiveCard(-40, -800);

    expect(onAdvance).toHaveBeenCalledWith(
      expect.objectContaining({ direction: "left", index: 0 }),
    );
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

  it("keeps keyless card ids unique across sibling fragments", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Deck aria-label="Sibling fragment cards" visibleCount={4}>
        <Fragment key="first-pair">
          <Deck.Card>One</Deck.Card>
          <Deck.Card>Two</Deck.Card>
        </Fragment>
        <Fragment key="second-pair">
          <Deck.Card>Three</Deck.Card>
          <Deck.Card>Four</Deck.Card>
        </Fragment>
      </Deck>,
    );

    expect(screen.getByText("One")).toHaveAttribute("data-depth", "0");
    expect(screen.getByText("Two")).toHaveAttribute("data-depth", "1");
    expect(screen.getByText("Three")).toHaveAttribute("data-depth", "2");
    expect(screen.getByText("Four")).toHaveAttribute("data-depth", "3");
    // Colliding generated ids previously produced duplicate React keys.
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
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
