// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ModalFocusTrap } from "./sheet-panel-focus";

// oxlint-disable-next-line anti-slop/no-module-mocking -- jsdom has no layout, so the real focus trap finds no tabbable element and throws; the stand-in shows whether the trap is paused.
vi.mock(import("focus-trap-react"), () => ({
  FocusTrap: ({ children, paused }: { children: ReactNode; paused?: boolean }) => (
    <div data-paused={String(paused)} data-testid="trap">
      {children}
    </div>
  ),
}));

const renderTrap = (active = true) => {
  const panelRef = createRef<HTMLDivElement>();
  render(
    <ModalFocusTrap active={active} enabled fallbackRef={panelRef}>
      <div ref={panelRef}>
        <button type="button">Inside</button>
      </div>
    </ModalFocusTrap>,
  );
  return screen.getByTestId("trap");
};

/** A floating layer portalled to the body, outside the panel. */
const mountLayer = (attributes: Record<string, string>): HTMLButtonElement => {
  const layer = document.createElement("div");
  for (const [name, value] of Object.entries(attributes)) {
    layer.setAttribute(name, value);
  }
  const button = document.createElement("button");
  layer.append(button);
  document.body.append(layer);
  return button;
};

const focus = async (element: HTMLElement) => {
  await act(async () => {
    element.focus();
    await Promise.resolve();
  });
};

describe(ModalFocusTrap, () => {
  afterEach(() => {
    cleanup();
    document.body.replaceChildren();
    vi.restoreAllMocks();
  });

  it("pauses while a Base UI popup without a dialog role holds focus", async () => {
    const trap = renderTrap();
    await focus(mountLayer({ "data-open": "" }));
    expect(trap).toHaveAttribute("data-paused", "true");
  });

  it("pauses for a custom layer marked data-stacksheet-layer-exempt", async () => {
    const trap = renderTrap();
    await focus(mountLayer({ "data-stacksheet-layer-exempt": "" }));
    expect(trap).toHaveAttribute("data-paused", "true");
  });

  it("resumes when focus leaves the layer for the body", async () => {
    const trap = renderTrap();
    const inLayer = mountLayer({ "data-open": "", role: "dialog" });
    await focus(inLayer);
    expect(trap).toHaveAttribute("data-paused", "true");
    await act(async () => {
      inLayer.blur();
      await Promise.resolve();
    });
    expect(trap).toHaveAttribute("data-paused", "false");
  });

  it("does not listen for focus while the panel is inactive", () => {
    const addEventListener = vi.spyOn(document, "addEventListener");
    renderTrap(false);
    expect(addEventListener).not.toHaveBeenCalledWith("focusin", expect.anything(), true);
  });
});
