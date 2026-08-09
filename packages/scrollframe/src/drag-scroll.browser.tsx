/*
 * Real-browser tests. These exist because the jsdom suite structurally cannot
 * catch the bug that shipped in 2.0.0: `fireEvent.click(link)` proves only that
 * the test dispatched a click at the link, and the bug was that the *browser*
 * would have delivered it somewhere else. Every jsdom test passed throughout.
 *
 * So assert the outcome, not the mechanism: does pressing and releasing on a
 * link inside a drag-scrollable frame actually activate that link. The jsdom
 * tests still assert the mechanism (capture never taken, suppression cleared) —
 * they are faster and they localise a failure. These say whether a user can
 * click the thing.
 *
 * Run with `pnpm test:browser`. Not part of `pnpm check`, which stays free of
 * browser binaries — see AGENTS.md "Browser tests".
 */
import { page, userEvent } from "vitest/browser";
import { useState } from "react";
import { render } from "vitest-browser-react";
import { describe, expect, it } from "vitest";

import { ScrollFrame } from "./index";
import "../dist/styles.css";

const Rail = ({ onActivate }: { onActivate: () => void }) => (
  <ScrollFrame aria-label="Winners" axes="horizontal" dragScroll style={{ width: "240px" }}>
    <div style={{ display: "flex", gap: "8px", width: "900px" }}>
      {["one", "two", "three", "four", "five", "six"].map((name) => (
        <button
          key={name}
          onClick={onActivate}
          style={{ flex: "0 0 140px", height: "80px" }}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  </ScrollFrame>
);

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <output data-slot="activations">{count}</output>
      <Rail
        onActivate={() => {
          setCount((value) => value + 1);
        }}
      />
    </div>
  );
};

const activations = () => Number(page.getByTestId("activations").element().textContent ?? "-1");

describe("drag-scroll in a real browser", () => {
  it("activates a button inside the frame on a plain click", async () => {
    await render(<Counter />);

    /*
     * This is the whole point of the file. Under the 2.0.0 implementation the
     * frame took pointer capture on this pointerdown, the browser retargeted
     * the compatibility mouseup and click at the scroll container, and the
     * button's handler never ran — silently, with nothing thrown.
     */
    await userEvent.click(page.getByRole("button", { name: "two" }));

    expect(activations()).toBe(1);
  });

  it("keeps activating on the click after a drag", async () => {
    await render(<Counter />);

    const from = page.getByRole("button", { name: "four" });
    const to = page.getByRole("button", { name: "one" });

    // A real drag: press on a button, travel well past the activation
    // distance, release. It must scroll and must NOT activate anything.
    await userEvent.dragAndDrop(from, to);

    const viewport = page.getByTestId("scrollframe-viewport").element();
    expect(viewport.scrollLeft).toBeGreaterThan(0);
    expect(activations()).toBe(0);

    /*
     * `suppressClick` used to be cleared only by a click arriving, so a drag
     * that produced none left it set and swallowed the next unrelated click.
     * A browser is the only place that question is real, because whether a
     * drag produces a click is the browser's decision, not the test's.
     */
    await userEvent.click(page.getByRole("button", { name: "two" }));

    expect(activations()).toBe(1);
  });
});
