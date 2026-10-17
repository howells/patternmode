// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement, Fragment } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Deck } from "./index";
import type { DeckAdvanceEvent } from "./types";

interface TestPanInfo {
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface TestDragHandlers {
  onDragEnd?: (event: Event, info: TestPanInfo) => void;
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
interface Holder<TValue> {
  current: TValue;
}

const latestExitComplete = vi.hoisted((): Holder<(() => void) | undefined> => ({
  current: undefined,
}));
const mountedInitials = vi.hoisted((): Holder<Map<string, unknown>> => ({
  current: new Map(),
}));
const latestDragHandlers = vi.hoisted((): Holder<TestDragHandlers> => ({ current: {} }));
const recordDragHandlers = vi.hoisted(() => (handlers: TestDragHandlers) => {
  latestDragHandlers.current = handlers;
});

// oxlint-disable-next-line anti-slop/no-module-mocking -- Deck imports motion/react directly; the mock strips animation props, exposes the drag handlers and reports exit completion without running animations in jsdom.
vi.mock(import("motion/react"), async (importOriginal) => {
  const actual = await importOriginal();
  const AnimatePresence = ({
    children,
    onExitComplete,
  }: {
    children: ReactNode;
    onExitComplete?: () => void;
  }) => {
    latestExitComplete.current = onExitComplete;
    return createElement(Fragment, null, children);
  };
  const MotionDiv = ({ ref, ...props }: MotionTestProps) => {
    const label = (Array.isArray(props.children) ? props.children : [props.children]).find(
      (child): child is string => typeof child === "string",
    );
    if (label !== undefined) {
      mountedInitials.current.set(label, props.initial);
    }
    if (props.onDragEnd !== undefined) {
      recordDragHandlers({
        onDragEnd: props.onDragEnd,
        onDragStart: props.onDragStart,
      });
    }
    return <div ref={ref} {...stripMotionProps(props)} />;
  };

  const motionComponents = {
    div: MotionDiv,
  };

  return {
    ...actual,
    AnimatePresence,
    m: motionComponents,
    motion: motionComponents,
    useReducedMotion: () => false,
  };
});

const dragActiveCard = (offsetX: number, velocityX = 0) => {
  act(() => {
    latestDragHandlers.current.onDragStart?.();
    latestDragHandlers.current.onDragEnd?.(new Event("pointerup"), {
      offset: { x: offsetX, y: 0 },
      velocity: { x: velocityX, y: 0 },
    });
  });
};

const renderCyclicDeck = () => {
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

  return { onAdvance, onIndexChange };
};

describe(Deck, () => {
  beforeEach(() => {
    mountedInitials.current.clear();
    latestExitComplete.current = undefined;
    latestDragHandlers.current = {};
  });

  afterEach(() => {
    cleanup();
  });

  it("renders a cyclic stack with the active card in front", () => {
    renderCyclicDeck();

    expect(screen.getByText("Beta")).toHaveAttribute("data-active", "true");
    expect(screen.getByText("Beta")).not.toHaveAttribute("inert");
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });

  it("stacks the upcoming cards by depth and makes them inert", () => {
    renderCyclicDeck();

    expect(screen.getByText("Gamma")).toHaveAttribute("data-depth", "1");
    expect(screen.getByText("Gamma")).toHaveAttribute("inert");
    expect(screen.getByText("Delta")).toHaveAttribute("data-depth", "2");
  });

  it("advances a cyclic stack with the keyboard", async () => {
    const user = userEvent.setup();
    const { onAdvance, onIndexChange } = renderCyclicDeck();

    screen.getByRole("slider", { name: "Project cards" }).focus();
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
    expect(onExhausted).toHaveBeenCalledOnce();
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

    expect(onAdvanceEnd).toHaveBeenCalledOnce();
    expect(onAdvanceEnd).toHaveBeenCalledWith(
      expect.objectContaining({ direction: "right", index: 0, nextIndex: 1 }),
    );

    act(() => {
      latestExitComplete.current?.();
    });

    expect(onAdvanceEnd).toHaveBeenCalledOnce();
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
    expect(onAdvance).toHaveBeenCalledExactlyOnceWith(
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

  it("rises a card in only when it joins a stack that has already rendered", () => {
    const { rerender } = render(
      <Deck aria-label="Dealt" mode="finite" visibleCount={3}>
        <Deck.Card key="alpha">Alpha</Deck.Card>
      </Deck>,
    );

    expect(mountedInitials.current.get("Alpha")).toBe(false);

    rerender(
      <Deck aria-label="Dealt" mode="finite" visibleCount={3}>
        <Deck.Card key="alpha">Alpha</Deck.Card>
        <Deck.Card key="beta">Beta</Deck.Card>
      </Deck>,
    );

    expect(mountedInitials.current.get("Alpha")).toBe(false);
    expect(mountedInitials.current.get("Beta")).toMatchObject({ opacity: 0 });
    expect(mountedInitials.current.get("Beta")).toHaveProperty("y");
  });

  it("places late cards instantly when enter is none", () => {
    const { rerender } = render(
      <Deck aria-label="Dealt" enter="none" mode="finite" visibleCount={3}>
        <Deck.Card key="alpha">Alpha</Deck.Card>
      </Deck>,
    );

    rerender(
      <Deck aria-label="Dealt" enter="none" mode="finite" visibleCount={3}>
        <Deck.Card key="alpha">Alpha</Deck.Card>
        <Deck.Card key="beta">Beta</Deck.Card>
      </Deck>,
    );

    expect(mountedInitials.current.get("Beta")).toBe(false);
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
