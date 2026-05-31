import { describe, expect, it } from "vitest";
import {
  getAdvanceDecision,
  getDeckRenderKey,
  getNextDeckIndex,
  getVisibleDeckItems,
  getVisualDepth,
  resolveCardRotation,
} from "./logic";
import type { DeckItem } from "./types";

const items: DeckItem[] = [
  { id: "a", element: "A" },
  { id: "b", element: "B" },
  { id: "c", element: "C" },
  { id: "d", element: "D" },
];

describe("getVisibleDeckItems", () => {
  it("wraps cyclic decks around the end of the list", () => {
    expect(
      getVisibleDeckItems(items, 2, 3, "cycle").map((item) => item.id),
    ).toEqual(["c", "d", "a"]);
  });

  it("stops finite decks when no more cards are available", () => {
    expect(
      getVisibleDeckItems(items, 2, 3, "finite").map((item) => item.id),
    ).toEqual(["c", "d"]);
  });

  it("returns no cards for exhausted finite decks", () => {
    expect(getVisibleDeckItems(items, 4, 3, "finite")).toEqual([]);
  });
});

describe("getNextDeckIndex", () => {
  it("wraps cyclic decks back to the first item", () => {
    expect(getNextDeckIndex(3, items.length, "cycle")).toBe(0);
  });

  it("allows finite decks to advance into an exhausted state", () => {
    expect(getNextDeckIndex(3, items.length, "finite")).toBe(4);
  });

  it("returns zero for empty cyclic decks", () => {
    expect(getNextDeckIndex(0, 0, "cycle")).toBe(0);
  });
});

describe("getDeckRenderKey", () => {
  it("keeps finite cards keyed by stable item id", () => {
    expect(getDeckRenderKey("a", 4, items.length, "finite")).toBe("a");
  });

  it("adds a cycle generation when a cyclic card re-enters the deck", () => {
    expect(getDeckRenderKey("a", 0, items.length, "cycle")).toBe("a:0");
    expect(getDeckRenderKey("a", 4, items.length, "cycle")).toBe("a:1");
    expect(getDeckRenderKey("a", 8, items.length, "cycle")).toBe("a:2");
  });
});

describe("getAdvanceDecision", () => {
  it("accepts an advance when horizontal distance crosses the threshold", () => {
    expect(
      getAdvanceDecision({
        offsetX: -121,
        velocityX: 100,
        width: 300,
        distanceThreshold: 0.4,
        velocityThreshold: 600,
        allowedDirections: ["left", "right"],
      }),
    ).toEqual({ accepted: true, direction: "left" });
  });

  it("accepts an advance when horizontal velocity crosses the threshold", () => {
    expect(
      getAdvanceDecision({
        offsetX: 24,
        velocityX: 650,
        width: 300,
        distanceThreshold: 0.5,
        velocityThreshold: 600,
        allowedDirections: ["left", "right"],
      }),
    ).toEqual({ accepted: true, direction: "right" });
  });

  it("rejects advances in disallowed directions", () => {
    expect(
      getAdvanceDecision({
        offsetX: -200,
        velocityX: -900,
        width: 300,
        distanceThreshold: 0.35,
        velocityThreshold: 600,
        allowedDirections: ["right"],
      }),
    ).toEqual({ accepted: false, direction: "left" });
  });
});

describe("resolveCardRotation", () => {
  it("returns a stable deterministic rotation for a card id", () => {
    const first = resolveCardRotation("ceramic-vessel", 8);
    const second = resolveCardRotation("ceramic-vessel", 8);

    expect(first).toBe(second);
    expect(first).toBeGreaterThanOrEqual(-8);
    expect(first).toBeLessThanOrEqual(8);
  });

  it("returns zero when rotation spread is disabled", () => {
    expect(resolveCardRotation("ceramic-vessel", 0)).toBe(0);
  });
});

describe("getVisualDepth", () => {
  it("maps the active card to zero depth and preserves later cards", () => {
    const visible = getVisibleDeckItems(items, 1, 3, "cycle");
    expect(visible.map((item) => getVisualDepth(item, visible))).toEqual([
      0, 1, 2,
    ]);
  });

  it("returns -1 when a card is not in the visible stack", () => {
    expect(getVisualDepth({ id: "x", element: "X" }, items)).toBe(-1);
  });
});
