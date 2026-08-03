// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Verge, VergeRoot, VergeSlot } from "./index";

afterEach(cleanup);

/*
 * jsdom applies no stylesheet, so the *visual* half of the contract — that the
 * slot is transparent at rest and opaque on hover — cannot be asserted here.
 * That half is guarded by the CSS itself and needs a browser to verify.
 *
 * What jsdom can prove is the half that lives in the DOM, and it happens to be
 * the half that actually breaks: whether the controls are reachable. Every
 * tempting "simplification" of this component — conditional rendering, `hidden`,
 * `display: none`, unmounting at rest — is invisible in a screenshot and fails
 * the reachability tests below. They exist to make those rewrites impossible.
 */
describe("VergeSlot reachability", () => {
  it("keeps its controls in the DOM at rest", () => {
    render(
      <VergeRoot>
        <span>Row label</span>
        <VergeSlot>
          <button type="button">Edit</button>
        </VergeSlot>
      </VergeRoot>,
    );

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("leaves its controls in the tab order at rest, so focus can arrive to reveal them", async () => {
    const user = userEvent.setup();
    render(
      <VergeRoot>
        <button type="button">Before</button>
        <VergeSlot>
          <button type="button">Edit</button>
        </VergeSlot>
      </VergeRoot>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Before" })).toHaveFocus();

    // The reveal is driven by :focus-within, so a slot its children cannot be
    // tabbed into can never open. `hidden`/`display:none` would break this.
    await user.tab();
    expect(screen.getByRole("button", { name: "Edit" })).toHaveFocus();
  });

  it("does not mark controls inert or hidden at rest", () => {
    render(
      <VergeSlot>
        <button type="button">Edit</button>
      </VergeSlot>,
    );

    const slot = screen.getByRole("button", { name: "Edit" }).parentElement;
    expect(slot).not.toHaveAttribute("hidden");
    expect(slot).not.toHaveAttribute("inert");
    expect(slot).not.toHaveAttribute("aria-hidden");
  });
});

describe("VergeSlot props", () => {
  it("marks itself visible only when asked", () => {
    const { rerender } = render(<VergeSlot data-testid="slot" />);
    expect(screen.getByTestId("slot")).not.toHaveAttribute("data-visible");

    rerender(<VergeSlot data-testid="slot" visible />);
    expect(screen.getByTestId("slot")).toHaveAttribute("data-visible");
  });

  it("reserves width from the slot-size custom property rather than hardcoded pixels", () => {
    render(<VergeSlot data-testid="slot" slots={3} />);

    expect(screen.getByTestId("slot")).toHaveStyle({
      minInlineSize: "calc(var(--patternmode-verge-slot-size, 1.75rem) * 3)",
    });
  });

  it("sets no inline width when slots is omitted", () => {
    render(<VergeSlot data-testid="slot" />);

    expect(screen.getByTestId("slot").style.minInlineSize).toBe("");
  });

  it("keeps a caller's own inline styles alongside the reserved width", () => {
    render(<VergeSlot data-testid="slot" slots={1} style={{ marginInlineStart: "8px" }} />);

    expect(screen.getByTestId("slot")).toHaveStyle({ marginInlineStart: "8px" });
  });
});

describe("element type", () => {
  /*
   * `as` rather than `asChild`: both parts render their own element and then
   * their children, so there is no single child for a Slot to merge into. The
   * case that motivates it is semantic nesting — a row inside a real list has
   * to be an `<li>`, and a `<div>` there is invalid in a way that still looks
   * correct on screen and only a screen reader notices.
   */
  it("renders the root as a given element so it can sit in a semantic parent", () => {
    render(
      <ul>
        <VergeRoot as="li">
          <span>Item</span>
        </VergeRoot>
      </ul>,
    );

    expect(screen.getByRole("listitem")).toHaveClass("patternmode-verge-root");
  });

  it("renders the slot as a given element", () => {
    render(<VergeSlot as="td" data-testid="slot" />);

    expect(screen.getByTestId("slot").tagName).toBe("TD");
  });

  it("defaults both parts to a div", () => {
    render(
      <VergeRoot data-testid="root">
        <VergeSlot data-testid="slot" />
      </VergeRoot>,
    );

    expect(screen.getByTestId("root").tagName).toBe("DIV");
    expect(screen.getByTestId("slot").tagName).toBe("DIV");
  });
});

describe("class names", () => {
  it("applies its own class and keeps the caller's", () => {
    render(
      <VergeRoot className="row" data-testid="root">
        <VergeSlot className="actions" data-testid="slot" />
      </VergeRoot>,
    );

    expect(screen.getByTestId("root")).toHaveClass("patternmode-verge-root", "row");
    expect(screen.getByTestId("slot")).toHaveClass("patternmode-verge", "actions");
  });

  it("exposes stable data-slot hooks", () => {
    render(
      <VergeRoot data-testid="root">
        <VergeSlot data-testid="slot" />
      </VergeRoot>,
    );

    expect(screen.getByTestId("root")).toHaveAttribute("data-slot", "verge-root");
    expect(screen.getByTestId("slot")).toHaveAttribute("data-slot", "verge");
  });
});

describe("namespace", () => {
  it("exposes the same components as Verge.Root and Verge.Slot", () => {
    expect(Verge.Root).toBe(VergeRoot);
    expect(Verge.Slot).toBe(VergeSlot);
  });
});
