// @vitest-environment jsdom
import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import type { DragConfig, DragOutcome, DragTarget } from "./drag-types";
import { useDrag } from "./use-drag";

const buildConfig = (overrides: Partial<DragConfig> = {}): DragConfig => ({
  activeSnapIndex: 0,
  closeThreshold: 0.25,
  enabled: true,
  minTravel: 0,
  sequential: false,
  side: "right",
  snapHeights: [],
  velocityThreshold: 0.5,
  ...overrides,
});

interface TargetMocks {
  begin: Mock<() => number>;
  end: Mock<(outcome: DragOutcome, velocity: number) => void>;
  move: Mock<(travel: number) => void>;
}

const buildTarget = (startTravel = 0): DragTarget & TargetMocks => ({
  begin: vi.fn<() => number>(() => startTravel),
  end: vi.fn<(outcome: DragOutcome, velocity: number) => void>(),
  move: vi.fn<(travel: number) => void>(),
});

interface PointerOptions {
  pointerType?: string;
  target?: Element;
}

interface Harness {
  panel: HTMLDivElement;
  pointer: (type: string, x: number, y: number, options?: PointerOptions) => void;
  setPointerCapture: Mock<(pointerId: number) => void>;
  target: DragTarget & TargetMocks;
}

/** The clock the drag samples velocity from; tests step it explicitly. */
let clock = 0;

const setupDragPanel = (config: DragConfig, target = buildTarget(), children = ""): Harness => {
  const panel = document.createElement("div");
  panel.innerHTML = children;
  document.body.append(panel);
  Object.defineProperty(panel, "offsetWidth", { value: 400 });
  Object.defineProperty(panel, "offsetHeight", { value: 600 });
  const setPointerCapture = vi.fn<(pointerId: number) => void>();
  Object.defineProperty(panel, "setPointerCapture", { value: setPointerCapture });
  const panelRef = { current: panel };
  renderHook(() => {
    useDrag(panelRef, config, target);
  });
  // jsdom has no PointerEvent; a MouseEvent with the pointer fields stands in.
  const pointer = (type: string, x: number, y: number, options: PointerOptions = {}) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      button: 0,
      cancelable: true,
      clientX: x,
      clientY: y,
    });
    Object.defineProperty(event, "pointerId", { value: 7 });
    Object.defineProperty(event, "isPrimary", { value: true });
    Object.defineProperty(event, "pointerType", { value: options.pointerType ?? "mouse" });
    (options.target ?? panel).dispatchEvent(event);
  };
  return { panel, pointer, setPointerCapture, target };
};

/** jsdom has no Touch constructor; a plain event carries the fields the handler reads. */
const touchMove = (el: Element, x: number, y: number): Event => {
  const event = new Event("touchmove", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "touches", { value: [{ clientX: x, clientY: y }] });
  el.dispatchEvent(event);
  return event;
};

/** A vertical scroll container scrolled to `scrollTop`. */
const makeScroller = (panel: HTMLElement, scrollTop: number): HTMLElement => {
  const scroller = panel.querySelector<HTMLElement>("[data-scroller]");
  if (scroller === null) {
    throw new Error("missing scroller");
  }
  scroller.style.overflowY = "auto";
  Object.defineProperty(scroller, "scrollHeight", { value: 2000 });
  Object.defineProperty(scroller, "clientHeight", { value: 500 });
  scroller.scrollTop = scrollTop;
  return scroller;
};

