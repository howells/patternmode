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
  onDrag?: (event: Event, info: TestPanInfo) => void;
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
  onDrag?: TestDragHandlers["onDrag"];
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
      onDrag: _onDrag,
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
        onDrag: props.onDrag,
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

const CARD_WIDTH = 320;

/** jsdom has no layout, so every element reports the width a laid-out card would. */
const measureCardsAt = (width: number) =>
  vi
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockReturnValue(DOMRect.fromRect({ height: 400, width }));

const dragActiveCard = (offsetX: number, velocityX = 0) => {
  act(() => {
    latestDragHandlers.current.onDragStart?.();
    latestDragHandlers.current.onDrag?.(new Event("pointermove"), {
      offset: { x: offsetX, y: 0 },
      velocity: { x: velocityX, y: 0 },
    });
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

const renderCharacterisedDeck = () =>
  render(
    <Deck
      aria-label="Characterised"
      className="custom-deck"
      mode="cycle"
      renderOverlay={({ active, depth, direction, index, itemId }) => (
        <span data-testid={`overlay-${itemId}`}>
          {`${String(active)}|${depth}|${direction ?? "none"}|${index}`}
        </span>
      )}
      visibleCount={2}
    >
      <Deck.Card className="custom-card" key="a">
        A
      </Deck.Card>
      <Deck.Card key="b">B</Deck.Card>
      <Deck.Card key="c">C</Deck.Card>
    </Deck>,
  );

const describeRoot = (container: HTMLElement) => {
  const root = container.querySelector<HTMLElement>(".patternmode-deck");

  return { disabled: root?.dataset.disabled, empty: root?.dataset.empty };
};

const describeCard = (label: string) => {
  const card = screen.getByText(label);
  const id = label.toLowerCase();

  return {
    active: card.dataset.active,
    depth: card.dataset.depth,
    direction: card.dataset.direction,
    hidden: card.getAttribute("aria-hidden"),
    overlay: screen.getByTestId(`overlay-${id}`).textContent,
  };
};

describe(Deck, () => {
  beforeEach(() => {
    mountedInitials.current.clear();
    latestExitComplete.current = undefined;
    latestDragHandlers.current = {};
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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

  it("announces the active card by its place, never its internal id", async () => {
    const user = userEvent.setup();
    renderCyclicDeck();

    const slider = screen.getByRole("slider", { name: "Project cards" });
    expect(slider).toHaveAttribute("aria-valuetext", "Card 2 of 4");
    expect(slider).toHaveValue("1");

    slider.focus();
    await user.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");

    expect(slider).toHaveAttribute("aria-valuetext", "Card 1 of 4");
    expect(slider).toHaveValue("0");
  });

  it("announces a labelled card by its own name", () => {
    render(
      <Deck aria-label="Rooms">
        <Deck.Card aria-label="Light study" key="room-1">
          Study
        </Deck.Card>
        <Deck.Card key="room-2">Hall</Deck.Card>
      </Deck>,
    );

    expect(screen.getByRole("slider", { name: "Rooms" })).toHaveAttribute(
      "aria-valuetext",
      "Light study, 1 of 2",
    );
    expect(screen.getByRole("group", { name: "Light study" })).toHaveTextContent("Study");
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

  it("measures drag distance against the card's measured width", () => {
    measureCardsAt(CARD_WIDTH);
    const onAdvance = vi.fn<(event: DeckAdvanceEvent) => void>();

    render(
      <Deck aria-label="Drag cards" mode="cycle" onAdvance={onAdvance}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    // The 0.35 ratio threshold resolves to 112px of a 320px card, not 0.35px.
    dragActiveCard(40);
    expect(onAdvance).not.toHaveBeenCalled();

    dragActiveCard(200);
    expect(onAdvance).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ direction: "right", index: 0 }),
    );
  });

  it("still advances a short drag past the velocity threshold", () => {
    measureCardsAt(CARD_WIDTH);
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

  it("follows a drag without re-rendering the stack", () => {
    measureCardsAt(CARD_WIDTH);
    const renderOverlay = vi.fn<() => null>(() => null);

    render(
      <Deck aria-label="Dragged cards" renderOverlay={renderOverlay} visibleCount={3}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
        <Deck.Card>Third</Deck.Card>
      </Deck>,
    );

    const rendersBeforeDrag = renderOverlay.mock.calls.length;

    act(() => {
      latestDragHandlers.current.onDragStart?.();
      for (let offset = 1; offset <= 60; offset += 1) {
        latestDragHandlers.current.onDrag?.(new Event("pointermove"), {
          offset: { x: offset, y: 0 },
          velocity: { x: 0, y: 0 },
        });
      }
    });

    expect(renderOverlay).toHaveBeenCalledTimes(rendersBeforeDrag);
  });

  it("fails loudly when a drag ends on a card that was never measured", () => {
    measureCardsAt(0);

    render(
      <Deck aria-label="Unmeasured cards">
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    expect(() => {
      dragActiveCard(200);
    }).toThrow("could not measure the active card's width");
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

  it("keeps its classes, data attributes and overlay state before an advance", () => {
    const { container } = renderCharacterisedDeck();

    expect(container.firstElementChild).toHaveClass("patternmode-deck", "custom-deck");
    expect(describeRoot(container)).toStrictEqual({ disabled: undefined, empty: undefined });
    expect(screen.getByText("A")).toHaveClass("patternmode-deck-card", "custom-card");
    expect(describeCard("A")).toStrictEqual({
      active: "true",
      depth: "0",
      direction: undefined,
      hidden: null,
      overlay: "true|0|none|0",
    });
    expect(describeCard("B")).toStrictEqual({
      active: "false",
      depth: "1",
      direction: undefined,
      hidden: "true",
      overlay: "false|1|none|1",
    });
  });

  it("keeps its data attributes and overlay state after cycling round", async () => {
    const user = userEvent.setup();
    renderCharacterisedDeck();

    screen.getByRole("slider", { name: "Characterised" }).focus();
    await user.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");

    expect(describeCard("A")).toStrictEqual({
      active: "true",
      depth: "0",
      direction: "left",
      hidden: null,
      overlay: "true|0|left|0",
    });
    expect(describeCard("B")).toStrictEqual({
      active: "false",
      depth: "1",
      direction: "left",
      hidden: "true",
      overlay: "false|1|left|1",
    });
  });

  it("marks a disabled deck and ignores the keyboard", async () => {
    const user = userEvent.setup();
    const onAdvance = vi.fn<(event: DeckAdvanceEvent) => void>();

    const { container } = render(
      <Deck aria-label="Disabled cards" disabled onAdvance={onAdvance} tabIndex={-1}>
        <Deck.Card>First</Deck.Card>
        <Deck.Card>Second</Deck.Card>
      </Deck>,
    );

    expect(container.firstElementChild).toHaveAttribute("data-disabled", "true");
    expect(container.firstElementChild).toHaveAttribute("tabindex", "-1");
    screen.getByRole("slider", { name: "Disabled cards" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(onAdvance).not.toHaveBeenCalled();
    expect(screen.getByText("First")).toHaveAttribute("data-active", "true");
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