describe(useDrag, () => {
  beforeEach(() => {
    clock = 0;
    vi.spyOn(performance, "now").mockImplementation(() => clock);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  describe("useDrag pointer capture", () => {
    it("does not capture the pointer on pointerdown, so plain taps keep their clicks", () => {
      const { pointer, setPointerCapture, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      expect(setPointerCapture).not.toHaveBeenCalled();
      pointer("pointerup", 100, 100);
      expect(setPointerCapture).not.toHaveBeenCalled();
      expect(target.end).not.toHaveBeenCalled();
    });

    it("does not capture the pointer for movement inside the dead zone", () => {
      const { pointer, setPointerCapture, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 104, 100);
      expect(setPointerCapture).not.toHaveBeenCalled();
      expect(target.move).not.toHaveBeenCalled();
    });

    it("captures the pointer once the gesture commits as a drag", () => {
      const { pointer, setPointerCapture, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 130, 100);
      expect(setPointerCapture).toHaveBeenCalledExactlyOnceWith(7);
      expect(target.begin).toHaveBeenCalledOnce();
      // The Sheet starts from where it is: the dead zone is not added as a lurch.
      expect(target.move).toHaveBeenLastCalledWith(0);
      pointer("pointermove", 160, 100);
      expect(target.move).toHaveBeenLastCalledWith(30);
    });

    it("does not capture the pointer for an off-axis gesture", () => {
      const { pointer, setPointerCapture, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 100, 140);
      expect(setPointerCapture).not.toHaveBeenCalled();
      expect(target.move).not.toHaveBeenCalled();
    });
  });

  describe("useDrag release", () => {
    it("dismisses when a slow drag is released past the close threshold", () => {
      const { pointer, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 130, 100);
      clock = 400;
      pointer("pointermove", 250, 100);
      clock = 900;
      pointer("pointerup", 250, 100);
      expect(target.end).toHaveBeenCalledWith({ kind: "dismiss" }, 0);
    });

    it("dismisses a short flick and hands its velocity to the exit in px/s", () => {
      const { pointer, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 115, 100);
      clock = 20;
      pointer("pointermove", 135, 100);
      pointer("pointerup", 135, 100);
      const [outcome, velocity] = target.end.mock.calls[0] ?? [];
      expect(outcome).toStrictEqual({ kind: "dismiss" });
      // 20px over 20ms = 1px/ms
      expect(velocity).toBeCloseTo(1000);
    });

    it("keeps the Sheet when a long drag is flicked back toward open", () => {
      const { pointer, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 130, 100);
      clock = 300;
      pointer("pointermove", 260, 100);
      clock = 320;
      pointer("pointermove", 230, 100);
      pointer("pointerup", 230, 100);
      expect(target.end.mock.calls[0]?.[0]).toStrictEqual({ kind: "rest" });
    });

    it("settles back to rest on pointercancel", () => {
      const { pointer, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 200, 100);
      pointer("pointercancel", 200, 100);
      expect(target.end).toHaveBeenCalledWith({ kind: "rest" }, 0);
    });

    it("catches a Sheet mid-animation from the travel on screen", () => {
      const { pointer, target } = setupDragPanel(buildConfig(), buildTarget(120));
      pointer("pointerdown", 100, 100);
      pointer("pointermove", 130, 100);
      expect(target.move).toHaveBeenLastCalledWith(120);
      pointer("pointermove", 150, 100);
      expect(target.move).toHaveBeenLastCalledWith(140);
    });

    it("snaps to the nearest Snap Point from the travel, not the drag start", () => {
      // Panel 600px tall; snap heights 300 and 600 sit at travel 300 and 0.
      const config = buildConfig({ activeSnapIndex: 0, side: "bottom", snapHeights: [300, 600] });
      const { pointer, target } = setupDragPanel(config, buildTarget(300));
      pointer("pointerdown", 100, 400, { pointerType: "touch" });
      pointer("pointermove", 100, 380, { pointerType: "touch" });
      clock = 500;
      pointer("pointermove", 100, 120, { pointerType: "touch" });
      clock = 900;
      pointer("pointerup", 100, 120, { pointerType: "touch" });
      expect(target.end.mock.calls[0]?.[0]).toStrictEqual({ index: 1, kind: "snap" });
    });
  });

  describe("useDrag rubber band", () => {
    it("lets a touch pull a Sheet past rest with rising resistance", () => {
      const { pointer, target } = setupDragPanel(buildConfig({ side: "bottom" }));
      pointer("pointerdown", 100, 400, { pointerType: "touch" });
      pointer("pointermove", 100, 390, { pointerType: "touch" });
      pointer("pointermove", 100, 290, { pointerType: "touch" });
      const first = target.move.mock.lastCall?.[0] ?? 0;
      expect(first).toBeLessThan(0);
      expect(first).toBeGreaterThan(-100);
      pointer("pointermove", 100, -10, { pointerType: "touch" });
      const further = target.move.mock.lastCall?.[0] ?? 0;
      expect(further).toBeLessThan(first);
      // A 400px pull moves the Sheet well under half as far, and less than 4× the 100px pull.
      expect(Math.abs(further)).toBeLessThan(200);
      expect(further / first).toBeLessThan(3.5);
    });

    it("rubber-bands from the most open Snap Point, not from fully open", () => {
      const config = buildConfig({ minTravel: 100, side: "bottom", snapHeights: [500] });
      const { pointer, target } = setupDragPanel(config, buildTarget(100));
      pointer("pointerdown", 100, 400, { pointerType: "touch" });
      pointer("pointermove", 100, 390, { pointerType: "touch" });
      pointer("pointermove", 100, 340, { pointerType: "touch" });
      const travel = target.move.mock.lastCall?.[0] ?? 0;
      expect(travel).toBeLessThan(100);
      expect(travel).toBeGreaterThan(40);
    });

    it("leaves a mouse drag toward open to text selection", () => {
      const { pointer, target } = setupDragPanel(buildConfig());
      pointer("pointerdown", 200, 100);
      pointer("pointermove", 150, 100);
      expect(target.begin).not.toHaveBeenCalled();
    });
  });

  describe("useDrag start targets", () => {
    it("starts a drag on a link and swallows the click that follows", () => {
      const { panel, pointer, target } = setupDragPanel(
        buildConfig(),
        buildTarget(),
        '<a href="#row">Row</a>',
      );
      const link = panel.querySelector("a");
      if (link === null) {
        throw new Error("missing link");
      }
      const onClick = vi.fn<() => void>();
      link.addEventListener("click", onClick);
      pointer("pointerdown", 100, 100, { target: link });
      pointer("pointermove", 160, 100, { target: link });
      pointer("pointerup", 160, 100, { target: link });
      expect(target.begin).toHaveBeenCalledOnce();
      const click = new MouseEvent("click", { bubbles: true, cancelable: true });
      link.dispatchEvent(click);
      expect(onClick).not.toHaveBeenCalled();
      expect(click.defaultPrevented).toBe(true);
    });

    it("keeps a tap on a link a tap", () => {
      const { panel, pointer } = setupDragPanel(
        buildConfig(),
        buildTarget(),
        '<a href="#row">Row</a>',
      );
      const link = panel.querySelector("a");
      if (link === null) {
        throw new Error("missing link");
      }
      const onClick = vi.fn<() => void>();
      link.addEventListener("click", onClick);
      pointer("pointerdown", 100, 100, { target: link });
      pointer("pointermove", 104, 100, { target: link });
      pointer("pointerup", 104, 100, { target: link });
      link.click();
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("stops swallowing clicks at the next press", () => {
      const { panel, pointer } = setupDragPanel(
        buildConfig(),
        buildTarget(),
        '<button type="button">Row</button>',
      );
      const button = panel.querySelector("button");
      if (button === null) {
        throw new Error("missing button");
      }
      const onClick = vi.fn<() => void>();
      button.addEventListener("click", onClick);
      pointer("pointerdown", 100, 100, { target: button });
      pointer("pointermove", 160, 100, { target: button });
      pointer("pointerup", 160, 100, { target: button });
      pointer("pointerdown", 100, 100, { target: button });
      pointer("pointerup", 100, 100, { target: button });
      button.click();
      expect(onClick).toHaveBeenCalledOnce();
    });

    it.each([
      ['<input type="text" />', "input"],
      ['<input type="range" />', "input"],
      ["<textarea></textarea>", "textarea"],
      ["<select><option>One</option></select>", "select"],
      ['<div contenteditable="true">Edit</div>', "div"],
      ['<div data-stacksheet-no-drag=""><span>Opt out</span></div>', "span"],
      ['<div draggable="true">Reorder</div>', "div"],
    ])("never starts a drag from %s", (markup, selector) => {
      const { panel, pointer, target } = setupDragPanel(buildConfig(), buildTarget(), markup);
      const el = panel.querySelector(selector);
      if (el === null) {
        throw new Error("missing element");
      }
      pointer("pointerdown", 100, 100, { target: el });
      pointer("pointermove", 160, 100, { target: el });
      expect(target.begin).not.toHaveBeenCalled();
    });

    it("starts a drag from a checkbox, which is pressed rather than typed into", () => {
      const { panel, pointer, target } = setupDragPanel(
        buildConfig(),
        buildTarget(),
        '<input type="checkbox" />',
      );
      const box = panel.querySelector("input");
      if (box === null) {
        throw new Error("missing checkbox");
      }
      pointer("pointerdown", 100, 100, { target: box });
      pointer("pointermove", 160, 100, { target: box });
      expect(target.begin).toHaveBeenCalledOnce();
    });

    it("blocks a native link drag while a gesture is armed", () => {
      const { panel, pointer } = setupDragPanel(
        buildConfig(),
        buildTarget(),
        '<a href="#row">Row</a>',
      );
      const link = panel.querySelector("a");
      if (link === null) {
        throw new Error("missing link");
      }
      pointer("pointerdown", 100, 100, { target: link });
      const dragstart = new Event("dragstart", { bubbles: true, cancelable: true });
      link.dispatchEvent(dragstart);
      expect(dragstart.defaultPrevented).toBe(true);
    });
  });

  describe("useDrag scroll handoff", () => {
    const scrollerMarkup = '<div data-scroller=""><p data-row="">Row</p></div>';

    it("drags a bottom Sheet whose content is scrolled to the top", () => {
      const { panel, pointer, target } = setupDragPanel(
        buildConfig({ side: "bottom" }),
        buildTarget(),
        scrollerMarkup,
      );
      makeScroller(panel, 0);
      const row = panel.querySelector("[data-row]");
      if (row === null) {
        throw new Error("missing row");
      }
      pointer("pointerdown", 100, 100, { pointerType: "touch", target: row });
      pointer("pointermove", 100, 140, { pointerType: "touch", target: row });
      expect(target.begin).toHaveBeenCalledOnce();
    });

    it("scrolls content that is not at the top instead of dragging", () => {
      const { panel, pointer, target } = setupDragPanel(
        buildConfig({ side: "bottom" }),
        buildTarget(),
        scrollerMarkup,
      );
      makeScroller(panel, 200);
      const row = panel.querySelector("[data-row]");
      if (row === null) {
        throw new Error("missing row");
      }
      pointer("pointerdown", 100, 100, { pointerType: "touch", target: row });
      pointer("pointermove", 100, 140, { pointerType: "touch", target: row });
      expect(target.begin).not.toHaveBeenCalled();
    });

    it("claims a touch heading for a drag, so the browser never starts scrolling", () => {
      const { panel, pointer } = setupDragPanel(
        buildConfig({ side: "bottom" }),
        buildTarget(),
        scrollerMarkup,
      );
      makeScroller(panel, 0);
      const row = panel.querySelector("[data-row]");
      if (row === null) {
        throw new Error("missing row");
      }
      pointer("pointerdown", 100, 100, { pointerType: "touch", target: row });
      expect(touchMove(row, 100, 106).defaultPrevented).toBe(true);
    });

    it("leaves a touch heading into the content's own scroll to the browser", () => {
      const { panel, pointer } = setupDragPanel(
        buildConfig({ side: "bottom" }),
        buildTarget(),
        scrollerMarkup,
      );
      makeScroller(panel, 0);
      const row = panel.querySelector("[data-row]");
      if (row === null) {
        throw new Error("missing row");
      }
      pointer("pointerdown", 100, 100, { pointerType: "touch", target: row });
      expect(touchMove(row, 100, 94).defaultPrevented).toBe(false);
    });

    it("expands a Sheet at a lower Snap Point before its content scrolls", () => {
      const config = buildConfig({ activeSnapIndex: 0, side: "bottom", snapHeights: [300, 600] });
      const { panel, pointer, target } = setupDragPanel(config, buildTarget(300), scrollerMarkup);
      makeScroller(panel, 0);
      const row = panel.querySelector("[data-row]");
      if (row === null) {
        throw new Error("missing row");
      }
      pointer("pointerdown", 100, 300, { pointerType: "touch", target: row });
      pointer("pointermove", 100, 280, { pointerType: "touch", target: row });
      pointer("pointermove", 100, 240, { pointerType: "touch", target: row });
      expect(target.begin).toHaveBeenCalledOnce();
      // Free travel toward the taller Snap Point, no resistance.
      expect(target.move).toHaveBeenLastCalledWith(260);
    });
  });
});
